

"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Crown,
  Download,
  Gem,
  Laptop,
  Layers3,
  MessageCircle,
  Palette,
  PenTool,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const packages = [
  {
    name: "Starter Brand Kit",
    price: "From £950",
    description:
      "For small businesses that need a professional starting identity with essential brand direction and a small set of designed assets.",
    icon: Target,
    badge: "Starter",
    featured: false,
    includes: [
      "Brand discovery questionnaire",
      "Basic brand positioning",
      "Colour palette direction",
      "Typography direction",
      "Logo direction/advice",
      "Basic messaging guidance",
      "Website style direction",
      "Mini BrandBook page/PDF",
      "1 business card design",
      "1 email signature design",
      "1 social profile image",
      "Basic logo export guidance",
    ],
    notIncluded: [
      "Full website build",
      "Full logo suite unless quoted",
      "Large social template pack",
      "Print/production costs",
    ],
  },
  {
    name: "Professional Brand Identity",
    price: "From £2,500",
    description:
      "The main Sitora branding package for businesses that want a serious, consistent and credible identity system with practical designed assets.",
    icon: BookOpen,
    badge: "Most Popular",
    featured: true,
    includes: [
      "Brand strategy session",
      "Competitor positioning",
      "Customer persona profile",
      "Logo direction or logo refinement",
      "Colour system",
      "Typography system",
      "Brand messaging kit",
      "Service messaging direction",
      "Website direction",
      "Social media direction",
      "Stationery direction",
      "SEO foundation",
      "Full digital Sitora BrandBook",
      "Business card design",
      "Letterhead design",
      "Email signature design",
      "3 social media templates",
      "Google Business profile image direction",
      "Basic launch announcement graphic",
    ],
    notIncluded: [
      "Full website build",
      "Full coded website pages",
      "Large print runs or supplier costs",
      "Unlimited revisions",
    ],
  },
  {
    name: "Premium Brand Identity System",
    price: "From £5,500",
    description:
      "For established businesses that want a complete identity system, stronger strategy, premium BrandBook and a wider set of designed assets.",
    icon: Crown,
    badge: "Premium",
    featured: false,
    includes: [
      "Everything in Professional",
      "Deeper brand strategy",
      "Full logo suite direction",
      "Detailed messaging kit",
      "Website copy starter kit",
      "Google Business Profile kit",
      "Launch kit",
      "Email templates",
      "Compliance/trust checklist",
      "Detailed digital BrandBook",
      "Business card design",
      "Letterhead design",
      "Appointment/referral card design",
      "Email signature design",
      "6 social media templates",
      "Brochure or leaflet concept",
      "Signage concept",
      "Uniform or embroidery-ready logo guidance",
      "Website homepage mockup",
    ],
    notIncluded: [
      "Full coded website unless added",
      "Large print runs or supplier costs",
      "Third-party subscriptions",
      "Unlimited revisions",
    ],
  },
  {
    name: "Full Brand + Website",
    price: "From £9,500",
    description:
      "For businesses that need a complete brand identity, designed asset pack and a custom website built together from the start.",
    icon: Laptop,
    badge: "Complete Presence",
    featured: false,
    includes: [
      "Everything in Premium",
      "Brand strategy",
      "Full BrandBook",
      "Logo/identity direction",
      "Designed brand asset pack",
      "Website strategy",
      "Website copy direction",
      "Custom website design",
      "Responsive website development",
      "SEO structure",
      "Service pages",
      "Contact/lead forms",
      "Compliance pages where relevant",
      "Website homepage and inner page design",
      "Launch support",
      "Basic analytics setup guidance",
    ],
    notIncluded: [
      "Ongoing hosting/support unless agreed",
      "Paid advertising spend",
      "Large print runs or supplier costs",
      "Third-party subscriptions",
    ],
  },
];

