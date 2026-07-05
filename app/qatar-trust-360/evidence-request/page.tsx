"use client";

import { FormEvent, useState } from "react";

type FormState = {
  companyName: string;
  tradingName: string;
  website: string;
  sector: string;
  qatarLocation: string;
  mainServices: string;

  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  primaryContactRole: string;

  legalContact: string;
  marketingContact: string;
  itContact: string;

  keyUrls: string;
  privacyPolicyUrl: string;
  termsUrl: string;
  cookieNoticeUrl: string;
  refundPolicyUrl: string;

  documentsAvailable: string[];
  dataProtectionEvidence: string[];
  marketingEvidence: string[];
  aiEvidence: string[];
  cyberEvidence: string[];
  vendorEvidence: string[];
  customerEvidence: string[];
  reputationEvidence: string[];

  vendors: string;
  aiTools: string;
  platforms: string;
  knownConcerns: string;
  missingDocuments: string;
  priorityAreas: string[];

  additionalNotes: string;
  consent: boolean;
};

const initialState: FormState = {
  companyName: "",
  tradingName: "",
  website: "",
  sector: "",
  qatarLocation: "",
  mainServices: "",

  primaryContactName: "",
  primaryContactEmail: "",
  primaryContactPhone: "",
  primaryContactRole: "",

  legalContact: "",
  marketingContact: "",
  itContact: "",

  keyUrls: "",
  privacyPolicyUrl: "",
  termsUrl: "",
  cookieNoticeUrl: "",
  refundPolicyUrl: "",

  documentsAvailable: [],
  dataProtectionEvidence: [],
  marketingEvidence: [],
  aiEvidence: [],
  cyberEvidence: [],
  vendorEvidence: [],
  customerEvidence: [],
  reputationEvidence: [],

  vendors: "",
  aiTools: "",
  platforms: "",
  knownConcerns: "",
  missingDocuments: "",
  priorityAreas: [],

  additionalNotes: "",
  consent: false,
};

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

const documentsAvailable = [
  "Privacy policy",
  "Terms and conditions",
  "Cookie notice",
  "Refund / cancellation policy",
  "Data protection policy",
  "Employee privacy notice",
  "Consent wording / consent forms",
  "Marketing consent records",
  "Complaint handling process",
  "Social media approval process",
  "AI usage policy",
  "Cybersecurity policy",
  "Incident response plan",
  "Vendor register",
  "Data breach response process",
  "Accessibility statement / review",
  "None / not sure",
];

const dataProtectionEvidence = [
  "Website privacy policy",
  "Lead capture forms",
  "Consent wording",
  "CRM field list / data categories",
  "Data retention policy",
  "Employee data process",
  "Customer data process",
  "Data subject request process",
  "Breach response plan",
  "Vendor data-processing agreements",
  "Cross-border transfer details",
  "List of systems holding personal data",
];

const marketingEvidence = [
  "Recent adverts",
  "Landing pages",
  "Social media posts",
  "Google ads examples",
  "Meta / Instagram / Facebook ads examples",
  "TikTok / Snapchat / LinkedIn ads examples",
  "WhatsApp campaign examples",
  "Email campaign examples",
  "SMS campaign examples",
  "Discount / offer examples",
  "Testimonials used in marketing",
  "Influencer content / agreements",
  "Arabic and English campaign versions",
  "Claims approval process",
  "Refund / guarantee wording",
  "Before-and-after examples",
];

const aiEvidence = [
  "List of AI tools used by staff",
  "AI chatbot details",
  "AI-generated content examples",
  "Automation workflow examples",
  "AI usage policy",
  "AI vendor list",
  "Examples of AI content used externally",
  "Rules on customer data in AI tools",
  "Human approval process for AI outputs",
  "Not sure what AI tools staff use",
];

const cyberEvidence = [
  "Admin user list",
  "MFA status",
  "Password policy",
  "Cybersecurity policy",
  "Incident response plan",
  "Backup process",
  "Staff training evidence",
  "Phishing awareness process",
  "Cloud storage systems",
  "Device access process",
  "External users with access",
  "Breach notification process",
];

const vendorEvidence = [
  "Vendor list",
  "Marketing agency details",
  "Website developer details",
  "IT provider details",
  "CRM provider details",
  "Payment provider details",
  "Booking platform details",
  "Cloud providers",
  "AI vendors",
  "Overseas vendors",
  "Supplier contracts",
  "Data-processing clauses",
  "Access review process",
];

