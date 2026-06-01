import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Kratos Energy wordmark (image asset).
 * `light` inverts it to white for dark backgrounds.
 * Size via `className` (e.g. "h-11 w-auto").
 */
export function Logo({
  className = "h-11 w-auto",
  light = false,
  priority = false,
}: {
  className?: string;
  light?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src="/assets/logo-kratos-energy-nav.png"
      alt="Kratos Energy"
      width={312}
      height={120}
      priority={priority}
      className={cn(className, light && "brightness-0 invert")}
    />
  );
}
