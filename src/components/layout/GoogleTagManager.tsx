import Script from "next/script";

// Container ID. Overridable per environment so staging/preview builds can set
// NEXT_PUBLIC_GTM_ID="" to opt out entirely rather than polluting the live
// container. `??` (not `||`) so an explicit empty string wins over the default.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5RR9ZRTC";

/**
 * Google Tag Manager loader. Renders at the end of <body> via `afterInteractive`
 * — the strategy Next recommends for tag managers: it keeps GTM off the critical
 * path (this site's LCP is already the constraint) while still firing well before
 * any user interaction. Only use `beforeInteractive` if the container ever hosts
 * a consent-mode default that must run ahead of first paint.
 *
 * The bootstrap seeds `window.dataLayer`, so `dataLayer.push()` from anywhere in
 * the app is safe whether or not gtm.js has finished loading.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * No-JS fallback. GTM requires this iframe as the first thing inside <body>,
 * so it is a separate export from the loader above.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
