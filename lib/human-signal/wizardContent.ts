export type IdeaSourceId =
  | "today"
  | "customer"
  | "problem"
  | "lesson"
  | "opinion"
  | "industry"
  | "project"
  | "question"
  | "surprise";

export type PostTypeId =
  | "experience"
  | "opinion"
  | "lesson"
  | "guide"
  | "industry"
  | "case-study"
  | "founder"
  | "product"
  | "discussion";

export type AudienceId =
  | "business-owners"
  | "founders"
  | "customers"
  | "professionals"
  | "employers"
  | "employees"
  | "investors"
  | "general";

export type OutcomeId =
  | "action"
  | "new-thinking"
  | "understand-problem"
  | "show-expertise"
  | "interest"
  | "discussion";

export interface ChoiceItem<T extends string> {
  id: T;
  title: string;
  description: string;
}

export interface CoachQuestion {
  id: string;
  question: string;
  guidance: string;
  placeholder: string;
}

export interface IdeaAngle {
  id: string;
  title: string;
  premise: string;
  postType: PostTypeId;
  whyItWorks: string;
  suggestedOpening: string;
  workingSubject: string;
}

export interface PostTypeDefinition extends ChoiceItem<PostTypeId> {
  bestFor: string;
  structure: string[];
  questionIds: string[];
}

export interface WritingLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  principle: string;
  explanation: string;
  weakExample: string;
  strongExample: string;
  exercise: string;
  exercisePlaceholder: string;
  checks: string[];
}

export interface LessonFeedback {
  score: number;
  headline: string;
  strengths: string[];
  improvements: string[];
}

export const IDEA_SOURCES: ChoiceItem<IdeaSourceId>[] = [
  {
    id: "today",
    title: "Something that happened",
    description: "Turn a meeting, decision, conversation or event into a useful post.",
  },
  {
    id: "customer",
    title: "A customer conversation",
    description: "Find the lesson hidden inside a question, objection or request.",
  },
  {
    id: "problem",
    title: "A problem I noticed",
    description: "Explain what is going wrong and why people should care.",
  },
  {
    id: "lesson",
    title: "A mistake or lesson",
    description: "Share what changed your approach without forcing a success story.",
  },
  {
    id: "opinion",
    title: "An opinion I hold",
    description: "Develop a clear professional view rather than a generic claim.",
  },
  {
    id: "industry",
    title: "An industry change",
    description: "Interpret a trend, rule, technology or shift for your audience.",
  },
  {
    id: "project",
    title: "A project I am working on",
    description: "Share the thinking, trade-offs and progress behind the work.",
  },
  {
    id: "question",
    title: "A question people ask me",
    description: "Turn repeated customer or colleague questions into authority content.",
  },
  {
    id: "surprise",
    title: "Surprise me",
    description: "Use a broad coaching interview to uncover an idea from your work.",
  },
];

