"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Mail, RefreshCw, Copy, Check, Clock, ArrowLeft, Paperclip, Trash2, MailOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EmailProvider, useEmail } from "@/components/email-context"
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

function EmailSidebar() {
  const { email, timeRemaining, expirationTime, setExpirationTime, generateNewEmail } = useEmail()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex h-full flex-col border-r border-border bg-card">
      <div className="p-5 border-b border-border">
        <div className="section-label mb-4">
          Your Email
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3 mb-4">
          <Mail className="h-4 w-4 shrink-0 text-primary" />
          <code className="flex-1 truncate font-mono text-xs">{email}</code>
          <button
            onClick={copyEmail}
            className="shrink-0 p-1.5 hover:bg-secondary rounded transition-colors"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-mono tabular-nums">{formatTime(timeRemaining)}</span>
          </div>
          <Select
            value={expirationTime.toString()}
            onValueChange={(v) => setExpirationTime(parseInt(v))}
          >
            <SelectTrigger className="h-8 w-[90px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 min</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="1440">24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-5">
        <Button onClick={generateNewEmail} variant="outline" className="w-full gap-2 rounded-full">
          <RefreshCw className="h-4 w-4" />
          New Email
        </Button>
      </div>

      <div className="mt-auto p-5 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">Need more tools?</p>
        <Button asChild variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/tools">
            Developer Tools
            <ArrowRight className="h-3 w-3 ml-auto" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function EmailList() {
  const { emails, selectedEmail, selectEmail } = useEmail()

  if (emails.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <Mail className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">Waiting for emails...</h3>
        <p className="max-w-sm text-sm text-muted-foreground mb-4">
          Your inbox is ready. Any emails sent to your temporary address will appear here instantly.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Listening for new emails
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <AnimatePresence mode="popLayout">
        {emails.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <button
              onClick={() => selectEmail(email)}
              className={cn(
                "w-full border-b border-border p-5 text-left transition-colors hover:bg-secondary/50",
                selectedEmail?.id === email.id && "bg-secondary",
                !email.read && "bg-primary/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    email.read ? "bg-secondary" : "bg-primary/10"
                  )}
                >
                  {email.read ? (
                    <MailOpen className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Mail className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className={cn("truncate", !email.read && "font-semibold")}>
                      {email.sender}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDistanceToNow(email.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className={cn("mb-1 truncate text-sm", !email.read && "font-medium")}>
                    {email.subject}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{email.preview}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function EmailViewer() {
  const { selectedEmail, selectEmail, deleteEmail } = useEmail()

  if (!selectedEmail) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <MailOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">Select an email</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Click on an email in your inbox to view its contents here.
        </p>
      </div>
    )
  }

  // Extract OTP from email body
  const otpMatch = selectedEmail.body.match(/\b(\d{4,8})\b/)
  const otp = otpMatch ? otpMatch[1] : null

  return (
    <motion.div
      key={selectedEmail.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-border p-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectEmail(null)}
          className="gap-2 lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="hidden lg:block">
          <span className="text-sm text-muted-foreground">
            {format(selectedEmail.timestamp, "PPpp")}
          </span>
        </div>
        <div className="flex items-center gap-2 lg:ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteEmail(selectedEmail.id)}
            className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-2xl font-semibold mb-6">{selectedEmail.subject}</h1>

          <div className="mb-8 flex items-center gap-4 pb-6 border-b border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <span className="text-lg font-semibold text-primary-foreground">
                {selectedEmail.sender.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium">{selectedEmail.sender}</p>
              <p className="text-sm text-muted-foreground">{selectedEmail.senderEmail}</p>
            </div>
          </div>

          {otp && (
            <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="section-label mb-2">
                    OTP Detected
                  </div>
                  <p className="font-mono text-4xl font-bold tracking-wider">{otp}</p>
                </div>
                <Button
                  size="lg"
                  className="gap-2 rounded-full"
                  onClick={() => navigator.clipboard.writeText(otp)}
                >
                  <Copy className="h-4 w-4" />
                  Copy Code
                </Button>
              </div>
            </div>
          )}

          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {selectedEmail.body}
          </div>

          {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm font-medium mb-4">
                Attachments ({selectedEmail.attachments.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedEmail.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/50"
                  >
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{attachment.name}</span>
                    <span className="text-xs text-muted-foreground">({attachment.size})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function InboxContent() {
  const { selectedEmail, email } = useEmail()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col lg:flex-row">
      {/* Sidebar - Hidden on mobile when email is selected */}
      <div className={cn(
        "w-full shrink-0 lg:w-72",
        selectedEmail && "hidden lg:block"
      )}>
        <EmailSidebar />
      </div>

      {/* Email List - Hidden on mobile when email is selected */}
      <div className={cn(
        "flex flex-1 flex-col border-r border-border bg-background lg:max-w-md",
        selectedEmail && "hidden lg:flex"
      )}>
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="section-label">
            Inbox
          </div>
        </div>
        <EmailList />
      </div>

      {/* Email Viewer - Full width on mobile when email is selected */}
      <div className={cn(
        "hidden flex-1 flex-col bg-card lg:flex",
        selectedEmail && "flex"
      )}>
        <EmailViewer />
      </div>

      {/* Mobile sticky bottom bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 border-t border-border bg-background p-4 lg:hidden",
        selectedEmail && "hidden"
      )}>
        <Button onClick={copyEmail} className="w-full gap-2 rounded-full">
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Email Address
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default function InboxPage() {
  return (
    <EmailProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 pt-20">
          <InboxContent />
        </main>
        <Footer />
      </div>
    </EmailProvider>
  )
}