const optionalAssets = [
  ["Extra business card variation", "£75–£150"],
  ["Extra email signature variation", "£75–£150"],
  ["Appointment card design", "£100–£200"],
  ["Letterhead design", "£100–£200"],
  ["Extra social media template set", "£250–£750"],
  ["Brochure / leaflet design", "£300–£1,000"],
  ["Clinic signage concept", "£300–£1,500"],
  ["Extra website page mockup", "£500–£1,500"],
  ["Full logo suite", "£750–£2,000"],
  ["Online/PDF BrandBook", "£750–£2,500"],
  ["Embroidery-ready logo", "£100–£250"],
  ["Uniform mockup", "£100–£300"],
];

const process = [
  {
    title: "Initial Teams Meeting",
    text: "We use the Sitora BrandBook example as a guide to understand what the business needs, what assets matter now and what can wait.",
    icon: MessageCircle,
  },
  {
    title: "Tailored Proposal",
    text: "After the meeting, Sitora confirms the recommended package, included assets, optional extras, timeline and final price.",
    icon: ClipboardCheck,
  },
  {
    title: "Figma Design Work",
    text: "Approved assets such as logos, brand boards, social templates, stationery, signage or website mockups are designed in Figma.",
    icon: PenTool,
  },
  {
    title: "Final Handover",
    text: "Final files are exported and supplied according to the agreed scope, such as SVG, PNG, PDF, JPG or print-ready PDFs.",
    icon: Download,
  },
];