const customerEvidence = [
  "Customer journey map",
  "Enquiry scripts / templates",
  "WhatsApp templates",
  "Email templates",
  "Refund process",
  "Cancellation process",
  "Complaint handling process",
  "Review response process",
  "Recent anonymised complaints",
  "Service guarantees",
  "Escalation process",
  "Customer onboarding material",
];

const reputationEvidence = [
  "Crisis response plan",
  "Media escalation process",
  "Social media escalation process",
  "Spokesperson / leadership approval process",
  "Review attack process",
  "Public statement templates",
  "Incident escalation chart",
  "Past reputation issues",
  "Stakeholder communication process",
];

const priorityAreas = [
  "Data protection",
  "Advertising claims",
  "Cybersecurity",
  "AI usage",
  "Vendor access",
  "Customer complaints",
  "Website trust",
  "Reputation / crisis readiness",
  "Investor / partner due diligence",
  "Government / enterprise supplier readiness",
];

export default function EvidenceRequestPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
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

    if (!form.consent) {
      alert("Please confirm consent before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("payload", JSON.stringify(form));

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/trust360-evidence", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit evidence request.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("There was a problem submitting the evidence pack. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <section className="relative isolate overflow-hidden px-6 py-28 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.28),_transparent_34%),linear-gradient(135deg,_#050505,_#100c06)]" />

          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D4AF37]/30 bg-white/[0.05] p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Evidence received
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Your Trust 360 evidence pack has been submitted.
            </h1>

            <p className="mt-6 leading-8 text-white/70">
              Sitora will review the evidence provided and confirm whether any
              additional documents, screenshots or clarification are required.
            </p>

            <div className="mt-8 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6">
              <p className="font-bold text-[#D4AF37]">Next step</p>
              <p className="mt-3 leading-8 text-white/70">
                We will begin mapping the evidence against the Trust 360 audit
                framework covering data protection, advertising claims,
                cybersecurity, AI, vendors, customer experience and reputation
                readiness.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/qatar-trust-360"
                className="rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Back to Trust 360
              </a>

              <a
                href="/qatar-trust-360/sample-report"
                className="rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold text-black transition hover:bg-[#f0cf63]"
              >
                View Sample Report
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-6 py-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.28),_transparent_34%),linear-gradient(135deg,_#050505,_#100c06)]" />

        <div className="mx-auto max-w-5xl">
          <a
            href="/qatar-trust-360"
            className="text-sm font-semibold text-[#D4AF37] hover:underline"
          >
            ← Back to Qatar Trust 360
          </a>

          <p className="mt-10 inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
            Trust 360 Audit Evidence Request
          </p>

          <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">
            Submit your audit evidence pack.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            This form allows Sitora to begin the Trust 360 audit. Please provide
            what you currently have. Missing documents are also useful evidence
            because they show where controls or records may be absent.
          </p>

          <div className="mt-8 rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6">
            <p className="font-bold text-[#D4AF37]">
              Do not create documents just to complete this form.
            </p>
            <p className="mt-3 leading-8 text-white/70">
              Send the real current position. The audit is designed to identify
              what exists, what is missing, what is weak and what should be
              fixed first.
            </p>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl px-6 py-16 lg:px-8"
      >
        <FormSection
          number="01"
          title="Company information"
          description="Tell us about the organisation being audited."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              label="Registered company name"
              value={form.companyName}
              onChange={(value) => updateField("companyName", value)}
              required
            />

            <TextInput
              label="Trading name"
              value={form.tradingName}
              onChange={(value) => updateField("tradingName", value)}
            />

            <TextInput
              label="Website URL"
              value={form.website}
              onChange={(value) => updateField("website", value)}
              placeholder="https://"
              required
            />

            <SelectInput
              label="Sector"
              value={form.sector}
              options={sectors}
              onChange={(value) => updateField("sector", value)}
              required
            />

            <TextInput
              label="Qatar location / operating location"
              value={form.qatarLocation}
              onChange={(value) => updateField("qatarLocation", value)}
              placeholder="Doha, Qatar / Qatar-wide / international operating in Qatar"
            />

            <TextArea
              label="Main services or products"
              value={form.mainServices}
              onChange={(value) => updateField("mainServices", value)}
              placeholder="Briefly describe what the organisation sells or provides."
            />
          </div>
        </FormSection>

        <FormSection
          number="02"
          title="Audit contacts"
          description="Provide the best contacts for this audit."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              label="Primary contact name"
              value={form.primaryContactName}
              onChange={(value) => updateField("primaryContactName", value)}
              required
            />

            <TextInput
              label="Primary contact role"
              value={form.primaryContactRole}
              onChange={(value) => updateField("primaryContactRole", value)}
            />

            <TextInput
              label="Primary contact email"
              type="email"
              value={form.primaryContactEmail}
              onChange={(value) => updateField("primaryContactEmail", value)}
              required
            />

            <TextInput
              label="Primary contact phone / WhatsApp"
              value={form.primaryContactPhone}
              onChange={(value) => updateField("primaryContactPhone", value)}
            />

            <TextInput
              label="Legal / compliance contact, if different"
              value={form.legalContact}
              onChange={(value) => updateField("legalContact", value)}
            />

            <TextInput
              label="Marketing contact, if different"
              value={form.marketingContact}
              onChange={(value) => updateField("marketingContact", value)}
            />

            <TextInput
              label="IT / cyber contact, if different"
              value={form.itContact}
              onChange={(value) => updateField("itContact", value)}
            />
          </div>
        </FormSection>

        <FormSection
          number="03"
          title="Website and digital presence"
          description="Share the main URLs and public-facing digital assets."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <TextArea
              label="Key website pages, landing pages, app links, portals or booking/payment links"
              value={form.keyUrls}
              onChange={(value) => updateField("keyUrls", value)}
              placeholder="Paste each URL on a new line."
            />

            <TextInput
              label="Privacy policy URL"
              value={form.privacyPolicyUrl}
              onChange={(value) => updateField("privacyPolicyUrl", value)}
              placeholder="https://"
            />

            <TextInput
              label="Terms and conditions URL"
              value={form.termsUrl}
              onChange={(value) => updateField("termsUrl", value)}
              placeholder="https://"
            />

            <TextInput
              label="Cookie notice URL"
              value={form.cookieNoticeUrl}
              onChange={(value) => updateField("cookieNoticeUrl", value)}
              placeholder="https://"
            />

            <TextInput
              label="Refund / cancellation policy URL"
              value={form.refundPolicyUrl}
              onChange={(value) => updateField("refundPolicyUrl", value)}
              placeholder="https://"
            />
          </div>
        </FormSection>

        <FormSection
          number="04"
          title="Documents currently available"
          description="Tick the documents, policies or records your organisation currently has."
        >
          <CheckboxGrid
            options={documentsAvailable}
            selected={form.documentsAvailable}
            onToggle={(value) => toggleArray("documentsAvailable", value)}
          />
        </FormSection>

        <FormSection
          number="05"
          title="Data protection evidence"
          description="Tick anything you can provide or explain."
        >
          <CheckboxGrid
            options={dataProtectionEvidence}
            selected={form.dataProtectionEvidence}
            onToggle={(value) => toggleArray("dataProtectionEvidence", value)}
          />
        </FormSection>

        <FormSection
          number="06"
          title="Marketing and advertising evidence"
          description="Tick campaign material, examples or approval records you can provide."
        >
          <CheckboxGrid
            options={marketingEvidence}
            selected={form.marketingEvidence}
            onToggle={(value) => toggleArray("marketingEvidence", value)}
          />
        </FormSection>

        <FormSection
          number="07"
          title="AI and automation evidence"
          description="Tell us how AI and automation tools are being used."
        >
          <CheckboxGrid
            options={aiEvidence}
            selected={form.aiEvidence}
            onToggle={(value) => toggleArray("aiEvidence", value)}
          />

          <div className="mt-8">
            <TextArea
              label="List the AI tools currently used, if known"
              value={form.aiTools}
              onChange={(value) => updateField("aiTools", value)}
              placeholder="Example: ChatGPT, Gemini, Copilot, Jasper, chatbot platform, automation tools..."
            />
          </div>
        </FormSection>

        <FormSection
          number="08"
          title="Cyber and access control evidence"
          description="Tick the cyber, access and incident-response information you can provide."
        >
          <CheckboxGrid
            options={cyberEvidence}
            selected={form.cyberEvidence}
            onToggle={(value) => toggleArray("cyberEvidence", value)}
          />

          <div className="mt-8">
            <TextArea
              label="List the key systems/platforms used"
              value={form.platforms}
              onChange={(value) => updateField("platforms", value)}
              placeholder="Example: CRM, email platform, website CMS, payment system, cloud storage, booking system, HR system..."
            />
          </div>
        </FormSection>

        <FormSection
          number="09"
          title="Vendor and third-party evidence"
          description="Tick the vendor, supplier and external-access information you can provide."
        >
          <CheckboxGrid
            options={vendorEvidence}
            selected={form.vendorEvidence}
            onToggle={(value) => toggleArray("vendorEvidence", value)}
          />

          <div className="mt-8">
            <TextArea
              label="List main vendors, agencies, developers, CRM, IT, payment or overseas providers"
              value={form.vendors}
              onChange={(value) => updateField("vendors", value)}
              placeholder="Add names and what they access or provide."
            />
          </div>
        </FormSection>

        <FormSection
          number="10"
          title="Customer experience and complaints"
          description="Tick the customer journey, complaint and review materials you can provide."
        >
          <CheckboxGrid
            options={customerEvidence}
            selected={form.customerEvidence}
            onToggle={(value) => toggleArray("customerEvidence", value)}
          />
        </FormSection>

        <FormSection
          number="11"
          title="Reputation and crisis readiness"
          description="Tick any crisis, escalation or public-response material you can provide."
        >
          <CheckboxGrid
            options={reputationEvidence}
            selected={form.reputationEvidence}
            onToggle={(value) => toggleArray("reputationEvidence", value)}
          />
        </FormSection>

        <FormSection
          number="12"
          title="Priority areas and known gaps"
          description="Tell Sitora what you want prioritised."
        >
          <CheckboxGrid
            options={priorityAreas}
            selected={form.priorityAreas}
            onToggle={(value) => toggleArray("priorityAreas", value)}
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <TextArea
              label="Known concerns or issues"
              value={form.knownConcerns}
              onChange={(value) => updateField("knownConcerns", value)}
              placeholder="Example: investor due diligence, complaint, data concern, campaign risk, supplier request, AI usage, cyber incident..."
            />

            <TextArea
              label="Documents you know are missing or incomplete"
              value={form.missingDocuments}
              onChange={(value) => updateField("missingDocuments", value)}
              placeholder="Example: no AI policy, no vendor register, outdated privacy policy, no breach response plan..."
            />
          </div>
        </FormSection>

        <FormSection
          number="13"
          title="Upload evidence files"
          description="Upload policies, screenshots, adverts, campaign examples, PDFs or supporting documents."
        >
          <div className="rounded-[2rem] border border-dashed border-[#D4AF37]/35 bg-[#D4AF37]/10 p-8">
            <input
              type="file"
              multiple
              onChange={(event) => {
                const selectedFiles = Array.from(event.target.files || []);
                setFiles(selectedFiles);
              }}
              className="block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-[#D4AF37] file:px-5 file:py-3 file:text-sm file:font-bold file:text-black hover:file:bg-[#f0cf63]"
            />

            <p className="mt-4 text-sm leading-7 text-white/55">
              Suggested files: policies, screenshots, campaign PDFs, social media
              examples, consent wording, vendor lists, process documents,
              complaints, customer journey material or AI policy documents.
            </p>

            {files.length > 0 && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-5">
                <p className="font-bold text-white">Selected files</p>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  {files.map((file) => (
                    <li key={file.name}>
                      {file.name} — {(file.size / 1024 / 1024).toFixed(2)} MB
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          number="14"
          title="Additional notes"
          description="Add anything else Sitora should understand before starting the audit."
        >
          <TextArea
            label="Additional notes"
            value={form.additionalNotes}
            onChange={(value) => updateField("additionalNotes", value)}
            placeholder="Add context, internal concerns, upcoming campaigns, deadlines, stakeholder requirements or anything we should know."
          />
        </FormSection>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8">
          <label className="flex gap-4">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              className="mt-1 h-5 w-5 accent-[#D4AF37]"
            />
            <span className="text-sm leading-7 text-white/70">
              I confirm that I am authorised to submit this information for the
              Trust 360 audit and consent to Sitora reviewing the submitted
              information and files for the purpose of delivering the audit.
            </span>
          </label>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-7 text-white/45">
              Sitora will treat submitted information as confidential audit
              evidence. Do not upload documents you are not authorised to share.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-black text-black transition hover:bg-[#f0cf63] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Evidence Pack"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
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
        rows={5}
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