const IDEA_QUESTIONS: Record<IdeaSourceId, CoachQuestion[]> = {
  today: [
    {
      id: "event",
      question: "What happened?",
      guidance: "Describe the moment plainly. A meeting, call, decision or observation is enough.",
      placeholder: "Today I was speaking to...",
    },
    {
      id: "meaning",
      question: "Why did it stand out?",
      guidance: "What was surprising, frustrating, useful or different from what you expected?",
      placeholder: "It stood out because...",
    },
    {
      id: "lesson",
      question: "What did it make you realise?",
      guidance: "State the lesson or judgement in your own words.",
      placeholder: "It made me realise that...",
    },
  ],
  customer: [
    {
      id: "customer-question",
      question: "What did the customer ask, want or struggle with?",
      guidance: "Keep them anonymous. Focus on the real problem behind the conversation.",
      placeholder: "A customer asked whether...",
    },
    {
      id: "response",
      question: "What did you explain or decide?",
      guidance: "Describe the reasoning, not just the answer you gave.",
      placeholder: "I explained that...",
    },
    {
      id: "wider-lesson",
      question: "What wider lesson would help other people?",
      guidance: "What does this reveal about buying, service, leadership or your industry?",
      placeholder: "The wider lesson is...",
    },
  ],
  problem: [
    {
      id: "problem",
      question: "What problem have you noticed?",
      guidance: "Be specific about what is happening, not just the broad topic.",
      placeholder: "The problem I keep seeing is...",
    },
    {
      id: "impact",
      question: "Who is affected and what does it cost them?",
      guidance: "Think about time, money, confidence, workload, risk or missed opportunity.",
      placeholder: "This affects... because...",
    },
    {
      id: "better-way",
      question: "What would a better approach look like?",
      guidance: "Give one practical direction rather than claiming to solve everything.",
      placeholder: "A better starting point would be...",
    },
  ],
  lesson: [
    {
      id: "situation",
      question: "What did you do or believe at the time?",
      guidance: "Set out the original decision or assumption honestly.",
      placeholder: "At the time, I thought...",
    },
    {
      id: "change",
      question: "What happened that changed your view?",
      guidance: "A result, failure, conversation or unintended consequence can be enough.",
      placeholder: "That changed when...",
    },
    {
      id: "lesson",
      question: "What do you do differently now?",
      guidance: "Turn the lesson into a practical behaviour or decision.",
      placeholder: "Now I...",
    },
  ],
  opinion: [
    {
      id: "common-view",
      question: "What is the common view?",
      guidance: "Describe it fairly before challenging it.",
      placeholder: "A lot of people believe...",
    },
    {
      id: "your-view",
      question: "What do you believe instead?",
      guidance: "State your real position without exaggerating it for engagement.",
      placeholder: "My view is...",
    },
    {
      id: "reason",
      question: "What experience or reasoning supports your view?",
      guidance: "Use something you have seen, tested, delivered or learned.",
      placeholder: "I believe this because...",
    },
  ],
  industry: [
    {
      id: "change",
      question: "What is changing in your industry?",
      guidance: "Name the trend, technology, rule or behaviour clearly.",
      placeholder: "The change I am watching is...",
    },
    {
      id: "meaning",
      question: "Why does it matter in practice?",
      guidance: "Explain the operational or human consequence, not just the headline.",
      placeholder: "In practice, this means...",
    },
    {
      id: "overlooked",
      question: "What are most people overlooking?",
      guidance: "Add the part only someone close to the work would notice.",
      placeholder: "What is being overlooked is...",
    },
  ],
  project: [
    {
      id: "project",
      question: "What are you building or working on?",
      guidance: "Explain the problem and stage without turning it into an announcement.",
      placeholder: "We are currently working on...",
    },
    {
      id: "decision",
      question: "What difficult decision or trade-off are you facing?",
      guidance: "The thinking is often more interesting than the feature list.",
      placeholder: "The difficult part is deciding...",
    },
    {
      id: "learning",
      question: "What have you learned so far?",
      guidance: "Share a useful insight from the work in progress.",
      placeholder: "So far, we have learned...",
    },
  ],
  question: [
    {
      id: "question",
      question: "What question do people repeatedly ask you?",
      guidance: "Use the wording people actually use where possible.",
      placeholder: "People often ask me...",
    },
    {
      id: "simple-answer",
      question: "What is the simple answer?",
      guidance: "Give the direct answer before adding nuance.",
      placeholder: "The simple answer is...",
    },
    {
      id: "nuance",
      question: "What important detail changes the answer?",
      guidance: "Show where context, risk, timing or priorities matter.",
      placeholder: "However, the part people miss is...",
    },
  ],
  surprise: [
    {
      id: "recent",
      question: "What have you recently noticed, questioned or changed your mind about?",
      guidance: "Choose something connected to your actual work or professional experience.",
      placeholder: "Recently, I have been thinking about...",
    },
    {
      id: "tension",
      question: "What sounds right in theory but works differently in practice?",
      guidance: "Tension creates useful posts when it is based on real experience.",
      placeholder: "In theory... but in practice...",
    },
    {
      id: "help",
      question: "What could another person learn from this?",
      guidance: "Give them a decision, question or warning they can use.",
      placeholder: "The useful lesson is...",
    },
  ],
};

