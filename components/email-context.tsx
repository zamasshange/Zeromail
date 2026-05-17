"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from "react"

interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  body: string
  timestamp: Date
  read: boolean
  attachments?: { name: string; size: string }[]
}

interface ApiEmail {
  id: string
  to: string
  from: string
  subject: string
  body: string
  createdAt: string
}

interface EmailContextType {
  email: string
  emails: Email[]
  selectedEmail: Email | null
  expirationTime: number
  timeRemaining: number
  generateNewEmail: () => void
  setExpirationTime: (minutes: number) => void
  selectEmail: (email: Email | null) => void
  markAsRead: (id: string) => void
  deleteEmail: (id: string) => void
}

const EmailContext = createContext<EmailContextType | undefined>(undefined)
const STORAGE_KEY = "inboxzero-temp-email"

const parseSender = (from: string) => {
  const match = from.match(/^(.*?)<([^>]+)>$/)
  if (match) {
    return {
      sender: match[1].trim() || match[2].trim(),
      senderEmail: match[2].trim(),
    }
  }
  return {
    sender: from,
    senderEmail: from,
  }
}

const buildPreview = (body: string) => {
  return body
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80)
}

const normalizeApiEmail = (apiEmail: ApiEmail): Email => {
  const parsed = parseSender(apiEmail.from)
  return {
    id: apiEmail.id,
    sender: parsed.sender,
    senderEmail: parsed.senderEmail,
    subject: apiEmail.subject,
    preview: buildPreview(apiEmail.body),
    body: apiEmail.body,
    timestamp: new Date(apiEmail.createdAt),
    read: false,
    attachments: [],
  }
}

const sampleEmailPayloads = [
  {
    from: "GitHub <noreply@github.com>",
    subject: "Your verification code",
    body: `Hello,

Your verification code is 847291. Please enter this code to complete your sign-in.

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

Thanks,
The GitHub Team`,
  },
  {
    from: "Vercel <notifications@vercel.com>",
    subject: "Deployment successful",
    body: `Your deployment to production was successful!

Project: my-awesome-app
Branch: main
Commit: feat: add new features
URL: https://my-awesome-app.vercel.app

View deployment details in your dashboard.

Best,
Vercel`,
  },
]

const generateFallbackEmail = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  const username = Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  const domains = ["inboxzero.io", "tempmail.dev", "quickmail.app"]
  return `${username}@${domains[Math.floor(Math.random() * domains.length)]}`
}

const getStoredEmail = () => {
  if (typeof window === "undefined") {
    return ""
  }
  return localStorage.getItem(STORAGE_KEY) || ""
}

export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string>(() => getStoredEmail())
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [expirationTime, setExpirationTimeState] = useState(10)
  const [timeRemaining, setTimeRemaining] = useState(10 * 60)
  const pollingRef = useRef<number | null>(null)

  const sendSampleEmail = async (payload: { from: string; subject: string; body: string }) => {
    if (!email) return
    await fetch("/api/receive-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        from: payload.from,
        subject: payload.subject,
        body: payload.body,
      }),
    })
  }

  const fetchGeneratedEmail = useCallback(async () => {
    try {
      const response = await fetch("/api/generate-email")
      if (!response.ok) {
        throw new Error("Failed to fetch generated email")
      }

      const data = await response.json()
      if (data?.email) {
        setEmail(data.email)
        setEmails([])
        setSelectedEmail(null)
        setTimeRemaining(expirationTime * 60)
        return
      }
    } catch (error) {
      console.warn("Failed to fetch generated email from API", error)
    }

    const fallback = generateFallbackEmail()
    setEmail(fallback)
    setEmails([])
    setSelectedEmail(null)
    setTimeRemaining(expirationTime * 60)
  }, [expirationTime])

  const generateNewEmail = useCallback(() => {
    void fetchGeneratedEmail()
  }, [fetchGeneratedEmail])

  const setExpirationTime = useCallback((minutes: number) => {
    setExpirationTimeState(minutes)
    setTimeRemaining(minutes * 60)
  }, [])

  const selectEmail = useCallback((email: Email | null) => {
    setSelectedEmail(email)
    if (email) {
      setEmails(prev => prev.map(e => (e.id === email.id ? { ...e, read: true } : e)))
    }
  }, [])

  const markAsRead = useCallback((id: string) => {
    setEmails(prev => prev.map(e => (e.id === id ? { ...e, read: true } : e)))
  }, [])

  const deleteEmail = useCallback(
    (id: string) => {
      setEmails(prev => prev.filter(e => e.id !== id))
      if (selectedEmail?.id === id) {
        setSelectedEmail(null)
      }
    },
    [selectedEmail]
  )

  useEffect(() => {
    if (!email) {
      void fetchGeneratedEmail()
      return
    }

    localStorage.setItem(STORAGE_KEY, email)
  }, [email, fetchGeneratedEmail])

  useEffect(() => {
    if (!email) return
    let active = true

    const fetchInbox = async () => {
      try {
        const response = await fetch(`/api/inbox?email=${encodeURIComponent(email)}`)
        if (!response.ok) return

        const data = (await response.json()) as ApiEmail[]
        if (!active) return

        setEmails(prev => {
          const readMap = new Map(prev.map(emailItem => [emailItem.id, emailItem.read]))
          return data
            .map(normalizeApiEmail)
            .map(emailItem => ({ ...emailItem, read: readMap.get(emailItem.id) ?? emailItem.read }))
        })
      } catch (error) {
        console.warn("Failed to fetch inbox emails", error)
      }
    }

    void fetchInbox()
    pollingRef.current = window.setInterval(fetchInbox, 3000)

    return () => {
      active = false
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
      }
    }
  }, [email])

  useEffect(() => {
    if (!email) return

    const timeouts: number[] = []
    timeouts.push(
      window.setTimeout(() => {
        void sendSampleEmail(sampleEmailPayloads[0])
      }, 1200)
    )
    timeouts.push(
      window.setTimeout(() => {
        void sendSampleEmail(sampleEmailPayloads[1])
      }, 3200)
    )

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [email])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          void fetchGeneratedEmail()
          return expirationTime * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [expirationTime, fetchGeneratedEmail])

  return (
    <EmailContext.Provider
      value={{
        email,
        emails,
        selectedEmail,
        expirationTime,
        timeRemaining,
        generateNewEmail,
        setExpirationTime,
        selectEmail,
        markAsRead,
        deleteEmail,
      }}
    >
      {children}
    </EmailContext.Provider>
  )
}

export function useEmail() {
  const context = useContext(EmailContext)
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider")
  }
  return context
}
