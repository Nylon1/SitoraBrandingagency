"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, Building2, Compass, Crown, Gem, Globe2, Landmark, Layers3, MapPin, Network, Orbit, Search, ShieldCheck, Sparkles, Target, Workflow, BriefcaseBusiness, LineChart, } from "lucide-react";

const locations = [ { city: "London", slug: "london", region: "United Kingdom", text: "Premium corporate website design and branding for ambitious London businesses, professional firms and high-value service companies.", }, { city: "New York", slug: "new-york", region: "United States", text: "Corporate web design and digital branding for businesses that need to compete in one of the world’s most demanding markets.", }, { city: "Dubai", slug: "dubai", region: "United Arab Emirates", text: "Luxury corporate websites and global brand positioning for Dubai businesses, consultants, clinics and international service firms.", }, { city: "Singapore", slug: "singapore", region: "Singapore", text: "Premium digital presence for companies operating in Singapore’s finance, technology, healthcare and professional service sectors.", }, { city: "Riyadh", slug: "riyadh", region: "Saudi Arabia", text: "Corporate website design and brand presence for ambitious Riyadh businesses aligned with growth, innovation and global standards.", }, { city: "Doha", slug: "doha", region: "Qatar", text: "Premium web design and corporate branding for Doha companies, private firms, consultants and high-trust professional services.", }, { city: "Abu Dhabi", slug: "abu-dhabi", region: "United Arab Emirates", text: "Corporate websites for Abu Dhabi businesses that need authority, clarity, international polish and strong enquiry journeys.", }, { city: "Manchester", slug: "manchester", region: "United Kingdom", text: "Premium websites and SEO-led brand platforms for Manchester businesses, clinics, professional firms and growing service companies.", }, { city: "Birmingham", slug: "birmingham", region: "United Kingdom", text: "Corporate web design for Birmingham companies that need stronger local visibility, better branding and serious lead generation.", }, { city: "Lancashire", slug: "lancashire", region: "United Kingdom", text: "Professional website design and corporate branding for Lancashire businesses ready to look more established and compete nationally.", }, ];

const globalSignals = [ "Premium corporate website design", "Global brand positioning", "City-focused SEO pages", "Industry-specific landing pages", "Conversion-led enquiry journeys", "High-trust visual identity", ];

const strategy = [ { icon: Globe2, title: "Global Positioning", text: "Location pages help Sitora look international while targeting high-value searches in major commercial hubs.", }, { icon: Search, title: "City SEO Structure", text: "Each city page targets searches such as corporate website design London, web design Dubai and branding agency New York.", }, { icon: BriefcaseBusiness, title: "Professional Sectors", text: "Location pages can internally link to industry pages for law firms, clinics, consultants, finance brokers and more.", }, { icon: LineChart, title: "Lead Generation", text: "Each location page should guide visitors towards consultation enquiries, project calls and serious business conversations.", }, ];

