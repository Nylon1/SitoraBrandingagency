export const metadata = {
  title:
    "Sitora Qatar Trust 360™ | Digital Trust, Compliance & Reputation Audit",
  description:
    "Sitora Qatar Trust 360™ helps startups, SMEs, corporates, regulated sectors and public-facing organisations in Qatar build trust, reduce risk and improve confidence across data protection, cybersecurity, advertising, AI, vendors, customer experience and reputation.",
};

const auditPillars = [
  {
    number: "01",
    title: "Data Protection & Privacy",
    text: "We review how your organisation collects, stores, shares and protects customer, employee and supplier data.",
    items: [
      "Privacy notices",
      "Consent forms",
      "CRM data",
      "Customer records",
      "Employee data",
      "Data retention",
      "Cross-border transfers",
      "Breach response",
      "Vendor access",
    ],
    risk: "Weak privacy controls can create serious financial, regulatory and reputational exposure under Qatar’s data protection framework.",
  },
  {
    number: "02",
    title: "Advertising & Public Claims",
    text: "We assess your adverts, landing pages, website claims, social media posts and promotional offers.",
    items: [
      "Misleading claims",
      "Exaggerated results",
      "Fake urgency",
      "Unclear prices",
      "Discounts and offers",
      "Testimonials",
      "Influencer posts",
      "Arabic/English consistency",
      "Before-and-after claims",
    ],
    risk: "Your adverts are not just marketing assets. In Qatar, they can become compliance evidence.",
  },
  {
    number: "03",
    title: "Cybersecurity Readiness",
    text: "We review whether your organisation has the basic protections expected of a serious modern business.",
    items: [
      "Email security",
      "Password policies",
      "Admin access",
      "Cloud systems",
      "Backups",
      "Staff awareness",
      "Phishing exposure",
      "Device access",
      "Incident response",
    ],
    risk: "One weak account, careless vendor or poor internal process can damage trust quickly.",
  },
  {
    number: "04",
    title: "AI & Automation Use",
    text: "We assess how your team uses AI tools, automation platforms, chatbots and AI-generated content.",
    items: [
      "ChatGPT usage",
      "Customer data in AI tools",
      "AI-generated content",
      "Chatbot risk",
      "Automated decisions",
      "Hallucination risk",
      "Human approval",
      "Internal AI policy",
      "AI vendor risk",
    ],
    risk: "The risk is rarely just using AI. The risk comes from what the AI touches: personal data, claims, decisions, content and accountability.",
  },
  {
    number: "05",
    title: "Website & Digital Presence",
    text: "We assess whether your website, app or online platform builds trust or creates doubt.",
    items: [
      "Credibility",
      "User journey",
      "Forms",
      "Privacy links",
      "Terms and conditions",
      "Payment flows",
      "Booking flows",
      "Contact details",
      "Mobile experience",
    ],
    risk: "Your website is often the first place customers, investors, partners and regulators judge you.",
  },
  {
    number: "06",
    title: "Customer Experience & Complaint Risk",
    text: "We review the customer journey from first impression to enquiry, purchase, service and complaint handling.",
    items: [
      "Enquiry response",
      "WhatsApp communication",
      "Sales promises",
      "Refund wording",
      "Cancellation process",
      "Complaint handling",
      "Review management",
      "Customer onboarding",
      "Service guarantees",
    ],
    risk: "Poor customer experience often turns into complaints, bad reviews, chargebacks and regulatory attention.",
  },
  {
    number: "07",
    title: "Vendor & Third-Party Risk",
    text: "We assess who outside your organisation has access to your systems, customers, data, marketing or brand.",
    items: [
      "Agencies",
      "IT providers",
      "CRM platforms",
      "Cloud tools",
      "AI vendors",
      "Payment providers",
      "Consultants",
      "Contractors",
      "Data hosting locations",
    ],
    risk: "You can outsource the work, but you cannot outsource the reputational damage.",
  },
  {
    number: "08",
    title: "Reputation & Crisis Readiness",
    text: "We assess how prepared your organisation is for scrutiny, complaints, public criticism or digital crisis.",
    items: [
      "Crisis response",
      "Social media escalation",
      "Leadership messaging",
      "Review attacks",
      "Media risk",
      "Misinformation risk",
      "Public complaints",
      "Stakeholder confidence",
      "Internal escalation",
    ],
    risk: "When something goes wrong, silence, confusion or weak messaging can make the damage worse.",
  },
];

