export type PostFormat =
  | "Short video"
  | "Carousel"
  | "Single image"
  | "Story"
  | "LinkedIn post";

export type ContentAngle =
  | "Explained simply"
  | "Common mistakes"
  | "Warning signs"
  | "Questions answered"
  | "Practical advice";

export type HealthcareProfession =
  | "Dentist"
  | "Optician"
  | "Healthcare Startup";

export type HealthcareProfessionSlug =
  | "dentist"
  | "optician"
  | "healthcare-startup";

export type HealthcarePostIdea = {
  id: string;
  profession: HealthcareProfession;
  professionSlug: HealthcareProfessionSlug;
  category: string;
  categorySlug: string;
  topic: string;
  title: string;
  hook: string;
  format: PostFormat;
  angle: ContentAngle;
  callToAction: string;
};

export type HealthcarePostCategory = {
  slug: string;
  name: string;
  description: string;
  topics: string[];
};

export type HealthcareProfessionLibrary = {
  slug: HealthcareProfessionSlug;
  label: HealthcareProfession;
  description: string;
  categories: HealthcarePostCategory[];
  ideas: HealthcarePostIdea[];
};

type IdeaTemplate = {
  angle: ContentAngle;
  title: (topic: string) => string;
  hook: (topic: string) => string;
  callToAction: string;
};

export const dentalCategories: HealthcarePostCategory[] = [
  {
    slug: "oral-health-education",
    name: "Oral health education",
    description:
      "Clear explanations that help patients understand everyday oral health.",
    topics: [
      "bleeding gums",
      "plaque and tartar",
      "bad breath",
      "tooth sensitivity",
      "dry mouth",
      "mouth ulcers",
      "tongue health",
      "tooth decay",
      "gum disease",
      "enamel erosion",
    ],
  },
  {
    slug: "prevention-and-hygiene",
    name: "Prevention and hygiene",
    description:
      "Practical habits patients can use to protect their teeth and gums.",
    topics: [
      "brushing technique",
      "flossing",
      "interdental brushes",
      "toothbrush replacement",
      "electric toothbrushes",
      "fluoride toothpaste",
      "mouthwash",
      "diet and sugar",
      "dental check-ups",
      "professional cleaning",
    ],
  },
  {
    slug: "treatments-explained",
    name: "Dental treatments explained",
    description:
      "Simple explanations of common treatments and what patients can expect.",
    topics: [
      "fillings",
      "root canal treatment",
      "crowns",
      "bridges",
      "dental implants",
      "dentures",
      "tooth extraction",
      "gum treatment",
      "inlays and onlays",
      "emergency appointments",
    ],
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic dentistry",
    description:
      "Balanced content about improving smiles without unrealistic promises.",
    topics: [
      "teeth whitening",
      "composite bonding",
      "veneers",
      "smile makeovers",
      "tooth reshaping",
      "white fillings",
      "straightening teeth",
      "closing gaps",
      "worn teeth",
      "cosmetic consultations",
    ],
  },
  {
    slug: "childrens-dentistry",
    name: "Children's dentistry",
    description:
      "Helpful posts for parents, children and family dental care.",
    topics: [
      "a child's first dental visit",
      "teething",
      "thumb sucking",
      "children brushing",
      "fissure sealants",
      "fluoride varnish",
      "sports mouthguards",
      "sugary snacks",
      "wobbly teeth",
      "dental anxiety in children",
    ],
  },
  {
    slug: "dental-myths",
    name: "Dental myths",
    description:
      "Correct common misunderstandings in a respectful, patient-friendly way.",
    topics: [
      "brushing harder",
      "bleeding gums",
      "whitening toothpaste",
      "baby teeth",
      "wisdom teeth",
      "sugar-free drinks",
      "charcoal toothpaste",
      "mouthwash",
      "toothache disappearing",
      "dental X-rays",
    ],
  },
  {
    slug: "patient-questions",
    name: "Patient questions",
    description:
      "Turn frequently asked reception and surgery questions into useful posts.",
    topics: [
      "appointment length",
      "treatment costs",
      "dental pain",
      "nervous patients",
      "payment options",
      "emergency care",
      "second opinions",
      "aftercare",
      "medication and dentistry",
      "choosing a treatment",
    ],
  },
  {
    slug: "behind-the-scenes",
    name: "Behind the scenes",
    description:
      "Build trust by showing the people, systems and standards inside the practice.",
    topics: [
      "sterilisation",
      "morning preparation",
      "dental nursing",
      "team training",
      "practice technology",
      "patient records",
      "the decontamination room",
      "team meetings",
      "new equipment",
      "a day in the clinic",
    ],
  },
  {
    slug: "trust-and-transparency",
    name: "Trust and transparency",
    description:
      "Explain choices, fees, consent and patient safety more openly.",
    topics: [
      "treatment choices",
      "written estimates",
      "informed consent",
      "private and NHS care",
      "clinician qualifications",
      "patient complaints",
      "clinical photography",
      "treatment planning",
      "referrals",
      "follow-up care",
    ],
  },
  {
    slug: "clinic-and-community",
    name: "Clinic and community",
    description:
      "Human, local and timely content that connects the practice to its community.",
    topics: [
      "new team members",
      "practice milestones",
      "local schools",
      "charity activity",
      "community events",
      "patient feedback",
      "staff achievements",
      "seasonal opening hours",
      "local partnerships",
      "practice improvements",
    ],
  },
];

