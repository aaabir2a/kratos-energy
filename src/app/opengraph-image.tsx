import { ImageResponse } from "next/og";

/** Social share card. `next/og` ships inside Next — no extra dependency. */
export const alt = "Kratos Energy — solar for every Australian home";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(120deg, #0c3b28 0%, #124d34 55%, #1c6b45 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 56,
              background: "#6cae34",
              borderRadius: 999,
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#a8d98a",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 700,
              display: "flex",
            }}
          >
            100% Australian-Owned Solar
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            Kratos Energy
          </div>
          <div
            style={{
              color: "#d7ead0",
              fontSize: 38,
              lineHeight: 1.25,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Solar, batteries &amp; EV charging for homes in NSW, VIC &amp; ACT
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["25-Year Warranty", "CEC Approved", "kratos-energy.com"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                color: "#f0c86a",
                border: "2px solid rgba(240,200,106,0.45)",
                borderRadius: 999,
                padding: "10px 24px",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
