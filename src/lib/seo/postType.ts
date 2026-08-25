/**
 * Maps a CMS post type (`type.slug` on the blog API) to the structured data a
 * post of that type should emit. One place to change when the CMS gains a new
 * type, rather than a hardcoded "BlogPosting" at each call site.
 */

export type PostSchemaShape = {
  /** schema.org article type for the main JSON-LD node. */
  article: "Article" | "BlogPosting" | "NewsArticle";
  /** Whether to also emit an FAQPage node built from the post body. */
  faq: boolean;
};

/**
 * The types the CMS defines today. All are listed explicitly so each is a
 * deliberate choice rather than whatever the fallback happens to be.
 *
 * `article` maps to schema.org Article — the parent type — because those posts
 * are editorial pieces rather than dated blog entries; `general-blog` is a blog
 * entry proper, so BlogPosting.
 *
 * `how-to` stays BlogPosting rather than schema.org HowTo: HowTo requires a
 * `step` list, and these posts are prose without machine-readable steps.
 * Emitting HowTo without steps would be invalid markup.
 */
const BY_TYPE_SLUG: Record<string, PostSchemaShape> = {
  "general-blog": { article: "BlogPosting", faq: false },
  article: { article: "Article", faq: false },
  news: { article: "NewsArticle", faq: false },
  faq: { article: "BlogPosting", faq: true },
  "how-to": { article: "BlogPosting", faq: false },
};

const DEFAULT_SHAPE: PostSchemaShape = { article: "BlogPosting", faq: false };

/**
 * `faq` posts stay BlogPosting for the article node — schema.org has no
 * "FAQ article" type — and gain a separate FAQPage node alongside it, which is
 * how the Q&A becomes machine-readable.
 */
export function schemaForPostType(typeSlug?: string | null): PostSchemaShape {
  const key = String(typeSlug || "").trim().toLowerCase();
  return BY_TYPE_SLUG[key] ?? DEFAULT_SHAPE;
}

/* ------------------------------------------------------------------ */
/* Q&A extraction                                                      */
/* ------------------------------------------------------------------ */

type Block = { type?: string; content?: unknown };

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

/** HTML fragment → collapsed plain text. */
function toText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&[a-z]+;|&#39;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

/** Editors number FAQ headings ("Q1: How long…"); the prefix isn't the question. */
function cleanQuestion(text: string): string {
  return text.replace(/^\s*(?:Q\s*\d+|\d+)\s*[.:)-]\s*/i, "").trim();
}

/** A heading only counts as a question if it reads like one. */
function isQuestion(text: string): boolean {
  return text.endsWith("?") || /^\s*Q\s*\d+\s*[.:)-]/i.test(text);
}

/** Answers are capped so one runaway section can't bloat the page payload. */
const MAX_ANSWER = 1200;

/** Every readable string in a block, whatever shape that block's content is. */
function blockText(raw: Block): string {
  const type = String(raw?.type || "").toLowerCase();
  const content = raw?.content;

  if (type === "text" || type === "texteditor") {
    return toText(
      typeof content === "string" ? content : String((content as { html?: string })?.html ?? ""),
    );
  }
  if (type === "accordion" || type === "card") {
    const items = (content as { items?: { title?: string; content?: string }[] })?.items ?? [];
    return items.map((it) => `${toText(String(it?.title ?? ""))} ${toText(String(it?.content ?? ""))}`).join(" ");
  }
  if (type === "tabs") {
    const tabs = (content as { tabs?: { title?: string; content?: string }[] })?.tabs ?? [];
    return tabs.map((t) => `${toText(String(t?.title ?? ""))} ${toText(String(t?.content ?? ""))}`).join(" ");
  }
  return "";
}

/**
 * Words in the post body. Counted from the actual content rather than derived
 * from `readMins`, which the CMS leaves unset — the public page falls back to a
 * flat 5, so a read-time estimate would put the same wordCount on every post.
 */
export function wordCountFromBlocks(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 0;
  const text = (blocks as Block[]).map(blockText).join(" ").trim();
  if (!text) return 0;
  return text.split(/\s+/).length;
}

/** Pull `{q, a}` pairs out of one HTML fragment's h2/h3 headings. */
function pairsFromHtml(html: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  const heading = /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi;

  const found: { level: number; text: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = heading.exec(html))) {
    found.push({
      level: Number(m[1]),
      text: toText(m[2]),
      start: m.index,
      end: m.index + m[0].length,
    });
  }

  for (let i = 0; i < found.length; i++) {
    const h = found[i];
    if (!isQuestion(h.text)) continue;
    // The answer runs to the next heading at the same level or higher.
    const next = found.slice(i + 1).find((n) => n.level <= h.level);
    const answer = toText(html.slice(h.end, next ? next.start : undefined));
    const q = cleanQuestion(h.text);
    if (!q || !answer) continue;
    out.push({ q, a: answer.length > MAX_ANSWER ? `${answer.slice(0, MAX_ANSWER).trimEnd()}…` : answer });
  }
  return out;
}

/**
 * Collect FAQ pairs from a post's blocks. Handles accordion blocks (title +
 * content) and question-shaped headings inside rich-text blocks, which is how
 * the CMS FAQ posts are actually written.
 */
export function faqPairsFromBlocks(blocks: unknown): { q: string; a: string }[] {
  if (!Array.isArray(blocks)) return [];
  const out: { q: string; a: string }[] = [];

  for (const raw of blocks as Block[]) {
    const type = String(raw?.type || "").toLowerCase();
    const content = raw?.content;

    if (type === "accordion") {
      const items = (content as { items?: { title?: string; content?: string }[] })?.items;
      for (const item of items ?? []) {
        const q = cleanQuestion(toText(String(item?.title ?? "")));
        const a = toText(String(item?.content ?? ""));
        if (q && a) out.push({ q, a: a.length > MAX_ANSWER ? `${a.slice(0, MAX_ANSWER).trimEnd()}…` : a });
      }
      continue;
    }

    if (type === "text" || type === "texteditor") {
      const html =
        typeof content === "string" ? content : String((content as { html?: string })?.html ?? "");
      if (html) out.push(...pairsFromHtml(html));
    }
  }

  // Same question twice would be invalid FAQPage markup.
  const seen = new Set<string>();
  return out.filter((p) => {
    const key = p.q.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
