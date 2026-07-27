import type { ReactNode } from "react";

/** Kratos social profiles. Single source used by the PromoBar and Footer. */
type Social = { label: string; href: string; icon: ReactNode };

const FacebookIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-full w-full">
    <path d="M13.5 22v-8h2.7l.4-3.11h-3.1V8.9c0-.9.25-1.51 1.54-1.51h1.65V4.61c-.29-.04-1.27-.12-2.42-.12-2.39 0-4.03 1.46-4.03 4.14v2.31H7.53V14h2.71v8h3.26z" />
  </svg>
);

const InstagramIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-full w-full">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.36 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12-.66-.66-1.33-1.08-2.12-1.38-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
    <path d="M12 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8z" />
    <circle cx="18.41" cy="5.59" r="1.44" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-full w-full">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.98h4V21H3zM10 8.98h3.83v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z" />
  </svg>
);

export const SOCIALS: Social[] = [
  { label: "Facebook", href: "https://www.facebook.com/kratos.sustainability", icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/kratosenergy", icon: InstagramIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cec-accredited-solar-energy-company-kratos-energy/",
    icon: LinkedInIcon,
  },
];

/**
 * Row of social links. `variant` picks styling for the surface it sits on:
 * "bar" (slim promo strip) or "footer" (chip buttons).
 */
export function Socials({
  variant = "footer",
  className = "",
}: {
  variant?: "bar" | "footer";
  className?: string;
}) {
  const link =
    variant === "bar"
      ? "flex h-[18px] w-[18px] items-center justify-center text-[#eaf3e6]/80 transition-colors hover:text-gold-400"
      : "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 p-2 text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-green-500 hover:ring-green-500";

  return (
    <div className={`flex items-center ${variant === "bar" ? "gap-3" : "gap-2.5"} ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Kratos Energy on ${s.label}`}
          className={link}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
