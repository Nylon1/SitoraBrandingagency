"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Check,
  ChevronRight,
  Copy,
  Dice5,
  Glasses,
  Lightbulb,
  Rocket,
  Search,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  professionLibraries,
  totalHealthcareIdeaCount,
  type ContentAngle,
  type HealthcarePostIdea,
  type HealthcareProfessionSlug,
  type PostFormat,
} from "@/lib/healthcare-post-ideas";

const SAVED_KEY = "sitora-healthcare-post-ideas-saved";

const formats: Array<"All formats" | PostFormat> = [
  "All formats",
  "Short video",
  "Carousel",
  "Single image",
  "Story",
  "LinkedIn post",
];

const angles: Array<"All angles" | ContentAngle> = [
  "All angles",
  "Explained simply",
  "Common mistakes",
  "Warning signs",
  "Questions answered",
  "Practical advice",
];

function ideaBrief(idea: HealthcarePostIdea) {
  return `PROFESSION
${idea.profession}

POST IDEA
${idea.title}

SUGGESTED HOOK
${idea.hook}

FORMAT
${idea.format}

CONTENT ANGLE
${idea.angle}

CALL TO ACTION
${idea.callToAction}`;
}

export function HealthcarePostIdeasClient() {
  const [profession, setProfession] =
    useState<HealthcareProfessionSlug>("dentist");
  const [category, setCategory] = useState(
    professionLibraries[0].categories[0].slug,
  );
  const [query, setQuery] = useState("");
  const [format, setFormat] =
    useState<(typeof formats)[number]>("All formats");
  const [angle, setAngle] =
    useState<(typeof angles)[number]>("All angles");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedIdea, setSelectedIdea] =
    useState<HealthcarePostIdea | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentLibrary =
    professionLibraries.find((library) => library.slug === profession) ??
    professionLibraries[0];

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SAVED_KEY);
      if (stored) setSavedIds(JSON.parse(stored) as string[]);
    } catch {
      setSavedIds([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    } catch {
      // Browser storage can be unavailable in private browsing modes.
    }
  }, [savedIds]);

  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return currentLibrary.ideas.filter((idea) => {
      const categoryMatch = showSaved
        ? savedIds.includes(idea.id)
        : idea.categorySlug === category;
      const queryMatch =
        !searchTerm ||
        `${idea.title} ${idea.hook} ${idea.topic} ${idea.category}`
          .toLowerCase()
          .includes(searchTerm);
      const formatMatch =
        format === "All formats" || idea.format === format;
      const angleMatch = angle === "All angles" || idea.angle === angle;

      return categoryMatch && queryMatch && formatMatch && angleMatch;
    });
  }, [
    angle,
    category,
    currentLibrary,
    format,
    query,
    savedIds,
    showSaved,
  ]);

  const currentSavedCount = useMemo(
    () =>
      currentLibrary.ideas.reduce(
        (count, idea) => count + Number(savedIds.includes(idea.id)),
        0,
      ),
    [currentLibrary, savedIds],
  );

  const visibleIdeas = results.slice(0, visibleCount);
  const currentCategory = currentLibrary.categories.find(
    (item) => item.slug === category,
  );

  function chooseProfession(slug: HealthcareProfessionSlug) {
    const nextLibrary =
      professionLibraries.find((library) => library.slug === slug) ??
      professionLibraries[0];

    setProfession(slug);
    setCategory(nextLibrary.categories[0].slug);
    setQuery("");
    setFormat("All formats");
    setAngle("All angles");
    setShowSaved(false);
    setVisibleCount(12);
    setSelectedIdea(null);
  }

  function chooseCategory(slug: string) {
    setCategory(slug);
    setShowSaved(false);
    setVisibleCount(12);
  }

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  async function copyIdea(idea: HealthcarePostIdea) {
    try {
      await navigator.clipboard.writeText(ideaBrief(idea));
      setCopiedId(idea.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setSelectedIdea(idea);
    }
  }

  function surpriseMe() {
    const idea =
      currentLibrary.ideas[
        Math.floor(Math.random() * currentLibrary.ideas.length)
      ];

    setCategory(idea.categorySlug);
    setShowSaved(false);
    setSelectedIdea(idea);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-10rem] h-[36rem] w-[36rem] rounded-full bg-[#d8b66d]/15 blur-[150px]" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <section className="relative z-10 px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/25 bg-[#d8b66d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e9ca82]">
                  <Sparkles className="h-4 w-4" />
                  Free Sitora healthcare tool
                </div>

                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                  Never run out of healthcare content ideas.
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">
                  Choose your profession, browse focused categories and find
                  useful social media ideas without creating an account.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-white/55">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    No signup
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    {totalHealthcareIdeaCount.toLocaleString("en-GB")} ideas
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    3 live libraries
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Free to use
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={surpriseMe}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 text-sm font-bold text-[#070910] transition hover:-translate-y-1 hover:bg-[#f1cf86]"
              >
                <Dice5 className="h-5 w-5" />
                Surprise me
              </button>
            </div>
          </div>

          <section className="mt-10" aria-labelledby="profession-heading">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
                  Step one
                </p>
                <h2
                  id="profession-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight"
                >
                  Choose your profession
                </h2>
              </div>
              <p className="text-sm text-white/38">
                Dentist, optician and healthcare startup libraries are live.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {professionLibraries.map((library) => {
                const active = library.slug === profession;
                const Icon =
                  library.slug === "dentist"
                    ? Stethoscope
                    : library.slug === "optician"
                      ? Glasses
                      : Rocket;

                return (
                  <button
                    key={library.slug}
                    type="button"
                    onClick={() => chooseProfession(library.slug)}
                    aria-pressed={active}
                    className={`rounded-[26px] border p-6 text-left transition hover:-translate-y-1 ${
                      active
                        ? "border-[#d8b66d]/50 bg-[#d8b66d]/10"
                        : "border-white/10 bg-white/[0.035] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl ${
                          active
                            ? "bg-[#d8b66d] text-[#070910]"
                            : "border border-white/10 bg-white/[0.045] text-white/55"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                        Live
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold">
                      {library.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/50">
                      10 categories and {library.ideas.length} ideas.
                    </p>
                    <p className="mt-3 text-xs leading-5 text-white/35">
                      {library.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="category-heading">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
                  Step two
                </p>
                <h2
                  id="category-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight"
                >
                  Browse {currentLibrary.label.toLowerCase()} categories
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSaved(true);
                  setVisibleCount(50);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  showSaved
                    ? "border-[#d8b66d] bg-[#d8b66d] text-[#070910]"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:border-[#d8b66d]/40"
                }`}
              >
                <Bookmark className="h-4 w-4" />
                Saved {currentLibrary.label.toLowerCase()} ideas (
                {currentSavedCount})
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {currentLibrary.categories.map((item, index) => {
                const active = !showSaved && item.slug === category;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => chooseCategory(item.slug)}
                    className={`rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${
                      active
                        ? "border-[#d8b66d]/55 bg-[#d8b66d]/10"
                        : "border-white/10 bg-white/[0.035] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-[#d8b66d]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold text-white/45">
                        50
                      </span>
                    </div>
                    <h3 className="mt-4 font-semibold leading-6">
                      {item.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/38">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section
            className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.035] p-5 sm:p-8"
            aria-labelledby="ideas-heading"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
                  Step three
                </p>
                <h2
                  id="ideas-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight"
                >
                  {showSaved
                    ? `Your saved ${currentLibrary.label.toLowerCase()} ideas`
                    : currentCategory?.name}
                </h2>
                <p className="mt-2 text-sm text-white/42">
                  {results.length} ideas match your selection.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[680px]">
                <label className="relative sm:col-span-1">
                  <span className="sr-only">Search ideas</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setVisibleCount(12);
                    }}
                    placeholder={`Search ${currentLibrary.label.toLowerCase()} ideas`}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d8b66d]/50"
                  />
                </label>

                <label>
                  <span className="sr-only">Post format</span>
                  <select
                    value={format}
                    onChange={(event) => {
                      setFormat(
                        event.target.value as (typeof formats)[number],
                      );
                      setVisibleCount(12);
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-[#090b11] px-4 py-3 text-sm text-white outline-none focus:border-[#d8b66d]/50"
                  >
                    {formats.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="sr-only">Content angle</span>
                  <select
                    value={angle}
                    onChange={(event) => {
                      setAngle(
                        event.target.value as (typeof angles)[number],
                      );
                      setVisibleCount(12);
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-[#090b11] px-4 py-3 text-sm text-white outline-none focus:border-[#d8b66d]/50"
                  >
                    {angles.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {visibleIdeas.length ? (
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {visibleIdeas.map((idea, index) => {
                  const saved = savedIds.includes(idea.id);

                  return (
                    <motion.article
                      key={idea.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(index * 0.025, 0.2),
                      }}
                      className="group rounded-[26px] border border-white/10 bg-black/15 p-5 transition hover:border-[#d8b66d]/30 hover:bg-white/[0.035] sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#d8b66d]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e9ca82]">
                            {idea.format}
                          </span>
                          <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/42">
                            {idea.angle}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSaved(idea.id)}
                          aria-label={
                            saved ? "Remove saved idea" : "Save idea"
                          }
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition ${
                            saved
                              ? "border-[#d8b66d] bg-[#d8b66d] text-[#070910]"
                              : "border-white/10 bg-white/[0.035] text-white/45 hover:text-white"
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              saved ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <h3 className="mt-5 text-xl font-semibold leading-8 tracking-tight sm:text-2xl">
                        {idea.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/48">
                        {idea.hook}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                        <button
                          type="button"
                          onClick={() => copyIdea(idea)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/65 transition hover:border-[#d8b66d]/35 hover:text-white"
                        >
                          {copiedId === idea.id ? (
                            <Check className="h-4 w-4 text-emerald-300" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          {copiedId === idea.id ? "Copied" : "Copy idea"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedIdea(idea)}
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#d8b66d] transition hover:text-[#f1cf86]"
                        >
                          Open idea
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-[26px] border border-dashed border-white/15 px-6 py-16 text-center">
                <Lightbulb className="mx-auto h-8 w-8 text-[#d8b66d]" />
                <h3 className="mt-4 text-xl font-semibold">
                  No matching ideas
                </h3>
                <p className="mt-2 text-sm text-white/42">
                  Try another search, format or content angle.
                </p>
              </div>
            )}

            {visibleCount < results.length && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) => count + 12)
                  }
                  className="rounded-full border border-[#d8b66d]/30 bg-[#d8b66d]/10 px-7 py-3 text-sm font-bold text-[#e9ca82] transition hover:bg-[#d8b66d]/16"
                >
                  Load 12 more ideas
                </button>
              </div>
            )}
          </section>

          <div className="mt-10 rounded-[30px] border border-[#d8b66d]/20 bg-[#d8b66d]/[0.07] px-6 py-9 text-center sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
              Healthcare content note
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/50">
              These prompts are starting points for educational and
              professional marketing. Users remain responsible for checking
              accuracy, professional standards, consent, evidence and
              advertising claims before publishing.
            </p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIdea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-md"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) {
                setSelectedIdea(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[30px] border border-white/10 bg-[#080b12] p-6 shadow-2xl sm:p-9"
              role="dialog"
              aria-modal="true"
              aria-labelledby="selected-idea-title"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#d8b66d]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e9ca82]">
                      {selectedIdea.profession}
                    </span>
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/42">
                      {selectedIdea.format}
                    </span>
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/42">
                      {selectedIdea.category}
                    </span>
                  </div>
                  <h2
                    id="selected-idea-title"
                    className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {selectedIdea.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIdea(null)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/55 hover:text-white"
                  aria-label="Close idea"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66d]">
                    Suggested hook
                  </p>
                  <p className="mt-3 leading-7 text-white/65">
                    {selectedIdea.hook}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66d]">
                    Content angle
                  </p>
                  <p className="mt-3 leading-7 text-white/65">
                    {selectedIdea.angle}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66d]">
                  Call to action
                </p>
                <p className="mt-3 leading-7 text-white/65">
                  {selectedIdea.callToAction}
                </p>
              </div>

              <textarea
                readOnly
                value={ideaBrief(selectedIdea)}
                rows={12}
                className="mt-4 w-full rounded-2xl border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/55 outline-none"
              />

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyIdea(selectedIdea)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-bold text-[#070910] hover:bg-[#f1cf86]"
                >
                  {copiedId === selectedIdea.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedId === selectedIdea.id
                    ? "Copied"
                    : "Copy full brief"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleSaved(selectedIdea.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/70"
                >
                  <Bookmark className="h-4 w-4" />
                  {savedIds.includes(selectedIdea.id)
                    ? "Remove saved idea"
                    : "Save idea"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
