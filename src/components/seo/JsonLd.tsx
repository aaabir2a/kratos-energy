import { jsonLdSafe } from "@/lib/seo/site";

/**
 * Renders a JSON-LD block. Always use this rather than hand-rolling
 * `dangerouslySetInnerHTML` — `jsonLdSafe` escapes "<", which stops a
 * CMS-supplied title containing "</script>" from breaking out of the tag.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdSafe(data) }}
    />
  );
}
