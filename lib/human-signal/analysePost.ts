export type SignalKey =
  | "perspective"
  | "experience"
  | "specificity"
  | "substance"
  | "readerValue";

export type QuestionCategory =
  | "origin"
  | "experience"
  | "judgement"
  | "tension"
  | "evidence"
  | "action";

export type PlacementPosition =
  | "opening"
  | "after-opening"
  | "middle"
  | "ending";

export interface SignalScores {
  perspective: number;
  experience: number;
  specificity: number;
  substance: number;
  readerValue: number;
}

export interface SignalExplanation {
  label: string;
  score: number;
  status: "strong" | "developing" | "missing";
  explanation: string;
}

export interface GenericPattern {
  phrase: string;
  reason: string;
}

export interface HumanSignalQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  guidance: string;
  placement: string;
  suggestedPosition: PlacementPosition;
}

export interface PlacementSuggestion {
  questionId: string;
  category: QuestionCategory;
  answer: string;
  placement: string;
  suggestedPosition: PlacementPosition;
}

export interface IntegratedInsertion extends PlacementSuggestion {
  paragraphIndex: number;
}

export interface IntegratedResult {
  post: string;
  insertions: IntegratedInsertion[];
}

export interface HumanSignalAnalysis {
  overallScore: number;
  label: string;
  summary: string;
  topic: string;
  scores: SignalScores;
  explanations: Record<SignalKey, SignalExplanation>;
  weakestSignals: SignalKey[];
  strongestSignal: SignalKey;
  questions: HumanSignalQuestion[];
  genericPatterns: GenericPattern[];
  positiveSignals: string[];
}

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "against",
  "also",
  "among",
  "because",
  "been",
  "before",
  "being",
  "between",
  "both",
  "business",
  "could",
  "does",
  "doing",
  "during",
  "each",
  "from",
  "future",
  "have",
  "having",
  "here",
  "into",
  "more",
  "most",
  "other",
  "over",
  "people",
  "should",
  "some",
  "such",
  "than",
  "that",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "under",
  "using",
  "very",
  "what",
  "when",
  "where",
  "which",
  "while",
  "will",
  "with",
  "would",
  "your",
  "you",
  "organisation",
  "organisations",
  "company",
  "companies",
  "industry",
  "industries",
  "technology",
  "innovation",
  "transform",
  "transforming",
  "improve",
  "improving",
  "reduce",
  "reducing",
  "enable",
  "enabling",
  "effective",
  "positioned",
  "comes",
  "recently",
  "reviewed",
  "review",
  "recommend",
  "recommended",
  "sensible",
  "matter",
  "mattered",
  "another",
  "every",
  "often",
  "whether",
]);

const GENERIC_PATTERNS: Array<{ pattern: RegExp; phrase: string; reason: string }> = [
  {
    pattern: /ai is transforming/gi,
    phrase: "AI is transforming…",
    reason: "A familiar opening that does not yet reveal your own observation.",
  },
  {
    pattern: /in today[’']?s (?:fast[- ]paced|rapidly changing) world/gi,
    phrase: "In today’s fast-paced world…",
    reason: "A broad scene-setting phrase that delays the real point.",
  },
  {
    pattern: /game[- ]?changer/gi,
    phrase: "Game-changer",
    reason: "A strong claim without showing what changed, for whom or by how much.",
  },
  {
    pattern: /revolutioni[sz](?:e|ing)/gi,
    phrase: "Revolutionising",
    reason: "A high-level claim that needs a concrete mechanism or example.",
  },
  {
    pattern: /unlock(?:ing)? (?:the )?(?:full )?potential/gi,
    phrase: "Unlocking potential",
    reason: "An abstract benefit that could apply to almost any topic.",
  },
  {
    pattern: /embrace (?:innovation|change|technology)/gi,
    phrase: "Embrace innovation",
    reason: "A generic recommendation without a decision, trade-off or next step.",
  },
  {
    pattern: /best positioned for what comes next/gi,
    phrase: "Best positioned for what comes next",
    reason: "A common closing line that does not give the reader a useful takeaway.",
  },
  {
    pattern: /the future is (?:here|now)/gi,
    phrase: "The future is here",
    reason: "A dramatic conclusion that adds little practical meaning.",
  },
  {
    pattern: /drive (?:growth|success|innovation|impact)/gi,
    phrase: "Drive growth/success",
    reason: "A broad outcome with no explanation of the causal path.",
  },
  {
    pattern: /seamless(?:ly)?/gi,
    phrase: "Seamless",
    reason: "A marketing adjective that needs evidence from actual use.",
  },
  {
    pattern: /exciting times/gi,
    phrase: "Exciting times",
    reason: "A familiar sentiment that does not add your own judgement.",
  },
];

const clamp = (value: number, min = 0, max = 20) =>
  Math.max(min, Math.min(max, Math.round(value)));

const countMatches = (text: string, pattern: RegExp) =>
  (text.match(pattern) ?? []).length;

const wordsOf = (text: string) =>
  text
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}%£$€'-]+$/gu, ""))
    .filter(Boolean);

