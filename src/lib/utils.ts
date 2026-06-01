/**
 * Join class names, dropping falsey values.
 * A tiny dependency-free alternative to `clsx`.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Smooth-scroll to a section by id, offset for the sticky header.
 * No-ops during SSR.
 */
export function scrollToId(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top, behavior: "smooth" });
}
