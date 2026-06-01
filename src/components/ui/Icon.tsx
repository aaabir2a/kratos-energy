import type { CSSProperties } from "react";

/**
 * Inline Lucide-style icon set (2px round stroke).
 * Kept as a self-contained component so the brand's exact glyphs
 * render without an icon dependency.
 */
const ICONS: Record<string, string> = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  building:
    '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"/>',
  zap: '<path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12z"/>',
  battery:
    '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M11 9l-2 3h3l-2 3"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 11-6 16-9 16z"/><path d="M11 20c0-5 2-9 7-11"/>',
  shield: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  star: '<path d="M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.4 3.2L7 14.2 2 9.4l7-.9z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  calculator:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h4"/>',
  mapPin:
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
  trend: '<path d="M3 17l6-6 4 4 7-7"/><path d="M17 8h4v4"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/>',
  wrench: '<path d="M14 7a4 4 0 0 0-5 5l-6 6 3 3 6-6a4 4 0 0 0 5-5l-3 3-3-3z"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
};

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 22,
  stroke = 2,
  fill = "none",
  className,
  style,
}: {
  name: IconName | string;
  size?: number;
  stroke?: number;
  fill?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? "" }}
    />
  );
}
