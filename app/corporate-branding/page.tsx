"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, BrainCircuit, Building2, CheckCircle2, Eye, Fingerprint, Globe2, Layers3, MessageSquareText, Palette, ShieldCheck, Sparkles, Target, WandSparkles, } from "lucide-react";

const brandOutcomes = [ "A sharper, more professional business identity", "A visual style that feels premium and consistent", "Clearer messaging around what your company does", "Stronger trust before a customer contacts you", "A brand presence that supports higher-value clients", "A digital identity that works across website, social and proposals", ];

const brandingServices = [ { icon: Fingerprint, title: "Brand Identity Direction", text: "A clear visual direction for how your business should look, feel and present itself online.", }, { icon: Palette, title: "Colours, Typography & Style", text: "Premium colour systems, font pairing, layout tone and design language that create a stronger impression.", }, { icon: MessageSquareText, title: "Messaging & Positioning", text: "Clear words, taglines and value statements that explain why customers should trust and choose you.", }, { icon: Layers3, title: "Digital Brand System", text: "A consistent identity across your website, landing pages, service pages and marketing touchpoints.", }, ];

const process = [ { step: "01", title: "Brand Discovery", text: "We understand your business, audience, market, competitors and how you want to be perceived.", }, { step: "02", title: "Positioning Strategy", text: "We define the core message, value proposition and premium angle that will guide your digital presence.", }, { step: "03", title: "Visual Direction", text: "We shape the look: colours, fonts, spacing, imagery style, interface feel and corporate presentation.", }, { step: "04", title: "Website Brand Application", text: "We apply the brand into a premium website experience designed to feel polished and consistent.", }, { step: "05", title: "Growth-Ready Identity", text: "Your brand becomes easier to use across future pages, campaigns, proposals and digital assets.", }, ];

const assets = [ "Logo refinement direction", "Brand colour palette", "Typography direction", "Website visual system", "Hero messaging", "Service positioning", "CTA language", "Digital brand guidelines", ];