export const AUDIENCES: ChoiceItem<AudienceId>[] = [
  { id: "business-owners", title: "Business owners", description: "People making commercial and operational decisions." },
  { id: "founders", title: "Founders", description: "People building, testing and growing companies." },
  { id: "customers", title: "Customers", description: "People who may buy, recommend or use your service." },
  { id: "professionals", title: "Industry professionals", description: "Peers who understand the subject and value expertise." },
  { id: "employers", title: "Employers and leaders", description: "Decision-makers looking for judgement and capability." },
  { id: "employees", title: "Employees and jobseekers", description: "People developing careers, skills and confidence." },
  { id: "investors", title: "Investors and partners", description: "People assessing the opportunity and your thinking." },
  { id: "general", title: "General LinkedIn audience", description: "A broad professional audience with mixed knowledge." },
];

export const OUTCOMES: ChoiceItem<OutcomeId>[] = [
  { id: "action", title: "Take a practical action", description: "The reader should know what to do next." },
  { id: "new-thinking", title: "See the issue differently", description: "Challenge an assumption or offer a better frame." },
  { id: "understand-problem", title: "Understand a problem", description: "Explain the cause, consequence and hidden difficulty." },
  { id: "show-expertise", title: "Recognise my expertise", description: "Demonstrate judgement through useful substance." },
  { id: "interest", title: "Become interested in the work", description: "Build curiosity without writing an advert." },
  { id: "discussion", title: "Join a useful discussion", description: "Invite informed views rather than empty engagement." },
];

