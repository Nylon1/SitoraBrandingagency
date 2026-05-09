import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { InstallAppButton } from "@/components/InstallAppButton";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#03050a] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8b66d] text-[#070910]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="text-2xl font-semibold">Sitora</span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
                Global web design and corporate branding agency creating premium websites,
                brand identities and SEO-led digital platforms for ambitious businesses.
              </p>
            </div>

            <a
              href="mailto:hello@sitora.co.uk?subject=Sitora Project Enquiry"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] transition hover:bg-[#f2cf83]"
            >
              Book Consultation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#d8b66d]">
              Services
            </h3>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              <Link href="/corporate-website-design">Corporate Website Design</Link>
              <Link href="/corporate-branding">Corporate Branding</Link>
              <Link href="/seo-lead-generation">SEO & Lead Generation</Link>
              <Link href="/industries">Industries</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#d8b66d]">
              Industries
            </h3>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              <Link href="/industries/law-firms">Law Firms</Link>
              <Link href="/industries/dental-clinics">Dental Clinics</Link>
              <Link href="/industries/accountants">Accountants</Link>
              <Link href="/industries/consultants">Consultants</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#d8b66d]">
              Global
            </h3>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              <span>London</span>
              <span>New York</span>
              <span>Dubai</span>
              <span>Singapore</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#d8b66d]">
              Contact
            </h3>
            <a
              href="mailto:hello@sitora.co.uk"
              className="mt-5 flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
            >
              <Mail className="h-4 w-4 text-[#d8b66d]" />
              hello@sitora.co.uk
            </a>
          </div>
        </div>

       <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/40">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <p>© {new Date().getFullYear()} Sitora. All rights reserved.</p>
    <InstallAppButton />
  </div>
</div>
      </div>
    </footer>
  );
}