const qatarRules = [
  {
    title: "Personal Data Privacy Protection Law",
    body: "National Cyber Security Agency / National Data Privacy Office",
    reference: "Law No. 13 of 2016",
    exposure: "Reported financial penalties can range from QAR 1 million to QAR 5 million for certain violations.",
    risk: "Personal data, customer records, employee data, consent, privacy notices, security safeguards, data sharing, sensitive data and breach handling.",
    audit:
      "We review privacy notices, consent journeys, data collection, CRM use, vendor access, retention, AI data exposure and breach readiness.",
    sourceLabel: "Qatar Data Protection Law guidance",
    sourceUrl:
      "https://www.pwc.com/m1/en/services/consulting/technology/cyber-security/navigating-data-privacy-regulations/qatar-data-protection-law.html",
  },
  {
    title: "Consumer Protection Law",
    body: "Ministry of Commerce and Industry / Consumer Protection Department",
    reference: "Law No. 8 of 2008",
    exposure:
      "Qatar’s Consumer Protection Law prohibits false or deceptive descriptions, advertising or display of commodities. MOCI enforcement examples include closures and fines for consumer-protection violations.",
    risk: "False advertising, unclear pricing, misleading offers, product claims, promotional content, refund wording and customer-facing promises.",
    audit:
      "We review website claims, landing pages, social media adverts, discounts, testimonials, Arabic/English consistency, refund wording and sales promises.",
    sourceLabel: "Al Meezan / MOCI",
    sourceUrl:
      "https://almeezan.qa/LawView.aspx?LawID=2647&language=en&opt=",
  },
  {
    title: "Cybercrime and Digital Privacy",
    body: "Cybercrime enforcement authorities",
    reference: "Law No. 14 of 2014 and Law No. 11 of 2025 amendment",
    exposure:
      "Recent reporting on Qatar’s cybercrime amendments refers to penalties of up to QAR 100,000 and imprisonment exposure for certain privacy violations involving images, videos or private information.",
    risk: "Unauthorised use or publication of personal images, videos, private information, event content, social media material and AI-generated or edited media.",
    audit:
      "We review social media content, event photography, testimonials, influencer content, user-generated content, image consent and AI-generated media risk.",
    sourceLabel: "Qatar cybercrime privacy amendment reporting",
    sourceUrl:
      "https://qatarlaw.com/news/qatar-introduces-new-fine-for-privacy-violations",
  },
  {
    title: "QFC Data Protection Regulations",
    body: "Qatar Financial Centre / Data Protection Office",
    reference: "QFC Data Protection Regulations 2021",
    exposure:
      "QFC has issued enforcement for data breach violations, including late notification, failure to protect data and inadequate implementation of security policies.",
    risk: "Personal data processing by QFC firms, breach notification, processor controls, security failures and governance evidence.",
    audit:
      "We review QFC-style data governance, processor controls, breach reporting readiness, vendor oversight and executive accountability.",
    sourceLabel: "QFC enforcement announcement",
    sourceUrl:
      "https://www.qfc.qa/en/media-centre/news/list/qatar-financial-centre-issues-fine-for-data-breach-violations",
  },
  {
    title: "Electronic Transactions & E-Commerce",
    body: "Communications Regulatory Authority / Commerce authorities",
    reference: "Decree-Law No. 16 of 2010",
    exposure:
      "Poor digital transaction controls can create legal, commercial and customer-dispute risk around online acceptance, e-signatures, payments and electronic records.",
    risk: "Electronic contracts, e-signatures, online terms, payment journeys, digital acceptance records, checkout flows and customer consent evidence.",
    audit:
      "We review online terms, checkout flows, contract acceptance, e-signature evidence, refund wording, payment journeys and customer consent records.",
    sourceLabel: "Electronic Transactions and Commerce Law",
    sourceUrl:
      "https://almeezan.qa/LawView.aspx?LawID=2678&language=en&opt=",
  },
  {
    title: "ICT Accessibility & Digital Inclusion",
    body: "MCIT / Mada accessibility ecosystem",
    reference: "Qatar ICT accessibility and digital inclusion policy landscape",
    exposure:
      "Poor accessibility can create service-quality, public-confidence, procurement and reputational risk, especially for government-linked and public-facing services.",
    risk: "Websites, apps, online forms, PDFs, portals, mobile journeys and public-facing digital services that are hard for people with disabilities to access.",
    audit:
      "We review accessibility basics including forms, navigation, contrast, mobile usability, Arabic/English content, PDFs and customer journeys.",
    sourceLabel: "MCIT accessibility ecosystem",
    sourceUrl:
      "https://www.mcit.gov.qa/en/News/arabic-translation-of-internet-content-accessibility-launched",
  },
  {
    title: "Financial Sector Technology Controls",
    body: "Qatar Central Bank",
    reference: "QCB fintech, payments, cloud and emerging technology expectations",
    exposure:
      "Regulated firms face higher scrutiny where technology, data, cloud services, outsourcing, cybersecurity or AI affect customers and financial services.",
    risk: "Cloud systems, financial data, AI use, outsourcing, cybersecurity, fintech controls, payment journeys and regulated-sector governance.",
    audit:
      "We review cyber governance, cloud/vendor reliance, AI usage, data handling, incident readiness and executive reporting for regulated environments.",
    sourceLabel: "QCB financial technology materials",
    sourceUrl:
      "https://www.qcb.gov.qa/en/pages/financialtechnology.aspx",
  },
  {
    title: "Marketing Consent & Direct Communications",
    body: "Data protection and consumer-facing regulatory expectations",
    reference: "Personal data privacy and direct marketing risk",
    exposure:
      "Poor consent evidence can increase exposure under privacy and consumer-protection frameworks, especially where customer data is used for direct marketing.",
    risk: "WhatsApp marketing, SMS campaigns, email lists, lead generation, retargeting pixels, CRM imports, agency lists and third-party data sources.",
    audit:
      "We review consent capture, unsubscribe flows, CRM lists, lead forms, pixels, campaign records and agency data handling.",
    sourceLabel: "Privacy and marketing governance",
    sourceUrl:
      "https://www.pwc.com/m1/en/services/consulting/technology/cyber-security/navigating-data-privacy-regulations/qatar-data-protection-law.html",
  },
];

