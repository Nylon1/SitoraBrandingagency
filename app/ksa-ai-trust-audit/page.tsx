"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Building2,
  Globe2,
  Database,
  LockKeyhole,
  FileCheck2,
  Cloud,
  AlertTriangle,
  Stethoscope,
  Landmark,
  GraduationCap,
  BriefcaseBusiness,
  UploadCloud,
  CheckCircle2,
  ClipboardCheck,
  Scale,
  Sparkles,
  Users,
  Eye,
  UserCheck,
  Cpu,
  Loader2,
  Send,
} from "lucide-react";

type FormData = {
  companyName: string;
  contactName: string;
  email: string;
  website: string;
  primaryMarket: string;
  businessType: string;
specialistSaudiFlags: string[];
  aiProductName: string;
  aiSystemType: string;
  aiDescription: string;
  aiUsers: string;
  aiInfluences: string[];

  riskLevel: string;

  dataCollected: string[];
  personalDataStored: string;
  sensitiveDataInvolved: string;
  retentionPeriod: string;
  aiLogsAccess: string;
  privacyConsentWording: string;

  aiProvider: string;
  cloudProvider: string;
  hostingRegion: string;
  dataLeavesKsa: string;
  thirdPartyTools: string;

  disclosuresPresent: string[];
  aiDisclosureWording: string;

  humanReviewAvailable: string;
  aiOverrideAvailable: string;
  internalAiOwner: string;
  escalationRoute: string;
  humanReviewProcess: string;

  securityControls: string[];
  adminDashboardAccess: string;
  backupProcess: string;

  testingCompleted: string[];
  knownAiIssues: string;

  healthcareFlags: string[];
  financeFlags: string[];
  hrFlags: string[];
  educationFlags: string[];

  availableEvidence: string[];
};

const initialFormData: FormData = {
  companyName: "",
  contactName: "",
  email: "",
  website: "",
  primaryMarket: "Saudi Arabia",
  businessType: "AI Startup",

  aiProductName: "",
  aiSystemType: "AI SaaS Product",
  aiDescription: "",
  aiUsers: "",
  aiInfluences: [],

  riskLevel: "",

  dataCollected: [],
  personalDataStored: "Not sure",
  sensitiveDataInvolved: "Not sure",
  retentionPeriod: "",
  aiLogsAccess: "",
  privacyConsentWording: "",

  aiProvider: "",
  cloudProvider: "",
  hostingRegion: "",
  dataLeavesKsa: "Not sure",
  thirdPartyTools: "",
specialistSaudiFlags: [],
  disclosuresPresent: [],
  aiDisclosureWording: "",

  humanReviewAvailable: "Not sure",
  aiOverrideAvailable: "Not sure",
  internalAiOwner: "",
  escalationRoute: "",
  humanReviewProcess: "",

  securityControls: [],
  adminDashboardAccess: "",
  backupProcess: "",

  testingCompleted: [],
  knownAiIssues: "",

  healthcareFlags: [],
  financeFlags: [],
  hrFlags: [],
  educationFlags: [],

  availableEvidence: [],
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    number: "01",
    title: "Company & Market",
    description: "Business details, KSA/GCC exposure and target sector.",
    icon: Building2,
  },
  {
    number: "02",
    title: "AI System Overview",
    description: "What the AI does, who uses it and what it affects.",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Data & Privacy",
    description: "Personal data, sensitive data, consent and retention.",
    icon: Database,
  },
  {
    number: "04",
    title: "Cross-Border Transfers",
    description: "Where prompts, files, logs, models and vendors process data.",
    icon: Globe2,
  },
  {
    number: "05",
    title: "Human Oversight",
    description: "Escalation, review, override and accountability.",
    icon: UserCheck,
  },
  {
    number: "06",
    title: "Security & Cloud",
    description: "Access controls, APIs, hosting, backups and incidents.",
    icon: Cloud,
  },
  {
    number: "07",
    title: "Sector Risk",
    description: "Healthcare, finance, HR, education, legal and public-sector flags.",
    icon: Scale,
  },
  {
    number: "08",
    title: "Evidence Upload",
    description: "Policies, screenshots, architecture, vendor and data documents.",
    icon: UploadCloud,
  },
];