export const opticianCategories: HealthcarePostCategory[] = [
  {
    slug: "eye-health-education",
    name: "Eye health education",
    description:
      "Help patients understand common symptoms, changes and everyday eye health.",
    topics: [
      "digital eye strain",
      "dry eyes",
      "flashes and floaters",
      "headaches and vision",
      "red eyes",
      "blurred vision",
      "light sensitivity",
      "watery eyes",
      "itchy eyes",
      "night vision",
    ],
  },
  {
    slug: "eye-tests-explained",
    name: "Eye tests explained",
    description:
      "Demystify examinations, technology and what happens during an appointment.",
    topics: [
      "a routine eye examination",
      "eye pressure checks",
      "retinal photography",
      "visual field testing",
      "OCT scans",
      "prescription changes",
      "dilated eye examinations",
      "colour vision testing",
      "binocular vision checks",
      "hospital referrals",
    ],
  },
  {
    slug: "glasses-and-lenses",
    name: "Glasses and lenses",
    description:
      "Practical content about frames, lenses, comfort and choosing eyewear.",
    topics: [
      "frame fit",
      "anti-reflective coatings",
      "varifocal lenses",
      "reading glasses",
      "blue-light lenses",
      "prescription sunglasses",
      "sports eyewear",
      "occupational lenses",
      "lens thickness",
      "glasses adjustments",
    ],
  },
  {
    slug: "contact-lenses",
    name: "Contact lenses",
    description:
      "Answer common questions about fittings, care, comfort and safe lens use.",
    topics: [
      "a first contact lens fitting",
      "daily versus monthly lenses",
      "contact lens hygiene",
      "sleeping in contact lenses",
      "contact lenses and dry eyes",
      "contact lenses for teenagers",
      "toric contact lenses",
      "multifocal contact lenses",
      "travelling with contact lenses",
      "contact lens aftercare",
    ],
  },
  {
    slug: "childrens-vision",
    name: "Children's vision",
    description:
      "Give parents useful guidance on development, learning and early detection.",
    topics: [
      "a child's first eye test",
      "signs of vision problems at school",
      "screen time and children's eyes",
      "childhood myopia",
      "squints",
      "lazy eye",
      "headaches when reading",
      "reading difficulties and vision",
      "children's sports eyewear",
      "helping children feel confident in glasses",
    ],
  },
  {
    slug: "myopia-management",
    name: "Myopia management",
    description:
      "Explain short-sightedness, progression and evidence-led management options.",
    topics: [
      "myopia progression",
      "outdoor time and myopia",
      "myopia-control spectacle lenses",
      "myopia-control contact lenses",
      "family history of myopia",
      "screen habits and myopia",
      "monitoring prescription changes",
      "early myopia detection",
      "long-term risks of high myopia",
      "questions about myopia management",
    ],
  },
  {
    slug: "eye-condition-awareness",
    name: "Eye condition awareness",
    description:
      "Raise awareness of important eye conditions without diagnosing online.",
    topics: [
      "cataracts",
      "glaucoma",
      "age-related macular degeneration",
      "diabetic retinopathy",
      "keratoconus",
      "retinal detachment",
      "conjunctivitis",
      "blepharitis",
      "uveitis",
      "macular changes",
    ],
  },
  {
    slug: "eye-myths-and-faqs",
    name: "Eye myths and FAQs",
    description:
      "Correct common misconceptions and turn recurring questions into content.",
    topics: [
      "carrots improving eyesight",
      "sitting too close to the television",
      "glasses making eyes weaker",
      "blue light from screens",
      "contact lenses getting lost behind the eye",
      "eye exercises",
      "all red eyes being infections",
      "expired prescriptions",
      "cheap sunglasses",
      "only needing an eye test when vision is blurry",
    ],
  },
  {
    slug: "optical-behind-the-scenes",
    name: "Behind the scenes",
    description:
      "Show the expertise, systems and care involved in running an optical practice.",
    topics: [
      "cleaning examination equipment",
      "the role of a dispensing optician",
      "the role of an optometrist",
      "selecting a frame collection",
      "how lenses are made",
      "frame repairs and adjustments",
      "team training",
      "clinical record keeping",
      "referral pathways",
      "a day in the practice",
    ],
  },
  {
    slug: "optical-clinic-and-community",
    name: "Practice and community",
    description:
      "Share local, seasonal and human stories that strengthen community trust.",
    topics: [
      "new frame arrivals",
      "new team members",
      "practice milestones",
      "local school partnerships",
      "sports club partnerships",
      "summer UV protection",
      "winter driving vision",
      "charity activity",
      "patient feedback",
      "practice improvements",
    ],
  },
];

