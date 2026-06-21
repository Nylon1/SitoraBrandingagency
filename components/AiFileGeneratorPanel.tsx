"use client";

import { useState } from "react";
import { Download, FileText, Loader2, Sparkles } from "lucide-react";

type GeneratedFile = {
  id: string;
  document_key: string;
  title: string;
  category: string;
  content_markdown: string;
};

type Props = {
  auditId: string;
  initialFiles: GeneratedFile[];
  companyName?: string | null;
  website?: string | null;
  email?: string | null;
  aiOwner?: string | null;
};

function downloadMarkdown(file: GeneratedFile) {
  const blob = new Blob([file.content_markdown], {
    type: "text/markdown;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `${file.document_key}.md`;
  a.click();

  URL.revokeObjectURL(url);
}

export default function AiFileGeneratorPanel({
  auditId,
  initialFiles,
  companyName,
  website,
  email,
  aiOwner,
}: Props) {
  const [files, setFiles] = useState<GeneratedFile[]>(initialFiles || []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    legalEntity: companyName || "",
    tradingName: companyName || "",
    companyAddress: "",
    country: "Saudi Arabia / GCC",
    aiOwner: aiOwner || "",
    dataProtectionLead: "",
    securityLead: "",
    humanSupportEmail: email || "",
    reviewCadence: "Quarterly and whenever the AI system materially changes",
    launchMarket: "Saudi Arabia / GCC",
    sectorNotes: "",
  });

  function update(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function generateFiles() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/ai-audits/${auditId}/files/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const text = await response.text();

      let data: any = null;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "The generate files API returned HTML instead of JSON. Check the API route path: app/api/admin/ai-audits/[id]/files/generate/route.ts and restart the dev server."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not generate files.");
      }

      setFiles(data.files || []);
      setMessage("Files generated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong generating files."
      );
    } finally {
      setLoading(false);
    }
  }

  const grouped = files.reduce<Record<string, GeneratedFile[]>>((acc, file) => {
    acc[file.category] = acc[file.category] || [];
    acc[file.category].push(file);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.12] via-white/[0.045] to-cyan-300/[0.08] p-7 shadow-2xl backdrop-blur">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
            Sitora File Generator
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
            Generate Saudi AI Governance File Pack
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
            Enter the company-specific details below. Sitora will generate a
            full AI governance, data protection, transparency, testing,
            cybersecurity and trust file pack based on the audit answers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Legal entity"
            value={form.legalEntity}
            onChange={(v) => update("legalEntity", v)}
          />

          <Input
            label="Trading name"
            value={form.tradingName}
            onChange={(v) => update("tradingName", v)}
          />

          <Input
            label="Website"
            value={website || ""}
            onChange={() => {}}
            disabled
          />

          <Input
            label="Company address"
            value={form.companyAddress}
            onChange={(v) => update("companyAddress", v)}
          />

          <Input
            label="Launch market"
            value={form.launchMarket}
            onChange={(v) => update("launchMarket", v)}
          />

          <Input
            label="AI owner"
            value={form.aiOwner}
            onChange={(v) => update("aiOwner", v)}
          />

          <Input
            label="Data protection lead"
            value={form.dataProtectionLead}
            onChange={(v) => update("dataProtectionLead", v)}
          />

          <Input
            label="Security lead"
            value={form.securityLead}
            onChange={(v) => update("securityLead", v)}
          />

          <Input
            label="Human support email"
            value={form.humanSupportEmail}
            onChange={(v) => update("humanSupportEmail", v)}
          />

          <Input
            label="Review cadence"
            value={form.reviewCadence}
            onChange={(v) => update("reviewCadence", v)}
          />
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/35">
            Sector notes
          </span>

          <textarea
            value={form.sectorNotes}
            onChange={(e) => update("sectorNotes", e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-200/40"
            placeholder="Add any Saudi sector-specific notes, healthcare, finance, HR, education, government-facing details, etc."
          />
        </label>

        <button
          type="button"
          onClick={generateFiles}
          disabled={loading}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_35px_rgba(250,204,21,0.2)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Full File Pack
        </button>

        {message && <p className="mt-4 text-sm text-white/65">{message}</p>}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-2xl backdrop-blur">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/35">
              Generated Files
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              {files.length} files generated
            </h2>
          </div>
        </div>

        {files.length === 0 ? (
          <p className="text-sm text-white/50">
            No files generated yet. Complete the company details and generate
            the file pack.
          </p>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([category, categoryFiles]) => (
              <div key={category}>
                <h3 className="mb-4 text-xl font-semibold text-amber-100">
                  {category}
                </h3>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {categoryFiles.map((file) => (
                    <div
                      key={file.id}
                      className="rounded-2xl border border-white/10 bg-black/25 p-5"
                    >
                      <FileText className="mb-4 h-6 w-6 text-amber-100" />

                      <h4 className="text-lg font-semibold">{file.title}</h4>

                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/35">
                        {file.document_key}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <a
                          href={`/api/admin/ai-audits/${auditId}/files/${file.id}/pdf`}
                          className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-4 py-2 text-xs font-semibold text-black transition hover:scale-[1.01]"
                        >
                          <Download className="mr-2 h-3.5 w-3.5" />
                          PDF
                        </a>

                        <button
                          type="button"
                          onClick={() => downloadMarkdown(file)}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/[0.1]"
                        >
                          <Download className="mr-2 h-3.5 w-3.5" />
                          Markdown
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigator.clipboard.writeText(file.content_markdown)
                          }
                          className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/[0.1]"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/35">
        {label}
      </span>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-200/40 disabled:opacity-50"
      />
    </label>
  );
}