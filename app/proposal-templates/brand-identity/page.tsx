"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgePoundSterling,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Download,
  Gem,
  LineChart,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const investmentBreakdown = [
  [
    "Recommended brand package",
    "Premium Brand Identity System",
    "£5,500",
  ],
  [
    "Additional designed assets",
    "Included: business card, letterhead, email signature, 6 social templates, signage concept, website homepage mockup and embroidery-ready logo guidance",
    "Included",
  ],
  [
    "Website work",
    "Not included in this proposal. Full website design and development can be quoted separately.",
    "Separate quote",
  ],
  [
    "Total investment",
    "Worsthorne Dental Clinic brand identity project total",
    "£5,500",
  ],
];

const paymentOptions = [
  {
    title: "Standard Payment",
    detail:
      "50% deposit of £2,750 to begin. 50% balance of £2,750 before final file release or handover.",
  },
  {
    title: "Staged Payment",
    detail:
      "Available if the brand identity project is later combined with a full website build or wider digital work.",
  },
  {
    title: "Optional Add-ons",
    detail:
      "Extra assets, additional mockups, website pages or printed material designs can be added after the first proposal if required.",
  },
];

const investmentReasons = [
  "A strong brand helps Worsthorne Dental Clinic look established before a patient makes an enquiry.",
  "Consistent design improves trust across the website, social media, documents, signage and patient communication.",
  "Clear messaging helps patients understand the clinic’s approach, treatments and values before booking.",
  "Professional brand assets reduce the need to redesign every document, post or patient-facing item from scratch later.",
  "A proper identity system gives the clinic a stronger foundation for marketing, SEO and future growth.",
  "For a dental practice, weak branding can make the clinic look less professional, less modern or less trusted than it really is.",
];

const weakBrandCosts = [
  "Patients may judge the clinic before speaking to reception or booking an appointment.",
  "A dated or inconsistent identity can weaken trust before the patient has even visited.",
  "Marketing becomes slower when every document, social post or flyer needs to be designed from scratch.",
  "The website may look disconnected from social media, stationery, signage and clinic communication.",
  "The clinic may appear less premium or less credible than local competitors with stronger digital presentation.",
  "Future growth becomes harder when the brand has no clear structure, tone or visual system.",
];

const outcomes = [
  "A calmer and more professional dental brand position",
  "A consistent visual identity across digital and print",
  "Improved patient trust before enquiry",
  "Better website and social media direction",
  "Reusable brand assets for future clinic marketing",
  "A practical BrandBook for staff, designers and suppliers",
];

