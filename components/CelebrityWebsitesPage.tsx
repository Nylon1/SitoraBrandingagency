"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Crown,
  FileText,
  Gem,
  Globe2,
  Handshake,
  Image as ImageIcon,
  Mail,
  Megaphone,
  Mic2,
  Newspaper,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserRoundCheck,
  Users,
  Video,
} from "lucide-react";

const audiences = [
  "Celebrities",
  "Athletes",
  "Footballers",
  "Sports Personalities",
  "TV & Media Personalities",
  "Speakers",
  "Influencers",
  "Creators",
  "Authors",
  "Founders & CEOs",
  "Public Figures",
  "High-Profile Professionals",
];

const features = [
  {
    icon: UserRoundCheck,
    title: "Official Biography",
    text: "A polished profile that tells the story clearly, professionally and with authority.",
  },
  {
    icon: Newspaper,
    title: "Press & Media Page",
    text: "A dedicated area for press coverage, interviews, media kits, achievements and public information.",
  },
  {
    icon: Handshake,
    title: "Brand Partnerships",
    text: "A serious enquiry route for sponsorships, collaborations, endorsements and commercial partnerships.",
  },
  {
    icon: Mic2,
    title: "Speaking & Appearances",
    text: "Structured pages for speaking, event bookings, appearances and private enquiries.",
  },
  {
    icon: Video,
    title: "Highlights & Showreel",
    text: "A premium space for videos, performances, interviews, career highlights and featured moments.",
  },
  {
    icon: Mail,
    title: "Management Contact",
    text: "Professional enquiry forms for agents, managers, PR teams, brands and event organisers.",
  },
];

const reasons = [
  {
    title: "Social media gives attention.",
    text: "But platforms are crowded, fast-moving and controlled by algorithms.",
  },
  {
    title: "An official website gives authority.",
    text: "It becomes the trusted place for media, brands, fans and organisers to understand who the person is.",
  },
  {
    title: "A premium site protects reputation.",
    text: "It controls the narrative, presents the right image and filters serious enquiries from noise.",
  },
];

const sections = [
  "Official homepage",
  "Biography",
  "Media kit",
  "Brand partnerships",
  "Speaking enquiries",
  "Appearance bookings",
  "Sponsorship enquiries",
  "Gallery",
  "Video highlights",
  "News & updates",
  "Charity / foundation work",
  "Management contact",
];

const packages = [
  {
    title: "Official Presence",
    text: "For public-facing individuals who need a polished official website and enquiry route.",
    items: ["Premium homepage", "Biography page", "Media/contact section", "Mobile-first design"],
  },
  {
    title: "Authority Platform",
    text: "For personalities who need a stronger brand presence, press structure and commercial enquiry flow.",
    items: ["Media kit", "Partnership enquiries", "Gallery/video sections", "SEO structure"],
  },
  {
    title: "Elite Digital Brand",
    text: "For high-profile figures needing a serious public platform, reputation positioning and growth support.",
    items: ["Full brand direction", "Press/news system", "Management enquiry flows", "Ongoing support"],
  },
];

