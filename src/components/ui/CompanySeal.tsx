/**
 * Kratos Energy Pty Ltd company seal — vector recreation of the stamp that
 * appears on our signed legal documents. Double outer ring, arched company
 * name, "Australia" at the centre, decorative dots at the foot.
 */
export function CompanySeal({
  className = "",
  title = "Kratos Energy Pty Ltd — Australia company seal",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 300"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* Double outer ring */}
      <ellipse cx="130" cy="150" rx="118" ry="140" stroke="currentColor" strokeWidth="3.2" />
      <ellipse cx="130" cy="150" rx="111" ry="132" stroke="currentColor" strokeWidth="2" />

      {/* Inner ring */}
      <ellipse cx="130" cy="150" rx="76" ry="92" stroke="currentColor" strokeWidth="2" />

      {/* Arched company name */}
      <path id="seal-arc" d="M 46.9 207.5 A 96 115 0 1 1 213.1 207.5" />
      <text
        fill="currentColor"
        fontSize="17"
        fontWeight="600"
        letterSpacing="4.5"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        <textPath href="#seal-arc" startOffset="50%" textAnchor="middle">
          KRATOS ENERGY PTY LTD
        </textPath>
      </text>

      {/* Centre wordmark */}
      <text
        x="130"
        y="158"
        fill="currentColor"
        fontSize="27"
        fontWeight="700"
        letterSpacing="0.5"
        textAnchor="middle"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Australia
      </text>

      {/* Decorative dots at the foot of the seal */}
      {[
        [99.9, 248.7],
        [86, 240.9],
        [73.4, 230.4],
        [160.1, 248.7],
        [174, 240.9],
        [186.6, 230.4],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill="currentColor" />
      ))}
    </svg>
  );
}
