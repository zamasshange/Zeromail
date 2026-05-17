"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Globe, Mail, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { OutgridButton } from "@/components/outgrid-button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inbox", label: "Inbox" },
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50 py-[15px]">
      <div className="outgrid-container">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-black">
              <Mail className="h-4 w-4 text-white" />
            </span>
            <span className="text-xl font-semibold tracking-tight">InboxZero</span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-[var(--purple-color)]",
                  pathname === link.href || (link.href === "/" && pathname === "/")
                    ? "text-black"
                    : "text-[var(--light-gray)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-10 md:flex">
            <div className="flex items-center gap-10">
              <span className="flex items-center gap-2.5 text-base font-medium whitespace-nowrap">
                <Globe className="h-5 w-5" />
                Private
              </span>
              <span className="text-base font-medium">English</span>
            </div>
            <OutgridButton href="/inbox">Open Inbox</OutgridButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--stock-color)] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-[15px] left-[15px] mt-2 overflow-hidden rounded-xl border border-[var(--stock-color)] bg-white shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium hover:bg-[var(--field-color)]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-[var(--stock-color)] pt-4">
                <OutgridButton href="/inbox" className="w-full justify-center">
                  Open Inbox
                </OutgridButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