export default function LocationsHubPage() { return ( <main className="min-h-screen overflow-hidden bg-[#03050a] text-white"> <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#03050a]/60 backdrop-blur-2xl"> <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"> <a href="/home" className="flex items-center gap-3"> <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8b66d] text-[#070910] shadow-lg shadow-[#d8b66d]/20"> <span className="absolute inset-0 rounded-2xl bg-white/30 blur-md" /> <Sparkles className="relative h-5 w-5" /> </span> <span className="text-xl font-semibold tracking-tight">Sitora</span> </a>

<nav className="hidden items-center gap-8 text-sm font-medium text-white/62 lg:flex">
        <a href="/home" className="transition hover:text-white">Home</a>
        <a href="#locations" className="transition hover:text-white">Locations</a>
        <a href="#strategy" className="transition hover:text-white">Strategy</a>
        <a href="#global" className="transition hover:text-white">Global</a>
        <a href="#contact" className="transition hover:text-white">Contact</a>
      </nav>

      <a
        href="#contact"
        className="rounded-full border border-[#d8b66d]/45 px-5 py-2.5 text-sm font-semibold text-[#d8b66d] transition hover:bg-[#d8b66d] hover:text-[#070910]"
      >
        Global Project Enquiry
      </a>
    </div>
  </header>

  <section className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8 lg:pt-40">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(216,182,109,0.28),transparent_31%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.20),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,#03050a_0%,#07101f_48%,#03050a_100%)]" />

    <div className="absolute inset-0 opacity-[0.15]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] bg-[size:72px_72px]" />
    </div>

    <div className="absolute inset-0 opacity-[0.18]">
      <div className="absolute bottom-0 left-0 right-0 h-[48vh] bg-[linear-gradient(to_top,rgba(255,255,255,0.22),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[48vh] bg-[repeating-linear-gradient(90deg,transparent_0_46px,rgba(255,255,255,.30)_47px_48px)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[31vh] bg-[repeating-linear-gradient(0deg,transparent_0_30px,rgba(255,255,255,.16)_31px_32px)]" />
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

    <div className="absolute left-5 top-28 hidden border-l border-[#d8b66d]/40 pl-5 text-[10px] font-bold uppercase leading-6 tracking-[0.32em] text-white/42 sm:block lg:left-10 lg:top-36">
      London<br />New York<br />Dubai<br />Singapore
    </div>

    <div className="absolute right-5 top-28 hidden text-right text-[10px] font-bold uppercase leading-6 tracking-[0.32em] text-white/42 sm:block lg:right-10 lg:top-36">
      Riyadh<br />Doha<br />Abu Dhabi<br />Worldwide
    </div>

    <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 pb-20 lg:grid-cols-[1.04fr_.96fr]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85 }}
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/72 shadow-2xl shadow-black/20 backdrop-blur">
          <Crown className="h-4 w-4 text-[#d8b66d]" />
          Global location SEO for corporate website design
        </div>

        <h1 className="max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl xl:text-[8.2rem]">
          Corporate websites for global business hubs.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora helps ambitious businesses in London, New York, Dubai, Singapore and beyond build premium corporate websites, brand identities and SEO-led digital platforms.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#locations"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/25 transition hover:bg-[#f2cf83]"
          >
            Explore Locations
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#strategy"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            View SEO Strategy
          </a>
        </div>

        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["London", "UK authority"],
            ["New York", "Global market"],
            ["Dubai", "Luxury growth"],
            ["Singapore", "Corporate hub"],
          ].map(([top, bottom]) => (
            <div key={top} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur">
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
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Global Market Map</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    One agency presence. Multiple high-value markets.
                  </h2>
                </div>
                <Orbit className="h-10 w-10 shrink-0 text-white/35" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {locations.slice(0, 6).map((item) => (
                  <a
                    key={item.slug}
                    href={`/locations/${item.slug}`}
                    className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#d8b66d]/35 hover:bg-[#d8b66d]/10"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-[#d8b66d]" />
                      <div>
                        <p className="font-semibold text-white">{item.city}</p>
                        <p className="text-xs text-white/42">{item.region}</p>
                      </div>
                    </div>
                    <ArrowRight className="mt-5 h-4 w-4 text-[#d8b66d] transition group-hover:translate-x-1" />
                  </a>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-[#d8b66d]" />
                  <p className="text-sm leading-7 text-white/70">
                    Location pages help Sitora look global while targeting commercial searches in major cities.
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
            <span>London</span><span className="text-[#d8b66d]">•</span>
            <span>New York</span><span className="text-[#d8b66d]">•</span>
            <span>Dubai</span><span className="text-[#d8b66d]">•</span>
            <span>Singapore</span><span className="text-[#d8b66d]">•</span>
            <span>Riyadh</span><span className="text-[#d8b66d]">•</span>
            <span>Doha</span><span className="text-[#d8b66d]">•</span>
            <span>Abu Dhabi</span><span className="text-[#d8b66d]">•</span>
            <span>Manchester</span><span className="text-[#d8b66d]">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>

  <section id="locations" className="px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Global Locations</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Premium websites for cities where perception matters.
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          Each location page positions Sitora for corporate website design, branding and SEO searches in major commercial centres.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <motion.a
            key={location.slug}
            href={`/locations/${location.slug}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="group rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d8b66d]/35 hover:bg-[#d8b66d]/10"
          >
            <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#d8b66d]/15 text-[#d8b66d] transition group-hover:bg-[#d8b66d] group-hover:text-[#070910]">
              <MapPin className="h-6 w-6" />
            </div>
            <p className="text-sm text-white/42">{location.region}</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">Corporate Website Design {location.city}</h3>
            <p className="mt-4 text-sm leading-7 text-white/58">{location.text}</p>
            <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#d8b66d]">
              View location page <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>

  <section id="strategy" className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Location SEO Strategy</p>
        <h2 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
          Global pages create global perception.
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62">
          Sitora should not look like a small local web design service. The location structure helps position the agency across prestigious markets and high-value business searches.
        </p>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {strategy.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-[#05070d] p-8">
              <Icon className="mb-8 h-8 w-8 text-[#d8b66d]" />
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  <section id="global" className="px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Global Brand Signals</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Location pages should sell more than geography.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Each page should communicate that Sitora understands corporate standards, premium presentation and the type of digital presence expected in serious markets.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {globalSignals.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-5">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
              <p className="text-sm leading-7 text-white/68">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Internal Linking</p>
        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
          Each city page should connect to services and industries.
        </h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          The strongest SEO structure will link locations to service pages and industry pages, creating a web of relevance across the whole Sitora site.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          [Target, "Location + Service", "Corporate website design London, corporate branding Dubai, SEO web design New York."],
          [BriefcaseBusiness, "Location + Industry", "Website design for law firms London, dental clinic websites Dubai, consultants New York."],
          [Workflow, "Service Pathways", "Each city page should guide users towards web design, branding, SEO and lead generation services."],
          [Network, "SEO Network", "Locations, sectors and services should all link together to create stronger site authority."],
        ].map(([Icon, title, text]) => {
          const RealIcon = Icon as typeof Target;
          return (
            <div key={title as string} className="rounded-[1.5rem] border border-white/10 bg-[#05070d] p-6">
              <RealIcon className="mb-5 h-6 w-6 text-[#d8b66d]" />
              <h3 className="text-lg font-semibold">{title as string}</h3>
              <p className="mt-3 text-sm leading-7 text-white/56">{text as string}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  <section id="contact" className="px-5 pb-28 pt-24 sm:px-8">
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start a Global Website Project</p>
      <h2 className="mt-4 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
        Ready to position your business for a bigger market?
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora consultation and we’ll map out the website, branding, SEO and location strategy your business needs to look premium and compete with confidence.
      </p>
      <a
        href="mailto:hello@sitora.co.uk?subject=Global Website Project Enquiry"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
      >
        Request a Global Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }