"use client";

import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "navy" | "gold" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-green-500 text-white shadow-green hover:bg-green-600",
  navy: "bg-navy-700 text-white hover:bg-navy-800",
  gold: "bg-gold-400 text-navy-900 shadow-gold hover:brightness-105",
  ghost:
    "bg-transparent text-forest-700 border-2 border-green-500 hover:bg-green-50",
  white: "bg-white text-forest-700 shadow-md hover:shadow-lg",
};

const SIZES: Record<Size, string> = {
  sm: "px-[18px] py-[10px] text-sm gap-2",
  md: "px-[26px] py-[14px] text-[15px] gap-2.5",
  lg: "px-[34px] py-[17px] text-[17px] gap-2.5",
};

const ICON_SIZE: Record<Size, number> = { sm: 16, md: 17, lg: 19 };

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "ke-press inline-flex items-center justify-center rounded-pill font-display font-bold",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
      {icon && <Icon name={icon} size={ICON_SIZE[size] + 2} stroke={2.4} />}
    </button>
  );
}