const POST_QUESTIONS: Record<string, CoachQuestion> = {
  "what-happened": {
    id: "what-happened",
    question: "What happened?",
    guidance: "Set the scene using only the details the reader needs.",
    placeholder: "A recent conversation/project/decision...",
  },
  "why-mattered": {
    id: "why-mattered",
    question: "Why did it matter?",
    guidance: "Explain the consequence, surprise or tension.",
    placeholder: "It mattered because...",
  },
  "what-noticed": {
    id: "what-noticed",
    question: "What did you notice that others might miss?",
    guidance: "This is where your experience becomes valuable.",
    placeholder: "What stood out was...",
  },
  "lesson": {
    id: "lesson",
    question: "What did you learn?",
    guidance: "State the lesson without making it sound universal if it is not.",
    placeholder: "The lesson I took from it was...",
  },
  "reader-takeaway": {
    id: "reader-takeaway",
    question: "What should the reader take from it?",
    guidance: "Give one useful decision, warning or question.",
    placeholder: "For someone facing this, I would...",
  },
  "common-view": {
    id: "common-view",
    question: "What is the common view?",
    guidance: "Describe the position fairly before challenging it.",
    placeholder: "The common view is...",
  },
  "your-view": {
    id: "your-view",
    question: "What do you believe instead?",
    guidance: "State your position in one clear sentence.",
    placeholder: "My view is...",
  },
  "reason": {
    id: "reason",
    question: "Why do you believe that?",
    guidance: "Use reasoning or first-hand experience rather than volume.",
    placeholder: "I believe this because...",
  },
  "example": {
    id: "example",
    question: "What real example supports the point?",
    guidance: "Use a genuine situation, number or outcome. Leave it blank if it is not verified.",
    placeholder: "For example...",
  },
  "reconsider": {
    id: "reconsider",
    question: "What should people reconsider?",
    guidance: "End with a precise challenge rather than a motivational line.",
    placeholder: "Before deciding, people should ask...",
  },
  "problem": {
    id: "problem",
    question: "What exact problem are you helping the reader solve?",
    guidance: "Make the situation recognisable and specific.",
    placeholder: "The problem is...",
  },
  "first-step": {
    id: "first-step",
    question: "What is the first useful step?",
    guidance: "Give an action the reader can realistically take.",
    placeholder: "Start by...",
  },
  "second-step": {
    id: "second-step",
    question: "What should happen next?",
    guidance: "Build logically on the first action.",
    placeholder: "Then...",
  },
  "mistake": {
    id: "mistake",
    question: "What common mistake should they avoid?",
    guidance: "Explain why the mistake causes trouble.",
    placeholder: "A common mistake is...",
  },
  "change": {
    id: "change",
    question: "What is changing?",
    guidance: "Name the development without overclaiming its importance.",
    placeholder: "The change is...",
  },
  "practical-impact": {
    id: "practical-impact",
    question: "What does it change in practice?",
    guidance: "Show the effect on decisions, work, customers or risk.",
    placeholder: "In practice, this changes...",
  },
  "overlooked": {
    id: "overlooked",
    question: "What is being overlooked?",
    guidance: "Add the insight that comes from being close to the work.",
    placeholder: "The part being overlooked is...",
  },
  "expectation": {
    id: "expectation",
    question: "What do you expect to happen next?",
    guidance: "Make a reasoned observation, not a certainty you cannot support.",
    placeholder: "My expectation is...",
  },
  "starting-point": {
    id: "starting-point",
    question: "What was the starting point?",
    guidance: "Describe the real situation before your involvement.",
    placeholder: "The starting position was...",
  },
  "action-taken": {
    id: "action-taken",
    question: "What did you do and why?",
    guidance: "Explain the decision, not a list of services.",
    placeholder: "We decided to... because...",
  },
  "result": {
    id: "result",
    question: "What genuine result or change followed?",
    guidance: "Use verified outcomes only. Qualitative results are acceptable.",
    placeholder: "The result was...",
  },
  "building": {
    id: "building",
    question: "What are you building or changing?",
    guidance: "Explain the problem and purpose before the features.",
    placeholder: "We are building...",
  },
  "why-now": {
    id: "why-now",
    question: "Why does this matter now?",
    guidance: "Connect the work to a real need or change.",
    placeholder: "This matters now because...",
  },
  "challenge": {
    id: "challenge",
    question: "What challenge or trade-off are you facing?",
    guidance: "Sharing the decision can be more useful than pretending everything is finished.",
    placeholder: "The difficult decision is...",
  },
  "progress": {
    id: "progress",
    question: "What progress or lesson can you share?",
    guidance: "Give a concrete update or insight.",
    placeholder: "So far...",
  },
  "existing-failure": {
    id: "existing-failure",
    question: "Why are existing approaches not enough?",
    guidance: "Be fair and specific. Do not create a problem just to sell the solution.",
    placeholder: "Existing approaches struggle because...",
  },
  "idea": {
    id: "idea",
    question: "What is your proposed idea or approach?",
    guidance: "Explain the mechanism simply.",
    placeholder: "The idea is to...",
  },
  "beneficiary": {
    id: "beneficiary",
    question: "Who benefits and how?",
    guidance: "Name the user and practical value.",
    placeholder: "This would help... by...",
  },
  "next-step": {
    id: "next-step",
    question: "What is the honest next step?",
    guidance: "A pilot, conversation or test is often more credible than a grand claim.",
    placeholder: "The next step is...",
  },
  "discussion-context": {
    id: "discussion-context",
    question: "What is the real issue you want to discuss?",
    guidance: "Give enough context for informed answers.",
    placeholder: "The issue is...",
  },
  "options": {
    id: "options",
    question: "What are the main options or tensions?",
    guidance: "Show why the answer is not obvious.",
    placeholder: "One option is... while another is...",
  },
  "your-position": {
    id: "your-position",
    question: "What is your current view?",
    guidance: "Offer your thinking before asking other people to do the work.",
    placeholder: "My current view is...",
  },
  "real-question": {
    id: "real-question",
    question: "What precise question should readers answer?",
    guidance: "Ask for experience or judgement, not agreement.",
    placeholder: "For people who have dealt with this...",
  },
};