export const healthcareStartupCategories: HealthcarePostCategory[] = [
  {
    slug: "problem-and-mission",
    name: "Problem and mission",
    description:
      "Explain the healthcare problem, who it affects and why the mission matters.",
    topics: [
      "an unmet patient need",
      "founder insight",
      "why now",
      "defining target users",
      "health system pressure",
      "patient pain points",
      "clinician pain points",
      "measurable problem statements",
      "mission discipline",
      "avoiding solution-first thinking",
    ],
  },
  {
    slug: "product-and-workflow",
    name: "Product and workflow",
    description:
      "Make the product, workflow and user experience easy for buyers to understand.",
    topics: [
      "the product workflow",
      "the user journey",
      "clinical integration",
      "customer onboarding",
      "digital accessibility",
      "interoperability",
      "health data capture",
      "alert design",
      "human escalation",
      "product limitations",
    ],
  },
  {
    slug: "clinical-value-and-outcomes",
    name: "Clinical value and outcomes",
    description:
      "Show how the solution could create measurable value without overclaiming.",
    topics: [
      "patient outcomes",
      "clinician time savings",
      "early detection",
      "treatment adherence",
      "preventive healthcare",
      "health equity",
      "clinical safety",
      "outcome measurement",
      "evidence roadmaps",
      "unintended consequences",
    ],
  },
  {
    slug: "founder-journey-and-team",
    name: "Founder journey and team",
    description:
      "Humanise the company through founder lessons, team expertise and progress.",
    topics: [
      "the origin story",
      "founder-market fit",
      "clinical advisors",
      "multidisciplinary teams",
      "hiring the first roles",
      "startup culture",
      "difficult pivots",
      "founder lessons",
      "team milestones",
      "a day inside the startup",
    ],
  },
  {
    slug: "healthcare-innovation-education",
    name: "Healthcare innovation education",
    description:
      "Explain emerging healthcare technology in useful, accessible language.",
    topics: [
      "digital therapeutics",
      "remote patient monitoring",
      "clinical decision support",
      "AI in healthcare",
      "medical device versus wellness software",
      "electronic health records",
      "digital biomarkers",
      "virtual wards",
      "precision medicine",
      "patient portals",
    ],
  },
  {
    slug: "trust-safety-and-governance",
    name: "Trust, safety and governance",
    description:
      "Build credibility by discussing safety, data, regulation and responsible use.",
    topics: [
      "patient consent",
      "health data privacy",
      "cybersecurity",
      "clinical risk management",
      "algorithmic bias",
      "human oversight",
      "regulatory pathways",
      "responsible product claims",
      "incident response",
      "audit trails",
    ],
  },
  {
    slug: "market-and-industry-insights",
    name: "Market and industry insights",
    description:
      "Share an informed view of healthcare demand, systems and market change.",
    topics: [
      "NHS procurement",
      "private healthcare buying",
      "workforce shortages",
      "ageing populations",
      "chronic disease burden",
      "health inequalities",
      "preventive healthcare",
      "patient expectations",
      "value-based healthcare",
      "international health markets",
    ],
  },
  {
    slug: "customer-discovery-and-implementation",
    name: "Customer discovery and implementation",
    description:
      "Help audiences understand pilots, adoption and fitting technology into care.",
    topics: [
      "clinician interviews",
      "patient interviews",
      "pilot design",
      "stakeholder mapping",
      "workflow fit",
      "implementation planning",
      "change management",
      "user training",
      "adoption metrics",
      "procurement readiness",
    ],
  },
  {
    slug: "partnerships-and-growth",
    name: "Partnerships and growth",
    description:
      "Create content around credible partnerships and responsible routes to scale.",
    topics: [
      "hospital partnerships",
      "university research",
      "patient organisations",
      "pharma partnerships",
      "insurer partnerships",
      "employer health programmes",
      "accelerator programmes",
      "investor relationships",
      "channel partners",
      "international expansion",
    ],
  },
  {
    slug: "progress-evidence-and-transparency",
    name: "Progress, evidence and transparency",
    description:
      "Share progress honestly through evidence, learning and clear next steps.",
    topics: [
      "pilot findings",
      "product releases",
      "roadmap updates",
      "usage metrics",
      "case studies",
      "evidence gaps",
      "lessons from failure",
      "customer FAQs",
      "launch milestones",
      "what comes next",
    ],
  },
];

