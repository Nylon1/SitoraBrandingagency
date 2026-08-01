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

export type HealthcarePostIdea = {
  id: string;
  profession: "Dentist";
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

export const dentalCategories: HealthcarePostCategory[] = [
  {
    slug: "oral-health-education",
    name: "Oral health education",
    description: "Clear explanations that help patients understand everyday oral health.",
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
    description: "Practical habits patients can use to protect their teeth and gums.",
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
    description: "Simple explanations of common treatments and what patients can expect.",
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
    description: "Balanced content about improving smiles without unrealistic promises.",
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
    description: "Helpful posts for parents, children and family dental care.",
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
    description: "Correct common misunderstandings in a respectful, patient-friendly way.",
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
    description: "Turn frequently asked reception and surgery questions into useful posts.",
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
    description: "Build trust by showing the people, systems and standards inside the practice.",
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
    description: "Explain choices, fees, consent and patient safety more openly.",
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
    description: "Human, local and timely content that connects the practice to its community.",
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

const formats: PostFormat[] = [
  "Short video",
  "Carousel",
  "Single image",
  "Story",
  "LinkedIn post",
];

const templates: Array<{
  angle: ContentAngle;
  title: (topic: string) => string;
  hook: (topic: string) => string;
  callToAction: string;
}> = [
  {
    angle: "Explained simply",
    title: (topic) => `What patients should know about ${topic}`,
    hook: (topic) => `${sentenceCase(topic)} can be confusing. Here is a clear explanation without the jargon.`,
    callToAction: "Save this post and speak to your dental team if you have concerns.",
  },
  {
    angle: "Common mistakes",
    title: (topic) => `Five common mistakes people make with ${topic}`,
    hook: (topic) => `Many people think they are managing ${topic} correctly, but small mistakes can make a real difference.`,
    callToAction: "Which of these surprised you most?",
  },
  {
    angle: "Warning signs",
    title: (topic) => `When ${topic} should not be ignored`,
    hook: (topic) => `Some changes involving ${topic} are minor, while others deserve professional attention.`,
    callToAction: "Arrange an assessment if symptoms persist or worsen.",
  },
  {
    angle: "Questions answered",
    title: (topic) => `The questions patients ask us about ${topic}`,
    hook: (topic) => `We regularly hear the same questions about ${topic}, so here are clear answers in one place.`,
    callToAction: "Leave another question for our dental team.",
  },
  {
    angle: "Practical advice",
    title: (topic) => `Simple ways to manage ${topic}`,
    hook: (topic) => `A few practical changes may help you manage ${topic} more confidently.`,
    callToAction: "Share this with someone who may find it useful.",
  },
];

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const dentalPostIdeas: HealthcarePostIdea[] = dentalCategories.flatMap(
  (category, categoryIndex) =>
    category.topics.flatMap((topic, topicIndex) =>
      templates.map((template, templateIndex) => ({
        id: `dentist-${category.slug}-${topicIndex + 1}-${templateIndex + 1}`,
        profession: "Dentist" as const,
        category: category.name,
        categorySlug: category.slug,
        topic,
        title: template.title(topic),
        hook: template.hook(topic),
        format: formats[(categoryIndex + topicIndex + templateIndex) % formats.length],
        angle: template.angle,
        callToAction: template.callToAction,
      })),
    ),
);

export const dentalIdeaCount = dentalPostIdeas.length;
