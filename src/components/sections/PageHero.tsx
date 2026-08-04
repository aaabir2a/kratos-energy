import { Eyebrow } from "@/components/ui/Eyebrow";

/** Compact, consistent header band for inner/routed pages. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  media,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  /** Optional visual (logo, seal, badge) shown above the eyebrow. */
  media?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-ash-200 bg-paper py-14 sm:py-[72px]">
      <div className="container-ke max-w-[760px] text-center">
        {media && <div className="mb-6">{media}</div>}
        <Eyebrow center>{eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-[clamp(34px,4.4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-navy-800 [text-wrap:balance]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-[560px] font-body text-[18px] leading-relaxed text-ash-700">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