const formats: PostFormat[] = [
  "Short video",
  "Carousel",
  "Single image",
  "Story",
  "LinkedIn post",
];

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createClinicalTemplates(
  teamLabel: string,
  assessmentLabel: string,
): IdeaTemplate[] {
  return [
    {
      angle: "Explained simply",
      title: (topic) => `What patients should know about ${topic}`,
      hook: (topic) =>
        `${sentenceCase(topic)} can be confusing. Here is a clear explanation without the jargon.`,
      callToAction: `Save this post and speak to your ${teamLabel} if you have concerns.`,
    },
    {
      angle: "Common mistakes",
      title: (topic) => `Five common mistakes people make with ${topic}`,
      hook: (topic) =>
        `Many people think they understand ${topic}, but small mistakes and assumptions can make a real difference.`,
      callToAction: "Which of these surprised you most?",
    },
    {
      angle: "Warning signs",
      title: (topic) => `When ${topic} should not be ignored`,
      hook: (topic) =>
        `Some changes involving ${topic} are minor, while others deserve professional attention.`,
      callToAction: `Arrange ${assessmentLabel} if symptoms persist, worsen or concern you.`,
    },
    {
      angle: "Questions answered",
      title: (topic) => `The questions patients ask us about ${topic}`,
      hook: (topic) =>
        `We regularly hear the same questions about ${topic}, so here are clear answers in one place.`,
      callToAction: `Leave another question for our ${teamLabel}.`,
    },
    {
      angle: "Practical advice",
      title: (topic) => `Simple ways to manage ${topic}`,
      hook: (topic) =>
        `A few practical changes may help people approach ${topic} more confidently.`,
      callToAction: "Share this with someone who may find it useful.",
    },
  ];
}