export const POST_TYPES: PostTypeDefinition[] = [
  {
    id: "experience",
    title: "Personal experience",
    description: "Turn something that happened into a useful professional insight.",
    bestFor: "Stories, observations, customer moments and decisions.",
    structure: ["What happened", "Why it mattered", "What you noticed", "The lesson", "Reader takeaway"],
    questionIds: ["what-happened", "why-mattered", "what-noticed", "lesson", "reader-takeaway"],
  },
  {
    id: "opinion",
    title: "Opinion",
    description: "Develop a defensible view without manufacturing controversy.",
    bestFor: "Challenging assumptions and explaining professional judgement.",
    structure: ["Common view", "Your view", "Reasoning", "Real example", "What to reconsider"],
    questionIds: ["common-view", "your-view", "reason", "example", "reconsider"],
  },
  {
    id: "lesson",
    title: "Lesson learned",
    description: "Share how an experience changed the way you work or decide.",
    bestFor: "Mistakes, changed opinions and practical learning.",
    structure: ["Original situation", "What changed", "What you noticed", "Lesson", "What others can do"],
    questionIds: ["what-happened", "why-mattered", "what-noticed", "lesson", "reader-takeaway"],
  },
  {
    id: "guide",
    title: "Practical guide",
    description: "Teach a useful process in a clear, credible way.",
    bestFor: "How-to posts, checklists and professional advice.",
    structure: ["Problem", "First step", "Next step", "Mistake to avoid", "Takeaway"],
    questionIds: ["problem", "first-step", "second-step", "mistake", "reader-takeaway"],
  },
  {
    id: "industry",
    title: "Industry observation",
    description: "Interpret a development instead of simply repeating the news.",
    bestFor: "Trends, regulation, technology and changing behaviour.",
    structure: ["What is changing", "Practical impact", "What is overlooked", "Your expectation", "Reader action"],
    questionIds: ["change", "practical-impact", "overlooked", "expectation", "reader-takeaway"],
  },
  {
    id: "case-study",
    title: "Case study",
    description: "Explain a real piece of work through decisions and outcomes.",
    bestFor: "Demonstrating expertise without writing a sales brochure.",
    structure: ["Starting point", "Decision", "Result", "Lesson", "Reader takeaway"],
    questionIds: ["starting-point", "action-taken", "result", "lesson", "reader-takeaway"],
  },
  {
    id: "founder",
    title: "Founder update",
    description: "Share progress, uncertainty and decisions behind the business.",
    bestFor: "Building in public without pretending every update is a breakthrough.",
    structure: ["What you are building", "Why now", "Challenge", "Progress", "Next step"],
    questionIds: ["building", "why-now", "challenge", "progress", "next-step"],
  },
  {
    id: "product",
    title: "Product idea",
    description: "Explain a product opportunity through the problem and mechanism.",
    bestFor: "Early concepts, pilots and innovation discussions.",
    structure: ["Problem", "Why current options fall short", "Idea", "Who benefits", "Next step"],
    questionIds: ["problem", "existing-failure", "idea", "beneficiary", "next-step"],
  },
  {
    id: "discussion",
    title: "Professional discussion",
    description: "Ask a precise question after contributing your own thinking.",
    bestFor: "Gathering informed experience rather than empty engagement.",
    structure: ["Issue", "Context", "Options", "Your view", "Precise question"],
    questionIds: ["discussion-context", "why-mattered", "options", "your-position", "real-question"],
  },
];