const caseStudies = [
  {
    title: "QFC data breach enforcement",
    tag: "Real enforcement example",
    organisation: "QFC-licensed firm",
    outcome: "Financial penalty reported as US$150,000",
    issue:
      "The QFC Data Protection Office said the firm failed to report a breach within the required 72-hour window, delayed notification by ten days, failed to adequately protect the integrity, confidentiality and availability of personal data, and did not properly implement its own security policies.",
    lesson:
      "Policies alone are not enough. Organisations need evidence that breach reporting, vendor oversight, security controls and governance processes actually work.",
    sourceLabel: "QFC announcement",
    sourceUrl:
      "https://www.qfc.qa/en/media-centre/news/list/qatar-financial-centre-issues-fine-for-data-breach-violations",
  },
  {
    title: "Consumer protection enforcement activity",
    tag: "Market enforcement example",
    organisation: "Retail outlets inspected by MOCI",
    outcome: "Administrative closures and fines reported between QAR 5,000 and QAR 30,000",
    issue:
      "MOCI reported violations including promotions without the necessary licence, failure to display prices, non-compliance with guarantees and other consumer-protection issues.",
    lesson:
      "Advertising, offers, pricing, promotions, guarantees and customer-facing claims need to be reviewed before campaigns go live.",
    sourceLabel: "MOCI enforcement release",
    sourceUrl:
      "https://www.moci.gov.qa/en/mec_news/ministry-of-commerce-and-industry-cracks-down-on-107-violations-in-february/",
  },
  {
  title: "Privacy violations involving images and video",
  tag: "Social media and digital privacy risk",
  organisation: "Individuals and organisations using digital platforms",
  outcome: "Reported exposure up to QAR 100,000 and imprisonment risk",
  issue:
    "Qatar’s 2025 cybercrime amendment introduced Article 8 bis. Reporting says certain privacy violations involving images, video, private information or digital sharing can carry imprisonment, a fine of up to QAR 100,000, or both.",
  lesson:
    "Marketing teams must treat photos, videos, testimonials, event content, user-generated content and AI-edited media as compliance-risk material, not just creative content.",
  sourceLabel: "Qatar cybercrime amendment reporting",
  sourceUrl:
    "https://qatarlaw.com/news/qatar-introduces-new-fine-for-privacy-violations",
},

{
  title: "QR1 million consumer protection penalty",
  tag: "Pricing and consumer protection enforcement",
  organisation: "Company penalised by Qatar’s Ministry of Commerce and Industry",
  outcome: "QR1 million fine and one-month administrative closure reported",
  issue:
    "Qatar’s Ministry of Commerce and Industry reportedly ordered a one-month administrative closure and imposed a QR1 million fine after a company violated consumer protection rules by increasing prices without prior approval and failing to comply with approved pricing regulations.",
  lesson:
    "Pricing, offers, promotional claims, approvals, terms, discounts and customer-facing commercial practices need evidence and review before they create enforcement risk.",
  sourceLabel: "The Peninsula / MoCI enforcement report",
  sourceUrl:
    "https://thepeninsulaqatar.com/article/04/03/2026/qr1-million-fine-temporary-administrative-closure-of-company-in-qatar-moci",
}
];



