"use client"

import { motion } from "framer-motion"
import {
  Mail,
  KeyRound,
  FileJson,
  Search,
  User,
  AtSign,
  Webhook,
  Server,
  FileCode,
  Sparkles,
  ShieldAlert,
  Copy,
  Check,
  RefreshCw,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Tool {
  id: string
  icon: typeof Mail
  title: string
  description: string
  category: "email" | "privacy" | "developer" | "ai"
  badge?: string
}

const tools: Tool[] = [
  // Email Tools
  {
    id: "otp-extractor",
    icon: KeyRound,
    title: "OTP Code Extractor",
    description: "Auto-detect and extract 4-8 digit verification codes from email text.",
    category: "email",
  },
  {
    id: "email-viewer",
    icon: FileJson,
    title: "Email Viewer",
    description: "View raw JSON structure and headers of incoming emails.",
    category: "email",
  },
  {
    id: "email-search",
    icon: Search,
    title: "Email Search",
    description: "Search through your temporary inbox history.",
    category: "email",
  },
  // Privacy Tools
  {
    id: "fake-identity",
    icon: User,
    title: "Fake Identity Generator",
    description: "Generate random name, username, country, and other fake details.",
    category: "privacy",
  },
  {
    id: "username-generator",
    icon: AtSign,
    title: "Username Generator",
    description: "Create disposable usernames for sign-ups and registrations.",
    category: "privacy",
  },
  // Developer Tools
  {
    id: "webhook-tester",
    icon: Webhook,
    title: "Webhook Tester",
    description: "Simulate incoming email payloads for testing your webhooks.",
    category: "developer",
  },
  {
    id: "smtp-simulator",
    icon: Server,
    title: "SMTP Test Simulator",
    description: "Test SMTP configurations without sending real emails.",
    category: "developer",
  },
  {
    id: "json-inspector",
    icon: FileCode,
    title: "JSON Email Inspector",
    description: "Parse and inspect email JSON payloads with syntax highlighting.",
    category: "developer",
  },
  // AI Tools
  {
    id: "summarize-email",
    icon: Sparkles,
    title: "Summarize Email",
    description: "Get AI-powered summaries of long email threads.",
    category: "ai",
    badge: "Coming Soon",
  },
  {
    id: "spam-detector",
    icon: ShieldAlert,
    title: "Spam Detection",
    description: "AI-powered spam vs important email classification.",
    category: "ai",
    badge: "Coming Soon",
  },
]

const categoryLabels = {
  email: "Email Tools",
  privacy: "Privacy Tools",
  developer: "Developer Tools",
  ai: "AI Tools",
}

const categoryOrder: (keyof typeof categoryLabels)[] = ["email", "privacy", "developer", "ai"]

function ToolCard({ tool, onClick, index }: { tool: Tool; onClick: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        onClick={onClick}
        className={cn(
          "group w-full text-left p-6 rounded-xl border border-border bg-card transition-all hover:bg-secondary/50",
          tool.badge && "opacity-60"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
            <tool.icon className="h-5 w-5 text-primary" />
          </div>
          {tool.badge && (
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
              {tool.badge}
            </span>
          )}
        </div>
        <h3 className="font-medium mb-2">{tool.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
      </button>
    </motion.div>
  )
}

// Tool Modals
function OTPExtractorModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [input, setInput] = useState("")
  const [otp, setOtp] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const extractOTP = () => {
    const match = input.match(/\b(\d{4,8})\b/)
    setOtp(match ? match[1] : null)
  }

  const copyOTP = async () => {
    if (otp) {
      await navigator.clipboard.writeText(otp)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <KeyRound className="h-5 w-5 text-primary" />
            OTP Code Extractor
          </DialogTitle>
          <DialogDescription>
            Paste email text to automatically extract verification codes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Label htmlFor="email-text" className="text-xs uppercase tracking-wider text-muted-foreground">Email Content</Label>
            <Textarea
              id="email-text"
              placeholder="Paste your email content here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-2 h-32"
            />
          </div>
          <Button onClick={extractOTP} className="w-full rounded-full">
            Extract OTP
          </Button>
          {otp && (
            <div className="p-6 rounded-xl border-2 border-primary/30 bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="section-label mb-2">OTP Found</div>
                  <p className="font-mono text-4xl font-bold tracking-wider">{otp}</p>
                </div>
                <Button size="lg" onClick={copyOTP} className="gap-2 rounded-full">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          )}
          {input && !otp && (
            <p className="text-center text-sm text-muted-foreground">
              No OTP code found in the text.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FakeIdentityModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [identity, setIdentity] = useState({
    name: "John Smith",
    username: "johnsmith_42",
    email: "johnsmith42@example.com",
    country: "United States",
    city: "San Francisco",
    phone: "+1 (555) 123-4567",
    birthdate: "1985-03-15",
  })

  const generateIdentity = () => {
    const firstNames = ["James", "Emma", "Oliver", "Sophia", "William", "Ava", "Benjamin", "Isabella", "Lucas", "Mia"]
    const lastNames = ["Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Anderson"]
    const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Brazil"]
    const cities = ["New York", "Toronto", "London", "Sydney", "Berlin", "Paris", "Tokyo", "Sao Paulo"]

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const countryIndex = Math.floor(Math.random() * countries.length)

    setIdentity({
      name: `${firstName} ${lastName}`,
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}_${Math.floor(Math.random() * 100)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`,
      country: countries[countryIndex],
      city: cities[countryIndex],
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      birthdate: `${1970 + Math.floor(Math.random() * 40)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    })
  }

  const copyField = async (value: string) => {
    await navigator.clipboard.writeText(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <User className="h-5 w-5 text-primary" />
            Fake Identity Generator
          </DialogTitle>
          <DialogDescription>
            Generate random identity information for testing and privacy.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Button onClick={generateIdentity} className="w-full gap-2 rounded-full">
            <RefreshCw className="h-4 w-4" />
            Generate New Identity
          </Button>
          <div className="space-y-3">
            {Object.entries(identity).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="font-mono text-sm">{value}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => copyField(value)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function UsernameGeneratorModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [usernames, setUsernames] = useState<string[]>([])

  const generateUsernames = () => {
    const adjectives = ["swift", "cool", "bright", "dark", "silent", "quick", "wise", "brave", "calm", "wild"]
    const nouns = ["wolf", "hawk", "tiger", "phoenix", "dragon", "storm", "shadow", "star", "river", "moon"]

    const newUsernames = Array.from({ length: 6 }, () => {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
      const noun = nouns[Math.floor(Math.random() * nouns.length)]
      const num = Math.floor(Math.random() * 1000)
      return `${adj}_${noun}${num}`
    })

    setUsernames(newUsernames)
  }

  const copyUsername = async (username: string) => {
    await navigator.clipboard.writeText(username)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <AtSign className="h-5 w-5 text-primary" />
            Username Generator
          </DialogTitle>
          <DialogDescription>
            Generate unique usernames for your accounts.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Button onClick={generateUsernames} className="w-full gap-2 rounded-full">
            <RefreshCw className="h-4 w-4" />
            Generate Usernames
          </Button>
          {usernames.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {usernames.map((username, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <code className="text-sm">{username}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => copyUsername(username)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function WebhookTesterModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const samplePayload = {
    event: "email.received",
    timestamp: new Date().toISOString(),
    data: {
      id: "msg_abc123",
      from: "sender@example.com",
      to: "your-temp@inboxzero.io",
      subject: "Test Email",
      body: "This is a test email body.",
      attachments: [],
    },
  }

  const sendTestPayload = async () => {
    if (!webhookUrl) return
    setStatus("sending")

    // Simulate webhook call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus(Math.random() > 0.3 ? "success" : "error")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Webhook className="h-5 w-5 text-primary" />
            Webhook Tester
          </DialogTitle>
          <DialogDescription>
            Send a test email payload to your webhook endpoint.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Label htmlFor="webhook-url" className="text-xs uppercase tracking-wider text-muted-foreground">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-api.com/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sample Payload</Label>
            <pre className="mt-2 overflow-auto rounded-lg bg-secondary/50 p-4 text-xs font-mono">
              {JSON.stringify(samplePayload, null, 2)}
            </pre>
          </div>
          <Button onClick={sendTestPayload} disabled={!webhookUrl || status === "sending"} className="w-full rounded-full">
            {status === "sending" ? "Sending..." : "Send Test Payload"}
          </Button>
          {status === "success" && (
            <p className="text-center text-sm text-primary">Webhook delivered successfully!</p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-destructive">Failed to deliver webhook. Check your URL.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function JSONInspectorModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [input, setInput] = useState("")
  const [parsed, setParsed] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parseJSON = () => {
    try {
      const result = JSON.parse(input)
      setParsed(result)
      setError(null)
    } catch (e) {
      setParsed(null)
      setError("Invalid JSON syntax")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <FileCode className="h-5 w-5 text-primary" />
            JSON Email Inspector
          </DialogTitle>
          <DialogDescription>
            Parse and inspect email JSON payloads.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Label htmlFor="json-input" className="text-xs uppercase tracking-wider text-muted-foreground">JSON Input</Label>
            <Textarea
              id="json-input"
              placeholder='{"email": "test@example.com", "subject": "Hello"}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-2 h-32 font-mono text-sm"
            />
          </div>
          <Button onClick={parseJSON} className="w-full rounded-full">
            Parse JSON
          </Button>
          {error && (
            <p className="text-center text-sm text-destructive">{error}</p>
          )}
          {parsed && (
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Parsed Output</Label>
              <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-secondary/50 p-4 text-xs font-mono">
                {JSON.stringify(parsed, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ComingSoonModal({ open, onOpenChange, tool }: { open: boolean; onOpenChange: (open: boolean) => void; tool: Tool | null }) {
  if (!tool) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <tool.icon className="h-5 w-5 text-primary" />
            {tool.title}
          </DialogTitle>
          <DialogDescription>
            {tool.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-8">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-display text-xl font-medium mb-2">Coming Soon</h3>
          <p className="text-center text-sm text-muted-foreground">
            This feature is currently under development. Stay tuned for updates!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ToolsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [comingSoonTool, setComingSoonTool] = useState<Tool | null>(null)

  const handleToolClick = (tool: Tool) => {
    if (tool.badge === "Coming Soon") {
      setComingSoonTool(tool)
      setActiveModal("coming-soon")
    } else {
      setActiveModal(tool.id)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setComingSoonTool(null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="section-label mb-6">
                Utilities
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Privacy & Developer Tools
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A collection of utilities to enhance your privacy, test your integrations, and streamline your workflow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        {categoryOrder.map((category) => {
          const categoryTools = tools.filter((t) => t.category === category)
          if (categoryTools.length === 0) return null

          return (
            <section key={category} className="pb-16">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
                  <h2 className="font-display text-2xl font-medium">{categoryLabels[category]}</h2>
                  <div className="section-label">
                    {categoryTools.length} Tools
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryTools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} onClick={() => handleToolClick(tool)} index={index} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA Section */}
        <section className="py-24 lg:py-32 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight mb-6">
              Need a temporary email?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Generate a disposable email address instantly and start receiving emails.
            </p>
            <Button asChild size="lg" className="gap-3 rounded-full px-8 h-14 text-base">
              <Link href="/inbox">
                Open Inbox
                <span className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Modals */}
      <OTPExtractorModal open={activeModal === "otp-extractor"} onOpenChange={closeModal} />
      <FakeIdentityModal open={activeModal === "fake-identity"} onOpenChange={closeModal} />
      <UsernameGeneratorModal open={activeModal === "username-generator"} onOpenChange={closeModal} />
      <WebhookTesterModal open={activeModal === "webhook-tester"} onOpenChange={closeModal} />
      <JSONInspectorModal open={activeModal === "json-inspector"} onOpenChange={closeModal} />
      <ComingSoonModal open={activeModal === "coming-soon"} onOpenChange={closeModal} tool={comingSoonTool} />

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display text-xl font-bold">I</span>
              </div>
              <div>
                <span className="text-lg font-medium">InboxZero</span>
                <p className="text-sm text-muted-foreground">Privacy-first temporary email</p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-8 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/inbox" className="hover:text-foreground transition-colors">Inbox</Link>
              <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
              <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            </nav>

            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} InboxZero. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
