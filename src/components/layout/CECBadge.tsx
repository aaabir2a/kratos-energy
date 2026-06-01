/**
 * Clean Energy Council "Accredited Installer" badge — original
 * recreation (sunburst ring + "C" mark + wordmark).
 */
export function CECBadge({ scale = 1 }: { scale?: number }) {
  const cx = 24;
  const cy = 24;
  const rays = Array.from({ length: 44 }, (_, i) => {
    const a = (i / 44) * Math.PI * 2;
    const r1 = 13.5;
    const r2 = 21;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * r1}
        y1={cy + Math.sin(a) * r1}
        x2={cx + Math.cos(a) * r2}
        y2={cy + Math.sin(a) * r2}
        stroke="#F39200"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.92}
      />
    );
  });

  return (
    <div
      className="flex items-center"
      style={{ gap: 11 * scale }}
      aria-label="Clean Energy Council Accredited Installer"
    >
      <svg
        width={48 * scale}
        height={48 * scale}
        viewBox="0 0 48 48"
        className="flex-none"
        aria-hidden="true"
      >
        {rays}
        <path
          d="M33 16.5 A11 11 0 1 0 33 31.5"
          fill="none"
          stroke="#F39200"
          strokeWidth={5.4}
          strokeLinecap="round"
        />
      </svg>
      <div className="leading-[1.05]">
        <div
          className="font-display font-bold uppercase tracking-[0.05em] text-ash-500"
          style={{ fontSize: 8 * scale, marginBottom: 2 * scale }}
        >
          Clean Energy Council
        </div>
        <div
          className="font-display font-extrabold leading-none tracking-[-0.01em] text-cec"
          style={{ fontSize: 14.5 * scale }}
        >
          ACCREDITED
          <br />
          INSTALLER
        </div>
      </div>
    </div>
  );
}