const packages = [
  {
    title: "Startup Trust Check",
    subtitle: "Build trust before you scale.",
    bestFor:
      "Startups, new clinics, e-commerce brands, consultants, tech firms and small service businesses.",
    items: [
      "Website trust review",
      "Privacy and terms check",
      "Advertising claims scan",
      "Basic cyber hygiene review",
      "AI usage check",
      "Customer journey review",
      "Short action plan",
    ],
  },
  {
    title: "SME Trust 360 Audit",
    subtitle: "Protect the business you are building.",
    bestFor:
      "SMEs, agencies, schools, nurseries, gyms, clinics, retailers, restaurants, real estate firms and service providers.",
    items: [
      "Digital trust review",
      "Privacy/data protection check",
      "Advertising and claims review",
      "Cyber readiness snapshot",
      "Vendor risk review",
      "WhatsApp/email consent review",
      "30-day action plan",
    ],
  },
  {
    title: "Corporate Trust 360 Audit",
    subtitle: "Board-level visibility before risk becomes public.",
    bestFor:
      "Corporates, family businesses, healthcare groups, hospitality brands, education providers and enterprise suppliers.",
    items: [
      "Full 360 audit",
      "Executive risk dashboard",
      "Data governance review",
      "Vendor risk map",
      "Reputation and crisis readiness",
      "AI governance review",
      "Leadership briefing",
    ],
  },
  {
    title: "Regulated Sector Trust Audit",
    subtitle: "Be ready before evidence is requested.",
    bestFor:
      "Financial services, QFC firms, healthcare, education, insurance, legal, investment, real estate and professional services.",
    items: [
      "Sector-specific risk review",
      "Data protection controls",
      "Client communication review",
      "Governance evidence review",
      "Incident response review",
      "AI policy review",
      "Executive compliance summary",
    ],
  },
];

