/**
 * Intrinsic dimensions for a remote image, read from its header bytes.
 *
 * OpenGraph `width`/`height` let a platform lay out the card before the image
 * downloads, but only if the numbers are true — a wrong ratio renders cropped
 * or letterboxed. CMS featured images come in at least six different ratios,
 * so the values have to be measured rather than assumed.
 */

export type ImageSize = { width: number; height: number };

/** Header bytes are all we need; no image here puts its SOF beyond this. */
const PROBE_BYTES = 65_536;

function parse(buf: Buffer): ImageSize | null {
  if (buf.length < 24) return null;

  // PNG — IHDR is always at a fixed offset.
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // WebP — three sub-formats, each storing size differently.
  if (buf.slice(0, 4).toString("ascii") === "RIFF" && buf.slice(8, 12).toString("ascii") === "WEBP") {
    const fmt = buf.slice(12, 16).toString("ascii");
    if (fmt === "VP8X") {
      return {
        width: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
        height: (buf.readUIntLE(27, 3) & 0xffffff) + 1,
      };
    }
    if (fmt === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (fmt === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    return null;
  }

  // JPEG — walk segment markers to the start-of-frame.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o + 9 < buf.length) {
      if (buf[o] !== 0xff) {
        o++;
        continue;
      }
      const marker = buf[o + 1];
      // SOF0–SOF15, excluding DHT (c4), JPG (c8) and DAC (cc).
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
      }
      const len = buf.readUInt16BE(o + 2);
      if (len < 2) return null;
      o += 2 + len;
    }
  }

  return null;
}

/**
 * Returns real pixel dimensions, or null when the image can't be reached or
 * parsed — callers then omit width/height rather than guessing. Cached for a
 * day: a post's featured image rarely changes, and never silently resizes.
 */
export async function imageSize(url?: string | null): Promise<ImageSize | null> {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  try {
    const res = await fetch(url, {
      headers: { Range: `bytes=0-${PROBE_BYTES - 1}` },
      next: { revalidate: 86_400 },
    } as RequestInit);
    // A server that ignores Range just sends the whole file, which parses fine.
    if (!res.ok && res.status !== 206) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const size = parse(buf);
    if (!size || !size.width || !size.height) return null;
    return size;
  } catch {
    return null;
  }
}
