"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  companyName: string;
  website: string;
  sector: string;
  companySize: string;
  country: string;
  qatarPresence: string;

  contactName: string;
  role: string;
  email: string;
  phone: string;

  digitalChannels: string[];
  dataTypes: string[];
  marketingUses: string[];
  aiUses: string[];
  systemAccess: string[];
  cyberControls: string[];
  existingDocuments: string[];
  concerns: string[];

  trigger: string;
  consentToContact: boolean;
};

type ApiResult = {
  success: boolean;
  id: string;
  score: number;
  exposureLevel: string;
  country: string;
  matchedRulesCount: number;
  priorityCategories: string[];
  recommendedEvidence: string[];
  rulesGuidance: string[];
  highestSeverity: string;
};

const initialState: FormState = {
  companyName: "",
  website: "",
  sector: "",
  companySize: "",
  country: "Qatar",
  qatarPresence: "",

  contactName: "",
  role: "",
  email: "",
  phone: "",

  digitalChannels: [],
  dataTypes: [],
  marketingUses: [],
  aiUses: [],
  systemAccess: [],
  cyberControls: [],
  existingDocuments: [],
  concerns: [],

  trigger: "",
  consentToContact: false,
};

const countries = ["Qatar", "Saudi Arabia", "UAE"];

const sectors = [
  "Healthcare / Clinic",
  "Education / Nursery / School",
  "Real Estate",
  "Hospitality",
  "Retail / E-commerce",
  "Financial Services",
  "QFC / Regulated Firm",
  "Professional Services",
  "Technology / Startup",
  "Marketing / Media Agency",
  "Government Supplier",
  "Public-facing Organisation",
  "Other",
];

const companySizes = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

const qatarPresenceOptions = [
  "Based in Qatar",
  "Selling into Qatar",
  "Supplier to Qatar organisations",
  "Qatar branch / office",
  "QFC / regulated presence",
  "Planning to enter Qatar",
  "Regional GCC business",
];

const digitalChannelOptions = [
  "Website",
  "Landing pages",
  "Online enquiry forms",
  "Online checkout",
  "Payment links",
  "Booking platform",
  "Customer portal",
  "Mobile app",
  "WhatsApp Business",
  "Email marketing platform",
  "CRM",
  "Google Ads",
  "Meta / Instagram / Facebook Ads",
  "TikTok / Snapchat / LinkedIn Ads",
  "Social media pages",
];

const dataTypeOptions = [
  "Customer data",
  "Employee data",
  "Website form data",
  "CRM data",
  "QID / passport data",
  "Financial data",
  "Health data",
  "Children data",
  "Location data",
  "Photos / videos",
  "Sensitive data",
  "Supplier data",
  "Not sure",
];

const marketingUseOptions = [
  "Paid ads",
  "Social media ads",
  "WhatsApp marketing",
  "Email marketing",
  "SMS marketing",
  "Discounts / offers",
  "Limited-time promotions",
  "Pricing claims",
  "Guarantees",
  "Performance claims",
  "Testimonials",
  "Before / after claims",
  "Influencer content",
  "Arabic and English campaigns",
  "No formal review before publishing",
];

const aiUseOptions = [
  "ChatGPT",
  "AI chatbot",
  "AI customer support",
  "AI-generated marketing",
  "AI-generated social posts",
  "AI-generated website content",
  "AI customer data analysis",
  "AI HR / recruitment",
  "Automation workflows",
  "No AI policy",
  "Not sure what staff use",
];

const systemAccessOptions = [
  "Marketing agency",
  "Web developer",
  "IT provider",
  "CRM provider",
  "Cloud provider",
  "Payment provider",
  "Booking platform",
  "AI vendor",
  "External admin access",
  "Overseas vendors",
  "Freelancers",
  "Not sure who has access",
];

const cyberControlOptions = [
  "MFA enabled",
  "Password policy",
  "Admin user list",
  "Backups",
  "Cybersecurity policy",
  "Incident response plan",
  "Breach response process",
  "Staff cyber training",
  "Access offboarding process",
  "Regular access review",
  "Not sure",
  "None of the above",
];

