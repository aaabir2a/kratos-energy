"use client";

import Image from "next/image";

/**
 * New Energy Tech Approved Seller badge.
 * Renders the brand logo and matching typography.
 */
export function NETBadge({
  scale = 1,
  logoScale = scale,
  tone = "light",
}: {
  scale?: number;
  /**
   * Scales the roundel on its own. The roundel carries its own wordmark, so
   * it needs to run larger than the side text to stay readable.
   */
  logoScale?: number;
  /** "dark" flips the wordmark colours for placement on a dark background. */
  tone?: "light" | "dark";
}) {
  return (
    <div
      className="flex items-center"
      style={{ gap: 10 * scale }}
      aria-label="New Energy Tech Approved Seller"
    >
      <div
        className="relative flex-none"
        style={{ width: 44 * logoScale, height: 44 * logoScale }}
      >
        <Image
          src="/net-approved-seller.png"
          alt="New Energy Tech Approved Seller Logo"
          fill
          sizes="160px"
          className="object-contain"
          priority
        />
      </div>
      <div className="leading-[1.1]">
        <div
          className={`font-display font-bold uppercase tracking-[0.05em] ${
            tone === "dark" ? "text-white/60" : "text-ash-500"
          }`}
          style={{ fontSize: 8 * scale, marginBottom: 1 * scale }}
        >
          New Energy Tech
        </div>
        <div
          className={`font-display font-extrabold leading-none tracking-[-0.01em] ${
            tone === "dark" ? "text-white" : "text-navy-800"
          }`}
          style={{ fontSize: 13.5 * scale }}
        >
          APPROVED
          <br />
          SELLER
        </div>
      </div>
    </div>
  );
}