export default function QatarTrust360Page() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.30),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.09),_transparent_28%),linear-gradient(135deg,_#050505,_#080808_45%,_#16110A)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <nav className="flex items-center justify-between">
            <div>
              <p className="text-xl font-black tracking-[0.18em] text-[#D4AF37]">
                SITORA
              </p>
              <p className="mt-1 text-xs tracking-[0.28em] text-white/45">
                TRUST • GOVERNANCE • REPUTATION
              </p>
            </div>

            <a
              href="#consultation"
              className="hidden rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-3 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black sm:inline-flex"
            >
              Book Consultation
            </a>
          </nav>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <p className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
              Sitora Qatar Trust 360™
            </p>

            <h1 className="mt-8 max-w-5xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Build trust before you need to defend it.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-white/75">
              A premium trust, compliance and reputation audit for startups,
              SMEs, corporates, regulated sectors and public-facing
              organisations in Qatar.
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
              We identify hidden risks across Qatar data protection, consumer
              protection, cybersecurity, advertising claims, AI use, customer
              experience, vendor access, digital services and reputation —
              before they become complaints, fines, lost contracts or public
              damage.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#consultation"
                className="rounded-full bg-[#D4AF37] px-8 py-4 text-center text-sm font-bold text-black shadow-[0_0_30px_rgba(212,175,55,0.25)] transition hover:bg-[#f0cf63]"
              >
                Book a Trust 360 Consultation
              </a>
              <a
                href="#qatar-rules"
                className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-bold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                See Qatar Rules & Fines
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <HeroStat label="Trust Score™" value="0–100" />
              <HeroStat label="Risk Areas" value="8+" />
              <HeroStat label="Action Plan" value="30/60/90" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-white/[0.055] p-6 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/50 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Qatar Risk Snapshot
                </p>

                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <p className="text-6xl font-black text-white">5m</p>
                    <p className="mt-1 text-sm text-white/50">
                      QAR reported upper data-protection penalty exposure
                    </p>
                  </div>
                  <div className="rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-200">
                    Real Risk
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <ScoreBar label="Data privacy exposure" value="86%" />
                  <ScoreBar label="Advertising claim risk" value="72%" />
                  <ScoreBar label="Vendor control risk" value="68%" />
                  <ScoreBar label="Cyber readiness gap" value="62%" />
                  <ScoreBar label="AI data leakage risk" value="58%" />
                </div>

                <div className="mt-8 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 p-5">
                  <p className="font-semibold text-[#D4AF37]">
                    Trust is now evidence.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    Customers, regulators, investors, banks and government
                    buyers increasingly expect organisations to prove how they
                    control data, claims, vendors, AI and digital risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-6 py-4 backdrop-blur lg:block">
              <p className="text-sm font-semibold text-[#D4AF37]">
                Trust wins. Risk costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARROT STICK SOLUTION */}
      <section className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              label="The carrot"
              title="Trust helps you win."
              tone="gold"
              text="Stronger trust helps organisations win customers, investors, partners, enterprise clients, public-sector opportunities and stronger market confidence."
            />
            <FeatureCard
              label="The stick"
              title="Weak trust can cost you."
              tone="red"
              text="Poor data protection, misleading advertising, cyber gaps, uncontrolled vendors, weak consent records and careless AI use can trigger complaints, fines, lost contracts and public damage."
            />
            <FeatureCard
              label="The solution"
              title="Sitora gives you proof."
              tone="white"
              text="We give leadership a clear Trust Score™, risk dashboard and 30/60/90 day action plan so your organisation knows exactly what is strong, what is exposed and what to fix first."
            />
          </div>
        </div>
      </section>

      {/* RISK / FINES ANGLE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Fines, complaints and lost confidence
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              In Qatar, trust failures are no longer just reputation issues.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-white/70">
            <p>
              Many organisations look professional from the outside but have
              hidden weaknesses in how they collect data, advertise services,
              use AI tools, manage vendors, secure systems or handle customer
              complaints.
            </p>
            <p>
              These gaps can quickly become regulatory, commercial or
              reputational problems — especially when customers, investors,
              banks, enterprise clients or public-sector buyers ask for
              evidence.
            </p>
            <p className="font-semibold text-white">
              Sitora helps you find the gaps before someone else does.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Privacy and consent gaps",
            "Misleading advertising claims",
            "Weak cyber controls",
            "Uncontrolled vendor access",
            "Poor complaint handling",
            "AI misuse and data leakage",
            "Weak website terms",
            "Reputation and crisis exposure",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5"
            >
              <p className="font-semibold text-white">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QATAR RULES */}
      <section id="qatar-rules" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Qatar rules, bodies and penalty exposure
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Built around real Qatar compliance risk.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/70">
              Sitora Qatar Trust 360™ is designed around practical risk areas
              Qatar organisations face across privacy, consumer protection,
              cybersecurity, e-commerce, accessibility, financial regulation,
              advertising, digital content and vendor control.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {qatarRules.map((rule) => (
              <QatarRuleCard key={rule.title} {...rule} />
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
            <h3 className="text-2xl font-black text-[#D4AF37]">
              Why this matters commercially
            </h3>
            <p className="mt-5 text-lg leading-8 text-white/75">
              These laws and regulatory expectations affect more than legal
              departments. They affect websites, adverts, WhatsApp marketing,
              social media content, AI tools, customer data, payment journeys,
              supplier access, public communications and leadership
              accountability.
            </p>
            <p className="mt-5 text-lg font-semibold leading-8 text-white">
              Sitora helps organisations turn these obligations into practical
              evidence: clearer policies, better controls, safer campaigns,
              cleaner customer journeys and a stronger trust position.
            </p>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Enforcement examples
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            This is not theoretical.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Qatar and Qatar-linked regulatory bodies have already shown that
            data, consumer protection and governance failures can lead to real
            enforcement outcomes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.title} {...study} />
          ))}
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                What it is
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                A commercial trust audit for modern Qatar organisations.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-white/70">
              <p>
                Sitora Qatar Trust 360™ looks at how your organisation appears,
                advertises, collects data, uses technology, manages vendors,
                serves customers, handles risk and protects its reputation.
              </p>
              <p>
                This is not just a compliance checklist. It is a complete trust,
                governance and reputation assessment built for organisations
                that want to win customers, protect growth and prepare for
                greater scrutiny.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO FOR */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Who it is for
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            From startup to national institution, every organisation needs to
            prove trust.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <AudienceCard
            title="Startups"
            text="Look credible before customers, investors or partners judge you."
          />
          <AudienceCard
            title="SMEs"
            text="Find hidden gaps that could damage growth, reputation or confidence."
          />
          <AudienceCard
            title="Corporates"
            text="Give leadership a clear view of digital, legal, brand and operational trust risks."
          />
          <AudienceCard
            title="Regulated sectors"
            text="Prepare for scrutiny from regulators, banks, investors, insurers and enterprise clients."
          />
          <AudienceCard
            title="Public-facing bodies"
            text="Raise standards around data, accessibility, cyber resilience, vendors and public confidence."
          />
        </div>
      </section>

      {/* AUDIT PILLARS */}
      <section
        id="what-we-audit"
        className="border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              What we audit
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              One framework. Full visibility.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              We assess the areas customers, regulators, investors, partners and
              public-sector buyers increasingly care about.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {auditPillars.map((pillar) => (
              <AuditCard key={pillar.number} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              The output
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              The Sitora Trust Score™
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              After the audit, your organisation receives a clear trust score
              across the key risk areas. No vague consultancy language. No
              endless theory. Just a clear view of what is exposed, what matters
              most and what to fix first.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
            <h3 className="text-2xl font-bold text-[#D4AF37]">
              Your report includes:
            </h3>
            <ul className="mt-8 grid gap-4 text-white/75 sm:grid-cols-2">
              {[
                "Sitora Trust Score™",
                "Executive Risk Dashboard",
                "Qatar Rules & Risk Mapping",
                "Data Protection Risk Review",
                "Advertising & Claims Review",
                "Cyber Readiness Snapshot",
                "AI & Automation Risk Review",
                "Vendor Risk Map",
                "Website & Customer Journey Review",
                "Reputation Risk Heatmap",
                "30/60/90 Day Action Plan",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Packages
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Built for every stage of growth.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              The same core framework adapts to startups, growing businesses,
              larger organisations and higher-scrutiny sectors.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.title} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* QATAR */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Why Qatar
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              The next stage of digital growth is trust.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-white/70">
            <p>
              Qatar is accelerating digital transformation across government,
              business, AI, infrastructure, finance, education, healthcare and
              public services.
            </p>
            <p>
              As organisations become more digital, they face greater scrutiny
              around data, cybersecurity, advertising, AI, accessibility,
              vendors and public communications.
            </p>
            <p className="font-semibold text-white">
              Technology creates speed. Trust creates confidence.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Our approach
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Clear, practical and built for leadership.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-5">
            <StepCard
              step="01"
              title="Discover"
              text="We review your website, marketing, data flows, systems, policies, vendors and public-facing activity."
            />
            <StepCard
              step="02"
              title="Assess"
              text="We score your organisation across trust, compliance, digital, advertising, cyber, AI and reputation risk."
            />
            <StepCard
              step="03"
              title="Map"
              text="We map relevant Qatar risk areas, rules, bodies and practical compliance exposure."
            />
            <StepCard
              step="04"
              title="Report"
              text="You receive a clear executive report showing what is strong, exposed and urgent."
            />
            <StepCard
              step="05"
              title="Improve"
              text="You receive a practical 30/60/90 day roadmap so your team knows what to fix first."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="consultation" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.28),_transparent_45%),linear-gradient(135deg,_#050505,_#110d06)]" />

        <div className="mx-auto max-w-5xl px-6 py-28 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Start with a Trust 360 consultation
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
            Find the gaps before someone else does.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/70">
            Sitora Qatar Trust 360™ gives your organisation a clear, practical
            view of where trust is strong, where risk is hidden and what needs
            to change before complaints, fines, lost contracts or public damage
            occur.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@sitora.co?subject=Sitora Qatar Trust 360 Consultation"
              className="rounded-full bg-[#D4AF37] px-8 py-4 text-center text-sm font-bold text-black shadow-[0_0_30px_rgba(212,175,55,0.25)] transition hover:bg-[#f0cf63]"
            >
              Book a Trust 360 Consultation
            </a>
<a
  href="/qatar-trust-360/exposure-check"
  className="rounded-full bg-[#D4AF37] px-8 py-4 text-center text-sm font-bold text-black shadow-[0_0_30px_rgba(212,175,55,0.25)] transition hover:bg-[#f0cf63]"
>
  Start Exposure Check
</a>

            <a
              href="#packages"
              className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-bold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              View Audit Packages
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="border-t border-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm leading-7 text-white/45">
            Sitora Qatar Trust 360™ is a business trust, compliance and
            reputation assessment. It does not replace formal legal advice,
            regulatory advice, cybersecurity penetration testing or statutory
            audit. References to laws, regulators, fines or enforcement examples
            are provided for general risk-awareness purposes only. Where
            required, Sitora works alongside qualified legal, cybersecurity and
            sector specialists.
          </p>
        </div>
      </section>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-2xl font-black text-[#D4AF37]">{value}</p>
      <p className="mt-1 text-sm text-white/50">{label}</p>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-semibold text-[#D4AF37]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#D4AF37]"
          style={{ width: value }}
        />
      </div>
    </div>
  );
}

function FeatureCard({
  label,
  title,
  text,
  tone,
}: {
  label: string;
  title: string;
  text: string;
  tone: "gold" | "red" | "white";
}) {
  const styles = {
    gold: "border-[#D4AF37]/30 bg-[#D4AF37]/10",
    red: "border-red-500/30 bg-red-500/10",
    white: "border-white/10 bg-black/40",
  };

  const labelStyles = {
    gold: "text-[#D4AF37]",
    red: "text-red-300",
    white: "text-white/50",
  };

  return (
    <div className={`rounded-[2rem] border p-8 ${styles[tone]}`}>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.25em] ${labelStyles[tone]}`}
      >
        {label}
      </p>
      <h2 className="mt-4 text-3xl font-black text-white">{title}</h2>
      <p className="mt-5 leading-8 text-white/70">{text}</p>
    </div>
  );
}

function QatarRuleCard({
  title,
  body,
  reference,
  exposure,
  risk,
  audit,
  sourceLabel,
  sourceUrl,
}: {
  title: string;
  body: string;
  reference: string;
  exposure: string;
  risk: string;
  audit: string;
  sourceLabel: string;
  sourceUrl: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/40 p-8 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
        {reference}
      </p>

      <h3 className="mt-4 text-2xl font-black text-white">{title}</h3>

      <p className="mt-3 text-sm font-semibold text-white/50">{body}</p>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm font-bold text-red-300">Penalty / exposure</p>
          <p className="mt-2 text-sm leading-7 text-white/65">{exposure}</p>
        </div>

        <div>
          <p className="text-sm font-bold text-[#D4AF37]">Risk area</p>
          <p className="mt-2 text-sm leading-7 text-white/65">{risk}</p>
        </div>

        <div>
          <p className="text-sm font-bold text-white">How Sitora helps</p>
          <p className="mt-2 text-sm leading-7 text-white/65">{audit}</p>
        </div>
      </div>

      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex text-sm font-bold text-[#D4AF37] underline-offset-4 hover:underline"
      >
        Source: {sourceLabel}
      </a>
    </div>
  );
}

function CaseStudyCard({
  title,
  tag,
  organisation,
  outcome,
  issue,
  lesson,
  sourceLabel,
  sourceUrl,
}: {
  title: string;
  tag: string;
  organisation: string;
  outcome: string;
  issue: string;
  lesson: string;
  sourceLabel: string;
  sourceUrl: string;
}) {
  return (
    <div className="rounded-[2rem] border border-red-500/25 bg-red-500/10 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
        {tag}
      </p>

      <h3 className="mt-4 text-3xl font-black text-white">{title}</h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="text-sm font-bold text-white/50">Organisation</p>
          <p className="mt-2 font-semibold text-white">{organisation}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="text-sm font-bold text-white/50">Outcome</p>
          <p className="mt-2 font-semibold text-red-200">{outcome}</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm font-bold text-red-200">What happened</p>
          <p className="mt-2 text-sm leading-7 text-white/70">{issue}</p>
        </div>

        <div>
          <p className="text-sm font-bold text-[#D4AF37]">
            Sitora lesson
          </p>
          <p className="mt-2 text-sm leading-7 text-white/70">{lesson}</p>
        </div>
      </div>

      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex text-sm font-bold text-[#D4AF37] underline-offset-4 hover:underline"
      >
        Source: {sourceLabel}
      </a>
    </div>
  );
}

function AudienceCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5">
      <h3 className="text-xl font-bold text-[#D4AF37]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/65">{text}</p>
    </div>
  );
}

function AuditCard({
  number,
  title,
  text,
  items,
  risk,
}: {
  number: string;
  title: string;
  text: string;
  items: string[];
  risk: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/35 p-8 transition hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/5">
      <div className="flex items-center gap-4">
        <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-sm font-bold text-[#D4AF37]">
          {number}
        </span>
        <h3 className="text-2xl font-black">{title}</h3>
      </div>

      <p className="mt-5 leading-8 text-white/65">{text}</p>

      <ul className="mt-6 grid gap-2 text-sm text-white/60 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-7 text-white/75">
        <span className="font-bold text-[#D4AF37]">Why it matters: </span>
        {risk}
      </p>
    </div>
  );
}

function PackageCard({
  title,
  subtitle,
  bestFor,
  items,
}: {
  title: string;
  subtitle: string;
  bestFor: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col rounded-[2rem] border border-white/10 bg-black/40 p-7 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5">
      <h3 className="text-2xl font-black text-white">{title}</h3>
      <p className="mt-3 font-semibold text-[#D4AF37]">{subtitle}</p>

      <p className="mt-5 text-sm leading-7 text-white/60">
        <span className="font-bold text-white">Best for: </span>
        {bestFor}
      </p>

      <ul className="mt-7 space-y-3 text-sm text-white/70">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-[#D4AF37]">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href="#consultation"
        className="mt-8 rounded-full border border-white/15 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
      >
        Enquire
      </a>
    </div>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-6">
      <span className="text-sm font-bold text-[#D4AF37]">{step}</span>
      <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
    </div>
  );
}