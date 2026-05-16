"use client";

import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  Globe2,
  HeartPulse,
  Image,
  Layout,
  Mail,
  Megaphone,
  Palette,
  PenTool,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Type,
  Users,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const colours = [
  {
    name: "Clinical White",
    hex: "#F8FAF9",
    rgb: "248, 250, 249",
    cmyk: "1, 0, 0, 2",
    use: "Clean backgrounds, patient-facing pages and calm section areas.",
  },
  {
    name: "Warm Ivory",
    hex: "#F5F1EA",
    rgb: "245, 241, 234",
    cmyk: "0, 2, 4, 4",
    use: "Premium warmth, printed materials and soft page blocks.",
  },
  {
    name: "Dental Navy",
    hex: "#172A3A",
    rgb: "23, 42, 58",
    cmyk: "60, 28, 0, 77",
    use: "Primary headings, hero areas, footer, authority and trust sections.",
  },
  {
    name: "Calm Sage",
    hex: "#A9BFB3",
    rgb: "169, 191, 179",
    cmyk: "12, 0, 6, 25",
    use: "Healthcare accents, soft cards and reassuring details.",
  },
  {
    name: "Soft Teal",
    hex: "#5F9EA0",
    rgb: "95, 158, 160",
    cmyk: "41, 1, 0, 37",
    use: "Buttons, icons, highlights and modern dental accents.",
  },
  {
    name: "Warm Gold",
    hex: "#C8A96A",
    rgb: "200, 169, 106",
    cmyk: "0, 16, 47, 22",
    use: "Premium detail, badges, dividers and subtle luxury markers.",
  },
  {
    name: "Charcoal Text",
    hex: "#1F2933",
    rgb: "31, 41, 51",
    cmyk: "39, 20, 0, 80",
    use: "Body text, formal communication and document copy.",
  },
  {
    name: "Muted Grey",
    hex: "#7A858A",
    rgb: "122, 133, 138",
    cmyk: "12, 4, 0, 46",
    use: "Captions, supporting copy and secondary information.",
  },
];

const brandValues = [
  {
    title: "Calm",
    text: "Soft visual language that reduces patient anxiety before booking.",
  },
  {
    title: "Professional",
    text: "A polished identity suitable for clinical care and private dentistry.",
  },
  {
    title: "Clean",
    text: "Clear spacing, soft whites and simple layouts that feel hygienic.",
  },
  {
    title: "Trustworthy",
    text: "Authority-led messaging that avoids exaggeration and builds confidence.",
  },
  {
    title: "Modern",
    text: "Contemporary design without feeling cold, corporate or intimidating.",
  },
  {
    title: "Family-friendly",
    text: "Warm enough for parents, children and nervous patients.",
  },
  {
    title: "Clinically credible",
    text: "Structured, responsible and suitable for a UK dental practice.",
  },
  {
    title: "Reassuring",
    text: "Focused on clarity, comfort and patient understanding.",
  },
];

const audience = [
  "Families looking for dependable local dental care",
  "Nervous patients who need reassurance before visiting",
  "Adults considering cosmetic dental treatment",
  "Professionals who value clear communication and efficient booking",
  "Parents looking for children’s dental support",
  "Patients wanting transparent private dental options",
];

const persona = [
  {
    label: "Profile",
    text: "A local adult or parent who wants a trustworthy dental clinic with clear explanations and a calm experience.",
  },
  {
    label: "Needs",
    text: "Easy booking, clear treatment options, gentle communication, transparent fees and a clinic that feels clean and credible.",
  },
  {
    label: "Fears",
    text: "Pain, judgement, hidden costs, rushed appointments, unclear treatment plans and feeling ignored.",
  },
  {
    label: "Buying triggers",
    text: "Visible reviews, professional website, friendly team photos, clear fees, reassurance for nervous patients and simple contact options.",
  },
  {
    label: "Objections",
    text: "Will it be expensive? Will the dentist explain things properly? Will I feel comfortable? Can I trust the advice?",
  },
  {
    label: "Reassurance",
    text: "Use calm language, patient guidance, treatment explainers, transparent pricing and responsible trust signals.",
  },
];

const competitorPoints = [
  {
    title: "Where competitors often look weak",
    items: [
      "Dated websites",
      "Generic tooth logos",
      "Unclear pricing",
      "Weak patient reassurance",
      "Poor mobile experience",
    ],
  },
  {
    title: "Where Worsthorne can stand out",
    items: [
      "Premium calm identity",
      "Clear booking journey",
      "Helpful treatment pages",
      "Compliance-led trust",
      "Warm local positioning",
    ],
  },
  {
    title: "Market position",
    items: [
      "Modern over traditional",
      "Trusted over sales-heavy",
      "Premium but approachable",
      "Family-focused",
      "Clinically responsible",
    ],
  },
];

const messaging = [
  {
    label: "Main Headline",
    text: "Calm, Modern Dental Care for the Whole Family",
  },
  {
    label: "Supporting Headline",
    text: "Professional dental treatment in a welcoming clinic where patients feel listened to, reassured and cared for.",
  },
  {
    label: "Short Business Description",
    text: "Worsthorne Dental Clinic provides modern family, general and cosmetic dental care in a calm and professional environment.",
  },
  {
    label: "Long Business Description",
    text: "Worsthorne Dental Clinic is a trusted local dental practice offering high-quality care for families, professionals and patients who want clear advice, gentle treatment and a more reassuring dental experience.",
  },
  {
    label: "Brand Promise",
    text: "Clear options, gentle care and reliable guidance for patients who want to feel confident about their oral health.",
  },
  {
    label: "Tagline Direction",
    text: "Dentistry with Care, Clarity and Confidence.",
  },
];

