declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Safely push custom events and payload data to Google Tag Manager dataLayer.
 * No-ops during Server-Side Rendering (SSR) or when window is undefined.
 */
export function pushDataLayer(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