const existingDocumentOptions = [
  "Privacy policy",
  "Terms and conditions",
  "Cookie notice",
  "Refund / cancellation policy",
  "Data protection policy",
  "Consent wording",
  "Marketing consent records",
  "Complaint handling process",
  "AI usage policy",
  "Vendor register",
  "Cybersecurity policy",
  "Incident response plan",
  "Social media approval process",
  "Accessibility statement",
  "None / not sure",
];

const concernOptions = [
  "Customer complaints",
  "Data protection risk",
  "Advertising claims",
  "Pricing / promotion risk",
  "AI usage",
  "Cybersecurity",
  "Vendor access",
  "Website trust",
  "Investor due diligence",
  "Government / enterprise supplier readiness",
  "Regulatory concern",
  "Reputation / crisis readiness",
  "Not sure",
];

export default function Trust360ExposureCheckPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submittedResult, setSubmittedResult] = useState<ApiResult | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatedScore = useMemo(() => calculateRiskScore(form), [form]);
  const exposureLevel = getExposureLevel(calculatedScore);

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArray(field: keyof FormState, value: string) {
    setForm((prev) => {
      const current = prev[field] as string[];
      const exists = current.includes(value);

      return {
        ...prev,
        [field]: exists
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.consentToContact) {
      alert("Please confirm consent before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/trust360-exposure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          riskScore: calculatedScore,
          exposureLevel,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to submit exposure check.");
      }

      setSubmittedResult(result as ApiResult);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      alert("There was a problem submitting the exposure check. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedResult) {
    return <SuccessScreen result={submittedResult} />;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-6 py-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.28),_transparent_34%),linear-gradient(135deg,_#050505,_#100c06)]" />

        <div className="mx-auto max-w-6xl">
          <a
            href="/qatar-trust-360"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Trust 360
          </a>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
                Free Trust 360 Exposure Check
              </p>

              <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">
                Find your trust, compliance and reputation exposure.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                Answer a short set of questions and Sitora will map your answers
                against the selected Qatar, Saudi Arabia or UAE Trust 360 rules
                database.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Indicative score
              </p>

              <p className="mt-4 text-6xl font-black text-white">
                {calculatedScore}
                <span className="text-2xl text-white/40">/100</span>
              </p>

              <p className="mt-4 text-xl font-black text-[#D4AF37]">
                {exposureLevel}
              </p>

              <p className="mt-4 text-sm leading-7 text-white/60">
                This score is indicative only. A full Trust 360 audit requires
                evidence review, documents, screenshots and internal process
                checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-6xl px-6 py-16 lg:px-8"
      >
        <FormSection
          number="01"
          title="Company information"
          description="Tell us who the assessment is for and which country rules database should be used."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              label="Company name"
              value={form.companyName}
              onChange={(value) => updateField("companyName", value)}
              required
            />

            <TextInput
              label="Website"
              value={form.website}
              onChange={(value) => updateField("website", value)}
              placeholder="https://"
              required
            />

            <SelectInput
              label="Primary country / jurisdiction"
              value={form.country}
              options={countries}
              onChange={(value) => updateField("country", value)}
              required
            />

            <SelectInput
              label="Sector"
              value={form.sector}
              options={sectors}
              onChange={(value) => updateField("sector", value)}
              required
            />

            <SelectInput
              label="Company size"
              value={form.companySize}
              options={companySizes}
              onChange={(value) => updateField("companySize", value)}
              required
            />

            <SelectInput
              label="Qatar / GCC presence"
              value={form.qatarPresence}
              options={qatarPresenceOptions}
              onChange={(value) => updateField("qatarPresence", value)}
            />
          </div>
        </FormSection>

        <FormSection
          number="02"
          title="Contact details"
          description="Who should Sitora contact about the result?"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              label="Contact name"
              value={form.contactName}
              onChange={(value) => updateField("contactName", value)}
              required
            />

            <TextInput
              label="Role"
              value={form.role}
              onChange={(value) => updateField("role", value)}
              placeholder="Founder, Director, Marketing Manager, Compliance Lead..."
            />

            <TextInput
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              required
            />

            <TextInput
              label="Phone / WhatsApp"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
            />
          </div>
        </FormSection>

        <FormSection
          number="03"
          title="Digital presence"
          description="Select the public channels, platforms or digital journeys used by the organisation."
        >
          <CheckboxGrid
            options={digitalChannelOptions}
            selected={form.digitalChannels}
            onToggle={(value) => toggleArray("digitalChannels", value)}
          />
        </FormSection>

        <FormSection
          number="04"
          title="Data collected"
          description="Select the types of data the organisation collects, stores or processes."
        >
          <CheckboxGrid
            options={dataTypeOptions}
            selected={form.dataTypes}
            onToggle={(value) => toggleArray("dataTypes", value)}
          />
        </FormSection>

        <FormSection
          number="05"
          title="Marketing, advertising and pricing"
          description="Select the marketing and public-claim activities that apply."
        >
          <CheckboxGrid
            options={marketingUseOptions}
            selected={form.marketingUses}
            onToggle={(value) => toggleArray("marketingUses", value)}
          />
        </FormSection>

        <FormSection
          number="06"
          title="AI and automation"
          description="Select how AI or automation tools are used by staff, systems or marketing."
        >
          <CheckboxGrid
            options={aiUseOptions}
            selected={form.aiUses}
            onToggle={(value) => toggleArray("aiUses", value)}
          />
        </FormSection>

        <FormSection
          number="07"
          title="Vendor and system access"
          description="Select external parties, platforms or providers that may access systems or data."
        >
          <CheckboxGrid
            options={systemAccessOptions}
            selected={form.systemAccess}
            onToggle={(value) => toggleArray("systemAccess", value)}
          />
        </FormSection>

        <FormSection
          number="08"
          title="Cyber and access controls"
          description="Select the controls that currently exist or are uncertain."
        >
          <CheckboxGrid
            options={cyberControlOptions}
            selected={form.cyberControls}
            onToggle={(value) => toggleArray("cyberControls", value)}
          />
        </FormSection>

        <FormSection
          number="09"
          title="Existing documents"
          description="Select documents, policies or records the organisation currently has."
        >
          <CheckboxGrid
            options={existingDocumentOptions}
            selected={form.existingDocuments}
            onToggle={(value) => toggleArray("existingDocuments", value)}
          />
        </FormSection>

        <FormSection
          number="10"
          title="Concerns"
          description="Select the areas the organisation is most concerned about."
        >
          <CheckboxGrid
            options={concernOptions}
            selected={form.concerns}
            onToggle={(value) => toggleArray("concerns", value)}
          />
        </FormSection>

        <FormSection
          number="11"
          title="What triggered this check?"
          description="Tell us why you are reviewing trust, compliance or reputation risk now."
        >
          <TextArea
            label="Trigger / context"
            value={form.trigger}
            onChange={(value) => updateField("trigger", value)}
            placeholder="Example: investor due diligence, customer complaint, new campaign, regulator concern, supplier request, AI use, website rebuild, expansion into Qatar/Saudi/UAE..."
          />
        </FormSection>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8">
          <label className="flex gap-4">
            <input
              type="checkbox"
              checked={form.consentToContact}
              onChange={(event) =>
                updateField("consentToContact", event.target.checked)
              }
              className="mt-1 h-5 w-5 accent-[#D4AF37]"
            />
            <span className="text-sm leading-7 text-white/70">
              I confirm that I am authorised to submit this information and
              consent to Sitora contacting me about the Trust 360 Exposure Check
              and any recommended next steps.
            </span>
          </label>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#D4AF37]">
                Indicative result: {calculatedScore}/100 — {exposureLevel}
              </p>
              <p className="mt-2 text-sm leading-7 text-white/45">
                On submission, your answers will be mapped against the{" "}
                {form.country} Trust 360 rules database.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-black text-black transition hover:bg-[#f0cf63] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Get Exposure Result"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

function SuccessScreen({ result }: { result: ApiResult }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.28),_transparent_34%),linear-gradient(135deg,_#050505,_#100c06)]" />

        <div className="mx-auto max-w-6xl">
          <a
            href="/qatar-trust-360"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Trust 360
          </a>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Exposure result
              </p>

              <p className="mt-6 text-7xl font-black text-white">
                {result.score}
                <span className="text-2xl text-white/40">/100</span>
              </p>

              <p className="mt-4 text-2xl font-black text-[#D4AF37]">
                {result.exposureLevel}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <ResultMiniCard
                  label="Mapped against"
                  value={`${result.country} rules`}
                />
                <ResultMiniCard
                  label="Rules matched"
                  value={result.matchedRulesCount}
                />
                <ResultMiniCard
                  label="Highest severity"
                  value={result.highestSeverity}
                />
                <ResultMiniCard label="Lead ID" value={result.id.slice(0, 8)} />
              </div>
            </div>

            <div>
              <p className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
                Trust 360 rules mapping complete
              </p>

              <h1 className="mt-6 text-5xl font-black tracking-tight">
                Your answers have been mapped against the {result.country} Trust
                360 rules database.
              </h1>

              <p className="mt-6 text-lg leading-8 text-white/70">
                Sitora has received your exposure check. The result is
                indicative and will be reviewed before any formal proposal,
                evidence request or audit work begins.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/qatar-trust-360/sample-report"
                  className="rounded-full bg-[#D4AF37] px-8 py-4 text-center text-sm font-black text-black transition hover:bg-[#f0cf63]"
                >
                  View Sample Report
                </a>

                <a
                  href="/qatar-trust-360"
                  className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Back to Trust 360
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <ResultCard title="Priority areas">
              <TagList
                items={result.priorityCategories}
                empty="No priority categories generated."
              />
            </ResultCard>

            <ResultCard title="Recommended evidence">
              <p className="mb-5 text-sm leading-7 text-white/55">
                These are the documents, screenshots, policies and examples that
                may be requested if the organisation proceeds to a full Trust
                360 audit.
              </p>

              <TagList
                items={result.recommendedEvidence.slice(0, 30)}
                empty="No evidence recommendations generated."
              />
            </ResultCard>
          </div>

          <div className="mt-8">
            <ResultCard title="Initial guidance">
              {result.rulesGuidance.length === 0 ? (
                <p className="text-white/50">No guidance generated.</p>
              ) : (
                <div className="space-y-4">
                  {result.rulesGuidance.slice(0, 8).map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/35 p-5"
                    >
                      <p className="text-sm leading-7 text-white/70">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </ResultCard>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
            <p className="text-xl font-black text-white">Next step</p>

            <p className="mt-4 leading-8 text-white/70">
              Sitora will review the assessment and may recommend a consultation
              or proposal. The full audit stage is where documents and evidence
              are requested.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function calculateRiskScore(form: FormState) {
  let score = 0;

  const highRiskSectors = [
    "Healthcare / Clinic",
    "Education / Nursery / School",
    "Financial Services",
    "QFC / Regulated Firm",
    "Government Supplier",
    "Public-facing Organisation",
  ];

  if (highRiskSectors.includes(form.sector)) score += 12;

  if (
    ["51–200 employees", "201–500 employees", "500+ employees"].includes(
      form.companySize
    )
  ) {
    score += 8;
  }

  if (
    [
      "Selling into Qatar",
      "Supplier to Qatar organisations",
      "Qatar branch / office",
      "QFC / regulated presence",
      "Regional GCC business",
    ].includes(form.qatarPresence)
  ) {
    score += 8;
  }

  score += Math.min(form.digitalChannels.length * 2, 14);

  const highRiskData = [
    "QID / passport data",
    "Financial data",
    "Health data",
    "Children data",
    "Location data",
    "Photos / videos",
    "Sensitive data",
    "Not sure",
  ];

  score += form.dataTypes.filter((item) => highRiskData.includes(item)).length * 5;

  const highRiskMarketing = [
    "WhatsApp marketing",
    "Email marketing",
    "SMS marketing",
    "Discounts / offers",
    "Limited-time promotions",
    "Pricing claims",
    "Guarantees",
    "Performance claims",
    "Testimonials",
    "Before / after claims",
    "Influencer content",
    "Arabic and English campaigns",
    "No formal review before publishing",
  ];

  score +=
    form.marketingUses.filter((item) => highRiskMarketing.includes(item))
      .length * 4;

  const highRiskAi = [
    "AI chatbot",
    "AI customer support",
    "AI-generated marketing",
    "AI-generated social posts",
    "AI-generated website content",
    "AI customer data analysis",
    "AI HR / recruitment",
    "No AI policy",
    "Not sure what staff use",
  ];

  score += form.aiUses.filter((item) => highRiskAi.includes(item)).length * 4;

  const highRiskAccess = [
    "Marketing agency",
    "Web developer",
    "IT provider",
    "CRM provider",
    "Cloud provider",
    "Payment provider",
    "Booking platform",
    "AI vendor",
    "External admin access",
    "Overseas vendors",
    "Freelancers",
    "Not sure who has access",
  ];

  score +=
    form.systemAccess.filter((item) => highRiskAccess.includes(item)).length * 3;

  if (form.cyberControls.includes("Not sure")) score += 8;
  if (form.cyberControls.includes("None of the above")) score += 12;
  if (!form.cyberControls.includes("MFA enabled")) score += 5;
  if (!form.cyberControls.includes("Incident response plan")) score += 5;
  if (!form.cyberControls.includes("Breach response process")) score += 5;

  const missingDocumentSignals = [
    "None / not sure",
  ];

  if (
    form.existingDocuments.some((item) => missingDocumentSignals.includes(item))
  ) {
    score += 12;
  }

  if (!form.existingDocuments.includes("Privacy policy")) score += 5;
  if (!form.existingDocuments.includes("Terms and conditions")) score += 4;
  if (!form.existingDocuments.includes("Consent wording")) score += 5;
  if (!form.existingDocuments.includes("Vendor register")) score += 5;
  if (!form.existingDocuments.includes("AI usage policy")) score += 5;
  if (!form.existingDocuments.includes("Incident response plan")) score += 5;

  score += Math.min(form.concerns.length * 2, 12);

  return Math.max(0, Math.min(100, Math.round(score)));
}

function getExposureLevel(score: number) {
  if (score >= 75) return "Urgent exposure";
  if (score >= 50) return "High exposure";
  if (score >= 25) return "Medium exposure";
  return "Low exposure";
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-8">
      <div className="mb-8">
        <p className="text-sm font-bold text-[#D4AF37]">{number}</p>
        <h2 className="mt-3 text-3xl font-black text-white">{title}</h2>
        <p className="mt-3 leading-8 text-white/60">{description}</p>
      </div>

      {children}
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#D4AF37]"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <textarea
        value={value}
        rows={6}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#D4AF37]"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <select
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-[#D4AF37]"
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-black">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map((option) => {
        const isChecked = selected.includes(option);

        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
              isChecked
                ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#D4AF37]"
                : "border-white/10 bg-black/35 text-white/70 hover:border-[#D4AF37]/40 hover:text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function SuccessTagList({
  items,
  empty,
}: {
  items: string[];
  empty: string;
}) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-white/45">{empty}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm font-semibold text-white/70"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function TagList({
  items,
  empty,
}: {
  items: string[] | null;
  empty: string;
}) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-white/45">{empty}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm font-semibold text-white/70"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ResultCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ResultMiniCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-3 text-xl font-black text-white">{value}</p>
    </div>
  );
}