const services = [
  {
    name: "Routine Dental Exams",
    concern: "I want to keep my teeth healthy but I do not know when to book.",
    benefit: "Regular checks help spot concerns early and keep patients informed.",
    cta: "Book a Dental Exam",
    keyword: "Dental check-up Worsthorne",
  },
  {
    name: "Hygiene Appointments",
    concern: "My gums bleed or my teeth do not feel as clean as they should.",
    benefit: "Professional hygiene care supports gum health and fresher confidence.",
    cta: "Book a Hygiene Visit",
    keyword: "Dental hygienist Burnley",
  },
  {
    name: "Family Dentistry",
    concern: "I need a clinic that can care for the whole family.",
    benefit: "Friendly, reliable care for adults, parents and children.",
    cta: "Register Your Family",
    keyword: "Family dentist Burnley",
  },
  {
    name: "Children’s Dentistry",
    concern: "I want my child to feel comfortable at the dentist.",
    benefit: "Gentle visits help children build positive dental habits early.",
    cta: "Book a Child Appointment",
    keyword: "Children’s dentist Burnley",
  },
  {
    name: "Emergency Appointments",
    concern: "I have dental pain and need help quickly.",
    benefit: "Clear guidance and urgent appointment support where available.",
    cta: "Request Emergency Help",
    keyword: "Emergency dentist Burnley",
  },
  {
    name: "Teeth Whitening",
    concern: "I want whiter teeth but do not want unsafe online products.",
    benefit: "A brighter smile with guidance from a qualified dental team.",
    cta: "Book a Whitening Consultation",
    keyword: "Teeth whitening Burnley",
  },
  {
    name: "Dental Implants",
    concern: "I have missing teeth and want to understand my options.",
    benefit: "Clear implant guidance for patients considering long-term tooth replacement.",
    cta: "Discuss Implant Options",
    keyword: "Dental implants Burnley",
  },
  {
    name: "Smilecare Plan",
    concern: "I want predictable dental care without unexpected confusion.",
    benefit: "Ongoing routine care with clear plan information and patient support.",
    cta: "View Smilecare Plan",
    keyword: "Dental plan Burnley",
  },
];

const socialThemes = [
  "Dental tips",
  "Treatment explainers",
  "Meet the team",
  "Patient reassurance",
  "Children’s dental care",
  "Smilecare Plan posts",
  "Clinic updates",
  "FAQs",
  "Review highlights",
  "Oral health awareness days",
];

const stationery = [
  "Business card",
  "Appointment card",
  "Referral card",
  "Letterhead",
  "Treatment plan document",
  "Invoice / receipt template",
  "Email signature",
  "Patient information sheet",
  "Aftercare instruction sheet",
  "PDF treatment guide cover",
  "Smilecare Plan leaflet",
  "Presentation cover",
];

const seoKeywords = [
  "Dentist Worsthorne",
  "Dental clinic Worsthorne",
  "Dentist Burnley",
  "Private dentist Burnley",
  "Family dentist Burnley",
  "Dental hygienist Burnley",
  "Teeth whitening Burnley",
  "Emergency dentist Burnley",
  "Dental implants Burnley",
  "Cosmetic dentist Burnley",
];

const pageTitles = [
  "Dentist in Worsthorne | Worsthorne Dental Clinic",
  "Family Dentist in Burnley | Worsthorne Dental Clinic",
  "Teeth Whitening in Burnley | Worsthorne Dental Clinic",
  "Emergency Dentist in Burnley | Worsthorne Dental Clinic",
  "Dental Hygienist in Burnley | Worsthorne Dental Clinic",
];

const compliance = [
  "GDC compliance page",
  "Complaints procedure",
  "Privacy policy",
  "Cookie policy",
  "Accessibility statement",
  "Terms of use",
  "Patient information",
  "Clinician names and GDC numbers",
  "Clear treatment information",
  "Clear pricing guidance",
  "Responsible clinical claims",
  "No misleading guarantees",
];

const emailTemplates = [
  {
    title: "New Enquiry Reply",
    text: "Thank you for contacting Worsthorne Dental Clinic. Our team will review your enquiry and get back to you with the next suitable step.",
  },
  {
    title: "Appointment Confirmation",
    text: "Your appointment has been booked. Please contact the clinic if you have any questions before your visit.",
  },
  {
    title: "Review Request",
    text: "Thank you for visiting us. If you were happy with your experience, we would really appreciate a quick Google review.",
  },
  {
    title: "Aftercare Message",
    text: "We hope you are feeling well after your appointment. Please follow the aftercare advice provided and contact us if you need support.",
  },
];

const launchKit = [
  "Website launch announcement",
  "Facebook launch post",
  "Instagram caption",
  "LinkedIn company post",
  "Email announcement",
  "Practice story post",
  "Treatment spotlight post",
  "Review request campaign",
];

const printSignage = [
  "Clinic exterior signage",
  "Window graphics",
  "Reception signage",
  "Uniform direction",
  "Embroidery-ready logo version",
  "Staff clothing logo placement",
  "Treatment leaflet style",
  "Poster style",
  "Referral card direction",
  "Patient welcome pack",
];

const handover = [
  "Logo files",
  "Logo usage guide",
  "Colour palette",
  "Typography guide",
  "Brand messaging kit",
  "Service messaging",
  "Website copy direction",
  "Social media direction",
  "Business stationery direction",
  "SEO keyword foundation",
  "Google Business Profile description",
  "Email templates",
  "Launch kit",
  "Compliance page checklist",
  "PDF brand guidelines",
"Embroidery-ready logo guidance",
"Uniform logo placement notes",
"Future maintenance notes",
];

const maintenance = [
  "Use approved logo versions only",
  "Keep colours consistent across digital and print",
  "Use calm, responsible wording for treatment claims",
  "Choose natural clinic photography over generic stock images",
  "Keep social posts clear, helpful and patient-friendly",
  "Brief printers and designers using this BrandBook",
  "Ask Sitora before major layout, logo or colour changes",
];

