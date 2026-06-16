import DownloadSvgButton from "@/components/deckstudio/DownloadSvgButton";
import DownloadAllSvgsButton from "@/components/deckstudio/DownloadAllSvgsButton";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export const revalidate = 0;


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function DeckSubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: submission, error } = await supabase
    .from("pitch_deck_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !submission) {
    return (
      <main className="min-h-screen bg-[#05070d] px-5 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
            Sitora DeckStudio
          </p>

          <h1 className="text-4xl font-semibold">Submission not found.</h1>

          <p className="mt-4 text-red-300">
            {error?.message || "No matching submission found for this ID."}
          </p>

          <p className="mt-4 text-white/50">ID searched: {id}</p>
        </div>
      </main>
    );
  }

  const slides = submission.generated_svg || [];

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
            Sitora DeckStudio
          </p>

          <h1 className="mb-4 text-4xl font-semibold md:text-6xl">
            {submission.business_name || "Unnamed Business"}
          </h1>

          <p className="text-white/60">
            {submission.founder_name || "No founder name"} —{" "}
            {submission.email || "No email"}
          </p>

          <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-[#d7b35a]">
            Status: {submission.status || "new"}
          </div>
        </div>

        <section className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <h2 className="mb-4 text-2xl font-semibold">Figma Review Workflow</h2>

          <p className="max-w-3xl text-sm leading-7 text-white/65">
            Download the generated SVG slides, import them into Figma, refine the
            copy, spacing, imagery, icons and final layout, then export the
            finished deck as a polished PDF for the client. The generated SVG is
            the first draft — Sitora’s review is what makes it premium.
          </p>
        </section>

        <section className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <h2 className="mb-6 text-2xl font-semibold">Founder Answers</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(submission).map(([key, value]) => {
              if (
                [
                  "id",
                  "created_at",
                  "generated_svg",
                  "sent_to_client",
                ].includes(key)
              ) {
                return null;
              }

              return (
                <div key={key} className="rounded-2xl bg-black/25 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#d7b35a]">
                    {key.replaceAll("_", " ")}
                  </p>

                  <p className="text-sm leading-6 text-white/75">
                    {String(value || "—")}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
  <div>
    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
      Generated Deck
    </p>

    <h2 className="text-3xl font-semibold md:text-4xl">
      SVG Slide Drafts
    </h2>

    <p className="mt-2 text-sm text-white/50">
      {slides.length} slide{slides.length === 1 ? "" : "s"} generated
    </p>
  </div>

  {slides.length > 0 && (
    <DownloadAllSvgsButton
      slides={slides}
      businessName={submission.business_name || "pitch-deck"}
    />
  )}
</div>

          {slides.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-white/60">No generated SVG slides found.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {slides.map((slide: { filename: string; svg: string }) => (
                <div
                  key={slide.filename}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl md:p-6"
                >
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-[#d7b35a]">
                      {slide.filename}
                    </p>

                    <DownloadSvgButton
                      filename={slide.filename}
                      svg={slide.svg}
                    />
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
  <div
    className="[&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
    dangerouslySetInnerHTML={{ __html: slide.svg }}
  />
</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}