import { createTrust360RuleAction } from "./create-rule-action";

export const dynamic = "force-dynamic";

const countries = ["Qatar", "Saudi Arabia", "UAE"];
const severityOptions = ["Low", "Medium", "High", "Urgent"];

const categories = [
  "Documentation & Governance",
  "Data Protection & Privacy",
  "Marketing Consent",
  "Advertising & Public Claims",
  "Pricing & Promotions",
  "E-commerce / Online Sales",
  "Cybersecurity & Access Control",
  "AI & Automation Use",
  "Vendor & Third-Party Risk",
  "Customer Experience & Complaint Risk",
  "Reputation & Crisis Readiness",
  "Sector-Specific Risk",
];

const packageOptionsText = [
  "Startup Trust Check",
  "SME Trust 360 Audit",
  "Corporate Trust 360 Audit",
  "Regulated Sector Trust Audit",
].join("\n");

export default function NewTrust360RulePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <a
            href="/admin/trust360-rules"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Rules Library
          </a>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            New Trust 360 Rule
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Add a new country rule
          </h1>

          <p className="mt-4 max-w-3xl text-white/60">
            Add a new Qatar, Saudi Arabia or UAE rule used by the Trust 360
            exposure engine. Rules become active immediately if “Active rule” is
            selected.
          </p>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <form action={createTrust360RuleAction} className="space-y-8">
            <FormCard title="Rule Identity">
              <div className="grid gap-5 md:grid-cols-2">
                <SelectInput
                  label="Country"
                  name="country"
                  defaultValue="Qatar"
                  options={countries}
                />

                <TextInput
                  label="Jurisdiction code"
                  name="jurisdiction_code"
                  defaultValue="QA"
                  placeholder="QA / SA / AE"
                />

                <SelectInput
                  label="Category"
                  name="category"
                  defaultValue="Documentation & Governance"
                  options={categories}
                />

                <TextInput
                  label="Subcategory"
                  name="subcategory"
                  placeholder="Missing Documents / Privacy Notice / Pricing Claims"
                />

                <TextInput
                  label="Rule code"
                  name="rule_code"
                  placeholder="QA-DP-004"
                  required
                />

                <TextInput
                  label="Rule title"
                  name="rule_title"
                  placeholder="Personal data collection should be transparent"
                  required
                />
              </div>

              <div className="mt-5">
                <TextArea
                  label="Rule summary"
                  name="rule_summary"
                  placeholder="Explain what this rule checks and why it matters."
                  rows={5}
                  required
                />
              </div>
            </FormCard>

            <FormCard title="Legal / Regulatory Mapping">
              <div className="grid gap-5 md:grid-cols-2">
                <TextArea
                  label="Legal reference"
                  name="legal_reference"
                  placeholder="Example: Law No. 13 of 2016 on Protecting Personal Data Privacy"
                  rows={4}
                />

                <TextArea
                  label="Regulator"
                  name="regulator"
                  placeholder="Example: Relevant Qatar authority depending on activity"
                  rows={4}
                />

                <TextArea
                  label="Penalty / risk reference"
                  name="penalty_reference"
                  placeholder="Use cautious language. Example: May create regulatory, commercial or reputational exposure."
                  rows={4}
                />
              </div>
            </FormCard>

            <FormCard title="Trigger Logic">
              <p className="mb-5 text-sm leading-7 text-white/55">
                The rules engine checks these fields and keywords against the
                exposure check answers. Put each item on a new line.
              </p>

              <div className="grid gap-5 md:grid-cols-3">
                <TextArea
                  label="Trigger fields"
                  name="trigger_fields"
                  defaultValue={`existingDocuments\nconcerns\ncyberControls`}
                  rows={8}
                />

                <TextArea
                  label="Trigger keywords"
                  name="trigger_keywords"
                  placeholder={`none\nnot sure\nprivacy policy\ncustomer data`}
                  rows={8}
                />

                <TextArea
                  label="Condition: any selected"
                  name="condition_any_selected"
                  placeholder={`None / not sure\nNot sure\nCustomer data`}
                  rows={8}
                />
              </div>
            </FormCard>

            <FormCard title="Evidence and Guidance">
              <div className="grid gap-5 md:grid-cols-2">
                <TextArea
                  label="Evidence required"
                  name="evidence_required"
                  placeholder={`privacy policy\nterms and conditions\nconsent wording\nvendor register`}
                  rows={9}
                />

                <TextArea
                  label="Package relevance"
                  name="package_relevance"
                  defaultValue={packageOptionsText}
                  rows={9}
                />

                <TextArea
                  label="Applies to sectors"
                  name="applies_to_sectors"
                  placeholder={`Healthcare / Clinic\nFinancial Services\nRetail / E-commerce`}
                  rows={7}
                />
              </div>

              <div className="mt-5 grid gap-5">
                <TextArea
                  label="General guidance"
                  name="guidance"
                  placeholder="Internal/external general explanation of what should be reviewed."
                  rows={5}
                />

                <TextArea
                  label="Client guidance"
                  name="client_guidance"
                  placeholder="Plain-English guidance shown to clients or used in follow-up."
                  rows={5}
                />

                <TextArea
                  label="Internal guidance"
                  name="internal_guidance"
                  placeholder="Private notes for Sitora reviewers."
                  rows={5}
                />
              </div>
            </FormCard>

            <FormCard title="Scoring and Status">
              <div className="grid gap-5 md:grid-cols-2">
                <SelectInput
                  label="Severity"
                  name="severity"
                  defaultValue="Medium"
                  options={severityOptions}
                />

                <TextInput
                  label="Score impact"
                  name="score_impact"
                  type="number"
                  defaultValue="8"
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="flex gap-4 rounded-2xl border border-white/10 bg-black/35 p-5">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked
                    className="mt-1 h-5 w-5 accent-[#D4AF37]"
                  />
                  <span>
                    <span className="block font-bold text-white">
                      Active rule
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-white/50">
                      Active rules are used by the exposure rules engine.
                    </span>
                  </span>
                </label>

                <label className="flex gap-4 rounded-2xl border border-white/10 bg-black/35 p-5">
                  <input
                    type="checkbox"
                    name="needs_legal_review"
                    defaultChecked
                    className="mt-1 h-5 w-5 accent-[#D4AF37]"
                  />
                  <span>
                    <span className="block font-bold text-white">
                      Needs legal review
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-white/50">
                      Mark if a specialist should validate this rule.
                    </span>
                  </span>
                </label>
              </div>
            </FormCard>

            <div className="sticky bottom-4 rounded-[2rem] border border-[#D4AF37]/30 bg-[#050505]/95 p-5 backdrop-blur">
              <button
                type="submit"
                className="w-full rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-black text-black transition hover:bg-[#f0cf63]"
              >
                Create Rule
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function FormCard({
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

function TextInput({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#D4AF37]"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 5,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#D4AF37]"
      />
    </label>
  );
}

function SelectInput({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-[#D4AF37]"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-black">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}