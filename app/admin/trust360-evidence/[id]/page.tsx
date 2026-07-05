import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type UploadedFile = {
  name: string;
  size: number;
  type: string;
  storagePath: string;
};

type EvidencePack = {
  id: string;

  company_name: string;
  trading_name: string | null;
  website: string;
  sector: string | null;
  qatar_location: string | null;
  main_services: string | null;

  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string | null;
  primary_contact_role: string | null;

  legal_contact: string | null;
  marketing_contact: string | null;
  it_contact: string | null;

  key_urls: string | null;
  privacy_policy_url: string | null;
  terms_url: string | null;
  cookie_notice_url: string | null;
  refund_policy_url: string | null;

  documents_available: string[] | null;
  data_protection_evidence: string[] | null;
  marketing_evidence: string[] | null;
  ai_evidence: string[] | null;
  cyber_evidence: string[] | null;
  vendor_evidence: string[] | null;
  customer_evidence: string[] | null;
  reputation_evidence: string[] | null;
  priority_areas: string[] | null;

  vendors: string | null;
  ai_tools: string | null;
  platforms: string | null;
  known_concerns: string | null;
  missing_documents: string | null;
  additional_notes: string | null;

  uploaded_files: UploadedFile[] | null;

  status: string;
  internal_notes: string | null;
  consent: boolean;

  submitted_at: string;
};

