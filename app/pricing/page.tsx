"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { OutgridButton } from "@/components/outgrid-button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "starter",
    name: "Starter",
    tag: "Built for personal privacy",
    badge: "Free forever",
    price: "$0",
    period: "/monthly",
    description: "Perfect for personal use and occasional privacy needs.",
    features: [
      "Unlimited temporary emails",
      "10 minute expiration",
      "Real-time inbox",
      "OTP auto-detection",
      "Basic privacy tools",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tag: "Ideal for power users who iterate often",
    badge: "Popular",
    price: "$9",
    period: "/monthly",
    description: "For power users who need more control and longer sessions.",
    features: [
      "Everything in Starter",
      "24 hour expiration",
      "Custom email domains",
      "API access",
      "Webhook integrations",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tag: "For teams with advanced requirements",
    badge: "Teams",
    price: "$29",
    period: "/monthly",
    description: "For teams and businesses with advanced privacy requirements.",
    features: [
      "Everything in Growth",
      "Unlimited expiration time",
      "Team collaboration",
      "Advanced analytics",
      "Custom branding",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
]

const faqs = [
  {
    q: "How does temporary email work?",
    a: "We generate a unique email address that you can use anywhere. Emails appear in your inbox in real-time and are deleted after expiration.",
  },
  {
    q: "Is my data stored anywhere?",
    a: "No long-term storage. Messages live in memory until expiration, then are permanently deleted.",
  },
  {
    q: "Can I use this for account verification?",
    a: "Yes—perfect for OTP codes and one-time passwords with auto-detection built in.",
  },
  {
    q: "What's the difference between plans?",
    a: "Free offers 10-minute expiration. Paid plans unlock longer sessions, custom domains, API access, and team features.",
  },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState("starter")
  const active = plans.find((p) => p.id === selectedPlan) || plans[0]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[160px] pb-[140px]">
        <div className="outgrid-container">
          <div className="mb-16 max-w-2xl">
            <span className="section-sub-wrap mb-6">
              <span className="section-sub-dot" />
              <span>Our Pricing</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Simple Pricing Plans
            </h1>
            <p className="mt-4 text-lg text-[var(--light-gray)]">
              Clear, upfront plans designed for privacy—no hidden fees.
            </p>
          </div>

          <PricingTabs selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-8 text-lg text-[var(--light-gray)] italic">{active.description}</p>
              <p className="mb-6 text-sm font-medium">What&apos;s Included</p>
              <ul className="flex flex-col gap-4">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--purple-color)]" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--stock-color)] bg-white p-8 lg:p-10">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-[var(--light-gray)]">{active.tag}</p>
                  <h2 className="text-2xl font-medium">{active.name}</h2>
                </div>
                <span className="rounded-full bg-[var(--primary-color)] px-3 py-1 text-xs font-medium">
                  {active.badge}
                </span>
              </div>
              <div className="mb-8 flex items-baseline gap-1 border-t border-[var(--stock-color)] pt-8">
                <span className="text-6xl font-semibold tracking-tight">{active.price}</span>
                <span className="text-[var(--light-gray)]">{active.period}</span>
              </div>
              <OutgridButton href="/inbox" className="w-full justify-center">
                Get Started
              </OutgridButton>
            </div>
          </div>

          <section className="mt-[140px]" id="faq">
            <h2 className="mb-12 text-4xl font-semibold tracking-tight">Questions & Answers</h2>
            <Accordion type="single" collapsible className="max-w-3xl">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`} className="border-[var(--stock-color)]">
                  <AccordionTrigger className="py-6 text-left text-lg font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[var(--light-gray)]">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function PricingTabs({
  selectedPlan,
  setSelectedPlan,
}: {
  selectedPlan: string
  setSelectedPlan: (id: string) => void
}) {
  return (
    <div className="mb-12 flex flex-wrap gap-2">
      {plans.map((plan) => (
        <button
          key={plan.id}
          type="button"
          onClick={() => setSelectedPlan(plan.id)}
          className={cn(
            "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
            selectedPlan === plan.id
              ? "bg-black text-white"
              : "bg-[var(--field-color)] text-[var(--light-gray)] hover:text-black"
          )}
        >
          {plan.name}
        </button>
      ))}
    </div>
  )
}
