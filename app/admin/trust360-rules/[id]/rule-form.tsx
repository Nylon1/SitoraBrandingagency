"use client";

import { useTransition } from "react";
import { updateTrust360RuleAction } from "./update-rule-action";

type Trust360Rule = {
  id: string;
  country: string;
  jurisdiction_code: string;
  category: string;
  subcategory: string | null;
  rule_code: string;
  rule_title: string;
  rule_summary: string;
  legal_reference: string | null;
  regulator: string | null;
  penalty_reference: string | null;
  trigger_fields: string[] | null;
  trigger_keywords: string[] | null;
  evidence_required: string[] | null;
  guidance: string | null;
  client_guidance: string | null;
  internal_guidance: string | null;
  severity: string;
  score_impact: number;
  package_relevance: string[] | null;
  applies_to_sectors: string[] | null;
  is_active: boolean;
  needs_legal_review: boolean;
};

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

export default function RuleForm({ rule }: { rule: Trust360Rule }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await updateTrust360RuleAction(rule.id, formData);
        });
      }}
      className="space-y-8"
    >
      <FormCard title="Rule Identity">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectInput
            label="Country"
            name="country"
            defaultValue={rule.country}
            options={countries}
          />

          <TextInput
            label="Jurisdiction code"
            name="jurisdiction_code"
            defaultValue={rule.jurisdiction_code}
            placeholder="QA / SA / AE"
          />

          <SelectInput
            label="Category"
            name="category"
            defaultValue={rule.category}
            options={categories}
          />

          <TextInput
            label="Subcategory"
            name="subcategory"
            defaultValue={rule.subcategory || ""}
          />

          <TextInput
            label="Rule code"
            name="rule_code"
            defaultValue={rule.rule_code}
            placeholder="QA-DP-001"
          />

          <TextInput
            label="Rule title"
            name="rule_title"
            defaultValue={rule.rule_title}
          />
        </div>

        <div className="mt-5">
          <TextArea
            label="Rule summary"
            name="rule_summary"
            defaultValue={rule.rule_summary}
            rows={5}
          />
        </div>
      </FormCard>

      <FormCard title="Legal / Regulatory Mapping">
        <div className="grid gap-5 md:grid-cols-2">
          <TextArea
            label="Legal reference"
            name="legal_reference"
            defaultValue={rule.legal_reference || ""}
            rows={4}
          />

          <TextArea
            label="Regulator"
            name="regulator"
            defaultValue={rule.regulator || ""}
            rows={4}
          />

          <TextArea
            label="Penalty / risk reference"
            name="penalty_reference"
            defaultValue={rule.penalty_reference || ""}
            rows={4}
          />
        </div>
      </FormCard>

      <FormCard title="Trigger Logic">
        <p className="mb-5 text-sm leading-7 text-white/55">
          Put each field or keyword on a new line. These are used by the rules
          engine to match exposure check answers against this rule.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <TextArea
            label="Trigger fields"
            name="trigger_fields"
            defaultValue={toLines(rule.trigger_fields)}
            placeholder="existingDocuments&#10;concerns&#10;cyberControls"
            rows={7}
          />

          <TextArea
            label="Trigger keywords"
            name="trigger_keywords"
            defaultValue={toLines(rule.trigger_keywords)}
            placeholder="none&#10;not sure&#10;none / not sure"
            rows={7}
          />
        </div>
      </FormCard>

      <FormCard title="Evidence and Guidance">
        <div className="grid gap-5 md:grid-cols-2">
          <TextArea
            label="Evidence required"
            name="evidence_required"
            defaultValue={toLines(rule.evidence_required)}
            placeholder="privacy policy&#10;terms and conditions&#10;consent wording"
            rows={9}
          />

          <TextArea
            label="Package relevance"
            name="package_relevance"
            defaultValue={toLines(rule.package_relevance)}
            placeholder="Startup Trust Check&#10;SME Trust 360 Audit"
            rows={9}
          />

          <TextArea
            label="Applies to sectors"
            name="applies_to_sectors"
            defaultValue={toLines(rule.applies_to_sectors)}
            placeholder="Healthcare / Clinic&#10;Financial Services"
            rows={7}
          />
        </div>

        <div className="mt-5 grid gap-5">
          <TextArea
            label="General guidance"
            name="guidance"
            defaultValue={rule.guidance || ""}
            rows={5}
          />

          <TextArea
            label="Client guidance"
            name="client_guidance"
            defaultValue={rule.client_guidance || ""}
            rows={5}
          />

          <TextArea
            label="Internal guidance"
            name="internal_guidance"
            defaultValue={rule.internal_guidance || ""}
            rows={5}
          />
        </div>
      </FormCard>

      <FormCard title="Scoring and Status">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectInput
            label="Severity"
            name="severity"
            defaultValue={rule.severity}
            options={severityOptions}
          />

          <TextInput
            label="Score impact"
            name="score_impact"
            type="number"
            defaultValue={String(rule.score_impact || 0)}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex gap-4 rounded-2xl border border-white/10 bg-black/35 p-5">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={rule.is_active}
              className="mt-1 h-5 w-5 accent-[#D4AF37]"
            />
            <span>
              <span className="block font-bold text-white">Active rule</span>
              <span className="mt-1 block text-sm leading-6 text-white/50">
                Active rules are used by the exposure rules engine.
              </span>
            </span>
          </label>

          <label className="flex gap-4 rounded-2xl border border-white/10 bg-black/35 p-5">
            <input
              type="checkbox"
              name="needs_legal_review"
              defaultChecked={rule.needs_legal_review}
              className="mt-1 h-5 w-5 accent-[#D4AF37]"
            />
            <span>
              <span className="block font-bold text-white">
                Needs legal review
              </span>
              <span className="mt-1 block text-sm leading-6 text-white/50">
                Mark where formal legal/compliance validation is needed.
              </span>
            </span>
          </label>
        </div>
      </FormCard>

      <div className="sticky bottom-4 rounded-[2rem] border border-[#D4AF37]/30 bg-[#050505]/95 p-5 backdrop-blur">
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-black text-black transition hover:bg-[#f0cf63] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Rule"}
        </button>
      </div>
    </form>
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
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

function toLines(items: string[] | null) {
  return (items || []).join("\n");
}