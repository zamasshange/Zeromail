"use client"

import { Check, Copy, Mail, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { OutgridButton } from "@/components/outgrid-button"

const fallbackEmail = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  const username = Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  const domains = ["inboxzero.io", "tempmail.dev", "quickmail.app"]
  return `${username}@${domains[Math.floor(Math.random() * domains.length)]}`
}

export function EmailGenerator({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") {
      return ""
    }
    return localStorage.getItem("inboxzero-temp-email") || ""
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!email) {
      void generateEmail()
    }
  }, [])

  useEffect(() => {
    if (!email) return
    localStorage.setItem("inboxzero-temp-email", email)
  }, [email])

  const generateEmail = async () => {
    try {
      const response = await fetch("/api/generate-email")
      if (!response.ok) {
        throw new Error("Failed to fetch temporary email")
      }

      const data = await response.json()
      if (data?.email) {
        setEmail(data.email)
        localStorage.setItem("inboxzero-temp-email", data.email)
        return
      }
    } catch (error) {
      console.warn("Failed to generate email from API, falling back to local generator.", error)
    }

    const emailAddress = fallbackEmail()
    setEmail(emailAddress)
    localStorage.setItem("inboxzero-temp-email", emailAddress)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={compact ? "flex w-full flex-col gap-3" : "flex w-full max-w-lg flex-col gap-4"}>
      <div className="flex items-center gap-3 rounded-lg border border-[var(--stock-color)] bg-[var(--field-color)] px-4 py-3.5">
        <Mail className="h-5 w-5 shrink-0 text-[var(--purple-color)]" />
        <code className="min-w-0 flex-1 truncate font-mono text-sm">{email || "Generating..."}</code>
        <button
          type="button"
          onClick={copyEmail}
          className="shrink-0 rounded-md p-2 transition-colors hover:bg-white"
          aria-label="Copy email"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[var(--purple-color)]" />
          ) : (
            <Copy className="h-4 w-4 text-[var(--light-gray)]" />
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={generateEmail}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--stock-color)] bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-[var(--field-color)]"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
        <OutgridButton href="/inbox" variant="secondary">Open Inbox</OutgridButton>
      </div>
    </div>
  )
}