const sentencesOf = (text: string) =>
  text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

const paragraphsOf = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);

function findGenericPatterns(text: string): GenericPattern[] {
  const found: GenericPattern[] = [];

  for (const item of GENERIC_PATTERNS) {
    item.pattern.lastIndex = 0;
    if (item.pattern.test(text)) {
      found.push({ phrase: item.phrase, reason: item.reason });
    }
  }

  return found.slice(0, 4);
}

function normaliseTopicToken(word: string): string {
  let value = word.toLowerCase().replace(/[’']s$/, "");
  if (value.endsWith("ing") && value.length > 6) value = value.slice(0, -3);
  else if (value.endsWith("ed") && value.length > 5) value = value.slice(0, -2);
  else if (value.endsWith("s") && value.length > 4 && !value.endsWith("ss")) value = value.slice(0, -1);
  return value;
}

function detectTopic(text: string): string {
  const candidateText = paragraphsOf(text).slice(0, 3).join(" ");
  const rawTokens = wordsOf(candidateText)
    .map((word) => word.toLowerCase())
    .filter(
      (word) =>
        word.length > 3 &&
        !STOP_WORDS.has(word) &&
        !/^\d/.test(word) &&
        !/^(think|believe|found|real|need|make|help|better|good|great|point|issue)$/.test(word),
    );

  const forms = new Map<string, string[]>();
  const counts = new Map<string, number>();
  rawTokens.forEach((word) => {
    const normalised = normaliseTopicToken(word);
    counts.set(normalised, (counts.get(normalised) ?? 0) + 1);
    forms.set(normalised, [...(forms.get(normalised) ?? []), word]);
  });

  const ranked = [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || rawTokens.findIndex((word) => normaliseTopicToken(word) === a[0]) - rawTokens.findIndex((word) => normaliseTopicToken(word) === b[0]),
  );

  const top = ranked[0]?.[0];
  if (!top) return "this subject";

  const variants = forms.get(top) ?? [top];
  const gerund = variants.find((word) => word.endsWith("ing"));
  const representative = gerund ?? variants[0];
  return representative;
}

function scorePerspective(text: string, genericCount: number): number {
  const firstPersonJudgement = countMatches(
    text,
    /\b(i think|i believe|i have found|i have seen|in my view|my view is|we believe|we found|i disagree|i agree|i do not think|i don[’']t think|the real issue|the real question|what worries me|what surprised me|my concern|my conclusion|i realised|i realized|i learned|i learnt|that changed how i think|i came to believe|what i learned|what i learnt|what i realised|what i realized)\b/gi,
  );
  const contrastSignals = countMatches(
    text,
    /\b(but|however|instead|rather than|although|yet|the problem is|the mistake is|the trade-off|on the surface|in reality)\b/gi,
  );
  const clearStance = countMatches(
    text,
    /\b(should not|shouldn[’']t|must not|cannot|is not enough|does not mean|matters more than|is more important than)\b/gi,
  );

  return clamp(
    3 + firstPersonJudgement * 6 + contrastSignals * 1.4 + clearStance * 3 - genericCount * 0.8,
  );
}

function scoreExperience(text: string): number {
  const firstPerson = countMatches(text, /\b(i|we|my|our|us)\b/gi);
  const livedSignals = countMatches(
    text,
    /\b(recently|last week|last month|last year|yesterday|when we|when i|a client|our client|a customer|our customer|our team|we tested|we built|we reviewed|we launched|i learned|we learned|i saw|we saw|i made|we made|in practice|on a project|during a meeting|in a conversation|formed this view|after reviewing|in one review|after speaking|this month|this week|in one clinic|in one case|in one project|we lost|within two weeks|within one week|now we)\b/gi,
  );
  const directExperience = countMatches(
    text,
    /\b(?:we|i)\s+(?:recently\s+|personally\s+)?(?:reviewed|tested|built|launched|discovered|learned|saw|worked|made|changed|spoke|met|tried|formed|lost|realised|realized|measured|spoke)\b/gi,
  );
  const outcomeSignals = countMatches(
    text,
    /\b(what happened next|the result was|we discovered|we realised|we realized|it failed|it worked|it cost|it took|that changed|which meant)\b/gi,
  );

  return clamp(2 + Math.min(firstPerson, 5) * 1.2 + livedSignals * 3.2 + directExperience * 3 + outcomeSignals * 2.5);
}

function scoreSpecificity(text: string, genericCount: number): number {
  const numbers = countMatches(
    text,
    /(?:£|\$|€)?\b\d+(?:[.,]\d+)?(?:%|k|m|bn|days?|weeks?|months?|years?|hours?|minutes?|customers?|patients?|posts?|people)?\b/gi,
  );
  const examples = countMatches(
    text,
    /\b(for example|for instance|specifically|one example|in one case|the first|the second|a client|a customer|a patient|the founder|the team|the project|the product|the campaign|the meeting)\b/gi,
  );
  const mechanisms = countMatches(
    text,
    /\b(which meant|as a result|because of this|that created|that caused|that reduced|that increased|the reason was|the consequence was)\b/gi,
  );
  const quotedOrNamed = countMatches(text, /[“"][^”"]{3,}[”"]|\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}\b/g);
  const concreteActorsAndObjects = countMatches(
    text,
    /\b(client|customer|patient|employee|founder|team|clinic|hospital|laboratory|appointment|follow-up|invoice|campaign|prototype|product|service|system|website|report|meeting|order|engine|test|testing|supplier|contract|complaint|application)\b/gi,
  );
  const listSignals = countMatches(text, /:[^.!?]+,[^.!?]+(?:,| and )[^.!?]+/g);

  return clamp(
    3 +
      Math.min(numbers, 4) * 2.8 +
      examples * 2 +
      mechanisms * 1.8 +
      Math.min(quotedOrNamed, 3) +
      Math.min(concreteActorsAndObjects, 5) * 1.25 +
      listSignals * 3 -
      genericCount * 1.2,
  );
}

function scoreSubstance(text: string, genericCount: number): number {
  const words = wordsOf(text).length;
  const sentences = sentencesOf(text);
  const causalSignals = countMatches(
    text,
    /\b(because|therefore|so that|which means|as a result|leads to|creates|causes|reduces|increases|the reason|the consequence|the trade-off|depends on|results in)\b/gi,
  );
  const developedSentences = sentences.filter((sentence) => wordsOf(sentence).length >= 12).length;
  const ultraShortRatio = sentences.length
    ? sentences.filter((sentence) => wordsOf(sentence).length <= 4).length / sentences.length
    : 0;

  const lengthContribution = Math.min(words / 25, 6);
  const developmentContribution = Math.min(developedSentences, 5) * 1.1;
  const shortSentencePenalty = ultraShortRatio > 0.55 ? 2.5 : 0;

  return clamp(
    3 + causalSignals * 2.2 + lengthContribution + developmentContribution - genericCount - shortSentencePenalty,
  );
}

function scoreReaderValue(text: string): number {
  const actionSignals = countMatches(
    text,
    /\b(ask|check|consider|start|stop|avoid|focus|measure|look for|try|build|change|do differently|takeaway|lesson|advice|next step|before you|instead of|the question to ask)\b/gi,
  );
  const directReaderSignals = countMatches(
    text,
    /\b(you|your|leaders|founders|teams|businesses|clinicians|marketers|readers|operators)\b/gi,
  );
  const practicalSpecificity = countMatches(
    text,
    /\b(one thing|first step|three questions|a practical|the simplest|tomorrow|this week|before publishing|before buying|before deciding|before adding|before choosing|before using)\b/gi,
  );
  const questionSignals = countMatches(text, /\?/g);
  const beforeAction = countMatches(text, /\bbefore\s+[a-z]+ing\b/gi);

  return clamp(
    3 + actionSignals * 2.1 + Math.min(directReaderSignals, 4) + practicalSpecificity * 2 + beforeAction * 2 + Math.min(questionSignals, 2),
  );
}

function labelForScore(score: number): string {
  if (score < 30) return "Mostly generic";
  if (score < 50) return "Needs more of you";
  if (score < 70) return "Some human signal";
  if (score < 85) return "Strong personal contribution";
  return "Distinctive and substantial";
}

function statusForScore(score: number): SignalExplanation["status"] {
  if (score >= 14) return "strong";
  if (score >= 8) return "developing";
  return "missing";
}

function buildExplanations(scores: SignalScores): Record<SignalKey, SignalExplanation> {
  return {
    perspective: {
      label: "Perspective",
      score: scores.perspective,
      status: statusForScore(scores.perspective),
      explanation:
        scores.perspective >= 14
          ? "The reader can see a clear judgement rather than only a description of the topic."
          : "The draft needs a view, disagreement or conclusion that belongs to you.",
    },
    experience: {
      label: "Experience",
      score: scores.experience,
      status: statusForScore(scores.experience),
      explanation:
        scores.experience >= 14
          ? "The draft shows where your view came from in real work or observation."
          : "The reader cannot yet see what you personally encountered, tested or learned.",
    },
    specificity: {
      label: "Specificity",
      score: scores.specificity,
      status: statusForScore(scores.specificity),
      explanation:
        scores.specificity >= 14
          ? "Concrete details make the post difficult to reproduce generically."
          : "A number, named situation, consequence or real example would make the point credible.",
    },
    substance: {
      label: "Substance",
      score: scores.substance,
      status: statusForScore(scores.substance),
      explanation:
        scores.substance >= 14
          ? "The argument explains why the point matters and how the consequence follows."
          : "The draft states a conclusion but does not yet develop the reasoning behind it.",
    },
    readerValue: {
      label: "Reader value",
      score: scores.readerValue,
      status: statusForScore(scores.readerValue),
      explanation:
        scores.readerValue >= 14
          ? "The reader leaves with a useful question, decision or action."
          : "The ending needs a practical takeaway rather than a broad prediction or slogan.",
    },
  };
}

function createQuestion(
  category: QuestionCategory,
  topic: string,
): HumanSignalQuestion {
  const subject = topic === "this subject" ? "this issue" : topic;

  const library: Record<QuestionCategory, Omit<HumanSignalQuestion, "id" | "category">> = {
    origin: {
      question: `What happened that made you form this view about ${subject}?`,
      guidance:
        "Describe the conversation, project, problem, mistake or observation that started your thinking.",
      placement: "This can replace a generic opening or sit directly after your first line.",
      suggestedPosition: "opening",
    },
    experience: {
      question: `Where have you personally seen the issue around ${subject} play out?`,
      guidance:
        "Give one real situation. You can keep the client, employer or person anonymous.",
      placement: "Place this after the broad claim so the reader sees what it looked like in practice.",
      suggestedPosition: "after-opening",
    },
    judgement: {
      question: `What do you think people get wrong about ${subject}?`,
      guidance:
        "State your genuine judgement, especially where it differs from the usual industry response.",
      placement: "Use this as the central argument in the middle of the post.",
      suggestedPosition: "middle",
    },
    tension: {
      question: `What sounds sensible about ${subject} in theory but causes problems in practice?`,
      guidance:
        "Explain the hidden trade-off, unintended consequence or uncomfortable reality.",
      placement: "Add this before the conclusion to create a clear tension for the reader.",
      suggestedPosition: "middle",
    },
    evidence: {
      question: `What real example, number or outcome can you share about ${subject}?`,
      guidance:
        "Use a genuine result, cost, timeframe or consequence. Leave it out if you cannot verify it.",
      placement: "Put this beside the claim it supports, usually in the middle of the post.",
      suggestedPosition: "middle",
    },
    action: {
      question: `What should someone do differently after reading your point about ${subject}?`,
      guidance:
        "Give one practical decision, question or action instead of a motivational ending.",
      placement: "Use this as the final paragraph or practical takeaway.",
      suggestedPosition: "ending",
    },
  };

  return {
    id: category,
    category,
    ...library[category],
  };
}

function chooseQuestions(scores: SignalScores, topic: string, overallScore: number): HumanSignalQuestion[] {
  const ranked = (Object.entries(scores) as Array<[SignalKey, number]>).sort(
    (a, b) => a[1] - b[1],
  );

  const candidates: Record<SignalKey, QuestionCategory[]> = {
    perspective: ["judgement", "tension"],
    experience: ["origin", "experience"],
    specificity: ["evidence", "experience"],
    substance: ["tension", "judgement"],
    readerValue: ["action", "judgement"],
  };

  const targetCount = overallScore >= 72 ? 2 : 3;
  const selected: QuestionCategory[] = [];

  for (const [signal] of ranked) {
    const next = candidates[signal].find((item) => !selected.includes(item));
    if (next) selected.push(next);
    if (selected.length === targetCount) break;
  }

  if (!selected.includes("action") && scores.readerValue < 8 && selected.length < targetCount) {
    selected.push("action");
  }

  return selected.slice(0, targetCount).map((category) => createQuestion(category, topic));
}

function buildPositiveSignals(scores: SignalScores): string[] {
  const positives: string[] = [];
  if (scores.perspective >= 14) positives.push("A clear point of view is already visible.");
  if (scores.experience >= 14) positives.push("The draft includes first-hand context.");
  if (scores.specificity >= 14) positives.push("Concrete detail gives the post credibility.");
  if (scores.substance >= 14) positives.push("The reasoning is developed beyond a headline claim.");
  if (scores.readerValue >= 14) positives.push("The reader receives a practical takeaway.");
  return positives.slice(0, 3);
}

export function analysePost(text: string): HumanSignalAnalysis {
  const clean = text.trim();
  const genericPatterns = findGenericPatterns(clean);
  const genericCount = genericPatterns.length;
  const topic = detectTopic(clean);

  const scores: SignalScores = {
    perspective: scorePerspective(clean, genericCount),
    experience: scoreExperience(clean),
    specificity: scoreSpecificity(clean, genericCount),
    substance: scoreSubstance(clean, genericCount),
    readerValue: scoreReaderValue(clean),
  };

  const overallScore = Math.round(
    Object.values(scores).reduce((total, score) => total + score, 0),
  );

  const ranked = (Object.entries(scores) as Array<[SignalKey, number]>).sort(
    (a, b) => a[1] - b[1],
  );
  const weakestSignals = ranked.slice(0, 2).map(([key]) => key);
  const strongestSignal = ranked[ranked.length - 1][0];
  const explanations = buildExplanations(scores);

  const weaknessLabels = weakestSignals.map((key) => explanations[key].label.toLowerCase());
  const genericNote = genericPatterns.length
    ? ` It also contains ${genericPatterns.length} familiar phrase${genericPatterns.length === 1 ? "" : "s"} that may make it feel interchangeable.`
    : "";

  return {
    overallScore,
    label: labelForScore(overallScore),
    summary: `The strongest improvement would come from adding ${weaknessLabels[0]} and ${weaknessLabels[1]}.${genericNote}`,
    topic,
    scores,
    explanations,
    weakestSignals,
    strongestSignal,
    questions: chooseQuestions(scores, topic, overallScore),
    genericPatterns,
    positiveSignals: buildPositiveSignals(scores),
  };
}

export function buildPlacementPlan(
  questions: HumanSignalQuestion[],
  answers: Record<string, string>,
): PlacementSuggestion[] {
  return questions
    .map((question) => ({
      questionId: question.id,
      category: question.category,
      answer: (answers[question.id] ?? "").trim(),
      placement: question.placement,
      suggestedPosition: question.suggestedPosition,
    }))
    .filter((item) => item.answer.length > 0);
}

export function integrateHumanInput(
  originalPost: string,
  questions: HumanSignalQuestion[],
  answers: Record<string, string>,
): IntegratedResult {
  const originalParagraphs = paragraphsOf(originalPost);
  const plan = buildPlacementPlan(questions, answers);
  const opening = plan.filter((item) => item.suggestedPosition === "opening");
  const afterOpening = plan.filter((item) => item.suggestedPosition === "after-opening");
  const middle = plan.filter((item) => item.suggestedPosition === "middle");
  const ending = plan.filter((item) => item.suggestedPosition === "ending");

  const result: string[] = [];
  const insertions: IntegratedInsertion[] = [];

  const pushInsertion = (item: PlacementSuggestion) => {
    const paragraphIndex = result.length;
    result.push(item.answer);
    insertions.push({ ...item, paragraphIndex });
  };

  opening.forEach(pushInsertion);

  originalParagraphs.forEach((paragraph, index) => {
    result.push(paragraph);

    if (index === 0) {
      afterOpening.forEach(pushInsertion);
    }

    const middleAnchor = Math.max(0, Math.floor((originalParagraphs.length - 1) / 2));
    if (index === middleAnchor) {
      middle.forEach(pushInsertion);
    }
  });

  ending.forEach(pushInsertion);

  return {
    post: result.join("\n\n"),
    insertions,
  };
}

export function getSignalLabel(key: SignalKey): string {
  const labels: Record<SignalKey, string> = {
    perspective: "Perspective",
    experience: "Experience",
    specificity: "Specificity",
    substance: "Substance",
    readerValue: "Reader value",
  };
  return labels[key];
}

export function estimateReadingTime(text: string): string {
  const words = wordsOf(text).length;
  if (!words) return "—";
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

export function getWordCount(text: string): number {
  return wordsOf(text).length;
}

export function getParagraphCount(text: string): number {
  return paragraphsOf(text).length;
}
