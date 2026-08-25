/**
 * Authors often type "| Kratos Energy" into the CMS title, which reads as
 * duplicate branding wherever the title is shown next to our own chrome.
 *
 * Only a trailing segment that actually names the brand is dropped, so a title
 * that legitimately uses a pipe keeps every word.
 */
export function displayTitle(title?: string): string {
  const raw = (title || "").trim();
  if (!raw.includes("|")) return raw;

  const parts = raw.split("|");
  const tail = parts[parts.length - 1].trim();
  if (!/^kratos\b/i.test(tail)) return raw;

  const head = parts.slice(0, -1).join("|").trim();
  return head || raw;
}
