"use client";

import { useEffect, useState } from "react"; import { motion, AnimatePresence } from "framer-motion"; import { ArrowRight, Globe2, Sparkles, ShieldCheck } from "lucide-react";

export default function SitoraEntryPage() { const [entering, setEntering] = useState(false); const [loaded, setLoaded] = useState(false);

useEffect(() => { const timer = window.setTimeout(() => setLoaded(true), 250); return () => window.clearTimeout(timer); }, []);

const handleEnter = () => { setEntering(true);

window.setTimeout(() => {
  window.location.href = "/home";
}, 850);

};

return ( <main className="relative min-h-screen overflow-hidden bg-[#05070d] text-white"> <AnimatePresence> {!entering && ( <motion.section initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }} exit={{ opacity: 0, scale: 1.03, filter: "blur(14px)" }} transition={{ duration: 0.85, ease: "easeInOut" }} className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8" > <div className="absolute inset-0 bg-[#05070d]" />

{/* Optional video background. Replace /videos/sitora-global.mp4 with your own corporate motion loop. */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/sitora-entry-poster.jpg"
        >
          <source src="/videos/sitora-global.mp4" type="video/mp4" />
        </video>

        {/* Premium overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(214,178,105,0.25),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(37,99,235,0.18),transparent_32%),linear-gradient(180deg,rgba(5,7,13,0.58),rgba(5,7,13,0.92))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.9),rgba(5,7,13,0.28),rgba(5,7,13,0.86))]" />

        {/* Moving corporate light forms */}
        <motion.div
          animate={{ x: [0, 34, 0], y: [0, -20, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-18%] top-[5%] h-[620px] w-[620px] rounded-full border border-[#d8b66d]/20 bg-[radial-gradient(circle,rgba(216,182,109,0.15),transparent_62%)] blur-[1px]"
        />

        <motion.div
          animate={{ x: [0, -28, 0], y: [0, 22, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-18%] bottom-[-20%] h-[650px] w-[650px] rounded-full border border-blue-400/10 bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_66%)]"
        />

        {/* Subtle skyline/grid feel */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] opacity-[0.15]">
          <div className="absolute inset-x-0 bottom-0 h-full bg-[linear-gradient(to_top,rgba(255,255,255,0.24),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-full bg-[repeating-linear-gradient(90deg,transparent_0_46px,rgba(255,255,255,.28)_47px_48px)]" />
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[repeating-linear-gradient(0deg,transparent_0_30px,rgba(255,255,255,.16)_31px_32px)]" />
        </div>

        <div className="absolute left-5 top-5 hidden max-w-[220px] border-l border-[#d8b66d]/45 pl-5 text-[10px] font-semibold uppercase leading-6 tracking-[0.28em] text-white/48 sm:block lg:left-10 lg:top-10">
          Strategy<br />Design<br />Development<br />Branding
        </div>

        <div className="absolute right-5 top-5 hidden max-w-[250px] text-right text-[10px] font-semibold uppercase leading-6 tracking-[0.28em] text-white/48 sm:block lg:right-10 lg:top-10">
          Building Brands.<br />Connecting Worlds.
        </div>

        <div className="absolute bottom-6 hidden text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 sm:block">
          London <span className="mx-3 text-[#d8b66d]">•</span> Dubai <span className="mx-3 text-[#d8b66d]">•</span> Manchester <span className="mx-3 text-[#d8b66d]">•</span> Worldwide
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.75 }}
            className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-[#d8b66d]/35 bg-white/[0.06] shadow-2xl shadow-[#d8b66d]/15 backdrop-blur-md sm:h-24 sm:w-24"
          >
            <Sparkles className="h-9 w-9 text-[#d8b66d] sm:h-11 sm:w-11" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.75 }}
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.42em] text-[#d8b66d] sm:text-xs"
          >
            Global Web & Corporate Branding Agency
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.8 }}
            className="text-6xl font-semibold tracking-[-0.06em] text-white sm:text-8xl lg:text-9xl"
          >
            Sitora
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8 }}
            className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-xl sm:leading-9"
          >
            We build premium websites, corporate brands and SEO-focused digital platforms for ambitious businesses ready to look established, trusted and built for growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 0.75 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={handleEnter}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#d8b66d]/60 bg-[#d8b66d] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.28em] text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition duration-300 hover:bg-[#f2cf83] hover:shadow-[#d8b66d]/35"
            >
              Enter Site
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.75 }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md">
              <ShieldCheck className="mb-3 h-5 w-5 text-[#d8b66d]" />
              <p className="text-sm font-semibold text-white">Corporate Trust</p>
              <p className="mt-1 text-xs leading-5 text-white/50">Design that makes businesses look serious.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md">
              <Globe2 className="mb-3 h-5 w-5 text-[#d8b66d]" />
              <p className="text-sm font-semibold text-white">Global Presence</p>
              <p className="mt-1 text-xs leading-5 text-white/50">Positioned for UK and international markets.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md">
              <Sparkles className="mb-3 h-5 w-5 text-[#d8b66d]" />
              <p className="text-sm font-semibold text-white">Premium Branding</p>
              <p className="mt-1 text-xs leading-5 text-white/50">A stronger first impression from the first click.</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    )}
  </AnimatePresence>
</main>

); }