import { createClient } from "@supabase/supabase-js";
import { updateAIReadinessEnquiry } from "./actions";

export const dynamic = "force-dynamic";

type AIReadinessEnquiry = {
  id: string;
  created_at: string;
  name: string;
  business_name: string;
  email: string;
  website: string | null;
  industry: string;
  currently_uses_ai: string | null;
  ai_uses: string[] | null;
  has_chatbot: string | null;
  staff_use_ai: string | null;
  enters_sensitive_data: string | null;
  influences_decisions: string | null;
  has_policy: string | null;
  support_needed: string[] | null;
  concerns: string | null;
  status: string | null;
  notes: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatList(items: string[] | null) {
  if (!items || items.length === 0) return "Not provided";
  return items.join(", ");
}

function getRiskSignals(enquiry: AIReadinessEnquiry) {
  const signals: string[] = [];

  if (
    enquiry.enters_sensitive_data === "Yes" ||
    enquiry.enters_sensitive_data === "Possibly"
  ) {
    signals.push("Data exposure");
  }

  if (
    enquiry.influences_decisions === "Yes" ||
    enquiry.influences_decisions === "Possibly"
  ) {
    signals.push("Decision risk");
  }

  if (enquiry.has_policy === "No" || enquiry.has_policy === "Not sure") {
    signals.push("No AI policy");
  }

  if (enquiry.has_chatbot === "Yes" || enquiry.has_chatbot === "Planning to") {
    signals.push("Chatbot review");
  }

  if (
    enquiry.staff_use_ai === "Yes" ||
    enquiry.staff_use_ai === "Some staff may use it"
  ) {
    signals.push("Staff AI use");
  }

  const aiUses = enquiry.ai_uses || [];

  const highRiskAreas = [
    "Recruitment/HR",
    "Healthcare/patient support",
    "Finance/eligibility",
  ];

  if (aiUses.some((use) => highRiskAreas.includes(use))) {
    signals.push("Higher-risk sector use");
  }

  return signals;
}

export default async function AIReadinessAdminPage() {
  const { data, error } = await supabase
    .from("ai_readiness_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("AI readiness fetch error:", error);
    throw new Error("Unable to fetch AI readiness enquiries");
  }

  const enquiries = (data || []) as AIReadinessEnquiry[];

  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Sitora Admin
            </p>
            <h1 className="mt-3 text-4xl font-semibold">
              AI Readiness Enquiries
            </h1>
            <p className="mt-3 max-w-2xl text-white/65">
              Review new AI readiness leads, identify risk signals, update
              status and add internal notes.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-sm text-white/60">Total enquiries</p>
            <p className="text-3xl font-semibold text-[#f3d77b]">
              {enquiries.length}
            </p>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <h2 className="text-2xl font-semibold">No enquiries yet</h2>
            <p className="mt-3 text-white/65">
              New AI readiness submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {enquiries.map((enquiry) => {
              const riskSignals = getRiskSignals(enquiry);

              return (
                <article
                  key={enquiry.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl"
                >
                  <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:flex-row">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-semibold">
                          {enquiry.business_name}
                        </h2>
                        <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-semibold text-[#f3d77b]">
                          {enquiry.status || "New"}
                        </span>
                      </div>

                      <p className="mt-2 text-white/65">
                        {enquiry.industry} • Submitted{" "}
                        {formatDate(enquiry.created_at)}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {riskSignals.length > 0 ? (
                          riskSignals.map((signal) => (
                            <span
                              key={signal}
                              className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs text-red-200"
                            >
                              {signal}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs text-green-200">
                            No major signal detected
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-white/70 lg:text-right">
                      <p>
                        <strong className="text-white">Contact:</strong>{" "}
                        {enquiry.name}
                      </p>
                      <p>
                        <strong className="text-white">Email:</strong>{" "}
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="text-[#f3d77b] hover:underline"
                        >
                          {enquiry.email}
                        </a>
                      </p>
                      {enquiry.website && (
                        <p>
                          <strong className="text-white">Website:</strong>{" "}
                          <a
                            href={enquiry.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#f3d77b] hover:underline"
                          >
                            {enquiry.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                      <h3 className="font-semibold text-[#f3d77b]">
                        AI Usage
                      </h3>
                      <dl className="mt-4 space-y-3 text-sm text-white/75">
                        <div>
                          <dt className="text-white/45">Currently uses AI</dt>
                          <dd>{enquiry.currently_uses_ai || "Not provided"}</dd>
                        </div>
                        <div>
                          <dt className="text-white/45">Where AI is used</dt>
                          <dd>{formatList(enquiry.ai_uses)}</dd>
                        </div>
                        <div>
                          <dt className="text-white/45">AI chatbot</dt>
                          <dd>{enquiry.has_chatbot || "Not provided"}</dd>
                        </div>
                        <div>
                          <dt className="text-white/45">Staff use AI</dt>
                          <dd>{enquiry.staff_use_ai || "Not provided"}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                      <h3 className="font-semibold text-[#f3d77b]">
                        Risk & Governance
                      </h3>
                      <dl className="mt-4 space-y-3 text-sm text-white/75">
                        <div>
                          <dt className="text-white/45">
                            Customer/patient/staff/client data entered into AI
                          </dt>
                          <dd>
                            {enquiry.enters_sensitive_data || "Not provided"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-white/45">
                            AI influences decisions
                          </dt>
                          <dd>
                            {enquiry.influences_decisions || "Not provided"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-white/45">
                            AI policy/tool register
                          </dt>
                          <dd>{enquiry.has_policy || "Not provided"}</dd>
                        </div>
                        <div>
                          <dt className="text-white/45">Support needed</dt>
                          <dd>{formatList(enquiry.support_needed)}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {enquiry.concerns && (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-5">
                      <h3 className="font-semibold text-[#f3d77b]">
                        Additional concerns
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/75">
                        {enquiry.concerns}
                      </p>
                    </div>
                  )}

                  <form
                    action={updateAIReadinessEnquiry}
                    className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 lg:grid-cols-[220px_1fr_auto]"
                  >
                    <input type="hidden" name="id" value={enquiry.id} />

                    <div>
                      <label className="mb-2 block text-sm text-white/60">
                        Status
                      </label>
                      <select
                        name="status"
                        defaultValue={enquiry.status || "New"}
                        className="w-full rounded-xl border border-white/10 bg-[#05070d] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
                      >
                        <option>New</option>
                        <option>Reviewed</option>
                        <option>Audit Offered</option>
                        <option>Converted</option>
                        <option>Closed</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/60">
                        Internal notes
                      </label>
                      <textarea
                        name="notes"
                        defaultValue={enquiry.notes || ""}
                        rows={3}
                        placeholder="Add notes, next steps, price discussed, follow-up date..."
                        className="w-full rounded-xl border border-white/10 bg-[#05070d] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-[#d4af37] px-6 py-3 font-semibold text-black transition hover:bg-[#f0cf65] lg:w-auto"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}