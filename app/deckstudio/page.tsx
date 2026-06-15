import Link from "next/link";

export const metadata = {
  title: "Sitora DeckStudio | Premium Pitch Deck Builder",
  description:
    "Create an investor-ready pitch deck brief with Sitora DeckStudio. Guided founder input, premium SVG deck generation and human review.",
};

const packages = [
  {
    name: "Pitch Deck Audit",
    price: "£195",
    description:
      "For founders who already have a deck and need expert feedback before sharing it.",
    features: [
      "Slide-by-slide review",
      "Pitch structure feedback",
      "Investor clarity notes",
      "Priority action list",
    ],
  },
  {
    name: "Investor-Ready Deck",
    price: "£495",
    description:
      "For founders who want their DeckStudio draft refined and polished by Sitora.",
    features: [
      "Guided DeckStudio intake",
      "SVG deck draft",
      "Figma design polish",
      "Final PDF export",
    ],
  },
  {
    name: "Premium Designed Deck",
    price: "£995+",
    description:
      "For serious investor, funding or strategic partnership conversations.",
    features: [
      "Pitch story refinement",
      "Premium Figma design",
      "Charts and roadmap",
      "Use-of-funds visuals",
    ],
  },
  {
    name: "Investor Pack",
    price: "£1,495+",
    description:
      "A full investor communication pack for outreach, meetings and follow-up.",
    features: [
      "Premium pitch deck",
      "Investor one-pager",
      "Founder bio",
      "Outreach email templates",
    ],
  },
];

const deckIncludes = [
  "Vision",
  "Problem",
  "Solution",
  "Market Opportunity",
  "Product / Customer Journey",
  "Business Model",
  "Traction / Proof",
  "Competitive Advantage",
  "Team",
  "3-Year Roadmap",
  "Investment Ask",
  "Contact / Next Steps",
];

export default function DeckStudioPage() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <section className="relative overflow-hidden px-5 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#c9a44c33,transparent_35%),radial-gradient(circle_at_bottom_right,#1d4ed833,transparent_30%)]" />
        <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full border border-[#d7b35a]/20" />
        <div className="absolute bottom-[-160px] left-[-140px] h-[420px] w-[420px] rounded-full bg-[#d7b35a]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#d7b35a]">
              Sitora DeckStudio
            </p>

            <h1 className="mb-6 text-5xl font-semibold tracking-tight md:text-7xl">
              Build a Pitch Deck That Makes Investors Take You Seriously
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-8 text-white/70">
              Answer a guided set of founder questions and Sitora will turn your
              business into a premium pitch deck draft, ready for expert review,
              Figma refinement and professional delivery.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/deckstudio/start"
                className="rounded-full bg-gradient-to-r from-[#c9a44c] to-[#f5d77a] px-8 py-4 text-center text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                Start My Pitch Deck
              </Link>

              <a
                href="#packages"
                className="rounded-full border border-white/15 px-8 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                View Packages
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-sm text-white/55">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                AI-assisted
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                Human-reviewed
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                Figma refined
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                Investor-focused
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
            How It Works
          </p>

          <h2 className="mb-12 text-3xl font-semibold md:text-5xl">
            From founder answers to a polished investor deck.
          </h2>

          <div className="grid gap-5 md:grid-cols-5">
            {[
              "Answer guided founder questions",
              "DeckStudio structures your pitch story",
              "Premium SVG slides are generated",
              "Sitora refines the deck in Figma",
              "Final PDF is delivered to the client",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="mb-8 text-3xl font-semibold text-[#d7b35a]">
                  0{index + 1}
                </div>
                <p className="text-sm leading-6 text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
                Built For Serious Founders
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
                More than nice slides. A clearer investment story.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/65">
                Whether you are raising investment, pitching partners, applying
                for funding or preparing for growth, your deck needs a clear
                story, strong positioning and investor logic.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
                Your Generated Deck Includes
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {deckIncludes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
              DeckStudio Packages
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              From generated draft to investor-ready deck.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/65">
              DeckStudio gives founders a fast starting point. Sitora then helps
              refine the story, visuals, structure and investor logic into a
              polished deck ready for serious conversations.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <h3 className="mb-3 text-2xl font-semibold">{pkg.name}</h3>

                <p className="mb-5 text-4xl font-semibold text-[#d7b35a]">
                  {pkg.price}
                </p>

                <p className="mb-6 text-sm leading-6 text-white/60">
                  {pkg.description}
                </p>

                <div className="space-y-3">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex gap-3 text-sm text-white/75">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#d7b35a]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-6 text-white/45">
            Prices are starting points. Complex financial modelling, market
            research, custom illustrations, advanced charts, investor documents
            or additional revision rounds may be quoted separately.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
                Why Human Review Matters
              </p>

              <h2 className="text-3xl font-semibold md:text-5xl">
                Automation creates the draft. Sitora protects the quality.
              </h2>
            </div>

            <div className="lg:col-span-2">
              <p className="text-lg leading-8 text-white/65">
                Bad input can create a weak deck. That is why DeckStudio is not
                positioned as a cheap instant-download tool. Your generated SVG
                deck is reviewed, refined and polished by Sitora before final
                delivery, so the story, visuals, charts, roadmap and investor
                ask feel credible.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  "Copy refinement",
                  "Figma design polish",
                  "Investor logic check",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 text-center shadow-2xl md:p-12">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
            Start Your Deck
          </p>

          <h2 className="mx-auto max-w-3xl text-4xl font-semibold md:text-6xl">
            Build the first draft. Let Sitora make it investor-ready.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Answer the guided questions, generate your draft deck, then let
            Sitora refine it into a professional pitch deck for investors,
            partners or funding conversations.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/deckstudio/start"
              className="inline-flex justify-center rounded-full bg-gradient-to-r from-[#c9a44c] to-[#f5d77a] px-8 py-4 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Start My Pitch Deck
            </Link>

            <Link
              href="/contact"
              className="inline-flex justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Speak To Sitora
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}