function Section({
  eyebrow,
  title,
  text,
  icon: Icon,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  icon: ElementType;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20 ${
        dark ? "text-white" : ""
      }`}
    >
      <div className="mb-10 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/30 bg-[#d8b66d]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b66d]">
          <Icon className="h-4 w-4" />
          {eyebrow}
        </div>
        <h2
          className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? "text-white" : "text-[#101827]"
          }`}
        >
          {title}
        </h2>
        {text && (
          <p
            className={`mt-4 text-base leading-8 sm:text-lg ${
              dark ? "text-white/70" : "text-slate-600"
            }`}
          >
            {text}
          </p>
        )}
      </div>
      {children}
    </motion.section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const hasCustomBg = className.includes("bg-");

  return (
    <div
      className={`rounded-[2rem] border border-slate-200/70 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ${
        hasCustomBg ? "" : "bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function BrandIdentityPricingPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#101827]">
      <section className="relative overflow-hidden bg-[#070b12] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="absolute inset-0 opacity-90">
          <div className="absolute left-[-12%] top-[-20%] h-96 w-96 rounded-full bg-[#d8b66d]/25 blur-3xl" />
          <div className="absolute bottom-[-24%] right-[-12%] h-[32rem] w-[32rem] rounded-full bg-[#256d85]/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,182,109,0.20),transparent_35%),linear-gradient(135deg,rgba(16,24,39,0.95),rgba(7,11,18,1))]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b66d]">
              <Sparkles className="h-4 w-4" />
              Sitora Brand Identity Packages
            </div>

            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Branding That Makes Your Business Look
              <span className="block bg-gradient-to-r from-[#d8b66d] via-[#fff7df] to-[#9fb7aa] bg-clip-text text-transparent">
                Established, Trusted and Ready to Grow.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-xl">
              We do not just design logos. We build complete brand identity
              systems with strategy, messaging, visual direction and practical
              designed assets that help businesses look credible and consistent.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-semibold text-[#101827] shadow-lg shadow-[#d8b66d]/20 transition hover:-translate-y-0.5 hover:bg-[#e2c478]"
              >
                Book a Brand Discovery Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/brandbook/worsthorne-dental-clinic"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                View Example BrandBook
                <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="rounded-[1.5rem] bg-white p-6 text-[#101827]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                BrandBook first. Designed assets included by package.
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                We use the BrandBook as a guided framework in the first Teams
                meeting. Each package includes a defined level of brand assets,
                with additional designs available if the client needs more.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "BrandBook = strategy, direction and standards",
                  "Figma = designed assets, mockups and exports",
                  "Website = separate unless included in package",
                  "Proposal confirms exact deliverables",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-[#f8f5ef] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#256d85]" />
                    <p className="text-sm font-semibold text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        eyebrow="Important Clarity"
        title="Branding packages do not automatically include a full website."
        text="Branding includes the identity, direction, messaging, BrandBook and agreed designed assets. A full website build is quoted separately unless the client chooses the Full Brand + Website Package."
        icon={ShieldCheck}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <Palette className="mb-5 h-7 w-7 text-[#256d85]" />
            <h3 className="text-2xl font-semibold">Branding Package</h3>
            <p className="mt-4 leading-7 text-slate-600">
              Includes identity direction, colours, typography, messaging,
              BrandBook, website visual direction and the agreed design assets
              listed in the selected package.
            </p>
          </Card>

          <Card className="bg-[#101827] text-white">
            <Laptop className="mb-5 h-7 w-7 text-[#d8b66d]" />
            <h3 className="text-2xl font-semibold">Website Package</h3>
            <p className="mt-4 leading-7 text-white/70">
              Includes actual website design, development, pages, forms, SEO
              setup, mobile responsiveness and launch support.
            </p>
          </Card>

          <Card className="bg-[#d8b66d]/15">
            <Layers3 className="mb-5 h-7 w-7 text-[#256d85]" />
            <h3 className="text-2xl font-semibold">Brand + Website</h3>
            <p className="mt-4 leading-7 text-slate-600">
              Combines brand identity, BrandBook, designed asset pack and a full
              custom website for clients who want everything built together.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Packages"
        title="Choose the level of branding support your business needs."
        text="Each package includes a defined set of design assets. Final pricing depends on scope, number of assets, complexity and whether website work is included."
        icon={Gem}
      >
        <div className="grid gap-6 lg:grid-cols-4">
          {packages.map((item) => (
            <Card
              key={item.name}
              className={`relative ${
                item.featured
                  ? "border-[#d8b66d]/60 bg-[#101827] text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]"
                  : "bg-white"
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div
                  className={`rounded-2xl p-3 ${
                    item.featured ? "bg-white/10" : "bg-[#f8f5ef]"
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 ${
                      item.featured ? "text-[#d8b66d]" : "text-[#256d85]"
                    }`}
                  />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.featured
                      ? "bg-[#d8b66d] text-[#101827]"
                      : "bg-[#d8b66d]/15 text-[#101827]"
                  }`}
                >
                  {item.badge}
                </span>
              </div>

              <h3
                className={`text-2xl font-semibold ${
                  item.featured ? "text-white" : "text-[#101827]"
                }`}
              >
                {item.name}
              </h3>

              <p
                className={`mt-3 text-3xl font-semibold ${
                  item.featured ? "text-[#d8b66d]" : "text-[#256d85]"
                }`}
              >
                {item.price}
              </p>

              <p
                className={`mt-4 min-h-24 leading-7 ${
                  item.featured ? "text-white/70" : "text-slate-600"
                }`}
              >
                {item.description}
              </p>

              <div className="mt-6 border-t border-slate-200/20 pt-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b66d]">
                  Includes
                </p>

                <div className="grid gap-3">
                  {item.includes.map((point) => (
                    <div key={point} className="flex gap-3">
                      <CheckCircle2
                        className={`mt-0.5 h-5 w-5 shrink-0 ${
                          item.featured ? "text-[#d8b66d]" : "text-[#256d85]"
                        }`}
                      />
                      <p
                        className={`text-sm leading-6 ${
                          item.featured ? "text-white/75" : "text-slate-600"
                        }`}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-black/5 p-4">
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                    item.featured ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  Not automatically included
                </p>

                <div className="mt-3 grid gap-2">
                  {item.notIncluded.map((point) => (
                    <p
                      key={point}
                      className={`text-xs leading-5 ${
                        item.featured ? "text-white/60" : "text-slate-500"
                      }`}
                    >
                      • {point}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <section className="bg-[#101827]">
        <Section
          dark
          eyebrow="Optional Extras"
          title="Additional assets can be added if the client needs more."
          text="Each package includes a defined set of design assets. Additional items, extra template variations, print-ready artwork, signage concepts, embroidery-ready files and website mockups can be added depending on the client’s needs."
          icon={BriefcaseBusiness}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {optionalAssets.map(([asset, price], index) => (
              <div
                key={asset}
                className={`rounded-3xl border border-white/10 p-5 ${
                  index % 3 === 0
                    ? "bg-white/10"
                    : index % 3 === 1
                      ? "bg-[#d8b66d]/15"
                      : "bg-[#256d85]/20"
                }`}
              >
                <p className="text-sm font-semibold text-white">{asset}</p>
                <p className="mt-3 text-lg font-semibold text-[#d8b66d]">
                  {price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
              Important Note
            </p>
            <p className="mt-4 max-w-4xl leading-8 text-white/75">
              Mockups, embroidery-ready artwork, extra stationery files, signage
              concepts, extra social media templates and production-ready
              artwork are not unlimited. They are included only where stated in
              the package or quoted separately according to the client’s needs.
            </p>
          </div>
        </Section>
      </section>

      <Section
        eyebrow="Meeting Process"
        title="We use the BrandBook as a guide in the first Teams meeting."
        text="This lets the client see what Sitora can offer, choose what they need and avoid paying for assets that are not required yet."
        icon={Users}
      >
        <div className="grid gap-6 lg:grid-cols-4">
          {process.map((item, index) => (
            <Card
              key={item.title}
              className={
                index === 1
                  ? "bg-[#d8b66d]/15"
                  : index === 2
                    ? "bg-[#101827] text-white"
                    : "bg-white"
              }
            >
              <item.icon
                className={`mb-5 h-7 w-7 ${
                  index === 2 ? "text-[#d8b66d]" : "text-[#256d85]"
                }`}
              />
              <h3
                className={`text-2xl font-semibold ${
                  index === 2 ? "text-white" : "text-[#101827]"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-4 leading-7 ${
                  index === 2 ? "text-white/70" : "text-slate-600"
                }`}
              >
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Figma Production"
        title="The BrandBook explains the system. Figma creates the final assets."
        text="After the client agrees to a package, Sitora designs the approved brand assets in Figma and exports the final files according to the agreed scope."
        icon={PenTool}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-semibold">
              What we can create in Figma
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Logo presentation boards",
                "Brand guideline pages",
                "Social templates",
                "Business cards",
                "Appointment cards",
                "Letterheads",
                "Email signature mockups",
                "Website homepage mockups",
                "Brochure layouts",
                "Clinic signage mockups",
                "Uniform mockups",
                "PDF BrandBook exports",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#f8f5ef] p-4 text-sm font-semibold text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#101827] text-white">
            <h3 className="text-2xl font-semibold">Final file types</h3>
            <div className="mt-6 grid gap-3">
              {[
                "Logo: SVG, PNG and PDF",
                "Social posts: PNG/JPG",
                "Business cards: print-ready PDF",
                "Letterhead: PDF",
                "Brand guidelines: PDF",
                "Website mockups: PNG/PDF",
                "Signage concepts: PDF/PNG",
                "Embroidery/signage: clean vector artwork where possible",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Compliance Note"
        title="Brand guidance does not replace legal or clinical compliance advice."
        text="This is especially important for dental, healthcare, finance, legal and other regulated businesses."
        icon={ShieldCheck}
      >
        <div className="rounded-[2rem] bg-[#101827] p-6 text-white lg:p-8">
          <p className="max-w-4xl leading-8 text-white/75">
            Sitora’s branding, messaging and website direction provides design
            and communication guidance. It does not replace legal, clinical,
            GDC, CQC, financial, advertising or regulatory advice. Final website
            content, clinical claims, compliance details, complaints procedures,
            privacy information and business-specific details should be reviewed
            by the client and relevant professional advisers before publication.
          </p>
        </div>
      </Section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-br from-[#101827] via-[#18344a] to-[#256d85] p-8 text-white lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
                Ready to discuss your brand?
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with a BrandBook-led consultation and leave with a clear
                direction.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-white/70">
                We will review your business, explain the package options and
                recommend the right level of branding, website direction and
                designed assets.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-semibold text-[#101827] transition hover:-translate-y-0.5 hover:bg-[#e2c478]"
              >
                Book a Discovery Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/brandbook/worsthorne-dental-clinic"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                View BrandBook Example
                <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}