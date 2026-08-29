import Script from "next/script";

// Pixel ID. Overridable per environment so staging/preview builds can set
// NEXT_PUBLIC_META_PIXEL_ID="" to opt out rather than polluting live audiences
// with internal traffic. `??` (not `||`) so an explicit empty string wins.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1654900768199262";

/**
 * Meta Pixel loader. Same `afterInteractive` reasoning as the GTM tag: off the
 * critical path, but long before any user interaction.
 *
 * Deliberately a SERVER component — a `<Script>` rendered from a client
 * component is injected only after hydration, so it lands late and never shows
 * up in the served HTML. Kept server-side, the bootstrap is inlined into the
 * SSR output exactly like the GTM one.
 *
 * The base snippet fires the PageView for the initial load only. Client-side
 * navigations are handled by <MetaPixelRouteEvents />, which must also be
 * mounted — App Router route changes never re-run this script.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <Script id="meta-pixel-init" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
    </Script>
  );
}

/**
 * No-JS fallback. Meta requires this immediately inside <body>, so it is a
 * separate export from the loader above.
 */
export function MetaPixelNoScript() {
  if (!PIXEL_ID) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