export default function CorporateBrandingPage() { return ( <main className="min-h-screen overflow-hidden bg-[#05070d] text-white"> <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#05070d]/72 backdrop-blur-2xl"> <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"> <a href="/home" className="flex items-center gap-3"> <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8b66d] text-[#070910] shadow-lg shadow-[#d8b66d]/20"> <Sparkles className="h-5 w-5" /> </span> <span className="text-xl font-semibold tracking-tight">Sitora</span> </a>

<nav className="hidden items-center gap-8 text-sm font-medium text-white/62 lg:flex">
        <a href="/home" className="transition hover:text-white">Home</a>
        <a href="#services" className="transition hover:text-white">Branding</a>
        <a href="#process" className="transition hover:text-white">Process</a>
        <a href="#assets" className="transition hover:text-white">Deliverables</a>
        <a href="#contact" className="transition hover:text-white">Contact</a>
      </nav>

      <a
        href="#contact"
        className="rounded-full border border-[#d8b66d]/45 px-5 py-2.5 text-sm font-semibold text-[#d8b66d] transition hover:bg-[#d8b66d] hover:text-[#070910]"
      >
        Brand Consultation
      </a>
    </div>
  </header>

  <section className="relative px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_12%,rgba(216,182,109,0.24),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(147,51,234,0.14),transparent_30%),linear-gradient(180deg,#05070d_0%,#0b101b_48%,#05070d_100%)]" />
    <motion.div
      animate={{ x: [0, 30, 0], y: [0, -18, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-20%] top-[5%] h-[700px] w-[700px] rounded-full border border-[#d8b66d]/15 bg-[radial-gradient(circle,rgba(216,182,109,0.13),transparent_64%)]"
    />
    <motion.div
      animate={{ x: [0, -24, 0], y: [0, 18, 0], rotate: [0, -4, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-18%] bottom-[-20%] h-[620px] w-[620px] rounded-full border border-purple-400/10 bg-[radial-gradient(circle,rgba(147,51,234,0.14),transparent_66%)]"
    />

    <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 backdrop-blur">
          <WandSparkles className="h-4 w-4 text-[#d8b66d]" />
          Corporate Branding by Sitora
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Build a brand that makes your business feel bigger, sharper and trusted.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora helps ambitious businesses create a premium digital identity through brand positioning, visual direction, messaging and website-ready design systems.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
          >
            Build My Brand Presence <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Explore Branding
          </a>
        </div>

        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Identity", "Look more established"],
            ["Message", "Explain your value"],
            ["Trust", "Win confidence faster"],
          ].map(([top, bottom]) => (
            <div key={top} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <p className="text-lg font-semibold text-[#d8b66d]">{top}</p>
              <p className="mt-1 text-xs leading-5 text-white/50">{bottom}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.9 }}
        className="relative"
      >
        <div className="absolute -inset-10 rounded-[3rem] bg-[#d8b66d]/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="rounded-[1.7rem] border border-white/10 bg-[#0b111d] p-6">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Brand Authority System</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Designed to improve how people see your company.</h2>
              </div>
              <Eye className="h-9 w-9 shrink-0 text-white/35" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Visual Trust", "Premium design language", "95%"],
                ["Message Clarity", "Sharper positioning", "91%"],
                ["Consistency", "Brand system thinking", "89%"],
                ["Perception", "Stronger first impression", "97%"],
              ].map(([label, desc, percent]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="mt-1 text-xs text-white/48">{desc}</p>
                    </div>
                    <span className="text-sm font-bold text-[#d8b66d]">{percent}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#d8b66d]" style={{ width: percent }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[#d8b66d]" />
                <p className="text-sm leading-7 text-white/70">
                  Strong branding helps customers feel they are dealing with a serious company before they even speak to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>

  <section className="px-5 py-20 sm:px-8">
    <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Why branding matters</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">People judge the quality of your business by the quality of your brand.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            A weak brand can make a good company look small. A strong brand can make a growing business look established, reliable and ready for better opportunities.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {brandOutcomes.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-[#05070d] p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
              <p className="text-sm leading-7 text-white/68">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section id="services" className="px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Branding Services</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A premium identity built for the digital world.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          We shape the parts of your brand that customers see first: your website appearance, message, trust signals, style and presentation.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {brandingServices.map((service) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="group rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#d8b66d]/15 text-[#d8b66d] transition group-hover:bg-[#d8b66d] group-hover:text-[#070910]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{service.text}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Brand Positioning</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Stop looking like the cheapest option. Start looking like the trusted choice.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Your brand should help you attract the right customers, not just any customers. Sitora helps businesses create the kind of digital presence that supports premium perception.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          [Target, "Premium Positioning", "Shape your website and message around the type of clients you actually want."],
          [BadgeCheck, "Trust Signals", "Use credibility, clarity and professional design to reduce customer doubt."],
          [Globe2, "Bigger Presence", "Create a business image that feels more corporate, global and serious."],
          [BrainCircuit, "Strategic Messaging", "Clarify what you offer and why your company is worth choosing."],
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

  <section id="process" className="px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Our Process</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A clear branding process for serious businesses.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          We focus on practical brand direction that can be used immediately across your website, digital content and business presentation.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-5">
        {process.map((item) => (
          <div key={item.step} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-bold text-[#d8b66d]">{item.step}</p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/56">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="assets" className="px-5 pb-24 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(147,51,234,0.10))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Brand Deliverables</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A brand toolkit your website can actually use.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            We create practical brand direction, not just decoration. The result is a clearer identity that can guide your website and future marketing.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {assets.map((asset) => (
            <div key={asset} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#d8b66d]" />
              <span className="font-medium">{asset}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section id="contact" className="px-5 pb-28 pt-8 sm:px-8">
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start Your Brand Upgrade</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Ready for a brand presence that feels premium, trusted and serious?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora branding consultation and we’ll map out how your business should look, sound and present itself online.
      </p>
      <a
        href="mailto:hello@sitora.co.uk?subject=Corporate Branding Enquiry"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
      >
        Request a Branding Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }