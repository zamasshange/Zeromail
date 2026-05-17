"use client"

import Link from "next/link"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="outgrid-container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white">
              <Mail className="h-4 w-4 text-black" />
            </span>
            <span className="text-xl font-semibold">InboxZero</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            <Link href="/" className="text-sm text-white/60 hover:text-white">
              Home
            </Link>
            <Link href="/#about" className="text-sm text-white/60 hover:text-white">
              About
            </Link>
            <Link href="/#services" className="text-sm text-white/60 hover:text-white">
              Services
            </Link>
            <Link href="/pricing" className="text-sm text-white/60 hover:text-white">
              Pricing
            </Link>
            <Link href="/inbox" className="text-sm text-white/60 hover:text-white">
              Inbox
            </Link>
            <Link href="/tools" className="text-sm text-white/60 hover:text-white">
              Tools
            </Link>
          </nav>

          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} InboxZero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}