export const TOPIC_CATEGORIES = [
  {
    id: "business",
    label: "Business",
    topics: [
      "A pricing decision that taught me something",
      "Why good customer service sometimes means saying no",
      "The hidden cost of a cheap solution",
      "A process in my business that needed simplifying",
      "What business owners misunderstand about growth",
      "A lesson from a difficult customer situation",
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    topics: [
      "A decision I delayed for too long",
      "How I handle uncertainty when there is no perfect answer",
      "What makes professional advice genuinely useful",
      "A leadership assumption I no longer believe",
      "The difference between activity and progress",
      "Why clear boundaries can improve trust",
    ],
  },
  {
    id: "expertise",
    label: "Expertise",
    topics: [
      "A common misconception in my industry",
      "What customers should check before buying",
      "A technical detail that changes the whole decision",
      "Why the obvious solution often fails in practice",
      "Three questions I ask before recommending anything",
      "A problem people notice too late",
    ],
  },
  {
    id: "technology",
    label: "Technology & AI",
    topics: [
      "Where AI creates more work instead of less",
      "What should never be automated without human judgement",
      "The difference between an impressive demo and a useful product",
      "Why more data does not always mean a better decision",
      "A technology problem that is really a process problem",
      "How to keep human expertise inside an AI workflow",
    ],
  },
  {
    id: "career",
    label: "Career",
    topics: [
      "A skill I learned outside formal education",
      "The professional advice I would give my younger self",
      "A mistake that improved the way I work",
      "Why experience is not the same as judgement",
      "How I became more confident making decisions",
      "A conversation that changed my career thinking",
    ],
  },
];

export const WRITING_LESSONS: WritingLesson[] = [
  {
    id: "openings",
    title: "Write openings worth continuing",
    description: "Start with the real point instead of generic scene-setting or clickbait.",
    duration: "5 minutes",
    principle: "The opening should create relevance, not artificial suspense.",
    explanation:
      "A strong opening usually contains a specific observation, tension, decision or consequence. It tells the reader why this subject matters without using exaggerated claims.",
    weakExample: "AI is transforming every industry and the future is already here.",
    strongExample: "We reviewed an AI tool that promised to reduce healthcare workload. Its first recommendation created three additional appointments.",
    exercise: "Rewrite the weak opening so it begins with a specific observation, event or tension.",
    exercisePlaceholder: "Write your improved opening here...",
    checks: ["Specific event or observation", "Clear relevance", "No empty scene-setting"],
  },
  {
    id: "specificity",
    title: "Make broad claims specific",
    description: "Replace vague benefits with concrete situations, people and consequences.",
    duration: "6 minutes",
    principle: "Specificity is one of the fastest ways to make writing credible.",
    explanation:
      "A post becomes stronger when the reader can picture the situation. Numbers can help, but specificity also comes from naming the decision, process, person affected or practical consequence.",
    weakExample: "Poor communication can have a negative impact on businesses.",
    strongExample: "A delayed installation update caused the customer to book a second day off work and left our team rearranging three jobs.",
    exercise: "Turn the weak statement into a concrete example without inventing a statistic.",
    exercisePlaceholder: "Describe who was affected and what happened...",
    checks: ["A recognisable situation", "A practical consequence", "No invented evidence"],
  },
  {
    id: "opinion",
    title: "Express a clear professional opinion",
    description: "Move beyond summaries and show the judgement behind your work.",
    duration: "6 minutes",
    principle: "An opinion needs a position and a reason, not aggression.",
    explanation:
      "Good professional opinions explain what you believe, what you are responding to and why your experience supports that view. You do not need to manufacture controversy.",
    weakExample: "There are many different views about using AI in business.",
    strongExample: "Businesses should not start with an AI tool. They should start with the decision or process that is currently failing.",
    exercise: "Write one sentence that states what you believe about a subject you know well.",
    exercisePlaceholder: "My view is...",
    checks: ["Clear position", "Connected to expertise", "No exaggerated certainty"],
  },
  {
    id: "stories",
    title: "Turn experience into a useful story",
    description: "Use what happened to reveal a lesson instead of writing a diary entry.",
    duration: "7 minutes",
    principle: "The story earns attention; the lesson earns trust.",
    explanation:
      "A professional story needs only enough detail to understand the moment. Focus on the decision, tension or change, then explain what the reader can take from it.",
    weakExample: "I had a busy day meeting clients and learned a lot.",
    strongExample: "A customer asked for the most advanced blind system available. We recommended curtains instead because the technically impressive option had created repeated servicing problems.",
    exercise: "Describe one work moment in two or three sentences, then add the lesson.",
    exercisePlaceholder: "What happened, and what did it teach you?",
    checks: ["A real moment", "Only necessary detail", "A useful lesson"],
  },
  {
    id: "endings",
    title: "End with value, not a slogan",
    description: "Give the reader a decision, question or action they can use.",
    duration: "5 minutes",
    principle: "The ending should complete the thought rather than repeat the opening.",
    explanation:
      "Strong endings often state what should change, what question should be asked or what practical action follows. Avoid motivational lines that could be attached to any post.",
    weakExample: "The future belongs to those who embrace change.",
    strongExample: "Before adding another test, ask what decision the result will change and whether that change improves the patient’s outcome.",
    exercise: "Replace the weak ending with one practical takeaway or decision question.",
    exercisePlaceholder: "Before/When/Next time...",
    checks: ["Practical value", "Connected to the post", "No generic slogan"],
  },
];

export function getIdeaQuestions(source: IdeaSourceId): CoachQuestion[] {
  return IDEA_QUESTIONS[source];
}

export function getPostType(id: PostTypeId): PostTypeDefinition {
  return POST_TYPES.find((item) => item.id === id) ?? POST_TYPES[0];
}

export function getBuilderQuestions(type: PostTypeId): CoachQuestion[] {
  return getPostType(type).questionIds.map((id) => POST_QUESTIONS[id]);
}

function firstSentence(value: string): string {
  return value.trim().split(/(?<=[.!?])\s+/)[0]?.trim() ?? "";
}

function shortSubject(value: string): string {
  const words = firstSentence(value)
    .replace(/^[“"']|[”"']$/g, "")
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return "your experience";
  return words.slice(0, 10).join(" ").replace(/[.,;:!?]+$/, "");
}


export function buildIdeaAngles(
  source: IdeaSourceId,
  answers: Record<string, string>,
): IdeaAngle[] {
  const values = IDEA_QUESTIONS[source]
    .map((question) => answers[question.id]?.trim())
    .filter(Boolean);
  const seed = shortSubject(values[0] ?? "your recent professional experience");
  const insight = firstSentence(values[2] ?? values[1] ?? "");

  const experienceTitle = source === "customer"
    ? `The lesson behind this customer conversation: ${seed}`
    : `The lesson behind: ${seed}`;

  const opinionTitle = insight
    ? shortSubject(insight)
    : `What people may be overlooking: ${seed}`;

  return [
    {
      id: "experience-angle",
      title: experienceTitle,
      premise: "Tell the real moment, explain why it mattered and finish with the lesson.",
      postType: "experience",
      whyItWorks: "The experience gives the post credibility while the lesson gives the reader value.",
      suggestedOpening: values[0] || "Begin with the moment that happened.",
      workingSubject: seed,
    },
    {
      id: "opinion-angle",
      title: opinionTitle,
      premise: "Use the experience as evidence for a clear professional judgement.",
      postType: "opinion",
      whyItWorks: "It moves beyond reporting what happened and shows what you believe because of it.",
      suggestedOpening: insight || values[1] || "Begin with the judgement the experience created.",
      workingSubject: insight || seed,
    },
    {
      id: "practical-angle",
      title: `What others can learn from: ${seed}`,
      premise: "Turn the situation into advice, questions or a better decision process.",
      postType: "lesson",
      whyItWorks: "It gives readers something they can apply without pretending your experience is universal.",
      suggestedOpening: values[1] || values[0] || "Begin with the practical problem.",
      workingSubject: seed,
    },
  ];
}

export function seedBuilderAnswers(
  type: PostTypeId,
  ideaAnswers: Record<string, string>,
): Record<string, string> {
  const values = Object.values(ideaAnswers).map((value) => value.trim()).filter(Boolean);
  const questions = getBuilderQuestions(type);
  const seeded: Record<string, string> = {};
  values.slice(0, questions.length).forEach((value, index) => {
    seeded[questions[index].id] = value;
  });
  return seeded;
}

export function assemblePost(
  type: PostTypeId,
  answers: Record<string, string>,
  questionOverride?: CoachQuestion[],
): string {
  const questions = questionOverride?.length ? questionOverride : getBuilderQuestions(type);
  const byId = Object.fromEntries(
    questions.map((question) => [question.id, (answers[question.id] ?? "").trim()]),
  );

  let orderedIds = questions.map((question) => question.id);

  // Preserve the deliberately stronger order for the built-in templates.
  // AI-generated question sets arrive already ordered by the coach.
  if (!questionOverride?.length && type === "opinion") {
    orderedIds = ["your-view", "common-view", "reason", "example", "reconsider"];
  }

  if (!questionOverride?.length && type === "discussion") {
    orderedIds = ["discussion-context", "why-mattered", "options", "your-position", "real-question"];
  }

  return orderedIds
    .map((id) => byId[id])
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getAudienceLabel(id: AudienceId): string {
  return AUDIENCES.find((item) => item.id === id)?.title ?? "your audience";
}

export function getOutcomeLabel(id: OutcomeId): string {
  return OUTCOMES.find((item) => item.id === id)?.title ?? "gain something useful";
}

export function evaluateLessonPractice(
  lessonId: string,
  text: string,
): LessonFeedback {
  const clean = text.trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const strengths: string[] = [];
  const improvements: string[] = [];
  let score = clean.length ? 35 : 0;

  const hasNumber = /\b\d+(?:[.,]\d+)?%?\b/.test(clean);
  const hasSpecificActor = /\b(customer|client|patient|team|manager|founder|employee|project|meeting|call|installation|order|business)\b/i.test(clean);
  const hasOpinion = /\b(i think|i believe|my view|the real issue|should not|should|instead|wrong|overlook)\b/i.test(clean);
  const hasAction = /\b(ask|check|start|stop|before|next time|consider|decide|measure|review|avoid)\b/i.test(clean);
  const hasStory = /\b(when|today|yesterday|recently|a customer|a client|we decided|i noticed|happened)\b/i.test(clean);
  const hasGeneric = /\b(transforming|game[- ]changer|future is here|embrace change|unlock(?:ing)? potential|fast[- ]paced world)\b/i.test(clean);

  if (words.length >= 8) {
    score += 10;
    strengths.push("You developed the thought beyond a slogan.");
  } else if (clean) {
    improvements.push("Add enough context for the reader to understand the point.");
  }

  if (hasSpecificActor || hasNumber) {
    score += 20;
    strengths.push("The writing contains a concrete detail or recognisable situation.");
  }

  if (hasGeneric) {
    score -= 15;
    improvements.push("Replace familiar promotional wording with the real observation or consequence.");
  }

  switch (lessonId) {
    case "openings":
      if (hasStory || hasSpecificActor) {
        score += 25;
        strengths.push("The opening starts with a real moment or specific subject.");
      } else {
        improvements.push("Start closer to the event, decision or tension.");
      }
      if (words.length > 45) improvements.push("Try to reach the main point faster.");
      break;
    case "specificity":
      if (hasSpecificActor) score += 20;
      else improvements.push("Name who was affected or what process was involved.");
      if (hasNumber) score += 10;
      break;
    case "opinion":
      if (hasOpinion) {
        score += 30;
        strengths.push("Your position is visible rather than hidden behind a summary.");
      } else {
        improvements.push("State what you actually believe in one direct sentence.");
      }
      break;
    case "stories":
      if (hasStory) {
        score += 25;
        strengths.push("The answer contains a moment the reader can follow.");
      } else {
        improvements.push("Anchor the lesson in something that actually happened.");
      }
      if (!/\b(learn|realise|lesson|now|since then|taught)\b/i.test(clean)) {
        improvements.push("Add the lesson or change that came from the story.");
      } else score += 10;
      break;
    case "endings":
      if (hasAction) {
        score += 30;
        strengths.push("The ending gives the reader a practical decision or action.");
      } else {
        improvements.push("Finish with something the reader can ask, check or do.");
      }
      break;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  if (!strengths.length && clean) strengths.push("You have a usable starting point to develop.");
  if (!improvements.length) improvements.push("Read it aloud and remove any words you would not naturally say.");

  return {
    score,
    headline:
      score >= 80
        ? "Strong application"
        : score >= 60
          ? "Good direction"
          : score >= 35
            ? "Promising start"
            : "Needs a clearer attempt",
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
  };
}