function Section({
  eyebrow,
  title,
  text,
  icon: Icon,
  children,
  id,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  icon: ElementType;
  children: ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16 print:break-inside-avoid ${
        dark ? "text-white" : ""
      }`}
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C8A96A]">
            <Icon className="h-4 w-4" />
            {eyebrow}
          </div>
          <h2
            className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
              dark ? "text-white" : "text-[#172A3A]"
            }`}
          >
            {title}
          </h2>
          {text && (
            <p
              className={`mt-4 max-w-2xl text-base leading-8 sm:text-lg ${
                dark ? "text-white/70" : "text-[#52616B]"
              }`}
            >
              {text}
            </p>
          )}
        </div>
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
  const hasCustomBackground = className.includes("bg-");

  return (
    <div
      className={`rounded-[2rem] border border-[#172A3A]/10 p-6 shadow-[0_24px_70px_rgba(23,42,58,0.08)] backdrop-blur ${
        hasCustomBackground ? "" : "bg-white/85"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function MiniPill({
  children,
  tone = "sage",
}: {
  children: ReactNode;
  tone?: "sage" | "gold" | "teal" | "navy" | "ivory";
}) {
  const classes = {
    sage: "bg-[#A9BFB3]/25 text-[#172A3A]",
    gold: "bg-[#C8A96A]/20 text-[#172A3A]",
    teal: "bg-[#5F9EA0]/20 text-[#172A3A]",
    navy: "bg-[#172A3A] text-white",
    ivory: "bg-[#F5F1EA] text-[#172A3A]",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${classes[tone]}`}
    >
      {children}
    </span>
  );
}

function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8A96A] px-6 py-3 text-sm font-semibold text-[#172A3A] shadow-lg shadow-[#C8A96A]/20 transition hover:-translate-y-0.5 hover:bg-[#ddb875] print:hidden"
    >
      <Download className="h-4 w-4" />
      Download / Print PDF
    </button>
  );
}