const summaryDeliverables = [
  "Premium dental brand direction",
  "Colour and typography system",
  "Patient-focused messaging direction",
  "Digital BrandBook",
  "Business card and stationery design",
  "Social media template direction",
  "Signage and uniform guidance",
  "Website homepage mockup direction",
];

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 print:break-inside-avoid"
    >
      <div className="mb-6">
        <p className="mb-3 inline-flex rounded-full border border-[#d8b66d]/30 bg-[#d8b66d]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b66d]">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[#101827] sm:text-4xl">
          {title}
        </h2>
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
      className={`rounded-[2rem] border border-slate-200 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${
        hasCustomBg ? "" : "bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-semibold text-[#101827] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e4c477] print:hidden"
    >
      <Download className="h-4 w-4" />
      Print / Save PDF
    </button>
  );
}

export default function WorsthorneDentalBrandInvestmentProposalPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#101827]">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @media print {
          body {
            background: white !important;
          }

          nav,
          button {
            display: none !important;
          }

          section {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#070b12] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28 print:bg-white print:text-[#101827]">
        <div className="absolute inset-0 opacity-90 print:hidden">
          <div className="absolute left-[-12%] top-[-22%] h-96 w-96 rounded-full bg-[#d8b66d]/25 blur-3xl" />
          <div className="absolute bottom-[-24%] right-[-12%] h-[32rem] w-[32rem] rounded-full bg-[#256d85]/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,182,109,0.20),transparent_35%),linear-gradient(135deg,rgba(16,24,39,0.96),rgba(7,11,18,1))]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b66d]">
              <Sparkles className="h-4 w-4" />
              Sitora Brand Investment Proposal
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Brand Identity Investment
              <span className="block bg-gradient-to-r from-[#d8b66d] via-[#fff7df] to-[#9fb7aa] bg-clip-text text-transparent">
                for Worsthorne Dental Clinic
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 print:text-slate-600">
              This proposal is not just a list of design tasks. It sets out the
              investment required to build a stronger, more credible and more
              consistent brand foundation for Worsthorne Dental Clinic.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrintButton />

  <a
    href="#investment"
    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 print:hidden"
  >
    View Investment
    <ArrowRight className="h-4 w-4" />
  </a>

<a
  href="/invoices/worsthorne-dental-brand-identity"
  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-semibold text-[#101827] transition hover:-translate-y-0.5 hover:bg-[#e4c477] print:hidden"
>
  View Invoice / Payment Request
  <ArrowRight className="h-4 w-4" />
</a>
</div>
          </motion.div>

          <Card className="bg-white text-[#101827]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
              Proposal Summary
            </p>
            <div className="mt-6 grid gap-4">
              {[
                ["Prepared by", "Sitora"],
                ["Prepared for", "Worsthorne Dental Clinic"],
                ["Date", "To be confirmed"],
                ["Recommended investment", "£5,500"],
                ["Deposit required", "£2,750"],
                ["Proposal valid until", "14 days from issue"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#f8f5ef] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#101827]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Section eyebrow="01 Investment Case" title="Why this brand investment matters.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[#101827] text-white">
            <TrendingUp className="mb-5 h-8 w-8 text-[#d8b66d]" />
            <h3 className="text-3xl font-semibold">
              Branding is not decoration. It is patient trust and business positioning.
            </h3>
            <p className="mt-5 leading-8 text-white/75">
              A serious dental brand helps patients understand who you are, why
              they should trust you and why your clinic is worth choosing. The
              goal is not simply to look nicer. The goal is to improve
              credibility, consistency, patient confidence and commercial
              perception.
            </p>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {investmentReasons.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#256d85]" />
                <p className="text-sm font-semibold leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="02 Cost of Weak Branding"
        title="Weak branding can quietly cost more than strong branding."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-semibold">
              What weak branding can cause
            </h3>
            <div className="mt-6 grid gap-3">
              {weakBrandCosts.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#f8f5ef] p-4 text-sm font-semibold text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#d8b66d]/15">
            <LineChart className="mb-5 h-8 w-8 text-[#256d85]" />
            <h3 className="text-2xl font-semibold">The commercial aim</h3>
            <p className="mt-4 leading-8 text-slate-700">
              The aim of this project is to give Worsthorne Dental Clinic a
              stronger foundation for attracting suitable patients, presenting
              itself more professionally and building trust faster across every
              touchpoint.
            </p>
            <p className="mt-4 leading-8 text-slate-700">
              This investment supports future marketing, website development,
              social media, printed materials, proposals, signage and patient
              communication.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="03 Project Direction"
        title="Recommended direction for Worsthorne Dental Clinic."
      >
        <Card>
          <p className="leading-8 text-slate-600">
            Based on our conversation and the needs of a modern dental practice,
            the recommended direction is to create a calm, professional and
            clinically credible brand identity system for Worsthorne Dental
            Clinic.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            The project should position the clinic as trusted, reassuring and
            modern, with a consistent identity across the website, patient
            documents, social media, email communication, signage, stationery
            and future marketing.
          </p>
        </Card>
      </Section>

      <Section
        eyebrow="04 Expected Outcomes"
        title="What this investment is designed to achieve."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item, index) => (
            <div
              key={item}
              className={`rounded-3xl border border-slate-200 p-5 text-sm font-semibold shadow-sm ${
                index % 3 === 0
                  ? "bg-white"
                  : index % 3 === 1
                    ? "bg-[#d8b66d]/15"
                    : "bg-[#256d85]/10"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="05 Scope Summary"
        title="A focused summary, not a repeated package list."
      >
        <Card>
          <p className="leading-8 text-slate-600">
            The full package details have already been discussed and confirmed
            separately. This proposal summarises the agreed scope and investment
            so the project can move forward clearly.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summaryDeliverables.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-[#f8f5ef] p-4 text-sm font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="06 Investment Summary" title="Recommended project investment.">
        <div id="investment" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[#101827] text-white">
                  <tr>
                    <th className="p-4 font-semibold">Item</th>
                    <th className="p-4 font-semibold">Scope</th>
                    <th className="p-4 text-right font-semibold">Investment</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentBreakdown.map(([item, scope, price], index) => (
                    <tr
                      key={item}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#f8f5ef]"}
                    >
                      <td className="p-4 font-semibold">{item}</td>
                      <td className="p-4 text-slate-600">{scope}</td>
                      <td className="p-4 text-right font-semibold">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="bg-[#101827] text-white">
            <BadgePoundSterling className="mb-5 h-8 w-8 text-[#d8b66d]" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
              Total Investment
            </p>
            <h3 className="mt-3 text-5xl font-semibold">£5,500</h3>
            <p className="mt-5 leading-8 text-white/70">
              This is the recommended investment to create a premium brand
              identity system for Worsthorne Dental Clinic, including brand
              direction, messaging, digital BrandBook guidance and agreed
              designed assets.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="07 Payment Structure"
        title="Clear payment terms before work begins."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {paymentOptions.map((item, index) => (
            <Card
              key={item.title}
              className={
                index === 0
                  ? "bg-[#d8b66d]/15"
                  : index === 1
                    ? "bg-white"
                    : "bg-[#256d85]/10"
              }
            >
              {index === 0 ? (
                <CreditCard className="mb-5 h-8 w-8 text-[#256d85]" />
              ) : index === 1 ? (
                <PiggyBank className="mb-5 h-8 w-8 text-[#256d85]" />
              ) : (
                <Gem className="mb-5 h-8 w-8 text-[#256d85]" />
              )}
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-slate-600">{item.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="08 What Is Not Included"
        title="Clear boundaries protect the project."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Full website build unless agreed",
            "Printing or signage manufacturing costs",
            "Paid advertising spend",
            "Third-party subscriptions",
            "Unlimited revisions",
            "Legal or regulatory compliance advice",
            "Additional assets not listed in the final scope",
            "Ongoing support unless agreed",
            "Supplier costs or stock photography purchases",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-sm font-semibold shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="09 Client Responsibilities"
        title="What we need to complete the work properly."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Business information and background",
            "Existing logo or brand files if available",
            "Current website and social media links",
            "Competitor examples or preferences",
            "Timely feedback and approvals",
            "Final review of business-specific details",
          ].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#256d85]" />
              <p className="text-sm font-semibold text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="10 Compliance Note"
        title="Brand guidance is not legal or regulatory advice."
      >
        <Card className="bg-[#101827] text-white">
          <div className="flex gap-4">
            <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#d8b66d]" />
            <p className="leading-8 text-white/75">
              Sitora’s branding, messaging and website direction provides
              design and communication guidance. It does not replace legal,
              clinical, GDC, CQC, financial, advertising or regulatory advice.
              Final content, claims, compliance details, complaints procedures,
              privacy information and business-specific details should be
              reviewed by the client and relevant professional advisers before
              publication.
            </p>
          </div>
        </Card>
      </Section>

      <Section eyebrow="11 Approval" title="Next steps to begin the project.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <h3 className="text-2xl font-semibold">To proceed</h3>
            <div className="mt-6 grid gap-3">
              {[
                "Confirm the investment total",
                "Confirm the agreed scope",
                "Approve the proposal",
                "Pay the deposit invoice",
                "Complete the discovery questionnaire",
                "Sitora begins the brand identity work",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#f8f5ef] p-4 text-sm font-semibold"
                >
                  Step {index + 1}: {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#101827] via-[#18344a] to-[#256d85] text-white">
            <ClipboardCheck className="mb-5 h-8 w-8 text-[#d8b66d]" />
            <h3 className="text-3xl font-semibold">Approval</h3>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-semibold text-[#d8b66d]">
                  Client approval
                </p>
                <p className="mt-4 text-white/70">
                  Name: ___________________________
                </p>
                <p className="mt-2 text-white/70">
                  Business: ________________________
                </p>
                <p className="mt-2 text-white/70">
                  Date: ____________________________
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-semibold text-[#d8b66d]">Sitora</p>
                <p className="mt-4 text-white/70">
                  Name: ___________________________
                </p>
                <p className="mt-2 text-white/70">
                  Date: ____________________________
                </p>
              </div>
             <div className="mt-6">
  <a
    href="/invoices/worsthorne-dental-brand-identity"
    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-semibold text-[#101827] transition hover:-translate-y-0.5 hover:bg-[#e4c477] print:hidden"
  >
    View Invoice / Payment Request
    <ArrowRight className="h-4 w-4" />
  </a>
</div> 
            </div>
          </Card>
        </div>
      </Section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 print:break-inside-avoid">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#101827] p-8 text-white lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
                Final Statement
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                This is an investment in credibility, consistency and future
                growth.
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-white/70">
                The purpose of this project is to give Worsthorne Dental Clinic
                a stronger brand foundation that can support better patient
                trust, clearer communication, stronger local positioning and a
                more professional customer experience.
              </p>
            </div>
            <PrintButton />
          </div>
        </div>
      </section>
    </main>
  );
}