"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface OutgridButtonProps {
  href: string
  variant?: "primary" | "secondary"
  className?: string
  children: React.ReactNode
}

export function OutgridButton({ href, variant = "primary", className, children }: OutgridButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors",
        variant === "primary"
          ? "bg-[var(--purple-color)] text-white hover:bg-[var(--purple-color)]/90"
          : "bg-black text-white hover:bg-[var(--purple-color)]",
        className
      )}
    >
      {children}
    </Link>
  )
}