export default function WorsthorneDentalBrandBookPage() {
  return (
    <main className="min-h-screen bg-[#F8FAF9] text-[#1F2933]">
   <style>{`
  html {
    scroll-behavior: smooth;
  }

  @media print {
    html,
    body {
      background: #ffffff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    nav,
    button,
    .no-print,
    .print\\:hidden {
      display: none !important;
    }

    main,
    section,
    div {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }

    section {
      page-break-inside: avoid;
      break-inside: avoid;
      padding-top: 28px !important;
      padding-bottom: 28px !important;
    }

    .print-page-break {
      page-break-before: always;
      break-before: page;
    }

    a {
      text-decoration: none !important;
      color: inherit !important;
    }
  }
`}</style>

      <section className="relative overflow-hidden bg-[#0B0F14] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28 print:bg-white print:text-[#172A3A]">
        <div className="absolute inset-0 opacity-95 print:hidden">
          <div className="absolute left-[-12%] top-[-22%] h-96 w-96 rounded-full bg-[#5F9EA0]/35 blur-3xl" />
          <div className="absolute bottom-[-25%] right-[-14%] h-[32rem] w-[32rem] rounded-full bg-[#C8A96A]/25 blur-3xl" />
          <div className="absolute left-[34%] top-[35%] h-72 w-72 rounded-full bg-[#A9BFB3]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,169,106,0.22),transparent_36%),linear-gradient(135deg,rgba(23,42,58,0.92),rgba(11,15,20,1))]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C8A96A]">
              <Sparkles className="h-4 w-4" />
              Sitora BrandBook System
            </div>

            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Worsthorne Dental Clinic
              <span className="mt-3 block bg-gradient-to-r from-[#C8A96A] via-[#F5F1EA] to-[#A9BFB3] bg-clip-text text-transparent">
                Complete Brand Kit
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-xl print:text-[#52616B]">
              A full digital brand identity system covering strategy, audience,
              competitor positioning, logo usage, colours, typography,
              messaging, social media, stationery, website direction, SEO,
              Google profile support, emails, launch assets, signage and
              compliance structure.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrintButton />
              <a
                href="#overview"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 print:hidden"
              >
                View Full Kit
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-6 print:border-[#172A3A]/10 print:bg-white"
          >
            <div className="rounded-[1.5rem] bg-[#F8FAF9] p-5 text-[#172A3A] sm:p-6">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A858A]">
                    Prepared by
                  </p>
                  <p className="mt-1 text-2xl font-semibold">Sitora</p>
                </div>
                <div className="rounded-full bg-[#172A3A] px-4 py-2 text-xs font-semibold text-white">
                  v1.0
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#172A3A]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
                  Brand Direction
                </p>
                <h3 className="mt-4 text-3xl font-semibold">
                  Calm, Modern Dental Care
                </h3>
                <p className="mt-4 leading-7 text-[#52616B]">
                  A premium healthcare identity built around trust, clarity,
                  comfort and responsible patient communication.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {["Strategy", "Identity", "Messaging", "Website", "SEO", "Launch"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`rounded-2xl p-4 text-sm font-semibold ${
                        index % 3 === 0
                          ? "bg-[#A9BFB3]/30"
                          : index % 3 === 1
                            ? "bg-[#C8A96A]/20"
                            : "bg-[#5F9EA0]/20"
                      }`}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 border-b border-[#172A3A]/10 bg-[#F8FAF9]/90 px-5 py-4 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto text-sm font-semibold text-[#52616B]">
          {[
            ["Overview", "#overview"],
            ["Strategy", "#strategy"],
            ["Persona", "#persona"],
            ["Logo", "#logo"],
            ["Colours", "#colours"],
            ["Messaging", "#messaging"],
            ["Website", "#website"],
            ["SEO", "#seo"],
            ["Launch", "#launch"],
            ["Handover", "#handover"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="shrink-0 rounded-full border border-[#172A3A]/10 bg-white px-4 py-2 transition hover:border-[#C8A96A]/50 hover:text-[#172A3A]"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <Section
        id="overview"
        eyebrow="Brand Overview"
        title="A complete identity system for a calm, trusted dental clinic."
        text="Worsthorne Dental Clinic should feel clinically credible without feeling cold. The identity combines clean healthcare design, warm reassurance and premium local professionalism."
        icon={BookOpen}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {brandValues.map((value, index) => (
            <motion.div key={value.title} variants={fadeUp}>
              <Card
                className={`${
                  index % 4 === 0
                    ? "bg-[#A9BFB3]/20"
                    : index % 4 === 1
                      ? "bg-[#F5F1EA]"
                      : index % 4 === 2
                        ? "bg-[#5F9EA0]/15"
                        : "bg-white"
                }`}
              >
                <CheckCircle2 className="mb-5 h-6 w-6 text-[#5F9EA0]" />
                <h3 className="text-xl font-semibold text-[#172A3A]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#52616B]">
                  {value.text}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <section className="bg-[#172A3A] print:bg-white">
        <Section
          id="strategy"
          dark
          eyebrow="Brand Strategy"
          title="Positioned around care, clarity and confidence."
          text="The brand should make patients feel reassured before they book. Every touchpoint should reduce uncertainty and create trust."
          icon={Target}
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: HeartPulse,
                title: "Mission",
                text: "To provide clear, caring and professional dental treatment in a welcoming environment where patients feel listened to and respected.",
              },
              {
                icon: Globe2,
                title: "Vision",
                text: "To become a trusted local clinic known for modern dentistry, calm communication and long-term patient relationships.",
              },
              {
                icon: BadgeCheck,
                title: "Promise",
                text: "Clear options, gentle care and reliable guidance for patients who want to feel confident about their oral health.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-white/10 bg-white/10 text-white shadow-none"
              >
                <item.icon className="mb-5 h-7 w-7 text-[#C8A96A]" />
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/70">{item.text}</p>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      <Section
        eyebrow="Audience & Positioning"
        title="Designed for patients who value trust before treatment."
        text="The visual and verbal identity should be built around reassurance, clarity, professionalism and easy next steps."
        icon={Users}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {audience.map((item) => (
            <div
              key={item}
              className="flex gap-4 rounded-3xl border border-[#172A3A]/10 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#5F9EA0]" />
              <p className="leading-7 text-[#52616B]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="persona"
        eyebrow="Customer Persona"
        title="The ideal patient wants reassurance before they commit."
        text="This persona guides the website, messaging, photography, calls to action and trust-building content."
        icon={Users}
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-gradient-to-br from-[#172A3A] to-[#5F9EA0] text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              Ideal Patient
            </p>
            <h3 className="mt-4 text-4xl font-semibold">
              The Reassurance-Seeking Local Patient
            </h3>
            <p className="mt-5 leading-8 text-white/75">
              A parent, professional or nervous patient who wants quality care,
              clean communication and a clinic that feels trustworthy before
              they make contact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MiniPill tone="gold">Trust-led</MiniPill>
              <MiniPill tone="sage">Family-focused</MiniPill>
              <MiniPill tone="teal">Clarity-first</MiniPill>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {persona.map((item) => (
              <Card key={item.label}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8A96A]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#52616B]">
                  {item.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Competitor Positioning"
        title="A modern clinic brand should stand apart from dated local websites."
        text="This section gives the client strategic direction, not just decoration."
        icon={BriefcaseBusiness}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {competitorPoints.map((group, index) => (
            <Card
              key={group.title}
              className={
                index === 1
                  ? "bg-[#A9BFB3]/20"
                  : index === 2
                    ? "bg-[#C8A96A]/15"
                    : ""
              }
            >
              <h3 className="text-2xl font-semibold text-[#172A3A]">
                {group.title}
              </h3>
              <div className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/70 p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#5F9EA0]" />
                    <p className="text-sm font-medium leading-6 text-[#52616B]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="logo"
        eyebrow="Logo System"
        title="A refined dental identity — not another generic tooth logo."
        text="The logo system should be elegant, readable and adaptable across signage, website, documents, social media and patient materials."
        icon={Sparkles}
      >
        <div className="grid gap-6 lg:grid-cols-2">
         <div className="rounded-[2rem] border border-[#172A3A]/10 bg-[#172A3A] p-6 text-white shadow-[0_24px_70px_rgba(23,42,58,0.18)]">
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
    Recommended Routes
  </p>

  <div className="mt-6 grid gap-3">
    {[
      "Refined wordmark",
      "Subtle smile curve",
      "Soft W monogram",
      "Clean clinic-style emblem",
      "Minimal line mark suggesting care and trust",
    ].map((item) => (
      <div
        key={item}
        className="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
      >
        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8A96A]" />
        <p className="text-sm font-semibold leading-6 text-white">
          {item}
        </p>
      </div>
    ))}
  </div>
</div>

          <Card>
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Required Logo Assets
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Primary logo",
                "Horizontal logo",
                "Stacked logo",
                "Icon / submark",
                "Light version",
                "Dark version",
                "Single-colour version",
                "Favicon",
                "Social profile version",
                "Transparent PNG",
                "SVG export",
                "PDF export",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#F5F1EA] p-4 text-sm font-semibold text-[#172A3A]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Logo Usage Rules"
        title="Clear rules keep the brand consistent everywhere."
        text="This turns logo design into a professional identity system that can be used by staff, printers, designers and future agencies."
        icon={PenTool}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Correct Usage",
              items: [
                "Use approved files",
                "Keep clear space",
                "Use high contrast",
                "Use the right format",
                "Keep proportions unchanged",
              ],
            },
            {
              title: "Incorrect Usage",
              items: [
                "Do not stretch",
                "Do not rotate",
                "Do not recolour",
                "Do not add shadows",
                "Do not place on busy images",
              ],
            },
            {
              title: "Minimum Rules",
              items: [
                "Protect safe area",
                "Use SVG for web",
                "Use PDF/SVG for print",
                "Use PNG for simple digital use",
                "Never use screenshots as logos",
              ],
            },
          ].map((group, index) => (
            <Card key={group.title} className={index === 1 ? "bg-[#F5F1EA]" : ""}>
              <h3 className="text-2xl font-semibold text-[#172A3A]">
                {group.title}
              </h3>
              <div className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/75 p-4 text-sm font-semibold text-[#52616B]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
<Section
  eyebrow="Logo Preview Areas"
  title="Visual placeholders for the final logo suite."
  text="These blocks make the BrandBook feel more visual and create clear spaces where the final logo versions can be dropped in later."
  icon={Sparkles}
>
  <div className="grid gap-6 lg:grid-cols-3">
    {[
      {
        title: "Primary Logo Preview",
        bg: "bg-white",
        text: "Full wordmark or primary clinic logo",
      },
      {
        title: "Secondary Logo Preview",
        bg: "bg-[#F5F1EA]",
        text: "Stacked or alternative layout",
      },
      {
        title: "Icon / Submark Preview",
        bg: "bg-[#A9BFB3]/20",
        text: "W monogram, smile mark or clinic emblem",
      },
      {
        title: "Light Background Version",
        bg: "bg-[#F8FAF9]",
        text: "Navy or full colour logo",
      },
      {
        title: "Dark Background Version",
        bg: "bg-[#172A3A] text-white",
        text: "White or reversed logo",
      },
      {
        title: "Social Profile Version",
        bg: "bg-[#C8A96A]/15",
        text: "Circular or square-safe icon",
      },
    ].map((item) => (
      <div
        key={item.title}
        className={`rounded-[2rem] border border-[#172A3A]/10 p-6 shadow-sm ${item.bg}`}
      >
        <div className="flex min-h-36 items-center justify-center rounded-3xl border border-dashed border-[#C8A96A]/60 bg-white/40 p-6 text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8A96A]">
              Logo Area
            </p>
            <p
              className={`mt-3 text-xl font-semibold ${
                item.bg.includes("text-white")
                  ? "text-white"
                  : "text-[#172A3A]"
              }`}
            >
              {item.title}
            </p>
            <p
              className={`mt-2 text-sm ${
                item.bg.includes("text-white")
                  ? "text-white/70"
                  : "text-[#52616B]"
              }`}
            >
              {item.text}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</Section>

      <Section
        eyebrow="Logo Specifications & File Standards"
        title="Technical logo rules for digital, print and signage use."
        text="These specifications make the handover practical. They tell the client, printer, developer and designer exactly which logo file to use and at what size."
        icon={ClipboardCheck}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-[#172A3A] text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              Clear Space
            </p>
            <h3 className="mt-4 text-3xl font-semibold">
              Protect the logo with breathing room.
            </h3>
            <p className="mt-4 leading-8 text-white/75">
              The logo should always have clear space around it equal to the
              height of the “W” in the wordmark, or at least 24px on digital
              layouts.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A96A]">
                  Digital
                </p>
                <p className="mt-2 text-lg font-semibold">Minimum 24px</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A96A]">
                  Print
                </p>
                <p className="mt-2 text-lg font-semibold">Minimum 6mm</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#F5F1EA]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              Minimum Sizes
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Primary logo: 160px digital / 35mm print",
                "Icon or submark: 32px digital / 8mm print",
                "Favicon: 16px, 32px and 48px",
                "Social profile icon: 400px x 400px minimum",
                "Large signage: vector PDF, SVG, EPS or AI only",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#172A3A]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Recommended Export Sizes
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Website header logo: 240px wide PNG/SVG",
                "Mobile header logo: 180px wide PNG/SVG",
                "Footer logo: 220px wide PNG/SVG",
                "Email signature logo: 160px wide PNG",
                "Social profile image: 1080px x 1080px PNG",
                "Favicon: 32px x 32px ICO/PNG",
                "App icon: 512px x 512px PNG",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#F8FAF9] p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#A9BFB3]/20">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              File Format Rules
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "SVG: best for website and scalable digital use",
                "PNG: best for transparent digital use",
                "JPG: only for non-transparent previews",
                "PDF: best for print and supplier sharing",
                "EPS/AI: professional vector print and signage",
                "ICO: browser favicon format",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <div className="rounded-[2rem] border border-[#172A3A]/10 bg-[#172A3A] p-6 text-white shadow-[0_24px_70px_rgba(23,42,58,0.18)]">
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
    Clear Space
  </p>

  <h3 className="mt-4 text-3xl font-semibold text-white">
    Protect the logo with breathing room.
  </h3>

  <p className="mt-4 leading-8 text-white/75">
    The logo should always have clear space around it equal to the height of the
    “W” in the wordmark, or at least 24px on digital layouts.
  </p>

  <div className="mt-6 grid gap-3 sm:grid-cols-2">
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A96A]">
        Digital
      </p>
      <p className="mt-2 text-lg font-semibold text-white">
        Minimum 24px
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A96A]">
        Print
      </p>
      <p className="mt-2 text-lg font-semibold text-white">
        Minimum 6mm
      </p>
    </div>
  </div>
</div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Background Rules
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Use navy logo on light backgrounds",
                "Use white logo on navy or dark backgrounds",
                "Use full colour logo on white or ivory backgrounds",
                "Avoid placing logo over busy photography",
                "Use a soft overlay if the logo must appear on an image",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#F5F1EA] p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#172A3A] text-white">
            <h3 className="text-2xl font-semibold">Print Rules</h3>
            <div className="mt-6 grid gap-3">
              {[
                "Use CMYK or vector files for print",
                "Do not use low-resolution PNGs for signage",
                "Minimum print resolution: 300 DPI",
                "Use SVG, PDF, EPS or AI for large format signage",
                "Always check contrast before printing",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="colours"
        eyebrow="Colour Palette"
        title="Clean healthcare tones with a refined premium finish."
        text="White and ivory communicate cleanliness. Navy creates trust. Sage and teal feel calm and healthcare-focused. Gold adds subtle premium detail."
        icon={Palette}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {colours.map((colour) => (
            <Card key={colour.name} className="overflow-hidden p-0">
              <div
                className="h-28 w-full border-b border-[#172A3A]/10"
                style={{ backgroundColor: colour.hex }}
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#172A3A]">
                  {colour.name}
                </h3>
                <p className="mt-1 font-mono text-sm text-[#7A858A]">
                  {colour.hex}
                </p>
                <p className="mt-1 text-xs text-[#7A858A]">RGB: {colour.rgb}</p>
                <p className="mt-1 text-xs text-[#7A858A]">CMYK: {colour.cmyk}</p>
                <p className="mt-4 text-sm leading-6 text-[#52616B]">
                  {colour.use}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Typography"
        title="Elegant headings. Clean digital readability."
        text="The type system should feel professional and calm, with enough warmth to avoid a cold clinical appearance."
        icon={Type}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {["Playfair Display", "Inter", "Manrope"].map((font, index) => (
            <Card
              key={font}
              className={
                index === 0
                  ? "bg-[#172A3A] text-white"
                  : index === 1
                    ? "bg-[#F5F1EA]"
                    : "bg-[#A9BFB3]/20"
              }
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
                {index === 0 ? "Headings" : index === 1 ? "Body" : "Buttons / Labels"}
              </p>
              <h3
                className={`mt-4 text-4xl font-semibold ${
                  index === 0 ? "text-white" : "text-[#172A3A]"
                }`}
              >
                {font}
              </h3>
              <p
                className={`mt-4 leading-7 ${
                  index === 0 ? "text-white/70" : "text-[#52616B]"
                }`}
              >
                {index === 0
                  ? "Used for elegant hero headings, premium section titles and key brand statements."
                  : index === 1
                    ? "Used for clear, accessible reading across service pages and patient information."
                    : "Used for strong calls to action, labels, navigation and interface elements."}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="messaging"
        eyebrow="Messaging Kit"
        title="Clear, reassuring language that builds patient confidence."
        text="The clinic should sound professional, calm and human. Avoid exaggerated claims or aggressive selling."
        icon={Megaphone}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {messaging.map((item, index) => (
            <Card
              key={item.label}
              className={index === 0 ? "bg-gradient-to-br from-[#172A3A] to-[#5F9EA0] text-white" : ""}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
                {item.label}
              </p>
              <p
                className={`mt-4 text-xl font-semibold leading-8 ${
                  index === 0 ? "text-white" : "text-[#172A3A]"
                }`}
              >
                {item.text}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="bg-[#A9BFB3]/20">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Use This Language
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Clear treatment options",
                "Gentle, professional care",
                "Modern dentistry for the whole family",
                "Helping nervous patients feel at ease",
                "Transparent pricing and trusted advice",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/80 p-4 text-[#52616B]">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#F5F1EA]">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Avoid This Language
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Cheap dental treatment",
                "Perfect smile guaranteed",
                "Pain-free forever",
                "Best dentist in the UK",
                "Overpromising clinical results",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/80 p-4 text-[#52616B]">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Service Messaging"
        title="Every treatment needs a clear patient-focused message."
        text="Each service card connects the treatment to a real patient concern, benefit, CTA and SEO keyword."
        icon={ClipboardCheck}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <Card key={service.name} className={index % 2 === 0 ? "bg-white" : "bg-[#F5F1EA]"}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-[#172A3A]">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-[#C8A96A]">
                    SEO: {service.keyword}
                  </p>
                </div>
                <MiniPill tone={index % 3 === 0 ? "teal" : index % 3 === 1 ? "gold" : "sage"}>
                  {service.cta}
                </MiniPill>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A858A]">
                    Patient Concern
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#52616B]">
                    {service.concern}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A858A]">
                    Benefit
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#52616B]">
                    {service.benefit}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Visual Style Direction"
        title="Clean, soft and clinical — with enough warmth to feel human."
        text="The image style should support trust, comfort and professionalism."
        icon={Image}
      >
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            {
              title: "Photography",
              text: "Natural clinic images, smiling staff, calm patient moments and bright treatment rooms.",
            },
            {
              title: "Icon Style",
              text: "Minimal line icons with rounded edges, using navy, sage, teal and gold accents.",
            },
            {
              title: "Image Treatment",
              text: "Soft contrast, warm lighting, rounded corners and clean spacing.",
            },
            {
              title: "Graphic Elements",
              text: "Gentle curves, calm blocks, subtle gradients and clean trust badges.",
            },
          ].map((item, index) => (
            <Card
              key={item.title}
              className={
                index === 0
                  ? "bg-[#172A3A] text-white"
                  : index === 1
                    ? "bg-[#A9BFB3]/20"
                    : index === 2
                      ? "bg-[#F5F1EA]"
                      : "bg-[#C8A96A]/15"
              }
            >
              <h3
                className={`text-xl font-semibold ${
                  index === 0 ? "text-white" : "text-[#172A3A]"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-4 text-sm leading-7 ${
                  index === 0 ? "text-white/70" : "text-[#52616B]"
                }`}
              >
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Social Media Branding"
        title="The brand should look consistent across patient-facing platforms."
        text="Social media should educate, reassure and gently encourage booking without feeling pushy."
        icon={Megaphone}
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[#172A3A] text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              Post Style
            </p>
            <h3 className="mt-4 text-3xl font-semibold">
              White space, soft shapes and calm headings.
            </h3>
            <p className="mt-5 leading-8 text-white/70">
              Use clean white or ivory backgrounds, navy headings, sage/teal
              accents, real clinic imagery and a clear call to action.
            </p>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            {socialThemes.map((item, index) => (
              <div
                key={item}
                className={`rounded-3xl p-5 text-sm font-semibold text-[#172A3A] ${
                  index % 4 === 0
                    ? "bg-[#A9BFB3]/30"
                    : index % 4 === 1
                      ? "bg-[#C8A96A]/20"
                      : index % 4 === 2
                        ? "bg-[#5F9EA0]/20"
                        : "bg-white"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Business Stationery"
        title="Practical branded assets for daily clinic use."
        text="This turns the brand into a working system across appointments, treatment plans, patient documents and communication."
        icon={FileText}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stationery.map((item, index) => (
            <div
              key={item}
              className={`rounded-3xl border border-[#172A3A]/10 p-5 text-sm font-semibold text-[#172A3A] shadow-sm ${
                index % 4 === 0
                  ? "bg-white"
                  : index % 4 === 1
                    ? "bg-[#F5F1EA]"
                    : index % 4 === 2
                      ? "bg-[#A9BFB3]/20"
                      : "bg-[#C8A96A]/15"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Social, Stationery & Image Dimensions"
        title="Ready-to-use sizing rules for design, print and digital assets."
        text="These dimensions make the BrandBook more practical for Canva templates, Figma exports, print suppliers and social media handover."
        icon={Printer}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-[#F5F1EA]">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Social Media Sizes
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Instagram post: 1080 x 1080px",
                "Instagram story/reel cover: 1080 x 1920px",
                "Facebook cover: 1640 x 924px",
                "LinkedIn company banner: 1128 x 191px",
                "LinkedIn post: 1200 x 1200px",
                "X/Twitter header: 1500 x 500px",
                "YouTube banner: 2560 x 1440px",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#A9BFB3]/20">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Stationery Sizes
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Business card: 85mm x 55mm UK standard",
                "Letterhead: A4, 210mm x 297mm",
                "Appointment card: 85mm x 55mm",
                "Referral card: A6 or DL",
                "Flyer: A5 or A6",
                "Poster: A3 or A2",
                "Proposal cover: A4 portrait",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#C8A96A]/15">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Image Guidelines
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Hero image: 16:9 or 21:9 ratio",
                "Team photos: 4:5 portrait ratio",
                "Treatment thumbnails: 4:3 ratio",
                "Social images: 1:1 square ratio",
                "Minimum hero width: 1600px",
                "Use compressed WebP for website images",
                "Always add descriptive alt text",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="website"
        eyebrow="Website Direction"
        title="A premium dental website built around trust and booking confidence."
        text="This is where Sitora can turn the brand identity into a high-converting digital presence."
        icon={Layout}
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[#172A3A] text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              Hero Concept
            </p>
            <h3 className="mt-4 text-4xl font-semibold">
              Calm, Professional Dental Care in Worsthorne
            </h3>
            <p className="mt-5 leading-8 text-white/75">
              Modern family and cosmetic dentistry in a welcoming clinic
              designed around trust, clarity and patient comfort.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <span className="rounded-full bg-[#C8A96A] px-5 py-3 text-center text-sm font-semibold text-[#172A3A]">
                Book an Appointment
              </span>
              <span className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white">
                View Treatments
              </span>
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Website Sections
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Premium calm hero",
                "Clear booking CTA",
                "Treatment cards",
                "Patient reassurance",
                "Nervous patient messaging",
                "Smilecare Plan section",
                "Fees page",
                "Meet the team",
                "Testimonials / reviews",
                "Compliance pages",
                "FAQ section",
                "Contact and booking page",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#F8FAF9] p-4 text-sm font-semibold text-[#172A3A]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Website UI Specifications"
        title="Digital design rules for a consistent dental website."
        text="These UI specifications make the website easier to design, build and maintain across desktop and mobile."
        icon={Layout}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-[#172A3A] text-white">
            <h3 className="text-2xl font-semibold">Buttons & CTAs</h3>
            <div className="mt-6 grid gap-3">
              {[
                "Primary button: Dental Navy background with Warm Gold or white text",
                "Secondary button: transparent with navy or white border",
                "Border radius: fully rounded or 999px for main CTAs",
                "Button height: 48px minimum on mobile",
                "CTA placement: hero, treatment sections, trust blocks and footer",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#F5F1EA]">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Cards & Layout
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Card radius: 24px to 32px",
                "Use soft shadows, not harsh drop shadows",
                "Section spacing: 72px to 120px desktop",
                "Mobile section spacing: 48px to 72px",
                "Grid layout: 1 column mobile, 2 to 4 columns desktop",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#A9BFB3]/20">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Accessibility Notes
            </h3>
            <div className="mt-6 grid gap-3">
              {[
                "Maintain strong colour contrast",
                "Do not use colour alone for important information",
                "Use readable font sizes",
                "Use clear button labels",
                "Label all forms clearly",
                "Add alt text to all meaningful images",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#52616B]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Website Copy Starter Kit"
        title="Starter copy that can move straight into the website build."
        text="This makes the BrandBook commercially useful because it bridges brand strategy and real website content."
        icon={FileText}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              title: "Homepage Intro",
              text: "Worsthorne Dental Clinic provides calm, modern dental care for families and individuals who want clear advice, professional treatment and a reassuring experience from the moment they get in touch.",
            },
            {
              title: "Trust Section",
              text: "We take time to explain your options, answer your questions and help you understand the right next step for your oral health.",
            },
            {
              title: "About Page Direction",
              text: "Introduce the clinic, the team, the patient experience, the approach to care and the commitment to clear communication.",
            },
            {
              title: "Footer Description",
              text: "Modern family, general and cosmetic dental care for patients in Worsthorne, Burnley and surrounding areas.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
                {item.title}
              </p>
              <p className="mt-4 text-lg leading-8 text-[#172A3A]">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="seo"
        eyebrow="SEO Foundation"
        title="Local search structure for Worsthorne, Burnley and nearby patients."
        text="The brand kit should support search visibility by defining page titles, service keywords, local phrases and Google Business Profile direction."
        icon={Search}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Priority Keywords
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {seoKeywords.map((keyword) => (
                <div
                  key={keyword}
                  className="rounded-2xl bg-[#F5F1EA] p-4 text-sm font-semibold text-[#172A3A]"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#A9BFB3]/20">
            <h3 className="text-2xl font-semibold text-[#172A3A]">
              Suggested Page Titles
            </h3>
            <div className="mt-6 grid gap-3">
              {pageTitles.map((title) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#172A3A]"
                >
                  {title}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Google Business Profile Kit"
        title="Local trust starts before the patient reaches the website."
        text="Google Business Profile content should be consistent with the brand voice, service messaging and SEO direction."
        icon={Globe2}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              Profile Description
            </p>
            <p className="mt-4 text-xl leading-9 text-[#172A3A]">
              Worsthorne Dental Clinic provides modern family, general and
              cosmetic dental care in a calm and professional environment. The
              clinic supports patients with clear advice, gentle care and a
              reassuring approach to treatment.
            </p>
          </Card>
          <Card className="bg-[#F5F1EA]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              Review Request
            </p>
            <p className="mt-4 leading-8 text-[#52616B]">
              Thank you for choosing us. If you were happy with your experience,
              we would really appreciate a quick Google review. It helps local
              patients find us with confidence.
            </p>
          </Card>
        </div>
      </Section>

      <section className="bg-[#172A3A] print:bg-white">
        <Section
          dark
          eyebrow="Compliance & Trust"
          title="A dental brand must be credible, responsible and compliant."
          text="For UK dental websites, the brand direction should avoid misleading claims and include the correct patient trust pages."
          icon={ShieldCheck}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {compliance.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 text-sm font-semibold text-white shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section
        eyebrow="Email & Communication Templates"
        title="Professional communication templates for everyday patient contact."
        text="Small clinics often lose trust through weak communication. These templates make the brand useful beyond design."
        icon={Mail}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {emailTemplates.map((template, index) => (
            <Card key={template.title} className={index % 2 === 0 ? "bg-[#F5F1EA]" : "bg-white"}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
                {template.title}
              </p>
              <p className="mt-4 text-lg leading-8 text-[#172A3A]">
                {template.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="launch"
        eyebrow="Marketing Launch Kit"
        title="Give the clinic a proper launch, not just a new logo."
        text="The launch kit helps the client announce the new brand, new website and improved patient experience across channels."
        icon={Megaphone}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {launchKit.map((item, index) => (
            <div
              key={item}
              className={`rounded-3xl p-5 text-sm font-semibold text-[#172A3A] shadow-sm ${
                index % 4 === 0
                  ? "bg-white"
                  : index % 4 === 1
                    ? "bg-[#C8A96A]/20"
                    : index % 4 === 2
                      ? "bg-[#5F9EA0]/20"
                      : "bg-[#A9BFB3]/25"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Print & Signage Direction"
        title="The identity should work inside the clinic, not just online."
        text="A complete brand system gives direction for signage, patient packs, printed assets and the physical clinic environment."
        icon={Printer}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {printSignage.map((item, index) => (
            <div
              key={item}
              className={`rounded-3xl border border-[#172A3A]/10 p-5 text-sm font-semibold text-[#172A3A] shadow-sm ${
                index % 3 === 0
                  ? "bg-[#172A3A] text-white"
                  : index % 3 === 1
                    ? "bg-[#F5F1EA]"
                    : "bg-white"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
  eyebrow="Uniform & Embroidery Logo"
  title="A simplified logo version for staff clothing and embroidered uniforms."
  text="A normal logo is not always suitable for stitching. Embroidery needs cleaner shapes, thicker lines and reduced detail so the logo remains clear on scrubs, polo shirts, jackets and workwear."
  icon={Printer}
>
  <div className="grid gap-6 lg:grid-cols-2">
    <Card className="bg-[#172A3A] text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
        Embroidery-Ready Logo
      </p>
      <h3 className="mt-4 text-3xl font-semibold">
        Built for uniforms, scrubs and staff clothing.
      </h3>
      <p className="mt-4 leading-8 text-white/75">
        A simplified embroidery version can be prepared for staff uniforms,
        scrubs, polo shirts, jackets, aprons, caps and reception clothing. This
        version may differ slightly from the main logo to ensure it stitches
        cleanly and remains readable.
      </p>
    </Card>

    <Card className="bg-[#F5F1EA]">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
        Embroidery Rules
      </p>

      <div className="mt-6 grid gap-3">
        {[
          "Use one or two colours maximum",
          "Avoid gradients, shadows and thin lines",
          "Remove tiny text or delicate details",
          "Use thicker lines for stitching",
          "Keep the logo readable at small sizes",
          "Use vector artwork where possible",
          "Check contrast against fabric colour",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#52616B]"
          >
            {item}
          </div>
        ))}
      </div>
    </Card>
  </div>

  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[
      "Scrubs logo placement",
      "Polo shirt chest logo",
      "Jacket embroidery position",
      "Reception uniform branding",
      "Cap or apron logo option",
      "Single-colour stitch version",
      "Two-colour stitch version",
      "Supplier-ready artwork file",
    ].map((item, index) => (
      <div
        key={item}
        className={`rounded-3xl border border-[#172A3A]/10 p-5 text-sm font-semibold text-[#172A3A] shadow-sm ${
          index % 4 === 0
            ? "bg-white"
            : index % 4 === 1
              ? "bg-[#F5F1EA]"
              : index % 4 === 2
                ? "bg-[#A9BFB3]/20"
                : "bg-[#C8A96A]/15"
        }`}
      >
        {item}
      </div>
    ))}
  </div>

  <div className="mt-8 rounded-[2rem] bg-[#172A3A] p-6 text-white lg:p-8">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
      Optional Paid Deliverable
    </p>
    <p className="mt-4 max-w-3xl leading-8 text-white/75">
      Embroidery-ready artwork, uniform mockups and supplier-ready production
      files are optional design assets. They can be included in a premium
      package or quoted separately depending on the client’s requirements.
    </p>
  </div>
</Section>

      <Section
        eyebrow="Brand Maintenance Notes"
        title="How to keep the brand consistent after launch."
        text="This section naturally leads into ongoing Sitora support, future website updates and monthly brand maintenance."
        icon={ClipboardCheck}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {maintenance.map((item) => (
            <div
              key={item}
              className="flex gap-4 rounded-3xl border border-[#172A3A]/10 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#5F9EA0]" />
              <p className="leading-7 text-[#52616B]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="handover"
        eyebrow="Final Handover"
        title="Everything the client needs to use the brand properly."
        text="This checklist turns the project into a complete commercial deliverable, not just a design exercise."
        icon={Building2}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {handover.map((item, index) => (
            <div
              key={item}
              className={`flex gap-3 rounded-3xl border border-[#172A3A]/10 p-5 shadow-sm ${
                index % 4 === 0
                  ? "bg-white"
                  : index % 4 === 1
                    ? "bg-[#F5F1EA]"
                    : index % 4 === 2
                      ? "bg-[#A9BFB3]/20"
                      : "bg-[#C8A96A]/15"
              }`}
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#5F9EA0]" />
              <p className="text-sm font-semibold text-[#172A3A]">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-[#172A3A] via-[#1f4053] to-[#5F9EA0] p-8 text-white lg:p-10 print:bg-white print:text-[#172A3A]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
                Sitora BrandBook
              </p>
              <h3 className="mt-3 text-3xl font-semibold">
                Full comprehensive brand kit ready to export.
              </h3>
              <p className="mt-4 max-w-2xl leading-8 text-white/75 print:text-[#52616B]">
                This page can be printed or saved as a PDF. The next stage is
                turning this into a reusable admin-powered BrandBook system for
                every Sitora client.
              </p>
            </div>
            <PrintButton />
          </div>
        </div>
      </Section>
    </main>
  );
}