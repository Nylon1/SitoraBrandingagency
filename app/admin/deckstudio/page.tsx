import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminDeckStudioPage() {
  const { data: submissions } = await supabase
    .from("pitch_deck_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
          Sitora Admin
        </p>

        <h1 className="mb-10 text-4xl font-semibold">
          DeckStudio Submissions
        </h1>

        <div className="space-y-4">
          {submissions?.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {item.business_name || "Unnamed Business"}
                  </h2>
                  <p className="mt-2 text-white/60">
                    {item.founder_name} — {item.email}
                  </p>
                  <p className="mt-1 text-sm text-[#d7b35a]">
                    Status: {item.status}
                  </p>
                </div>

                <a
                  href={`/admin/deckstudio/${item.id}`}
                  className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/80 transition hover:bg-white/10"
                >
                  Review Submission
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}