const healthcareStartupTemplates: IdeaTemplate[] = [
  {
    angle: "Explained simply",
    title: (topic) => `What healthcare leaders should know about ${topic}`,
    hook: (topic) =>
      `${sentenceCase(topic)} is often discussed in complex language. Here is a clearer way to understand why it matters.`,
    callToAction:
      "Save this post for your next product, clinical or partnership discussion.",
  },
  {
    angle: "Common mistakes",
    title: (topic) => `Five common mistakes healthtech teams make with ${topic}`,
    hook: (topic) =>
      `Strong ideas can still fail when teams make avoidable assumptions about ${topic}.`,
    callToAction: "Which mistake have you seen most often?",
  },
  {
    angle: "Warning signs",
    title: (topic) => `Where ${topic} can go wrong in healthcare innovation`,
    hook: (topic) =>
      `${sentenceCase(topic)} can create value, but weak planning can introduce clinical, operational or commercial risk.`,
    callToAction:
      "Review the risks early and involve the right clinical, technical and operational stakeholders.",
  },
  {
    angle: "Questions answered",
    title: (topic) => `The questions healthcare buyers ask about ${topic}`,
    hook: (topic) =>
      `Healthcare buyers need more than a bold claim. These are the practical questions they ask about ${topic}.`,
    callToAction: "What question should founders answer more clearly?",
  },
  {
    angle: "Practical advice",
    title: (topic) => `Practical ways to strengthen ${topic}`,
    hook: (topic) =>
      `A more disciplined approach to ${topic} can improve trust, adoption and the quality of execution.`,
    callToAction: "Share this with a healthcare founder or innovation team.",
  },
];

function createPostIdeas({
  profession,
  professionSlug,
  categories,
  templates,
}: {
  profession: HealthcareProfession;
  professionSlug: HealthcareProfessionSlug;
  categories: HealthcarePostCategory[];
  templates: IdeaTemplate[];
}): HealthcarePostIdea[] {
  return categories.flatMap((category, categoryIndex) =>
    category.topics.flatMap((topic, topicIndex) =>
      templates.map((template, templateIndex) => ({
        id: `${professionSlug}-${category.slug}-${topicIndex + 1}-${templateIndex + 1}`,
        profession,
        professionSlug,
        category: category.name,
        categorySlug: category.slug,
        topic,
        title: template.title(topic),
        hook: template.hook(topic),
        format:
          formats[
            (categoryIndex + topicIndex + templateIndex) % formats.length
          ],
        angle: template.angle,
        callToAction: template.callToAction,
      })),
    ),
  );
}

export const dentalPostIdeas = createPostIdeas({
  profession: "Dentist",
  professionSlug: "dentist",
  categories: dentalCategories,
  templates: createClinicalTemplates("dental team", "a dental assessment"),
});

export const opticianPostIdeas = createPostIdeas({
  profession: "Optician",
  professionSlug: "optician",
  categories: opticianCategories,
  templates: createClinicalTemplates("eye care team", "an eye examination"),
});

export const healthcareStartupPostIdeas = createPostIdeas({
  profession: "Healthcare Startup",
  professionSlug: "healthcare-startup",
  categories: healthcareStartupCategories,
  templates: healthcareStartupTemplates,
});

export const dentalIdeaCount = dentalPostIdeas.length;
export const opticianIdeaCount = opticianPostIdeas.length;
export const healthcareStartupIdeaCount = healthcareStartupPostIdeas.length;

export const professionLibraries: HealthcareProfessionLibrary[] = [
  {
    slug: "dentist",
    label: "Dentist",
    description:
      "Patient education, treatment explanations, trust and practice content.",
    categories: dentalCategories,
    ideas: dentalPostIdeas,
  },
  {
    slug: "optician",
    label: "Optician",
    description:
      "Eye health, examinations, eyewear, contact lenses and community content.",
    categories: opticianCategories,
    ideas: opticianPostIdeas,
  },
  {
    slug: "healthcare-startup",
    label: "Healthcare Startup",
    description:
      "Product, evidence, governance, founder, market and partnership content.",
    categories: healthcareStartupCategories,
    ideas: healthcareStartupPostIdeas,
  },
];

export const allHealthcarePostIdeas = professionLibraries.flatMap(
  (library) => library.ideas,
);

export const totalHealthcareIdeaCount = allHealthcarePostIdeas.length;