export default async function EvidencePackDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("trust360_evidence_packs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Evidence pack detail error:", error);

    return (
      <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/admin/trust360-evidence"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Evidence Packs
          </a>

          <h1 className="mt-8 text-4xl font-black">
            Evidence pack not found
          </h1>

          <p className="mt-4 text-white/60">
            This evidence pack could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  const pack = data as EvidencePack;
  const uploadedFiles = pack.uploaded_files || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/admin/trust360-evidence"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Evidence Packs
          </a>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Trust 360 Evidence Pack
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                {pack.company_name}
              </h1>

              {pack.trading_name && (
                <p className="mt-3 text-white/50">
                  Trading name: {pack.trading_name}
                </p>
              )}

              <p className="mt-5 max-w-3xl text-white/60">
                Submitted on {formatDate(pack.submitted_at)}. Review the
                supplied documents, missing evidence, known concerns and audit
                priority areas.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Current Status
              </p>

              <div className="mt-4">
                <StatusBadge status={pack.status} />
              </div>

              <p className="mt-5 text-sm leading-7 text-white/65">
                Update status later using the status form. For now, this page
                gives you full visibility of the submitted evidence pack.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <DetailCard title="Company Information">
              <InfoGrid
                items={[
                  ["Company", pack.company_name],
                  ["Trading name", pack.trading_name],
                  ["Website", pack.website],
                  ["Sector", pack.sector],
                  ["Qatar location", pack.qatar_location],
                  ["Main services", pack.main_services],
                ]}
              />
            </DetailCard>

            <DetailCard title="Audit Contacts">
              <InfoGrid
                items={[
                  ["Primary contact", pack.primary_contact_name],
                  ["Role", pack.primary_contact_role],
                  ["Email", pack.primary_contact_email],
                  ["Phone / WhatsApp", pack.primary_contact_phone],
                  ["Legal / compliance contact", pack.legal_contact],
                  ["Marketing contact", pack.marketing_contact],
                  ["IT / cyber contact", pack.it_contact],
                ]}
              />
            </DetailCard>

            <DetailCard title="Website and Digital Links">
              <InfoGrid
                items={[
                  ["Key URLs", pack.key_urls],
                  ["Privacy policy", pack.privacy_policy_url],
                  ["Terms", pack.terms_url],
                  ["Cookie notice", pack.cookie_notice_url],
                  ["Refund / cancellation policy", pack.refund_policy_url],
                ]}
              />
            </DetailCard>

            <DetailCard title="Uploaded Files">
              {uploadedFiles.length === 0 ? (
                <p className="text-white/50">No files uploaded.</p>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.storagePath}
                      className="rounded-2xl border border-white/10 bg-black/35 p-5"
                    >
                      <p className="font-bold text-white">{file.name}</p>

                      <p className="mt-2 text-sm text-white/50">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                        {file.type ? ` • ${file.type}` : ""}
                      </p>

                      <p className="mt-2 break-all text-xs text-white/35">
                        {file.storagePath}
                      </p>

                      <p className="mt-3 text-xs leading-6 text-white/45">
                        Storage is private. To download/view files properly,
                        create a signed URL action next.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </DetailCard>

            <EvidenceSection
              title="Documents Available"
              items={pack.documents_available}
            />

            <EvidenceSection
              title="Data Protection Evidence"
              items={pack.data_protection_evidence}
            />

            <EvidenceSection
              title="Marketing and Advertising Evidence"
              items={pack.marketing_evidence}
            />

            <EvidenceSection
              title="AI and Automation Evidence"
              items={pack.ai_evidence}
            />

            <EvidenceSection
              title="Cyber and Access Control Evidence"
              items={pack.cyber_evidence}
            />

            <EvidenceSection
              title="Vendor and Third-Party Evidence"
              items={pack.vendor_evidence}
            />

            <EvidenceSection
              title="Customer Experience and Complaints"
              items={pack.customer_evidence}
            />

            <EvidenceSection
              title="Reputation and Crisis Readiness"
              items={pack.reputation_evidence}
            />

            <DetailCard title="Written Notes">
              <InfoGrid
                items={[
                  ["Vendors", pack.vendors],
                  ["AI tools", pack.ai_tools],
                  ["Platforms", pack.platforms],
                  ["Known concerns", pack.known_concerns],
                  ["Missing documents", pack.missing_documents],
                  ["Additional notes", pack.additional_notes],
                ]}
              />
            </DetailCard>
          </div>

          <aside className="space-y-6">
            <DetailCard title="Quick Actions">
              <div className="space-y-3">
                <a
                  href={`mailto:${pack.primary_contact_email}?subject=Sitora Trust 360 Evidence Pack - ${encodeURIComponent(
                    pack.company_name
                  )}`}
                  className="block rounded-full bg-[#D4AF37] px-5 py-3 text-center text-sm font-black text-black transition hover:bg-[#f0cf63]"
                >
                  Email Client
                </a>

                <a
                  href={normaliseUrl(pack.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Open Website
                </a>

                <a
                  href="/admin/trust360-evidence"
                  className="block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Back to Evidence Packs
                </a>
              </div>
            </DetailCard>

            <DetailCard title="Priority Areas">
              <TagList items={pack.priority_areas} />
            </DetailCard>

            <DetailCard title="Audit Readiness">
              <div className="space-y-4 text-sm leading-7 text-white/65">
                <p>
                  Use this evidence pack to decide whether the audit can begin
                  or whether more information is needed.
                </p>

                <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 p-4">
                  <p className="font-bold text-[#D4AF37]">
                    Recommended next step
                  </p>
                  <p className="mt-2">
                    Review missing documents and uploaded files, then move the
                    status to Reviewing or More Info Needed.
                  </p>
                </div>
              </div>
            </DetailCard>

            <DetailCard title="Internal Notes">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                {pack.internal_notes || "No internal notes added yet."}
              </p>
            </DetailCard>
          </aside>
        </div>
      </section>
    </main>
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

function EvidenceSection({
  title,
  items,
}: {
  title: string;
  items: string[] | null;
}) {
  return (
    <DetailCard title={title}>
      <TagList items={items} />
    </DetailCard>
  );
}

function TagList({ items }: { items: string[] | null }) {
  if (!items || items.length === 0) {
    return <p className="text-white/50">Nothing selected.</p>;
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

function InfoGrid({ items }: { items: [string, string | null][] }) {
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Received: "border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]",
    Reviewing: "border-blue-400/35 bg-blue-400/10 text-blue-200",
    "More Info Needed":
      "border-orange-400/35 bg-orange-400/10 text-orange-200",
    Complete: "border-green-400/35 bg-green-400/10 text-green-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[status] || "border-white/15 bg-white/10 text-white/60"
      }`}
    >
      {status || "Received"}
    </span>
  );
}

function formatDate(date: string) {
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