export function CelebrityWebsitesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative min-h-screen overflow-hidden px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(216,182,109,0.30),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,#03050a_0%,#07101f_48%,#03050a_100%)]" />

        <div className="absolute inset-0 opacity-[0.13]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="absolute inset-0 opacity-[0.16]">
          <div className="absolute bottom-0 left-0 right-0 h-[48vh] bg-[linear-gradient(to_top,rgba(255,255,255,0.18),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-[48vh] bg-[repeating-linear-gradient(90deg,transparent_0_46px,rgba(255,255,255,.25)_47px_48px)]" />
        </div>

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -22, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-18%] top-[4%] h-[760px] w-[760px] rounded-full border border-[#d8b66d]/20 bg-[radial-gradient(circle,rgba(216,182,109,0.16),transparent_62%)]"
        />

        <motion.div
          animate={{ x: [0, -32, 0], y: [0, 26, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-24%] left-[-20%] h-[720px] w-[720px] rounded-full border border-blue-400/10 bg-[radial-gradient(circle,rgba(59,130,246,0.19),transparent_66%)]"
        />

        <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 pb-20 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/72 shadow-2xl shadow-black/20 backdrop-blur">
              <Crown className="h-4 w-4 text-[#d8b66d]" />
              Websites for celebrities, athletes & public figures
            </div>

            <h1 className="max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl xl:text-[8rem]">
              A premium digital home for people with influence.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
              Sitora builds official websites for celebrities, athletes, speakers, creators and public figures who need a polished online presence for media, partnerships, bookings and serious enquiries.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/25 transition hover:bg-[#f2cf83]"
              >
                Request a Private Consultation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>

              <a
                href="#what-we-build"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore The Service
              </a>
            </div>

            <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Media", "Press ready"],
                ["Brands", "Partnership enquiries"],
                ["Public", "Official presence"],
                ["Growth", "Reputation support"],
              ].map(([top, bottom]) => (
                <div
                  key={top}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur"
                >
                  <p className="text-lg font-semibold text-[#d8b66d]">{top}</p>
                  <p className="mt-1 text-xs leading-5 text-white/48">{bottom}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-[3rem] bg-[#d8b66d]/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b111d] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,182,109,0.17),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_35%)]" />

                <div className="relative">
                  <div className="mb-7 flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">
                        Official Digital Presence
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        One trusted place for serious opportunities.
                      </h2>
                    </div>
                    <Star className="h-10 w-10 shrink-0 text-white/35" />
                  </div>

                  <div className="space-y-4">
                    {[
                      [Trophy, "Athlete & Sports Profile", "Career story, achievements, highlights and commercial opportunities."],
                      [Camera, "Media & Press Hub", "A polished place for journalists, brands and production teams."],
                      [Handshake, "Partnership Enquiries", "Clear routes for sponsorships, collaborations and endorsements."],
                      [CalendarDays, "Bookings & Appearances", "Structured enquiry flow for events, talks and appearances."],
                    ].map(([Icon, title, text]) => {
                      const RealIcon = Icon as typeof Trophy;

                      return (
                        <motion.div
                          key={title as string}
                          whileHover={{ x: 4 }}
                          className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:bg-white/[0.07]"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d8b66d]/15 text-[#d8b66d]">
                            <RealIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{title as string}</p>
                            <p className="mt-1 text-sm leading-6 text-white/50">{text as string}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 text-[#d8b66d]" />
                      <p className="text-sm leading-7 text-white/70">
                        Social media creates attention. An official website creates authority, trust and a serious route for enquiries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070b13] py-5">
        <div className="flex overflow-hidden whitespace-nowrap text-sm font-bold uppercase tracking-[0.28em] text-white/45">
          <motion.div
            animate={{ x: [0, -980] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="flex min-w-max gap-8 px-8"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-8">
                <span>Celebrities</span><span className="text-[#d8b66d]">•</span>
                <span>Athletes</span><span className="text-[#d8b66d]">•</span>
                <span>Public Figures</span><span className="text-[#d8b66d]">•</span>
                <span>Speakers</span><span className="text-[#d8b66d]">•</span>
                <span>Media Personalities</span><span className="text-[#d8b66d]">•</span>
                <span>Official Websites</span><span className="text-[#d8b66d]">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
              Who This Is For
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
              Built for people whose reputation matters.
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62">
              Public figures need more than social profiles. They need one official, controlled and professionally presented digital home.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.025 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#d8b66d]/40 hover:bg-[#d8b66d]/10"
              >
                <Sparkles className="mb-5 h-5 w-5 text-[#d8b66d]" />
                <p className="font-semibold">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
              Why It Matters
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
              Influence needs a trusted digital home.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/62">
              Social platforms are powerful, but they are not enough. An official website gives brands, media teams, sponsors and event organisers a clear place to verify, understand and make serious contact.
            </p>
          </div>

          <div className="grid gap-5">
            {reasons.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="rounded-[2rem] border border-white/10 bg-[#05070d] p-7"
              >
                <p className="text-2xl font-semibold tracking-tight text-white">{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-white/58">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-build" className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
                What We Build
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                Everything needed for an official public presence.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
              The site can be structured around reputation, media, enquiries, brand partnerships, bookings and long-term public authority.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  whileHover={{ y: -7 }}
                  className="rounded-[2rem] border border-white/10 bg-[#05070d] p-8 transition hover:border-[#d8b66d]/35 hover:bg-white/[0.05]"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8b66d]/15 text-[#d8b66d]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
                Website Structure
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                A platform built around reputation and opportunity.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/62">
                The strongest personal brand websites are not just pretty pages. They are structured to help the right people find the right information and make the right enquiry.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {sections.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                  <p className="text-sm leading-7 text-white/68">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
              Project Options
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
              From official profile to elite digital brand.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
              >
                <Gem className="mb-8 h-8 w-8 text-[#d8b66d]" />
                <h3 className="text-3xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/58">{item.text}</p>

                <div className="mt-8 grid gap-3">
                  {item.items.map((point) => (
                    <div key={point} className="flex gap-3">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                      <p className="text-sm text-white/66">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
              Private & Professional
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
              Built with discretion, control and reputation in mind.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/62">
              For high-profile individuals, the website must feel polished but controlled. Sitora can structure enquiry routes for managers, agents, PR teams or direct business opportunities.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              [ShieldCheck, "Controlled Presentation", "Keep the official story, profile and enquiry routes in one trusted place."],
              [FileText, "Media Ready", "Make it easy for journalists and organisers to find the right information."],
              [Megaphone, "Brand Opportunity", "Give sponsors and partners a professional route to make serious enquiries."],
              [ImageIcon, "Premium Visual Identity", "Create a public presence that looks polished, current and high-value."],
            ].map(([Icon, title, text]) => {
              const RealIcon = Icon as typeof ShieldCheck;

              return (
                <div key={title as string} className="rounded-[2rem] border border-white/10 bg-[#05070d] p-7">
                  <RealIcon className="mb-7 h-8 w-8 text-[#d8b66d]" />
                  <h3 className="text-xl font-semibold tracking-tight">{title as string}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{text as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 pt-24 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
            Start Privately
          </p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
            Ready to build an official website worthy of the name?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
            Start a private project brief and Sitora will help shape the website structure, visual direction and enquiry journey around the person, audience and opportunities.
          </p>
          <a
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
          >
            Request a Private Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}