const riskLevels = [
  {
    title: "Low Risk",
    text: "Internal AI helpers, content tools, FAQ bots with limited or no personal data.",
  },
  {
    title: "Medium Risk",
    text: "Customer-facing chatbots, AI receptionists, document tools and CRM workflows.",
  },
  {
    title: "High Risk",
    text: "AI affecting healthcare, finance, legal, employment, children or access to services.",
  },
  {
    title: "Specialist Review Required",
    text: "Medical diagnosis, automated finance decisions, biometric ID or safety-critical AI.",
  },
];

const evidenceItems = [
  "AI system description",
  "Product screenshots",
  "User journey / flow",
  "System prompts",
  "AI provider details",
  "Privacy notice",
  "Terms of use",
  "Data flow map",
  "Vendor contracts",
  "Hosting region",
  "Testing logs",
  "Incident response plan",
];

export default function KSAAITrustAuditPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const [submittedRating, setSubmittedRating] = useState("");
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleArrayValue(field: keyof FormData, value: string) {
    setFormData((current) => {
      const existing = current[field];

      if (!Array.isArray(existing)) {
        return current;
      }

      const nextValue = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];

      return {
        ...current,
        [field]: nextValue,
      };
    });
  }

  async function handleSubmit() {
    setSubmitStatus("idle");
    setSubmitMessage("");

    if (!formData.companyName.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Please enter the company name.");
      return;
    }

    if (!formData.contactName.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Please enter the contact person's name.");
      return;
    }

    if (!formData.email.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Please enter an email address.");
      return;
    }

    if (!formData.riskLevel.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Please select an initial AI risk level.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/ksa-ai-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not submit audit intake.");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Your KSA AI Trust Audit intake has been submitted successfully."
      );
      setSubmittedRating(result.rating || "");
      setSubmittedScore(typeof result.score === "number" ? result.score : null);
      setFormData(initialFormData);

      setTimeout(() => {
        document.getElementById("submission-result")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#04060c] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.13),transparent_34%),linear-gradient(180deg,#04060c_0%,#060a13_48%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute left-1/2 top-[-160px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-300/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-cyan-300/10 blur-[140px]" />
      </div>

      <div className="relative z-10">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/25 bg-white/[0.06] shadow-[0_0_35px_rgba(251,191,36,0.18)]">
              <Sparkles className="h-5 w-5 text-amber-200" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">Sitora</p>
              <p className="text-xs text-white/45">KSA AI Trust Audit</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a href="#audit" className="transition hover:text-white">
              Audit Form
            </a>
            <a href="#risk" className="transition hover:text-white">
              Risk Levels
            </a>
            <a href="#evidence" className="transition hover:text-white">
              Evidence
            </a>
          </nav>

          <a
            href="#audit"
            className="hidden rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2.5 text-sm font-medium text-amber-100 transition hover:bg-amber-300/20 sm:inline-flex"
          >
            Start Review
          </a>
        </header>

        <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
            >
              <ShieldCheck className="h-4 w-4" />
              KSA AI Governance • Data Protection • Software Trust
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Premium AI Trust Audit for{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 bg-clip-text text-transparent">
                Saudi-Ready Software.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl"
            >
              A structured intake and evidence review for AI software, SaaS,
              chatbots, internal tools and digital platforms entering KSA, GCC
              or regulated international markets.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#audit"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-7 py-4 text-sm font-semibold text-black shadow-[0_0_45px_rgba(250,204,21,0.25)] transition hover:scale-[1.02]"
              >
                Begin AI Trust Audit
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </a>

              <a
                href="#evidence"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/[0.09]"
              >
                View Evidence List
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-amber-300/20 via-cyan-300/10 to-transparent blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.065] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="mb-7 flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                    Sitora audit engine
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold">
                    90-Point AI Trust Score
                  </h2>
                </div>
                <div className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-3">
                  <ClipboardCheck className="h-7 w-7 text-amber-200" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  ["AI Purpose", "Required"],
                  ["Data Flow Map", "Required"],
                  ["Cross-Border Review", "KSA Critical"],
                  ["Human Oversight", "Risk Based"],
                  ["Vendor/API Register", "Required"],
                  ["Incident Process", "Required"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-200" />
                      <p className="font-medium">{label}</p>
                    </div>
                    <p className="text-sm text-white/50">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-cyan-100" />
                  <p className="text-sm leading-6 text-white/72">
                    This review is designed for compliance-readiness and trust
                    improvement. It is not legal advice or regulatory
                    certification.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-200/70">
              Framework sections
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Built around the evidence serious AI software needs.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <div
                  key={section.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur transition hover:border-amber-300/30 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
                      <Icon className="h-6 w-6 text-amber-200" />
                    </div>
                    <p className="text-sm text-white/30">{section.number}</p>
                  </div>
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">
                    {section.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="risk" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
                <Scale className="h-4 w-4" />
                Risk Classification
              </div>

              <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Every AI system starts with a risk level.
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Sitora does not treat all AI the same. A simple internal content
                assistant is not the same as a healthcare, finance or
                recruitment system.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {riskLevels.map((risk) => (
                <div
                  key={risk.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur"
                >
                  <h3 className="text-xl font-semibold text-amber-100">
                    {risk.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {risk.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="audit" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-12 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <FileCheck2 className="h-4 w-4" />
              Client Intake Form
            </div>

            <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              KSA AI Trust Audit Intake
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/65">
              This form is designed to collect enough detail for Sitora to
              prepare a practical AI governance and trust-readiness review.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            className="rounded-[2.4rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10"
          >
            <FormSection
              icon={Building2}
              title="1. Company Details"
              description="Basic business and market information."
            >
              <TwoCol>
                <Input
                  label="Company name"
                  placeholder="Company Ltd / Trading Name"
                  value={formData.companyName}
                  onChange={(value) => updateField("companyName", value)}
                />
                <Input
                  label="Contact person"
                  placeholder="Full name"
                  value={formData.contactName}
                  onChange={(value) => updateField("contactName", value)}
                />
                <Input
                  label="Email address"
                  placeholder="you@company.com"
                  type="email"
                  value={formData.email}
                  onChange={(value) => updateField("email", value)}
                />
                <Input
                  label="Company website"
                  placeholder="https://"
                  type="url"
                  value={formData.website}
                  onChange={(value) => updateField("website", value)}
                />
                <Select
                  label="Primary target market"
                  value={formData.primaryMarket}
                  onChange={(value) => updateField("primaryMarket", value)}
                  options={[
                    "Saudi Arabia",
                    "UAE / GCC",
                    "United Kingdom",
                    "Europe",
                    "International",
                    "Not sure yet",
                  ]}
                />
                <Select
                  label="Business type"
                  value={formData.businessType}
                  onChange={(value) => updateField("businessType", value)}
                  options={[
                    "AI Startup",
                    "SaaS Company",
                    "Software Agency",
                    "Healthcare Provider",
                    "Fintech / Insurance",
                    "Legal / Translation",
                    "Education",
                    "Government Supplier",
                    "Other",
                  ]}
                />
              </TwoCol>
            </FormSection>

            <FormSection
              icon={BrainCircuit}
              title="2. AI System Overview"
              description="Explain what the AI does and how it affects users."
            >
              <TwoCol>
                <Input
                  label="AI system / product name"
                  placeholder="Product name"
                  value={formData.aiProductName}
                  onChange={(value) => updateField("aiProductName", value)}
                />
                <Select
                  label="Type of AI system"
                  value={formData.aiSystemType}
                  onChange={(value) => updateField("aiSystemType", value)}
                  options={[
                    "AI SaaS Product",
                    "AI Chatbot",
                    "AI Digital Receptionist",
                    "Internal AI Tool",
                    "Document AI",
                    "Healthcare AI",
                    "Finance / Risk AI",
                    "Recruitment AI",
                    "Education AI",
                    "Other",
                  ]}
                />
              </TwoCol>

              <TextArea
                label="What does the AI system do?"
                placeholder="Describe the AI system in plain English."
                value={formData.aiDescription}
                onChange={(value) => updateField("aiDescription", value)}
              />

              <TextArea
                label="Who uses the AI system?"
                placeholder="Customers, staff, patients, students, applicants, clinicians, finance teams, etc."
                value={formData.aiUsers}
                onChange={(value) => updateField("aiUsers", value)}
              />

              <CheckboxGrid
                label="What does the AI influence?"
                selected={formData.aiInfluences}
                onToggle={(value) => toggleArrayValue("aiInfluences", value)}
                options={[
                  "Customer support",
                  "Lead qualification",
                  "Recommendations",
                  "Document processing",
                  "Health or clinical support",
                  "Finance or insurance outcomes",
                  "Legal or professional advice",
                  "Recruitment or employment",
                  "Children or education",
                  "Access to services",
                  "Internal staff decisions",
                  "Not sure",
                ]}
              />
            </FormSection>

            <FormSection
              icon={AlertTriangle}
              title="3. Initial Risk Classification"
              description="Select the highest relevant risk category."
            >
              <RadioCards
                name="risk"
                value={formData.riskLevel}
                onChange={(value) => updateField("riskLevel", value)}
                options={[
                  {
                    title: "Low Risk",
                    text: "Internal tools, content support or simple FAQ with little/no personal data.",
                  },
                  {
                    title: "Medium Risk",
                    text: "Customer-facing AI, lead capture, support bots or document workflows.",
                  },
                  {
                    title: "High Risk",
                    text: "Health, finance, legal, recruitment, children or access to important services.",
                  },
                  {
                    title: "Specialist Review Required",
                    text: "Medical diagnosis, automated finance decisions, biometrics or safety-critical AI.",
                  },
                ]}
              />
            </FormSection>

            <FormSection
              icon={Database}
              title="4. Data Collection & Privacy"
              description="Identify personal, sensitive and unnecessary data collection."
            >
              <CheckboxGrid
                label="What data does the AI collect or process?"
                selected={formData.dataCollected}
                onToggle={(value) => toggleArrayValue("dataCollected", value)}
                options={[
                  "Name",
                  "Email",
                  "Phone number",
                  "Address / postcode",
                  "Health information",
                  "Financial information",
                  "Legal documents",
                  "Employment / CV data",
                  "Children’s data",
                  "Photos / images",
                  "Voice/audio",
                  "ID documents",
                  "Religious or sensitive personal information",
                  "Free-text messages",
                  "Uploaded files",
                  "Unknown",
                ]}
              />

              <TwoCol>
                <Select
                  label="Is personal data stored?"
                  value={formData.personalDataStored}
                  onChange={(value) =>
                    updateField("personalDataStored", value)
                  }
                  options={["Yes", "No", "Not sure"]}
                />
                <Select
                  label="Is sensitive data involved?"
                  value={formData.sensitiveDataInvolved}
                  onChange={(value) =>
                    updateField("sensitiveDataInvolved", value)
                  }
                  options={["Yes", "No", "Possibly", "Not sure"]}
                />
                <Input
                  label="Retention period"
                  placeholder="e.g. 30 days, 12 months, unknown"
                  value={formData.retentionPeriod}
                  onChange={(value) => updateField("retentionPeriod", value)}
                />
                <Input
                  label="Who can access AI logs?"
                  placeholder="Admin, staff, vendor, unknown"
                  value={formData.aiLogsAccess}
                  onChange={(value) => updateField("aiLogsAccess", value)}
                />
              </TwoCol>

              <TextArea
                label="Privacy / consent wording currently used"
                placeholder="Paste your current privacy, consent or chatbot disclosure wording."
                value={formData.privacyConsentWording}
                onChange={(value) =>
                  updateField("privacyConsentWording", value)
                }
              />
            </FormSection>

            <FormSection
              icon={Globe2}
              title="5. Cross-Border Data Transfer"
              description="This is critical for KSA because many AI vendors process data outside Saudi Arabia."
            >
              <TwoCol>
                <Input
                  label="AI provider/model used"
                  placeholder="OpenAI, Microsoft, Google, Anthropic, custom model, etc."
                  value={formData.aiProvider}
                  onChange={(value) => updateField("aiProvider", value)}
                />
                <Input
                  label="Cloud / hosting provider"
                  placeholder="AWS, Azure, Google Cloud, Vercel, local KSA hosting, etc."
                  value={formData.cloudProvider}
                  onChange={(value) => updateField("cloudProvider", value)}
                />
                <Input
                  label="Hosting region"
                  placeholder="Saudi Arabia, UAE, EU, US, unknown"
                  value={formData.hostingRegion}
                  onChange={(value) => updateField("hostingRegion", value)}
                />
                <Select
                  label="Does data leave Saudi Arabia?"
                  value={formData.dataLeavesKsa}
                  onChange={(value) => updateField("dataLeavesKsa", value)}
                  options={["Yes", "No", "Possibly", "Not sure"]}
                />
              </TwoCol>

              <TextArea
                label="Describe any third-party tools involved"
                placeholder="AI APIs, analytics, CRM, email tools, storage, cloud services, support tools."
                value={formData.thirdPartyTools}
                onChange={(value) => updateField("thirdPartyTools", value)}
              />
            </FormSection>

            <FormSection
              icon={Eye}
              title="6. AI Transparency & User Disclosure"
              description="Users should understand when AI is involved and what its limits are."
            >
              <CheckboxGrid
                label="Which disclosures are already present?"
                selected={formData.disclosuresPresent}
                onToggle={(value) =>
                  toggleArrayValue("disclosuresPresent", value)
                }
                options={[
                  "Users are told they are interacting with AI",
                  "Users are told AI does not replace professional advice",
                  "Users are told how their data is used",
                  "There is a human support option",
                  "There is a privacy policy",
                  "There is a consent checkbox",
                  "There is a safety disclaimer",
                  "There is no AI disclosure yet",
                ]}
              />

              <TextArea
                label="Current AI disclosure wording"
                placeholder="Paste the exact wording shown to users."
                value={formData.aiDisclosureWording}
                onChange={(value) =>
                  updateField("aiDisclosureWording", value)
                }
              />
            </FormSection>

            <FormSection
              icon={Users}
              title="7. Human Oversight"
              description="AI should not make serious final decisions without accountability."
            >
              <TwoCol>
                <Select
                  label="Can a human review AI outputs?"
                  value={formData.humanReviewAvailable}
                  onChange={(value) =>
                    updateField("humanReviewAvailable", value)
                  }
                  options={["Yes", "No", "Partially", "Not sure"]}
                />
                <Select
                  label="Can AI decisions be overridden?"
                  value={formData.aiOverrideAvailable}
                  onChange={(value) =>
                    updateField("aiOverrideAvailable", value)
                  }
                  options={["Yes", "No", "Not applicable", "Not sure"]}
                />
                <Input
                  label="Who owns the AI system internally?"
                  placeholder="Role/name/team"
                  value={formData.internalAiOwner}
                  onChange={(value) => updateField("internalAiOwner", value)}
                />
                <Input
                  label="Escalation route"
                  placeholder="Support team, clinician, manager, compliance lead"
                  value={formData.escalationRoute}
                  onChange={(value) => updateField("escalationRoute", value)}
                />
              </TwoCol>

              <TextArea
                label="Describe the human review process"
                placeholder="When does a human step in? Who checks serious or sensitive outputs?"
                value={formData.humanReviewProcess}
                onChange={(value) =>
                  updateField("humanReviewProcess", value)
                }
              />
            </FormSection>

            <FormSection
              icon={LockKeyhole}
              title="8. Cybersecurity, Cloud & Access Controls"
              description="Review the practical security around AI logs, dashboards, vendors and API keys."
            >
              <CheckboxGrid
                label="Security controls currently in place"
                selected={formData.securityControls}
                onToggle={(value) =>
                  toggleArrayValue("securityControls", value)
                }
                options={[
                  "MFA enabled",
                  "Role-based access",
                  "Audit logs",
                  "API keys stored securely",
                  "Encrypted database",
                  "Backups",
                  "Incident response plan",
                  "Vendor security review",
                  "Admin access list",
                  "No formal security controls yet",
                  "Not sure",
                ]}
              />

              <TwoCol>
                <Input
                  label="Admin dashboard access"
                  placeholder="Who has access?"
                  value={formData.adminDashboardAccess}
                  onChange={(value) =>
                    updateField("adminDashboardAccess", value)
                  }
                />
                <Input
                  label="Backup process"
                  placeholder="Provider/frequency/location"
                  value={formData.backupProcess}
                  onChange={(value) => updateField("backupProcess", value)}
                />
              </TwoCol>
            </FormSection>

            <FormSection
              icon={Cpu}
              title="9. Testing, Safety & AI Behaviour"
              description="AI should be tested before launch, especially in sensitive sectors."
            >
              <CheckboxGrid
                label="Testing completed"
                selected={formData.testingCompleted}
                onToggle={(value) =>
                  toggleArrayValue("testingCompleted", value)
                }
                options={[
                  "Normal user testing",
                  "Wrong-answer testing",
                  "Hallucination testing",
                  "Prompt injection testing",
                  "Bias/fairness testing",
                  "Sensitive-topic testing",
                  "Vulnerable-user testing",
                  "Cyber/security testing",
                  "No formal AI testing yet",
                ]}
              />

              <TextArea
                label="Known AI issues or concerns"
                placeholder="Any hallucinations, unsafe answers, data leakage, confusing responses or edge cases?"
                value={formData.knownAiIssues}
                onChange={(value) => updateField("knownAiIssues", value)}
              />
            </FormSection>

            <FormSection
              icon={Scale}
              title="10. Sector-Specific Flags"
              description="Certain sectors need stronger controls or specialist legal/regulatory review."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <SectorCard
                  icon={Stethoscope}
                  title="Healthcare / Medical AI"
                  selected={formData.healthcareFlags}
                  onToggle={(value) =>
                    toggleArrayValue("healthcareFlags", value)
                  }
                  options={[
                    "Diagnoses or predicts disease",
                    "Recommends treatment",
                    "Processes health data",
                    "Clinician reviews output",
                    "May need SFDA review",
                  ]}
                />
                <SectorCard
                  icon={Landmark}
                  title="Finance / Insurance AI"
                  selected={formData.financeFlags}
                  onToggle={(value) => toggleArrayValue("financeFlags", value)}
                  options={[
                    "Scores risk",
                    "Influences approval",
                    "Profiles customers",
                    "Uses financial data",
                    "May need SAMA review",
                  ]}
                />
                <SectorCard
                  icon={BriefcaseBusiness}
                  title="HR / Recruitment AI"
                  selected={formData.hrFlags}
                  onToggle={(value) => toggleArrayValue("hrFlags", value)}
                  options={[
                    "Screens CVs",
                    "Ranks candidates",
                    "Assesses employees",
                    "Can reject applicants",
                    "Bias testing completed",
                  ]}
                />
                <SectorCard
                  icon={GraduationCap}
                  title="Children / Education AI"
                  selected={formData.educationFlags}
                  onToggle={(value) =>
                    toggleArrayValue("educationFlags", value)
                  }
                  options={[
                    "Used by children",
                    "Collects child data",
                    "Parental consent needed",
                    "Moderation in place",
                    "Safeguarding review needed",
                  ]}
                />
                <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] p-6">
  <div className="mb-5">
    <h3 className="text-xl font-semibold text-white">
      Specialist Saudi Regulatory Flags
    </h3>
    <p className="mt-1 text-sm text-white/50">
      Additional Saudi legal, cybersecurity, data protection or sector review may be needed.
    </p>
  </div>

  <div className="space-y-3">
    {[
      "The AI diagnoses, predicts, monitors or recommends treatment",
      "The AI influences finance, lending, insurance, investment or customer eligibility",
      "The AI screens, ranks, scores or rejects job candidates",
      "The AI processes children’s data or targets children/students",
      "The AI uses biometric data, facial recognition, voice identification or identity verification",
      "The AI generates deepfakes, avatars, synthetic media, cloned voices or manipulated images/video",
      "The AI will be sold to or used by Saudi government, public-sector entities or public services",
      "The AI will be used in critical infrastructure such as energy, transport, telecoms, healthcare systems or financial systems",
      "The company acts as a cloud provider, SaaS provider or hosting provider in Saudi Arabia",
      "The AI makes or supports automated decisions affecting rights, access, eligibility, pricing, employment, treatment or services",
      "None of the above",
      "Not sure",
    ].map((option: string) => {
      const currentValues = formData.specialistSaudiFlags || [];
      const checked = currentValues.includes(option);

      return (
        <label
          key={option}
          className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/75"
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setFormData((prev) => {
                const current: string[] = prev.specialistSaudiFlags || [];

                let next: string[];

                if (current.includes(option)) {
                  next = current.filter((item: string) => item !== option);
                } else {
                  if (option === "None of the above") {
                    next = ["None of the above"];
                  } else if (option === "Not sure") {
                    next = ["Not sure"];
                  } else {
                    next = [
                      ...current.filter(
                        (item: string) =>
                          item !== "None of the above" && item !== "Not sure"
                      ),
                      option,
                    ];
                  }
                }

                return {
                  ...prev,
                  specialistSaudiFlags: next,
                };
              });
            }}
            className="mt-1 h-4 w-4 accent-amber-300"
          />

          <span>{option}</span>
        </label>
      );
    })}
  </div>

  <div className="mt-5 rounded-2xl border border-amber-300/20 bg-black/20 p-4 text-sm leading-6 text-amber-50/75">
    Selecting any specialist flag does not mean the AI system is non-compliant.
    It means Sitora may recommend additional specialist review before launch,
    sale or wider deployment.
  </div>
</div>
              </div>
            </FormSection>

            <FormSection
              icon={UploadCloud}
              title="11. Evidence & Documents"
              description="List what the client can provide. File upload can be connected later to Supabase or another storage provider."
            >
              <CheckboxGrid
                label="Available evidence"
                selected={formData.availableEvidence}
                onToggle={(value) =>
                  toggleArrayValue("availableEvidence", value)
                }
                options={evidenceItems}
              />

              <div className="rounded-[1.5rem] border border-dashed border-white/20 bg-black/20 p-8 text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-amber-200" />
                <p className="mt-4 text-lg font-semibold">
                  Upload area placeholder
                </p>
                <p className="mt-2 text-sm text-white/45">
                  Connect this to Supabase Storage, UploadThing or your CRM
                  when ready.
                </p>
              </div>
            </FormSection>
           {/* Specialist Saudi Regulatory Flags */}
<section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur sm:p-8">
  <div className="mb-6">
    <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
      Specialist Saudi Regulatory Flags
    </p>

    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
      Does your AI system involve any specialist or higher-risk use cases?
    </h2>

    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
      These questions help identify whether your AI system may require
      additional Saudi legal, cybersecurity, data protection or sector-specific
      review before launch, sale or deployment.
    </p>
  </div>

  <div className="grid gap-3 md:grid-cols-2">
    {[
      "The AI diagnoses, predicts, monitors or recommends treatment",
      "The AI influences finance, lending, insurance, investment or customer eligibility",
      "The AI screens, ranks, scores or rejects job candidates",
      "The AI processes children’s data or targets children/students",
      "The AI uses biometric data, facial recognition, voice identification or identity verification",
      "The AI generates deepfakes, avatars, synthetic media, cloned voices or manipulated images/video",
      "The AI will be sold to or used by Saudi government, public-sector entities or public services",
      "The AI will be used in critical infrastructure such as energy, transport, telecoms, healthcare systems or financial systems",
      "The company acts as a cloud provider, SaaS provider or hosting provider in Saudi Arabia",
      "The AI makes or supports automated decisions affecting rights, access, eligibility, pricing, employment, treatment or services",
      "None of the above",
      "Not sure",
    ].map((option: string) => {
      const currentValues = formData.specialistSaudiFlags || [];
      const checked = currentValues.includes(option);

      return (
        <label
          key={option}
          className={`flex cursor-pointer gap-3 rounded-2xl border p-4 text-sm leading-6 transition ${
            checked
              ? "border-amber-300/40 bg-amber-300/[0.12] text-amber-50"
              : "border-white/10 bg-black/20 text-white/65 hover:bg-white/[0.06]"
          }`}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setFormData((prev) => {
                const current: string[] = prev.specialistSaudiFlags || [];

                let next: string[];

                if (current.includes(option)) {
                  next = current.filter((item: string) => item !== option);
                } else {
                  if (option === "None of the above") {
                    next = ["None of the above"];
                  } else if (option === "Not sure") {
                    next = ["Not sure"];
                  } else {
                    next = [
                      ...current.filter(
                        (item: string) =>
                          item !== "None of the above" && item !== "Not sure"
                      ),
                      option,
                    ];
                  }
                }

                return {
                  ...prev,
                  specialistSaudiFlags: next,
                };
              });
            }}
            className="mt-1 h-4 w-4 accent-amber-300"
          />

          <span>{option}</span>
        </label>
      );
    })}
  </div>

  <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[0.08] p-4 text-sm leading-6 text-amber-50/75">
    Selecting any specialist flag does not mean your system is non-compliant.
    It means Sitora may recommend additional Saudi legal, cybersecurity, data
    protection or sector-specific review before launch or wider deployment.
  </div>
</section>

            <div className="mt-8 rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    Submit for Sitora AI Trust Review
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                    Submission creates a Supabase audit record, sends Sitora an
                    internal notification, and sends the client a confirmation
                    email.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-7 py-4 text-sm font-semibold text-black shadow-[0_0_40px_rgba(250,204,21,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Audit Intake
                      <Send className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-5 text-xs leading-5 text-white/45">
                Disclaimer: Sitora provides AI governance, trust and
                compliance-readiness support. This form and resulting review do
                not constitute legal advice, regulatory certification or formal
                approval by any Saudi regulator.
              </p>
            </div>

            {submitStatus !== "idle" && (
              <div
                id="submission-result"
                className={`mt-6 rounded-[1.5rem] border p-5 ${
                  submitStatus === "success"
                    ? "border-emerald-300/25 bg-emerald-300/10"
                    : "border-red-300/25 bg-red-300/10"
                }`}
              >
                <div className="flex gap-3">
                  {submitStatus === "success" ? (
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-200" />
                  ) : (
                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-200" />
                  )}

                  <div>
                    <p className="font-semibold">
                      {submitStatus === "success"
                        ? "Submission received"
                        : "Submission issue"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      {submitMessage}
                    </p>

                    {submitStatus === "success" && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {submittedRating && (
                          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                              Initial Rating
                            </p>
                            <p className="mt-2 font-semibold text-emerald-100">
                              {submittedRating}
                            </p>
                          </div>
                        )}

                        {submittedScore !== null && (
                          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                              Initial Score
                            </p>
                            <p className="mt-2 font-semibold text-emerald-100">
                              {submittedScore}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </section>

        <section id="evidence" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur sm:p-10">
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-100/60">
                  Evidence pack
                </p>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  What Sitora asks clients to provide.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-white/55">
                These documents allow Sitora to produce a stronger AI Trust
                Report with fewer assumptions and clearer recommendations.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {evidenceItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-semibold">Sitora</p>
              <p className="mt-1 text-sm text-white/45">
                KSA AI Governance • Software Trust • Compliance Readiness
              </p>
            </div>

            <a
              href="/ai-trust-framework"
              className="text-sm text-white/55 transition hover:text-white"
            >
              Back to AI Trust Framework
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* Components */

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: any;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/10 py-10 last:border-b-0">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
          <Icon className="h-6 w-6 text-amber-200" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.02em]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/52">{description}</p>
        </div>
      </div>

      <div className="space-y-6">{children}</div>
    </section>
  );
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/58">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-amber-300/50"
      />
    </label>
  );
}

function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/58">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition focus:border-amber-300/50"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/58">{label}</span>
      <textarea
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-amber-300/50"
      />
    </label>
  );
}

function CheckboxGrid({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-4 text-sm text-white/58">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const isChecked = selected.includes(option);

          return (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm transition ${
                isChecked
                  ? "border-amber-300/40 bg-amber-300/10 text-amber-50"
                  : "border-white/10 bg-black/20 text-white/68 hover:border-amber-300/30 hover:bg-white/[0.05]"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(option)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black accent-amber-300"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function RadioCards({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { title: string; text: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {options.map((option) => {
        const isSelected = value === option.title;

        return (
          <label
            key={option.title}
            className={`cursor-pointer rounded-[1.5rem] border p-5 transition ${
              isSelected
                ? "border-amber-300/40 bg-amber-300/10"
                : "border-white/10 bg-black/20 hover:border-amber-300/30 hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name={name}
                checked={isSelected}
                onChange={() => onChange(option.title)}
                className="mt-1 h-4 w-4 accent-amber-300"
              />
              <div>
                <p className="font-semibold text-white">{option.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {option.text}
                </p>
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}

function SectorCard({
  icon: Icon,
  title,
  options,
  selected,
  onToggle,
}: {
  icon: any;
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10">
          <Icon className="h-5 w-5 text-cyan-100" />
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isChecked = selected.includes(option);

          return (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-3 rounded-xl p-2 text-sm transition ${
                isChecked
                  ? "bg-amber-300/10 text-amber-50"
                  : "text-white/62 hover:bg-white/[0.04]"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(option)}
                className="mt-1 h-4 w-4 accent-amber-300"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}