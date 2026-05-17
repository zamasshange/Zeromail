"use client"

import { Footer } from "@/components/footer"
import { EmailGenerator } from "@/components/email-generator"
import { Header } from "@/components/header"
import { OutgridButton } from "@/components/outgrid-button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Check,
  Globe,
  KeyRound,
  Mail,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react"
import Link from "next/link"

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop",
    label: "Open Inbox",
    href: "/inbox",
  },
  {
    src: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop",
    label: "Privacy Tools",
    href: "/tools",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    label: "View Pricing",
    href: "/pricing",
  },
]

const works = [
  { name: "TEMP MAIL", year: "2024", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop", href: "/inbox" },
  { name: "OTP PICKUP", year: "2025", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop", href: "/tools" },
  { name: "FAKE ID", year: "2024", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop", href: "/tools" },
  { name: "WEBHOOKS", year: "2025", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop", href: "/tools" },
  { name: "INBOX LIVE", year: "2024", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", href: "/inbox" },
  { name: "API ACCESS", year: "2025", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop", href: "/pricing" },
  { name: "NO TRACK", year: "2025", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop", href: "/" },
  { name: "AUTO DELETE", year: "2024", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop", href: "/inbox" },
  { name: "ZERO DATA", year: "2025", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop", href: "/" },
]

const benefits = [
  {
    title: "Instant Addresses",
    description: "Generate disposable emails in milliseconds with one click—no sign-up required.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
  },
  {
    title: "Built for Speed",
    description: "Real-time inbox updates and OTP detection keep verification flows moving fast.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
  },
  {
    title: "Made for Privacy",
    description: "Every address is temporary by design—your real inbox stays off spam lists.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop",
  },
  {
    title: "Flexible Expiry",
    description: "Choose 10 minutes to 24 hours, then let messages auto-delete on schedule.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
  },
  {
    title: "Control with InboxZero",
    description: "Track, copy, and manage temporary addresses from one clean dashboard.",
    icon: Mail,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
  },
  {
    title: "Unlimited Aliases",
    description: "Spin up as many addresses as you need—free tier included, no caps on creation.",
    icon: KeyRound,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
  },
]

const leadItems = [
  {
    num: "(1)",
    title: "Sign up without exposing your real email",
    description: "Use a disposable address for trials, newsletters, and one-time verifications.",
  },
  {
    num: "(2)",
    title: "Built for developers, ready for teams",
    description: "API access, webhooks, and longer sessions on paid plans as you scale.",
  },
  {
    num: "(3)",
    title: "Your end-to-end privacy toolkit",
    description: "From temp mail to OTP extraction and fake identities—all in one place.",
  },
  {
    num: "(4)",
    title: "Fast delivery, aligned to your flow",
    description: "Messages land in your inbox in real time—no polling, no friction.",
  },
]

const services = [
  {
    title: "Email & Inbox Tools",
    bg: "bg-[#edfff8]",
    icon: Mail,
    items: [
      "Temporary email generation",
      "Real-time inbox",
      "OTP auto-detection",
      "Email search & viewer",
      "Custom expiration",
      "Copy & refresh aliases",
    ],
  },
  {
    title: "Privacy & Identity",
    bg: "bg-[#fff5fd]",
    icon: Shield,
    items: [
      "Fake identity generator",
      "Username generator",
      "Zero data collection",
      "No tracking pixels",
      "Auto-delete messages",
      "Spam shield for real inbox",
    ],
  },
  {
    title: "Developer Utilities",
    bg: "bg-[#fffce9]",
    icon: KeyRound,
    items: [
      "Webhook tester",
      "API access (Growth+)",
      "JSON email viewer",
      "Request inspection",
      "Team collaboration (Scale)",
      "Custom domains (Growth+)",
    ],
  },
]

const pricingPlans = [
  {
    name: "Starter",
    tag: "Built for personal privacy",
    badge: "Free forever",
    price: "$0",
    period: "/monthly",
    features: [
      "Unlimited temporary emails",
      "10 minute expiration",
      "Real-time inbox",
      "OTP auto-detection",
      "Basic privacy tools",
    ],
    href: "/inbox",
  },
  {
    name: "Growth",
    tag: "Ideal for power users who iterate often",
    badge: "Popular",
    price: "$9",
    period: "/monthly",
    features: [
      "Everything in Starter",
      "24 hour expiration",
      "Custom email domains",
      "API access",
      "Webhook integrations",
      "Priority support",
    ],
    href: "/pricing",
  },
]

const articles = [
  {
    title: "Why disposable email beats plus-addressing",
    read: "6 min read",
    date: "May 10, 2026",
    excerpt: "Separate aliases per service keep your real address off breach lists.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
  },
  {
    title: "How OTP extraction saves signup time",
    read: "8 min read",
    date: "May 8, 2026",
    excerpt: "Auto-detect verification codes so you copy once and move on.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
  },
  {
    title: "Temporary email for developers",
    read: "5 min read",
    date: "May 5, 2026",
    excerpt: "Test flows, webhooks, and staging signups without cluttering Gmail.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
  },
  {
    title: "Building a zero-data inbox policy",
    read: "7 min read",
    date: "May 1, 2026",
    excerpt: "What we delete, when we delete it, and why we never profile users.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop",
  },
]

const testimonials = [
  { stat: "10M+ emails generated", quote: "InboxZero kept my real address off every trial signup this month.", name: "Alex Rivera", role: "Product Designer" },
  { stat: "Zero data collected", quote: "Finally a temp mail service that doesn't feel sketchy or ad-heavy.", name: "Jordan Lee", role: "Indie Developer" },
  { stat: "OTP in seconds", quote: "Verification codes show up instantly—I stopped checking my main inbox.", name: "Sam Chen", role: "QA Engineer" },
  { stat: "Teams on Growth", quote: "Custom domains and API access made staging signups painless.", name: "Morgan Blake", role: "Startup Founder" },
  { stat: "24/7 availability", quote: "Reliable when I need throwaway addresses for client demos.", name: "Taylor Brooks", role: "Consultant" },
  { stat: "Free tier rocks", quote: "Unlimited aliases with no credit card—exactly what I needed.", name: "Casey Kim", role: "Student" },
]

const faqs = [
  {
    q: "How long does a temporary address last?",
    a: "Free addresses expire after 10 minutes by default. Growth and Scale plans let you extend to 24 hours or longer.",
  },
  {
    q: "What tools do you offer?",
    a: "Temporary email, live inbox, OTP extraction, fake identity generator, username generator, webhook tester, and more on the Tools page.",
  },
  {
    q: "Do you work for personal and business use?",
    a: "Yes—individuals use InboxZero for signups and spam protection; teams use paid plans for API access and collaboration.",
  },
  {
    q: "Is my data stored anywhere?",
    a: "No long-term storage. Messages live in memory until expiration, then are permanently deleted. We don't track users.",
  },
  {
    q: "How do I get started?",
    a: "Generate an address on the homepage or open Inbox—no account required. Upgrade anytime from Pricing.",
  },
]

const leadWords = ["PRIVACY", "PROTECT", "INBOX", "SAFE"]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-[160px] pb-[80px]">
          <div className="outgrid-container">
            <div className="mx-auto max-w-[1000px]">
              <div className="mb-8 inline-flex items-center gap-[15px]">
                <span className="text-[#ffb800] text-lg tracking-wider">★★★★★</span>
                <span className="text-lg">4.7 (10k+ Reviews)</span>
              </div>

              <h1 className="max-w-[850px] text-[clamp(2.75rem,8vw,6.25rem)] font-semibold leading-[1] tracking-[-0.05em]">
                Protect Inboxes That Actually Stay Clean
              </h1>

              <div className="mt-[60px] grid grid-cols-1 gap-4 sm:grid-cols-3">
                {heroImages.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative flex h-[304px] overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute bottom-0 left-0 bg-white px-6 py-4 text-sm font-medium">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-10 max-w-[640px] text-lg text-[var(--light-gray)] leading-relaxed">
                We build disposable email and privacy tools with thoughtful design and zero data collection—crafted to
                feel fast, anonymous, and human.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <OutgridButton href="/tools" variant="secondary">
                  All Tools
                </OutgridButton>
              </div>

              <div className="mt-12">
                <EmailGenerator />
              </div>
            </div>
          </div>
        </section>

        {/* Selected works / tools */}
        <section className="bg-white py-[140px]">
          <WorksSection />
        </section>

        {/* Benefits */}
        <section className="bg-black py-[120px] text-white">
          <BenefitsSection />
        </section>

        {/* Services */}
        <section id="services" className="overflow-hidden bg-white pb-[140px]">
          <ServicesSection services={services} />
        </section>

        {/* Pricing */}
        <section className="bg-white pb-[140px]">
          <PricingSection plans={pricingPlans} />
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white py-[140px]">
          <FaqSection faqs={faqs} />
        </section>

        {/* Testimonials */}
        <section className="overflow-hidden bg-[var(--field-color)] py-20">
          <TestimonialsSection testimonials={testimonials} />
        </section>

        {/* Who we are */}
        <section id="about" className="bg-[var(--field-color)] py-20">
          <AboutSection />
        </section>

        {/* CTA */}
        <section
          className="relative bg-black py-[170px] text-white bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1600&h=900&fit=crop")',
          }}
        >
          <CtaSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}

function AboutSection() {
  return (
    <div className="outgrid-container">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="section-sub-wrap mb-6">
            <span className="section-sub-dot" />
            <span>Who we are</span>
          </span>
          <h2 className="font-accent text-4xl sm:text-5xl italic leading-tight">
            A privacy-first temporary email service.
          </h2>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&h=500&fit=crop"
            alt="Privacy workspace"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-4 py-2 text-sm font-medium backdrop-blur"
          >
            Play video
          </button>
        </div>
      </div>
    </div>
  )
}

function WorksSection() {
  return (
    <div className="outgrid-container">
      <div className="mb-16 text-center">
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase tracking-[-0.06em]">
          selected tools (2024–2026)
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <Link key={work.name} href={work.href} className="group">
            <WorkCard work={work} />
          </Link>
        ))}
      </div>
    </div>
  )
}

function WorkCard({ work }: { work: (typeof works)[0] }) {
  return (
    <>
      <WorkCardHeader work={work} />
      <WorkCardImage work={work} />
    </>
  )
}

function WorkCardHeader({ work }: { work: (typeof works)[0] }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-2xl font-normal tracking-tight group-hover:text-[var(--purple-color)] transition-colors">
        {work.name}
      </h3>
      <span className="text-[var(--light-gray)]">{work.year}</span>
    </div>
  )
}

function WorkCardImage({ work }: { work: (typeof works)[0] }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
      <img
        src={work.image}
        alt={work.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4 text-white" />
      </span>
    </div>
  )
}

function BenefitsSection() {
  return (
    <div className="outgrid-container">
      <div className="mx-auto max-w-[915px] text-center">
        <span className="section-sub-wrap light mb-6">
          <span className="section-sub-dot" />
          <span className="text-white">Membership Benefits</span>
        </span>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Private Fast Focused</h2>
        <p className="mt-4 text-white/60">
          Once you try us, you&apos;ll never go back to sharing your real email—seriously.
        </p>
      </div>
      <div className="mx-auto mt-16 flex max-w-[915px] flex-col gap-5">
        {benefits.map((benefit, i) => (
          <BenefitCard key={benefit.title} benefit={benefit} index={i} />
        ))}
      </div>
    </div>
  )
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[0]
  index: number
}) {
  const Icon = benefit.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="sticky top-[140px] flex flex-col items-center justify-between gap-8 rounded-2xl border border-[#3c3b3c] bg-[#19191a] p-8 md:flex-row md:p-14"
    >
      <div className="max-w-[386px]">
        <div className="mb-4 flex items-center gap-4">
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white/10">
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <h3 className="text-2xl font-medium">{benefit.title}</h3>
        </div>
        <p className="text-white/60">{benefit.description}</p>
      </div>
      <img
        src={benefit.image}
        alt=""
        className="max-h-[180px] w-auto rounded-lg object-cover"
      />
    </motion.div>
  )
}

