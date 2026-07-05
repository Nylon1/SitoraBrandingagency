import { supabaseAdmin } from "@/lib/supabase/admin";
import UpdateLeadForm from "./update-form";

export const dynamic = "force-dynamic";

type MatchedRule = {
  id: string;
  country: string;
  jurisdictionCode: string;
  category: string;
  subcategory: string | null;
  ruleCode: string;
  ruleTitle: string;
  ruleSummary: string;
  legalReference: string | null;
  regulator: string | null;
  penaltyReference: string | null;
  severity: string;
  scoreImpact: number;
  evidenceRequired: string[];
  guidance: string;
  clientGuidance: string | null;
  internalGuidance: string | null;
  needsLegalReview: boolean;
  matchedBy: string[];
};

type Lead = {
  id: string;

  company_name: string;
  website: string | null;
  sector: string | null;
  company_size: string | null;
  qatar_presence: string | null;

  contact_name: string;
  role: string | null;
  email: string;
  phone: string | null;

  digital_channels: string[] | null;
  data_types: string[] | null;
  marketing_uses: string[] | null;
  ai_uses: string[] | null;
  system_access: string[] | null;
  cyber_controls: string[] | null;
  existing_documents: string[] | null;
  concerns: string[] | null;

  trigger_note: string | null;

  risk_score: number | null;
  exposure_level: string | null;

  country: string | null;
  matched_rules: MatchedRule[] | null;
  rules_score_impact: number | null;
  recommended_evidence: string[] | null;
  rules_guidance: string[] | null;
  priority_rule_categories: string[] | null;

  lead_status: string | null;
  internal_notes: string | null;

  consent_to_contact: boolean | null;
  submitted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export default async function Trust360LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("trust360_exposure_leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Trust 360 lead detail error:", error);

    return (
      <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/admin/trust360-leads"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Trust 360 Leads
          </a>

          <h1 className="mt-8 text-4xl font-black">Lead not found</h1>

          <p className="mt-4 text-white/60">
            This Trust 360 lead could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  const lead = data as Lead;

  const matchedRules = lead.matched_rules || [];
  const recommendedEvidence = lead.recommended_evidence || [];
  const rulesGuidance = lead.rules_guidance || [];
  const priorityCategories = lead.priority_rule_categories || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/admin/trust360-leads"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Trust 360 Leads
          </a>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Sitora Trust 360 Lead
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                {lead.company_name}
              </h1>

              <p className="mt-4 max-w-3xl text-white/60">
                Exposure check submitted{" "}
                {formatDate(lead.submitted_at || lead.created_at)}. Review the
                risk score, country-specific rules, recommended evidence and
                follow-up actions.
              </p>

              {lead.website && (
                <a
                  href={normaliseUrl(lead.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-bold text-[#D4AF37] hover:underline"
                >
                  Open website →
                </a>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ScoreCard
                label="Exposure Score"
                value={`${lead.risk_score ?? 0}/100`}
                note={lead.exposure_level || "Not scored"}
              />

              <ScoreCard
                label="Rules Matched"
                value={matchedRules.length}
                note={`${lead.country || "Qatar"} rules database`}
              />

              <ScoreCard
                label="Rules Impact"
                value={lead.rules_score_impact || 0}
                note="Combined score impact"
              />

              <ScoreCard
                label="Lead Status"
                value={lead.lead_status || "New"}
                note="Current admin status"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <DetailCard title="Company Information">
              <InfoGrid
                items={[
                  ["Company", lead.company_name],
                  ["Website", lead.website],
                  ["Country / Jurisdiction", lead.country || "Qatar"],
                  ["Sector", lead.sector],
                  ["Company size", lead.company_size],
                  ["Qatar / GCC presence", lead.qatar_presence],
                ]}
              />
            </DetailCard>

            <DetailCard title="Contact Information">
              <InfoGrid
                items={[
                  ["Contact name", lead.contact_name],
                  ["Role", lead.role],
                  ["Email", lead.email],
                  ["Phone / WhatsApp", lead.phone],
                  ["Consent to contact", lead.consent_to_contact ? "Yes" : "No"],
                ]}
              />
            </DetailCard>

            <DetailCard title="Exposure Check Answers">
              <div className="grid gap-6 md:grid-cols-2">
                <AnswerBlock
                  title="Digital Channels"
                  items={lead.digital_channels}
                />

                <AnswerBlock title="Data Types" items={lead.data_types} />

                <AnswerBlock
                  title="Marketing Uses"
                  items={lead.marketing_uses}
                />

                <AnswerBlock title="AI Uses" items={lead.ai_uses} />

                <AnswerBlock
                  title="System Access"
                  items={lead.system_access}
                />

                <AnswerBlock
                  title="Cyber Controls"
                  items={lead.cyber_controls}
                />

                <AnswerBlock
                  title="Existing Documents"
                  items={lead.existing_documents}
                />

                <AnswerBlock title="Concerns" items={lead.concerns} />
              </div>

              {lead.trigger_note && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                    Trigger / Notes
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/75">
                    {lead.trigger_note}
                  </p>
                </div>
              )}
            </DetailCard>

            <DetailCard title="Priority Rule Categories">
              <TagList items={priorityCategories} empty="No priority categories found." />
            </DetailCard>

            <DetailCard title="Recommended Evidence">
              <p className="mb-6 leading-8 text-white/60">
                These are the documents, screenshots, policies and examples the
                client should prepare if they proceed to the full Trust 360
                audit.
              </p>

              <TagList
                items={recommendedEvidence}
                empty="No recommended evidence generated."
              />
            </DetailCard>

            <DetailCard title="Client Guidance">
              {rulesGuidance.length === 0 ? (
                <p className="text-white/50">No client guidance generated.</p>
              ) : (
                <div className="space-y-4">
                  {rulesGuidance.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/35 p-5"
                    >
                      <p className="text-sm leading-7 text-white/70">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </DetailCard>

            <DetailCard title="Matched Country Rules">
              {matchedRules.length === 0 ? (
                <p className="text-white/50">
                  No country-specific rules matched. Check that the rules table
                  has been seeded and that the lead answers match the trigger
                  keywords.
                </p>
              ) : (
                <div className="space-y-5">
                  {matchedRules.map((rule) => (
                    <RuleCard key={rule.id || rule.ruleCode} rule={rule} />
                  ))}
                </div>
              )}
            </DetailCard>
          </div>

          <aside className="space-y-6">
            <DetailCard title="Lead Management">
              <UpdateLeadForm
                id={lead.id}
                currentStatus={lead.lead_status || "New"}
                currentNotes={lead.internal_notes || ""}
              />
            </DetailCard>

            <DetailCard title="Quick Actions">
              <div className="space-y-3">
                <a
                  href={`mailto:${lead.email}?subject=Sitora Trust 360 Assessment - ${encodeURIComponent(
                    lead.company_name
                  )}`}
                  className="block rounded-full bg-[#D4AF37] px-5 py-3 text-center text-sm font-black text-black transition hover:bg-[#f0cf63]"
                >
                  Email Lead
                </a>

                <a
                  href={`/qatar-trust-360/proposal`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Open Proposal
                </a>

                <a
                  href="/qatar-trust-360/evidence-request"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-3 text-center text-sm font-black text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
                >
                  Open Evidence Request
                </a>

                <a
                  href="/admin/trust360-evidence"
                  className="block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  View Evidence Packs
                </a>

                {lead.website && (
                  <a
                    href={normaliseUrl(lead.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    Open Website
                  </a>
                )}
              </div>
            </DetailCard>

            <DetailCard title="Recommended Follow-Up">
              <div className="space-y-4 text-sm leading-7 text-white/65">
                <p>
                  Use the matched rules to explain why this company has exposure
                  and what evidence they need to prepare.
                </p>

                <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 p-4">
                  <p className="font-bold text-[#D4AF37]">Suggested message</p>
                  <p className="mt-2">
                    “We mapped your answers against the{" "}
                    {lead.country || "Qatar"} Trust 360 rules database and
                    found priority gaps around{" "}
                    {priorityCategories.slice(0, 3).join(", ") ||
                      "trust and compliance"}
                    . The next step is a short review call.”
                  </p>
                </div>
              </div>
            </DetailCard>

            <DetailCard title="Internal Notes">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {lead.internal_notes || "No internal notes added yet."}
              </p>
            </DetailCard>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ScoreCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string | number;
  note: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
      <p className="text-sm font-bold text-white/45">{label}</p>
      <p className="mt-3 text-3xl font-black text-[#D4AF37]">{value}</p>
      <p className="mt-2 text-xs leading-6 text-white/45">{note}</p>
    </div>
  );
}

function DetailCard({
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

function InfoGrid({ items }: { items: [string, string | null | undefined][] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-white/10 bg-black/35 p-5"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
            {label}
          </p>

          <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-white/75">
            {value || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}

function AnswerBlock({
  title,
  items,
}: {
  title: string;
  items: string[] | null;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
      <p className="text-sm font-black text-white">{title}</p>
      <div className="mt-4">
        <TagList items={items} empty="Nothing selected." />
      </div>
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

function RuleCard({ rule }: { rule: MatchedRule }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            {rule.ruleCode} · {rule.category}
          </p>

          <h3 className="mt-3 text-xl font-black text-white">
            {rule.ruleTitle}
          </h3>

          {rule.subcategory && (
            <p className="mt-1 text-sm text-white/45">{rule.subcategory}</p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <SeverityBadge severity={rule.severity} />

          {rule.needsLegalReview && (
            <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-200">
              Legal review
            </span>
          )}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-white/65">
        {rule.ruleSummary}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <MiniInfo title="Legal Reference" value={rule.legalReference} />
        <MiniInfo title="Regulator" value={rule.regulator} />
        <MiniInfo title="Penalty / Risk Reference" value={rule.penaltyReference} />
        <MiniInfo title="Score Impact" value={String(rule.scoreImpact || 0)} />
      </div>

      <div className="mt-6">
        <p className="text-sm font-black text-white">Evidence Required</p>
        <div className="mt-3">
          <TagList
            items={rule.evidenceRequired}
            empty="No evidence listed for this rule."
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm font-black text-white">Guidance</p>
        <p className="mt-3 text-sm leading-7 text-white/65">
          {rule.clientGuidance || rule.guidance}
        </p>
      </div>

      {rule.internalGuidance && (
        <div className="mt-4 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5">
          <p className="text-sm font-black text-[#D4AF37]">Internal Guidance</p>
          <p className="mt-3 text-sm leading-7 text-white/65">
            {rule.internalGuidance}
          </p>
        </div>
      )}
    </div>
  );
}

function MiniInfo({
  title,
  value,
}: {
  title: string;
  value: string | null | undefined;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/35">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/65">{value || "—"}</p>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Low: "border-green-400/30 bg-green-400/10 text-green-200",
    Medium: "border-yellow-400/30 bg-yellow-400/10 text-yellow-200",
    High: "border-orange-400/30 bg-orange-400/10 text-orange-200",
    Urgent: "border-red-400/30 bg-red-400/10 text-red-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-bold ${
        styles[severity] || "border-white/15 bg-white/10 text-white/60"
      }`}
    >
      {severity}
    </span>
  );
}

function formatDate(date: string | null | undefined) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function normaliseUrl(url: string | null) {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}