"use client";

import Image from "next/image";

/**
 * New Energy Tech Approved Seller badge.
 * Renders the brand logo and matching typography.
 */
export function NETBadge({ scale = 1 }: { scale?: number }) {
  return (
    <div
      className="flex items-center"
      style={{ gap: 10 * scale }}
      aria-label="New Energy Tech Approved Seller"
    >
      <div className="relative flex-none" style={{ width: 44 * scale, height: 44 * scale }}>
        <Image
          src="/new energy tech approvide seller.png"
          alt="New Energy Tech Approved Seller Logo"
          fill
          sizes="100px"
          className="object-contain"
          priority
        />
      </div>
      <div className="leading-[1.1]">
        <div
          className="font-display font-bold uppercase tracking-[0.05em] text-ash-500"
          style={{ fontSize: 8 * scale, marginBottom: 1 * scale }}
        >
          New Energy Tech
        </div>
        <div
          className="font-display font-extrabold leading-none tracking-[-0.01em] text-navy-800"
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