function LeadSection({
  words,
  items,
}: {
  words: string[]
  items: typeof leadItems
}) {
  return (
    <>
      <div className="flex h-[50vh] items-center justify-center bg-black">
        <LeadMarquee words={words} />
      </div>
      <LeadCards items={items} />
    </>
  )
}

function LeadMarquee({ words }: { words: string[] }) {
  const doubled = [...words, ...words, ...words, ...words]
  return (
    <LeadMarqueeTrack words={doubled} />
  )
}

function LeadMarqueeTrack({ words }: { words: string[] }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="marquee-track gap-8">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mx-4 text-[clamp(3rem,10vw,7.5rem)] font-bold uppercase tracking-[-0.04em] text-white"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}

function LeadCards({ items }: { items: typeof leadItems }) {
  return (
    <div className="bg-white py-20">
      <div className="outgrid-container">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.num}
              className="rounded-xl bg-[var(--field-color)] p-10"
            >
              <span className="mb-8 flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-white shadow-md text-sm font-medium">
                {item.num.replace(/[()]/g, "")}
              </span>
              <h3 className="mb-2 text-2xl font-medium">{item.title}</h3>
              <p className="max-w-[435px] text-black/55">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServicesSection({ services }: { services: typeof services }) {
  return (
  <div className="outgrid-container">
    <div className="mb-8 overflow-hidden">
      <h2 className="whitespace-nowrap text-[clamp(4rem,18vw,25rem)] font-bold uppercase leading-none tracking-[-0.05em] text-black/10">
        Our Service
      </h2>
    </div>
    <div className="relative -mt-32 grid gap-4 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.title} service={service} />
      ))}
    </div>
  </div>
  )
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const Icon = service.icon
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-6 rounded-xl p-8 ${service.bg}`}
    >
      <Icon className="h-10 w-10" />
      <h3 className="max-w-[335px] text-[42px] leading-[1.1] font-normal tracking-tight">
        {service.title}
      </h3>
      <ul className="flex flex-col gap-5">
        {service.items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-base font-medium text-black">
            <Check className="h-4 w-4 shrink-0 text-[var(--purple-color)]" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function PricingSection({ plans }: { plans: typeof pricingPlans }) {
  return (
    <div className="outgrid-container">
      <div className="mb-16 max-w-2xl">
        <span className="section-sub-wrap mb-6">
          <span className="section-sub-dot" />
          <span>Our Pricing</span>
        </span>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Simple Pricing Plans</h2>
        <p className="mt-4 text-lg text-[var(--light-gray)]">
          Clear, upfront plans designed for privacy—no hidden fees.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col rounded-xl bg-[var(--field-color)] p-8 lg:col-span-1">
          <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg bg-white">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-medium">Quick start</h3>
          <p className="mt-2 mb-6 text-[var(--light-gray)]">
            Generate your first address in seconds—no sign-up required.
          </p>
          <OutgridButton href="/inbox" variant="secondary">
            Open Inbox
          </OutgridButton>
        </div>

        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col rounded-xl border border-[var(--stock-color)] bg-white p-8"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-[var(--light-gray)]">{plan.tag}</p>
                <h3 className="text-2xl font-medium">{plan.name}</h3>
              </div>
              <span className="rounded-full bg-[var(--primary-color)] px-3 py-1 text-xs font-medium">
                {plan.badge}
              </span>
            </div>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
              <span className="text-[var(--light-gray)]">{plan.period}</span>
            </div>
            <p className="mb-6 text-sm font-medium">What&apos;s Included</p>
            <ul className="mb-8 flex flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--purple-color)]" />
                  {f}
                </li>
              ))}
            </ul>
            <OutgridButton href={plan.href} className="mt-auto">
              Get Started
            </OutgridButton>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArticlesSection({ articles }: { articles: typeof articles }) {
  return (
    <div className="outgrid-container">
      <div className="mb-16 max-w-2xl">
        <span className="section-sub-wrap mb-6">
          <span className="section-sub-dot" />
          <span>Our Articles</span>
        </span>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Latest insights on privacy & email
        </h2>
        <p className="mt-4 text-lg text-[var(--light-gray)]">
          Tips on disposable email, OTP flows, and keeping your real inbox clean.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <article key={article.title} className="group flex flex-col gap-4">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={article.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex gap-2 text-sm text-[var(--light-gray)]">
              <span>{article.read}</span>
              <span>|</span>
              <span>{article.date}</span>
            </div>
            <h3 className="text-xl font-medium leading-snug group-hover:text-[var(--purple-color)] transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-[var(--light-gray)]">{article.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function TestimonialsSection({
  testimonials,
}: {
  testimonials: typeof testimonials
}) {
  const doubled = [...testimonials, ...testimonials]
  return (
    <TestimonialsInner doubled={doubled} />
  )
}

function TestimonialsInner({
  doubled,
}: {
  doubled: typeof testimonials
}) {
  return (
    <>
      <div className="outgrid-container mb-10">
        <h2 className="text-4xl font-semibold tracking-tight">Testimonial</h2>
      </div>
      <div className="overflow-hidden">
        <div className="testimonial-marquee">
          {doubled.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[320px] shrink-0 rounded-xl bg-white p-6 shadow-sm"
            >
              <p className="mb-4 text-sm font-medium text-[var(--purple-color)]">{t.stat}</p>
              <p className="mb-6 text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-[var(--light-gray)]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function FaqSection({ faqs }: { faqs: typeof faqs }) {
  return (
    <div className="outgrid-container">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Questions & Answers</h2>
          <p className="mt-4 text-[var(--light-gray)]">
            InboxZero is a privacy-first service for disposable email and developer tools.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`} className="border-[var(--stock-color)]">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--light-gray)] pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

function CtaSection() {
  return (
    <div className="outgrid-container text-center">
      <p className="mb-4 text-white/70">InboxZero is a privacy service built for everyone</p>
      <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
        Ready to protect your inbox with us?
      </h2>
      <div className="mt-10 flex justify-center">
        <OutgridButton href="/inbox" variant="secondary">
          Open Inbox
        </OutgridButton>
      </div>
    </div>
  )
}