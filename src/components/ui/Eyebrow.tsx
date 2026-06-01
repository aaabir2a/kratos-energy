import { cn } from "@/lib/utils";

/** Uppercase tracking label that sits above section headings. */
export function Eyebrow({
  children,
  center = false,
  light = false,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-display text-[13px] font-bold uppercase tracking-[0.12em]",
        light ? "text-green-300" : "text-green-600",
        center && "text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
