"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  Clipboard,
  Compass,
  Copy,
  FileCheck2,
  FilePenLine,
  GraduationCap,
  Lightbulb,
  LoaderCircle,
  MessageSquareText,
  PenLine,
  Quote,
  RefreshCw,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  WandSparkles,
  WifiOff,
} from "lucide-react";
import {
  analysePost,
  getSignalLabel,
  type HumanSignalAnalysis,
  type HumanSignalQuestion,
  type PlacementPosition,
  type SignalKey,
} from "../../lib/human-signal/analysePost";
import {
  AUDIENCES,
  IDEA_SOURCES,
  OUTCOMES,
  POST_TYPES,
  TOPIC_CATEGORIES,
  WRITING_LESSONS,
  assemblePost,
  buildIdeaAngles,
  evaluateLessonPractice,
  getAudienceLabel,
  getBuilderQuestions,
  getIdeaQuestions,
  getOutcomeLabel,
  getPostType,
  seedBuilderAnswers,
  type AudienceId,
  type IdeaAngle,
  type IdeaSourceId,
  type OutcomeId,
  type PostTypeId,
} from "../../lib/human-signal/wizardContent";
import { requestHumanSignalCoach } from "../../lib/human-signal/coachClient";
import type {
  DeepReviewCoachResult,
  DeepReviewQuestion,
  WeaveReviewCoachResult,
} from "../../lib/human-signal/coachTypes";
import styles from "./HumanSignal.module.css";

type Flow = "home" | "ideas" | "write" | "review" | "learn";
type ReviewMode = "guided" | "exact" | "woven";
type CoachState = "idle" | "loading" | "ai" | "fallback";

interface SavedIdea {
  id: string;
  title: string;
  premise: string;
  postType: PostTypeId;
  workingSubject: string;
  createdAt: string;
}

interface ReviewInputQuestion {
  id: string;
  category: string;
  question: string;
  guidance: string;
  answerStarter: string;
  contribution: string;
  placement: string;
  suggestedPosition: PlacementPosition;
}

interface PersistedSession {
  lastFlow: Exclude<Flow, "home"> | null;
  ideaSource: IdeaSourceId | null;
  ideaAnswers: Record<string, string>;
  writeSubject: string;
  postType: PostTypeId | null;
  audience: AudienceId | null;
  outcome: OutcomeId | null;
  writeAnswers: Record<string, string>;
  builtPost: string;
  reviewPost: string;
  reviewAnswers: Record<string, string>;
  finalReviewPost: string;
  reviewMode: ReviewMode;
  savedIdeas: SavedIdea[];
}

const STORAGE_KEY = "sitora-humansignal-wizard-v6";

const FLOW_STEPS: Record<Exclude<Flow, "home">, string[]> = {
  ideas: ["Starting point", "Coach questions", "Choose an angle"],
  write: ["Subject", "Post type", "Audience", "Build", "Edit"],
  review: ["Draft", "Diagnosis", "Your input", "Final review"],
  learn: ["Choose a skill", "Learn and practise", "Coach feedback"],
};

const flowCards: Array<{
  id: Exclude<Flow, "home">;
  title: string;
  description: string;
  promise: string;
  icon: ReactNode;
}> = [
  {
    id: "ideas",
    title: "Find something to write about",
    description: "Uncover post ideas already hidden inside your work, conversations and opinions.",
    promise: "Leave with three credible angles",
    icon: <Lightbulb size={24} />,
  },
  {
    id: "write",
    title: "Help me write a post",
    description: "Choose a subject and build the post through questions rather than a blank page.",
    promise: "Create a structured first draft",
    icon: <PenLine size={24} />,
  },
  {
    id: "review",
    title: "Review my existing post",
    description: "See what is strong, what feels generic and what human input is still missing.",
    promise: "Improve without invented stories",
    icon: <FileCheck2 size={24} />,
  },
  {
    id: "learn",
    title: "Teach me a writing skill",
    description: "Practise openings, specificity, opinions, stories and useful endings.",
    promise: "Learn by doing, not reading",
    icon: <GraduationCap size={24} />,
  },
];

const signalKeys: SignalKey[] = [
  "perspective",
  "experience",
  "specificity",
  "substance",
  "readerValue",
];

function scoreStatus(score: number) {
  if (score >= 14) return "Strong";
  if (score >= 8) return "Developing";
  return "Missing";
}

function filledCount(values: Record<string, string>) {
  return Object.values(values).filter((value) => value.trim().length > 0).length;
}

function contributionForCategory(category: string) {
  const labels: Record<string, string> = {
    experience: "First-hand experience",
    judgement: "Your point of view",
    evidence: "Credible evidence",
    specificity: "A concrete example",
    action: "A useful takeaway",
    clarity: "A clearer meaning",
    structure: "A stronger line of reasoning",
    origin: "The reason this matters to you",
    tension: "A practical tension or trade-off",
  };
  return labels[category] ?? "More of your own thinking";
}

function positionForCategory(category: string): PlacementPosition {
  if (category === "action") return "ending";
  if (category === "experience" || category === "origin") return "after-opening";
  if (category === "judgement" || category === "clarity") return "after-opening";
  return "middle";
}

function normaliseLocalQuestion(question: HumanSignalQuestion): ReviewInputQuestion {
  return {
    id: question.id,
    category: question.category,
    question: question.question,
    guidance: question.guidance,
    answerStarter: "In my own words...",
    contribution: contributionForCategory(question.category),
    placement: question.placement,
    suggestedPosition: question.suggestedPosition,
  };
}

function normaliseDeepQuestion(question: DeepReviewQuestion): ReviewInputQuestion {
  return {
    ...question,
    answerStarter: question.answerStarter || "In my own words...",
    contribution: question.contribution || contributionForCategory(question.category),
    suggestedPosition: positionForCategory(question.category),
  };
}

function integrateReviewInput(
  originalPost: string,
  questions: ReviewInputQuestion[],
  answers: Record<string, string>,
) {
  const paragraphs = originalPost
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  const answered = questions
    .map((question) => ({
      ...question,
      answer: (answers[question.id] ?? "").trim(),
    }))
    .filter((item) => item.answer.length > 0);

  const at = (position: PlacementPosition) =>
    answered.filter((item) => item.suggestedPosition === position);

  const result: string[] = [];
  at("opening").forEach((item) => result.push(item.answer));

  paragraphs.forEach((paragraph, index) => {
    result.push(paragraph);
    if (index === 0) at("after-opening").forEach((item) => result.push(item.answer));
    const middleAnchor = Math.max(0, Math.floor((paragraphs.length - 1) / 2));
    if (index === middleAnchor) at("middle").forEach((item) => result.push(item.answer));
  });

  at("ending").forEach((item) => result.push(item.answer));
  return result.join("\n\n");
}

function safeClipboard(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard.writeText(value);
  }
  return Promise.resolve();
}

function StepProgress({ steps, active }: { steps: string[]; active: number }) {
  return (
    <nav className={styles.progress} aria-label="Wizard progress">
      {steps.map((label, index) => (
        <div
          key={label}
          className={`${styles.progressItem} ${index <= active ? styles.progressActive : ""}`}
        >
          <span>{index < active ? <Check size={13} /> : index + 1}</span>
          <small>{label}</small>
        </div>
      ))}
    </nav>
  );
}

function WizardHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.wizardHeading}>
      <div className={styles.eyebrow}>
        <Sparkles size={14} /> {eyebrow}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function ChoiceButton({
  selected,
  title,
  description,
  onClick,
  meta,
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
  meta?: string;
}) {
  return (
    <button
      type="button"
      className={`${styles.choiceCard} ${selected ? styles.choiceSelected : ""}`}
      onClick={onClick}
    >
      <span className={styles.choiceCheck}>{selected ? <Check size={14} /> : null}</span>
      <strong>{title}</strong>
      <p>{description}</p>
      {meta ? <small>{meta}</small> : null}
    </button>
  );
}

function CoachStatusBanner({
  state,
  message,
}: {
  state: CoachState;
  message: string;
}) {
  if (state === "idle") return null;

  return (
    <div className={`${styles.coachStatus} ${state === "fallback" ? styles.coachStatusFallback : ""}`}>
      <span>
        {state === "loading" ? (
          <LoaderCircle size={16} className={styles.spin} />
        ) : state === "fallback" ? (
          <WifiOff size={16} />
        ) : (
          <Sparkles size={16} />
        )}
      </span>
      <div>
        <strong>
          {state === "loading"
            ? "HumanSignal is thinking"
            : state === "fallback"
              ? "Built-in coach active"
              : "Intelligent coach active"}
        </strong>
        <p>{message}</p>
      </div>
    </div>
  );
}

export function HumanSignalWizard() {
  const [flow, setFlow] = useState<Flow>("home");
  const [lastFlow, setLastFlow] = useState<Exclude<Flow, "home"> | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [ideaStep, setIdeaStep] = useState(0);
  const [ideaSource, setIdeaSource] = useState<IdeaSourceId | null>(null);
  const [ideaAnswers, setIdeaAnswers] = useState<Record<string, string>>({});
  const [selectedAngle, setSelectedAngle] = useState<IdeaAngle | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [ideaSaved, setIdeaSaved] = useState(false);
  const [smartIdeaAngles, setSmartIdeaAngles] = useState<IdeaAngle[] | null>(null);

  const [coachState, setCoachState] = useState<CoachState>("idle");
  const [coachNotice, setCoachNotice] = useState("");

  const [writeStep, setWriteStep] = useState(0);
  const [writeSubject, setWriteSubject] = useState("");
  const [postType, setPostType] = useState<PostTypeId | null>(null);
  const [audience, setAudience] = useState<AudienceId | null>(null);
  const [outcome, setOutcome] = useState<OutcomeId | null>(null);
  const [writeAnswers, setWriteAnswers] = useState<Record<string, string>>({});
  const [builtPost, setBuiltPost] = useState("");
  const [activeTopicCategory, setActiveTopicCategory] = useState(TOPIC_CATEGORIES[0].id);
  const [copied, setCopied] = useState(false);
  const [smartBuilderQuestions, setSmartBuilderQuestions] = useState<ReturnType<typeof getBuilderQuestions> | null>(null);

  const [reviewStep, setReviewStep] = useState(0);
  const [reviewPost, setReviewPost] = useState("");
  const [reviewAnalysis, setReviewAnalysis] = useState<HumanSignalAnalysis | null>(null);
  const [reviewAnswers, setReviewAnswers] = useState<Record<string, string>>({});
  const [finalReviewPost, setFinalReviewPost] = useState("");
  const [reviewMode, setReviewMode] = useState<ReviewMode>("exact");
  const [deepReview, setDeepReview] = useState<DeepReviewCoachResult | null>(null);
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0);
  const [isWeaving, setIsWeaving] = useState(false);
  const [weaveError, setWeaveError] = useState("");
  const [weaveResult, setWeaveResult] =
    useState<WeaveReviewCoachResult | null>(null);

  const [learnStep, setLearnStep] = useState(0);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [lessonPractice, setLessonPractice] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PersistedSession>;
        setLastFlow(saved.lastFlow ?? null);
        setIdeaSource(saved.ideaSource ?? null);
        setIdeaAnswers(saved.ideaAnswers ?? {});
        setWriteSubject(saved.writeSubject ?? "");
        setPostType(saved.postType ?? null);
        setAudience(saved.audience ?? null);
        setOutcome(saved.outcome ?? null);
        setWriteAnswers(saved.writeAnswers ?? {});
        setBuiltPost(saved.builtPost ?? "");
        setReviewPost(saved.reviewPost ?? "");
        setReviewAnswers(saved.reviewAnswers ?? {});
        setFinalReviewPost(saved.finalReviewPost ?? "");
        if (
          saved.reviewMode === "guided" ||
          saved.reviewMode === "exact" ||
          saved.reviewMode === "woven"
        ) {
          setReviewMode(saved.reviewMode);
        }
        setSavedIdeas(saved.savedIdeas ?? []);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const session: PersistedSession = {
      lastFlow,
      ideaSource,
      ideaAnswers,
      writeSubject,
      postType,
      audience,
      outcome,
      writeAnswers,
      builtPost,
      reviewPost,
      reviewAnswers,
      finalReviewPost,
      reviewMode,
      savedIdeas,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [
    loaded,
    lastFlow,
    ideaSource,
    ideaAnswers,
    writeSubject,
    postType,
    audience,
    outcome,
    writeAnswers,
    builtPost,
    reviewPost,
    reviewAnswers,
    finalReviewPost,
    reviewMode,
    savedIdeas,
  ]);

  const ideaQuestions = useMemo(
    () => (ideaSource ? getIdeaQuestions(ideaSource) : []),
    [ideaSource],
  );
  const ideaAngles = useMemo(
    () => smartIdeaAngles ?? (ideaSource ? buildIdeaAngles(ideaSource, ideaAnswers) : []),
    [smartIdeaAngles, ideaSource, ideaAnswers],
  );
  const builderQuestions = useMemo(
    () => smartBuilderQuestions ?? (postType ? getBuilderQuestions(postType) : []),
    [smartBuilderQuestions, postType],
  );
  const liveBuiltAnalysis = useMemo(
    () => (builtPost.trim().length >= 80 ? analysePost(builtPost) : null),
    [builtPost],
  );
  const liveReviewAnalysis = useMemo(
    () => (finalReviewPost.trim().length >= 80 ? analysePost(finalReviewPost) : null),
    [finalReviewPost],
  );
  const reviewQuestions = useMemo<ReviewInputQuestion[]>(() => {
    if (deepReview?.questions.length) {
      return deepReview.questions.map(normaliseDeepQuestion);
    }
    return reviewAnalysis?.questions.map(normaliseLocalQuestion) ?? [];
  }, [deepReview, reviewAnalysis]);
  const currentReviewQuestion = reviewQuestions[reviewQuestionIndex] ?? null;
  const answeredReviewQuestions = reviewQuestions.filter(
    (question) => (reviewAnswers[question.id] ?? "").trim().length > 0,
  );
  const activeLesson = WRITING_LESSONS.find((lesson) => lesson.id === lessonId) ?? null;
  const lessonFeedback = useMemo(
    () => (lessonId && lessonPractice.trim() ? evaluateLessonPractice(lessonId, lessonPractice) : null),
    [lessonId, lessonPractice],
  );

  function startFlow(nextFlow: Exclude<Flow, "home">) {
    setFlow(nextFlow);
    setLastFlow(nextFlow);
    if (nextFlow === "ideas") setIdeaStep(0);
    if (nextFlow === "write") setWriteStep(0);
    if (nextFlow === "review") setReviewStep(0);
    if (nextFlow === "learn") setLearnStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resumeFlow() {
    if (!lastFlow) return;
    setFlow(lastFlow);
    if (lastFlow === "ideas") setIdeaStep(ideaSource ? (filledCount(ideaAnswers) ? 1 : 0) : 0);
    if (lastFlow === "write") {
      if (builtPost) setWriteStep(4);
      else if (postType && filledCount(writeAnswers)) setWriteStep(3);
      else if (audience && outcome) setWriteStep(3);
      else if (postType) setWriteStep(2);
      else if (writeSubject) setWriteStep(1);
      else setWriteStep(0);
    }
    if (lastFlow === "review") {
      if (finalReviewPost) setReviewStep(3);
      else if (reviewAnalysis) setReviewStep(1);
      else setReviewStep(0);
    }
    if (lastFlow === "learn") setLearnStep(lessonId ? 1 : 0);
  }

  function goHome() {
    setFlow("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetEverything() {
    setFlow("home");
    setLastFlow(null);
    setIdeaStep(0);
    setIdeaSource(null);
    setIdeaAnswers({});
    setSelectedAngle(null);
    setSavedIdeas([]);
    setSmartIdeaAngles(null);
    setCoachState("idle");
    setCoachNotice("");
    setWriteStep(0);
    setWriteSubject("");
    setPostType(null);
    setAudience(null);
    setOutcome(null);
    setWriteAnswers({});
    setBuiltPost("");
    setSmartBuilderQuestions(null);
    setReviewStep(0);
    setReviewPost("");
    setReviewAnalysis(null);
    setReviewAnswers({});
    setFinalReviewPost("");
    setReviewMode("exact");
    setDeepReview(null);
    setReviewQuestionIndex(0);
    setIsWeaving(false);
    setWeaveError("");
    setWeaveResult(null);
    setLearnStep(0);
    setLessonId(null);
    setLessonPractice("");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function moveBack() {
    if (flow === "ideas") {
      if (ideaStep === 0) goHome();
      else setIdeaStep((value) => Math.max(0, value - 1));
    }
    if (flow === "write") {
      if (writeStep === 0) goHome();
      else setWriteStep((value) => Math.max(0, value - 1));
    }
    if (flow === "review") {
      if (reviewStep === 0) goHome();
      else setReviewStep((value) => Math.max(0, value - 1));
    }
    if (flow === "learn") {
      if (learnStep === 0) goHome();
      else setLearnStep((value) => Math.max(0, value - 1));
    }
  }

  function buildFromAngle(angle: IdeaAngle) {
    setSelectedAngle(angle);
    setWriteSubject(angle.workingSubject);
    setPostType(angle.postType);
    setWriteAnswers(seedBuilderAnswers(angle.postType, ideaAnswers));
    setBuiltPost("");
    setFlow("write");
    setLastFlow("write");
    setWriteStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveIdea(angle: IdeaAngle) {
    const item: SavedIdea = {
      id: `${Date.now()}-${angle.id}`,
      title: angle.title,
      premise: angle.premise,
      postType: angle.postType,
      workingSubject: angle.workingSubject,
      createdAt: new Date().toISOString(),
    };
    setSavedIdeas((current) => [item, ...current].slice(0, 20));
    setIdeaSaved(true);
    window.setTimeout(() => setIdeaSaved(false), 1600);
  }

  async function generateIdeaAnglesWithCoach() {
    if (!ideaSource || filledCount(ideaAnswers) < 2) return;

    setCoachState("loading");
    setCoachNotice("Finding distinct angles inside your own notes without inventing extra detail.");

    try {
      const result = await requestHumanSignalCoach({
        task: "idea_angles",
        context: { ideaSource, answers: ideaAnswers },
      });
      setSmartIdeaAngles(result.angles);
      setCoachState("ai");
      setCoachNotice(result.coachObservation);
    } catch {
      setSmartIdeaAngles(buildIdeaAngles(ideaSource, ideaAnswers));
      setCoachState("fallback");
      setCoachNotice("The local coaching engine created the angles. Add OPENAI_API_KEY later for deeper subject-aware coaching.");
    }

    setIdeaStep(2);
  }

  async function generateBuilderQuestionsWithCoach() {
    if (!postType || !audience || !outcome || writeSubject.trim().length < 8) return;

    setCoachState("loading");
    setCoachNotice("Designing questions around this subject, reader and purpose.");
    setWriteAnswers({});

    try {
      const result = await requestHumanSignalCoach({
        task: "builder_questions",
        context: {
          subject: writeSubject,
          postType,
          audience,
          outcome,
        },
      });
      setSmartBuilderQuestions(result.questions);
      setCoachState("ai");
      setCoachNotice(result.coachNote);
    } catch {
      setSmartBuilderQuestions(getBuilderQuestions(postType));
      setCoachState("fallback");
      setCoachNotice("The built-in post structure is active. Add OPENAI_API_KEY later for questions tailored to the exact subject.");
    }

    setWriteStep(3);
  }

  function assembleCurrentPost() {
    if (!postType) return;
    setBuiltPost(assemblePost(postType, writeAnswers, builderQuestions));
    setWriteStep(4);
  }

  async function runReview() {
    if (reviewPost.trim().length < 80) return;
    const result = analysePost(reviewPost);
    setReviewAnalysis(result);
    setReviewAnswers({});
    setFinalReviewPost("");
    setReviewMode("exact");
    setDeepReview(null);
    setReviewQuestionIndex(0);
    setIsWeaving(false);
    setWeaveError("");
    setWeaveResult(null);
    setReviewStep(1);
    setCoachState("loading");
    setCoachNotice("Reading the argument, not merely counting familiar words.");

    try {
      const deeper = await requestHumanSignalCoach({
        task: "deep_review",
        context: {
          post: reviewPost,
          heuristicSummary: result.summary,
          weakestSignals: result.weakestSignals.map((key) => getSignalLabel(key)),
        },
      });
      setDeepReview(deeper);
      setCoachState("ai");
      setCoachNotice("The deeper coach review is ready alongside the transparent HumanSignal score.");
    } catch {
      setCoachState("fallback");
      setCoachNotice("The transparent local diagnosis is active. Add OPENAI_API_KEY later for a deeper editorial reading.");
    }
  }

  function prepareReviewFinal(mode: "guided" | "exact") {
    if (!reviewAnalysis) return;

    setReviewMode(mode);
    setWeaveResult(null);
    setWeaveError("");
    setFinalReviewPost(
      mode === "exact"
        ? integrateReviewInput(reviewPost, reviewQuestions, reviewAnswers)
        : reviewPost,
    );
    setReviewStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function weaveReviewInput() {
    if (!reviewAnalysis || answeredReviewQuestions.length < 1) return;

    setIsWeaving(true);
    setWeaveError("");

    try {
      const result = await requestHumanSignalCoach({
        task: "weave_review",
        context: {
          originalPost: reviewPost,
          inputs: answeredReviewQuestions.map((question) => ({
            questionId: question.id,
            category: question.category,
            question: question.question,
            answer: reviewAnswers[question.id].trim(),
            placement: question.placement,
          })),
        },
      });

      setWeaveResult(result);
      setReviewMode("woven");
      setFinalReviewPost(result.revisedPost);
      setReviewStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setWeaveError(
        error instanceof Error
          ? error.message
          : "HumanSignal could not weave the input naturally.",
      );
    } finally {
      setIsWeaving(false);
    }
  }

  function openReviewInput() {
    setReviewQuestionIndex(0);
    setReviewStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function moveToNextReviewQuestion() {
    setReviewQuestionIndex((current) => Math.min(reviewQuestions.length, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function moveToPreviousReviewQuestion() {
    setReviewQuestionIndex((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyValue(value: string) {
    await safeClipboard(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function sendBuiltPostToReview() {
    setReviewPost(builtPost);
    setReviewAnalysis(null);
    setReviewAnswers({});
    setFinalReviewPost("");
    setFlow("review");
    setLastFlow("review");
    setReviewStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const currentStep =
    flow === "ideas"
      ? ideaStep
      : flow === "write"
        ? writeStep
        : flow === "review"
          ? reviewStep
          : flow === "learn"
            ? learnStep
            : 0;

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <section className={styles.shell}>
        <header className={styles.productHeader}>
          <button type="button" className={styles.brand} onClick={goHome} aria-label="HumanSignal home">
            <span className={styles.brandMark}>S</span>
            <span>
              <strong>Sitora</strong>
              <small>HumanSignal Intelligent Coach</small>
            </span>
          </button>

          <div className={styles.headerActions}>
            <span className={styles.headerNote}>
              <ShieldCheck size={15} /> Human-first writing
            </span>
            {flow !== "home" ? (
              <button type="button" className={styles.textButton} onClick={goHome}>
                Change goal
              </button>
            ) : null}
          </div>
        </header>

        {flow !== "home" ? (
          <>
            <div className={styles.flowTopbar}>
              <button type="button" className={styles.backButton} onClick={moveBack}>
                <ArrowLeft size={16} /> Back
              </button>
              <StepProgress steps={FLOW_STEPS[flow]} active={currentStep} />
              <button type="button" className={styles.resetButton} onClick={resetEverything}>
                <RotateCcw size={15} /> Start again
              </button>
            </div>
          </>
        ) : null}

        {flow === "home" && (
          <section className={styles.home}>
            <div className={styles.homeHero}>
              <div className={styles.eyebrow}>
                <Brain size={15} /> LinkedIn writing coach
              </div>
              <h1>
                What would you like help with
                <em> today?</em>
              </h1>
              <p>
                Start from wherever you are. HumanSignal helps you find the idea, develop the thinking,
                write the post and understand why it works.
              </p>

              <div className={styles.heroPrinciples}>
                <span><CheckCircle2 size={16} /> No blank-page pressure</span>
                <span><CheckCircle2 size={16} /> No invented experience</span>
                <span><CheckCircle2 size={16} /> Learn while you write</span>
              </div>
            </div>

            {lastFlow ? (
              <button type="button" className={styles.resumeCard} onClick={resumeFlow}>
                <span className={styles.resumeIcon}><Save size={20} /></span>
                <span>
                  <small>Saved in this browser</small>
                  <strong>Continue your previous session</strong>
                </span>
                <ArrowRight size={19} />
              </button>
            ) : null}

            <div className={styles.flowGrid}>
              {flowCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className={styles.flowCard}
                  onClick={() => startFlow(card.id)}
                >
                  <span className={styles.flowIcon}>{card.icon}</span>
                  <span className={styles.flowNumber}>0{flowCards.indexOf(card) + 1}</span>
                  <strong>{card.title}</strong>
                  <p>{card.description}</p>
                  <small>{card.promise}</small>
                  <span className={styles.flowArrow}><ArrowRight size={18} /></span>
                </button>
              ))}
            </div>

            <div className={styles.homeFooterNote}>
              <Quote size={18} />
              <p><strong>HumanSignal does not replace the writer.</strong> It develops the writer.</p>
            </div>
          </section>
        )}

        {flow === "ideas" && (
          <section className={styles.wizardBody}>
            {ideaStep === 0 && (
              <>
                <WizardHeading
                  eyebrow="Idea Lab"
                  title="Where should today’s post come from?"
                  description="Choose a real source. The coach will help you uncover the useful angle inside it."
                />
                <div className={styles.choiceGridThree}>
                  {IDEA_SOURCES.map((source) => (
                    <ChoiceButton
                      key={source.id}
                      selected={ideaSource === source.id}
                      title={source.title}
                      description={source.description}
                      onClick={() => {
                        setIdeaSource(source.id);
                        setIdeaAnswers({});
                        setSmartIdeaAngles(null);
                        setCoachState("idle");
                      }}
                    />
                  ))}
                </div>
                <div className={styles.stickyActions}>
                  <span>Select the starting point that feels easiest to answer.</span>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={!ideaSource}
                    onClick={() => setIdeaStep(1)}
                  >
                    Start the coaching interview <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}

            {ideaStep === 1 && ideaSource && (
              <>
                <WizardHeading
                  eyebrow="Short coaching interview"
                  title="Tell the coach what you know"
                  description="Rough notes are enough. These answers are source material, not the finished post."
                />
                <div className={styles.questionLayout}>
                  <div className={styles.questionStack}>
                    {ideaQuestions.map((question, index) => (
                      <label key={question.id} className={styles.questionCard}>
                        <span className={styles.questionNumber}>{index + 1}</span>
                        <strong>{question.question}</strong>
                        <p>{question.guidance}</p>
                        <textarea
                          value={ideaAnswers[question.id] ?? ""}
                          onChange={(event) => {
                            setIdeaAnswers((current) => ({
                              ...current,
                              [question.id]: event.target.value,
                            }));
                            setSmartIdeaAngles(null);
                          }}
                          placeholder={question.placeholder}
                        />
                      </label>
                    ))}
                  </div>
                  <aside className={styles.coachPanel}>
                    <span className={styles.coachAvatar}><Brain size={22} /></span>
                    <small>Your coach says</small>
                    <h3>Do not try to sound impressive.</h3>
                    <p>
                      Write what happened, what you thought and what changed. The strongest angle usually appears
                      after the facts are on the page.
                    </p>
                    <div className={styles.completionMeter}>
                      <span style={{ width: `${(filledCount(ideaAnswers) / ideaQuestions.length) * 100}%` }} />
                    </div>
                    <small>{filledCount(ideaAnswers)} of {ideaQuestions.length} answered</small>
                  </aside>
                </div>
                <div className={styles.stickyActions}>
                  <span>Answer at least two questions to create useful angles.</span>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={filledCount(ideaAnswers) < 2}
                    onClick={generateIdeaAnglesWithCoach}
                  >
                    {coachState === "loading" ? "Finding the strongest angles" : "Find the post angles"}
                    {coachState === "loading" ? <LoaderCircle size={17} className={styles.spin} /> : <WandSparkles size={17} />}
                  </button>
                </div>
              </>
            )}

            {ideaStep === 2 && (
              <>
                <WizardHeading
                  eyebrow="Three possible directions"
                  title="The same experience can create different posts"
                  description="Choose the angle that reflects what you genuinely want to say—not the one that sounds most dramatic."
                />
                <CoachStatusBanner state={coachState} message={coachNotice} />
                <div className={styles.angleGrid}>
                  {ideaAngles.map((angle, index) => (
                    <article
                      key={angle.id}
                      className={`${styles.angleCard} ${selectedAngle?.id === angle.id ? styles.angleSelected : ""}`}
                    >
                      <div className={styles.angleTopline}>
                        <span>Angle {index + 1}</span>
                        <small>{getPostType(angle.postType).title}</small>
                      </div>
                      <h2>{angle.title}</h2>
                      <p>{angle.premise}</p>
                      <div className={styles.angleOpening}>
                        <small>Possible starting material</small>
                        <blockquote>{angle.suggestedOpening}</blockquote>
                      </div>
                      <div className={styles.whyBox}>
                        <Target size={16} />
                        <span>{angle.whyItWorks}</span>
                      </div>
                      <div className={styles.angleActions}>
                        <button type="button" className={styles.secondaryButton} onClick={() => saveIdea(angle)}>
                          <Save size={15} /> Save idea
                        </button>
                        <button type="button" className={styles.primaryButton} onClick={() => buildFromAngle(angle)}>
                          Build this post <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                {ideaSaved ? <div className={styles.toast}><Check size={15} /> Idea saved in this browser</div> : null}
              </>
            )}
          </section>
        )}

        {flow === "write" && (
          <section className={styles.wizardBody}>
            {writeStep === 0 && (
              <>
                <WizardHeading
                  eyebrow="Guided Post Builder"
                  title="What do you want to write about?"
                  description="Enter your own subject or choose a prompt to make the first decision easier."
                />
                <div className={styles.subjectLayout}>
                  <div className={styles.subjectCard}>
                    <label htmlFor="post-subject">Your subject</label>
                    <textarea
                      id="post-subject"
                      value={writeSubject}
                      onChange={(event) => {
                        setWriteSubject(event.target.value.slice(0, 300));
                        setSmartBuilderQuestions(null);
                      }}
                      placeholder="For example: why more healthcare testing does not always mean better prevention"
                    />
                    <small>{writeSubject.length}/300</small>
                  </div>

                  {savedIdeas.length ? (
                    <div className={styles.savedIdeaStrip}>
                      <div>
                        <BookOpen size={18} />
                        <span>
                          <strong>Your saved ideas</strong>
                          <small>Use one as the subject for this session.</small>
                        </span>
                      </div>
                      <div className={styles.savedIdeaButtons}>
                        {savedIdeas.slice(0, 4).map((idea) => (
                          <button
                            type="button"
                            key={idea.id}
                            onClick={() => {
                              setWriteSubject(idea.workingSubject || idea.title);
                              setPostType(idea.postType);
                            }}
                          >
                            {idea.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className={styles.topicExplorer}>
                  <div className={styles.sectionIntro}>
                    <Compass size={19} />
                    <div>
                      <h3>Explore subjects</h3>
                      <p>Use these as starting directions, then make them specific to your experience.</p>
                    </div>
                  </div>
                  <div className={styles.topicTabs}>
                    {TOPIC_CATEGORIES.map((category) => (
                      <button
                        type="button"
                        key={category.id}
                        className={activeTopicCategory === category.id ? styles.topicTabActive : ""}
                        onClick={() => setActiveTopicCategory(category.id)}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                  <div className={styles.topicList}>
                    {TOPIC_CATEGORIES.find((category) => category.id === activeTopicCategory)?.topics.map((topic) => (
                      <button type="button" key={topic} onClick={() => { setWriteSubject(topic); setSmartBuilderQuestions(null); }}>
                        <Lightbulb size={15} /> {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.stickyActions}>
                  <span>Keep the subject focused enough for one post.</span>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={writeSubject.trim().length < 8}
                    onClick={() => setWriteStep(1)}
                  >
                    Choose the post type <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}

            {writeStep === 1 && (
              <>
                <WizardHeading
                  eyebrow="Choose a structure"
                  title="What kind of post are you writing?"
                  description="A template should guide the thinking, not make every post sound the same."
                />
                <div className={styles.templateGrid}>
                  {POST_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      className={`${styles.templateCard} ${postType === type.id ? styles.templateSelected : ""}`}
                      onClick={() => {
                        setPostType(type.id);
                        setWriteAnswers({});
                        setBuiltPost("");
                        setSmartBuilderQuestions(null);
                        setCoachState("idle");
                      }}
                    >
                      <span className={styles.templateIcon}>
                        {type.id === "opinion" ? <MessageSquareText size={20} /> : type.id === "guide" ? <BookOpen size={20} /> : <FilePenLine size={20} />}
                      </span>
                      <strong>{type.title}</strong>
                      <p>{type.description}</p>
                      <small>{type.bestFor}</small>
                      <ol>
                        {type.structure.map((item) => <li key={item}>{item}</li>)}
                      </ol>
                    </button>
                  ))}
                </div>
                <div className={styles.stickyActions}>
                  <span>Choose the structure that matches your real purpose.</span>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={!postType}
                    onClick={() => setWriteStep(2)}
                  >
                    Define the reader <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}

            {writeStep === 2 && (
              <>
                <WizardHeading
                  eyebrow="Reader and purpose"
                  title="Who is this for, and what should change?"
                  description="Strong posts are clearer when the writer knows who needs the idea and what they should leave with."
                />
                <div className={styles.dualChoiceLayout}>
                  <section>
                    <div className={styles.sectionLabel}><UserRound size={17} /> Who should read it?</div>
                    <div className={styles.choiceGridTwo}>
                      {AUDIENCES.map((item) => (
                        <ChoiceButton
                          key={item.id}
                          selected={audience === item.id}
                          title={item.title}
                          description={item.description}
                          onClick={() => { setAudience(item.id); setSmartBuilderQuestions(null); }}
                        />
                      ))}
                    </div>
                  </section>
                  <section>
                    <div className={styles.sectionLabel}><Target size={17} /> What should they leave with?</div>
                    <div className={styles.choiceGridTwo}>
                      {OUTCOMES.map((item) => (
                        <ChoiceButton
                          key={item.id}
                          selected={outcome === item.id}
                          title={item.title}
                          description={item.description}
                          onClick={() => { setOutcome(item.id); setSmartBuilderQuestions(null); }}
                        />
                      ))}
                    </div>
                  </section>
                </div>
                <div className={styles.stickyActions}>
                  <span>The coach will use this context to keep your answers focused.</span>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={!audience || !outcome || !postType}
                    onClick={generateBuilderQuestionsWithCoach}
                  >
                    {coachState === "loading" ? "Preparing your coaching questions" : "Start guided writing"}
                    {coachState === "loading" ? <LoaderCircle size={17} className={styles.spin} /> : <PenLine size={17} />}
                  </button>
                </div>
              </>
            )}

            {writeStep === 3 && postType && audience && outcome && (
              <>
                <WizardHeading
                  eyebrow={`${getPostType(postType).title} coach`}
                  title="Build the thinking before polishing the words"
                  description={`You are writing for ${getAudienceLabel(audience).toLowerCase()} and want them to ${getOutcomeLabel(outcome).toLowerCase()}.`}
                />
                <CoachStatusBanner state={coachState} message={coachNotice} />
                <div className={styles.questionLayout}>
                  <div className={styles.questionStack}>
                    {builderQuestions.map((question, index) => (
                      <label key={question.id} className={styles.questionCard}>
                        <span className={styles.questionNumber}>{index + 1}</span>
                        <strong>{question.question}</strong>
                        <p>{question.guidance}</p>
                        <textarea
                          value={writeAnswers[question.id] ?? ""}
                          onChange={(event) =>
                            setWriteAnswers((current) => ({
                              ...current,
                              [question.id]: event.target.value,
                            }))
                          }
                          placeholder={question.placeholder}
                        />
                      </label>
                    ))}
                  </div>
                  <aside className={styles.coachPanel}>
                    <span className={styles.coachAvatar}><Brain size={22} /></span>
                    <small>Writing brief</small>
                    <h3>{writeSubject}</h3>
                    <dl className={styles.briefList}>
                      <div><dt>Format</dt><dd>{getPostType(postType).title}</dd></div>
                      <div><dt>Reader</dt><dd>{getAudienceLabel(audience)}</dd></div>
                      <div><dt>Purpose</dt><dd>{getOutcomeLabel(outcome)}</dd></div>
                    </dl>
                    <p>Write naturally. The draft will use your supplied material rather than inventing connective stories.</p>
                  </aside>
                </div>
                <div className={styles.stickyActions}>
                  <span>Answer at least three sections. You can refine the draft afterwards.</span>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={filledCount(writeAnswers) < 3}
                    onClick={assembleCurrentPost}
                  >
                    Assemble my draft <WandSparkles size={17} />
                  </button>
                </div>
              </>
            )}

            {writeStep === 4 && postType && (
              <>
                <WizardHeading
                  eyebrow="Your working draft"
                  title="Now make it sound exactly like you"
                  description="The structure is assembled from your answers. Edit freely, remove anything unnecessary and then run the HumanSignal review."
                />
                <div className={styles.editorReviewLayout}>
                  <div className={styles.largeEditorCard}>
                    <div className={styles.editorToolbar}>
                      <span><PenLine size={16} /> Editable LinkedIn draft</span>
                      <small>{builtPost.trim().split(/\s+/).filter(Boolean).length} words</small>
                    </div>
                    <textarea
                      value={builtPost}
                      onChange={(event) => setBuiltPost(event.target.value.slice(0, 5000))}
                      placeholder="Your assembled post will appear here..."
                    />
                    <div className={styles.editorActions}>
                      <button type="button" className={styles.secondaryButton} onClick={() => copyValue(builtPost)} disabled={!builtPost}>
                        <Copy size={15} /> {copied ? "Copied" : "Copy post"}
                      </button>
                      <button type="button" className={styles.primaryButton} onClick={sendBuiltPostToReview} disabled={builtPost.trim().length < 80}>
                        Review with HumanSignal <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  <aside className={styles.signalSidebar}>
                    {liveBuiltAnalysis ? (
                      <>
                        <div className={styles.scoreCircle} style={{ "--score": `${liveBuiltAnalysis.overallScore}%` } as React.CSSProperties}>
                          <strong>{liveBuiltAnalysis.overallScore}</strong>
                          <span>Human Signal</span>
                        </div>
                        <h3>{liveBuiltAnalysis.label}</h3>
                        <p>{liveBuiltAnalysis.summary}</p>
                        <div className={styles.miniSignals}>
                          {signalKeys.map((key) => (
                            <div key={key}>
                              <span>{getSignalLabel(key)}</span>
                              <strong>{liveBuiltAnalysis.scores[key]}/20</strong>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className={styles.emptySignal}>
                        <Brain size={28} />
                        <h3>Keep developing the draft</h3>
                        <p>Once it reaches enough substance, the live HumanSignal diagnosis will appear here.</p>
                      </div>
                    )}
                  </aside>
                </div>
              </>
            )}
          </section>
        )}

        {flow === "review" && (
          <section className={styles.wizardBody}>
            {reviewStep === 0 && (
              <>
                <WizardHeading
                  eyebrow="HumanSignal Review"
                  title="Paste the post you want to strengthen"
                  description="The review measures visible human contribution. It does not claim to detect whether AI wrote the text."
                />
                <div className={styles.reviewPasteCard}>
                  <div className={styles.editorToolbar}>
                    <span><Clipboard size={16} /> LinkedIn draft</span>
                    <button
                      type="button"
                      className={styles.textButton}
                      onClick={() => setReviewPost("AI is transforming healthcare by improving efficiency, reducing costs and enabling better patient outcomes.\n\nHealthcare organisations should embrace innovation and use technology to create a more effective future.\n\nThe organisations that act now will be best positioned for what comes next.")}
                    >
                      Use example
                    </button>
                  </div>
                  <textarea
                    value={reviewPost}
                    onChange={(event) => setReviewPost(event.target.value.slice(0, 5000))}
                    placeholder="Paste your LinkedIn post here..."
                  />
                  <div className={styles.editorMeta}>
                    <span>{reviewPost.trim().split(/\s+/).filter(Boolean).length} words</span>
                    <span>{reviewPost.length}/5000 characters</span>
                  </div>
                </div>
                <div className={styles.stickyActions}>
                  <span>A useful review needs at least 80 characters.</span>
                  <button type="button" className={styles.primaryButton} disabled={reviewPost.trim().length < 80} onClick={runReview}>
                    Analyse human contribution <Brain size={17} />
                  </button>
                </div>
              </>
            )}

            {reviewStep === 1 && reviewAnalysis && (
              <>
                <WizardHeading
                  eyebrow="Post diagnosis"
                  title={`${reviewAnalysis.overallScore}/100 — ${reviewAnalysis.label}`}
                  description={reviewAnalysis.summary}
                />
                <div className={styles.analysisHero}>
                  <div className={styles.bigScore}>
                    <div className={styles.scoreCircle} style={{ "--score": `${reviewAnalysis.overallScore}%` } as React.CSSProperties}>
                      <strong>{reviewAnalysis.overallScore}</strong>
                      <span>Human Signal</span>
                    </div>
                    <p>Topic detected: <strong>{reviewAnalysis.topic}</strong></p>
                  </div>
                  <div className={styles.signalGrid}>
                    {signalKeys.map((key) => (
                      <article key={key} className={styles.signalCard}>
                        <div>
                          <strong>{getSignalLabel(key)}</strong>
                          <span className={styles.statusPill}>{scoreStatus(reviewAnalysis.scores[key])}</span>
                        </div>
                        <div className={styles.signalBar}><span style={{ width: `${reviewAnalysis.scores[key] * 5}%` }} /></div>
                        <p>{reviewAnalysis.explanations[key].explanation}</p>
                        <small>{reviewAnalysis.scores[key]}/20</small>
                      </article>
                    ))}
                  </div>
                </div>

                <CoachStatusBanner state={coachState} message={coachNotice} />

                {deepReview ? (
                  <section className={styles.deepReviewCard}>
                    <div className={styles.deepReviewHeader}>
                      <span><Sparkles size={18} /></span>
                      <div>
                        <small>Deeper editorial reading</small>
                        <h2>{deepReview.headline}</h2>
                      </div>
                    </div>
                    <p>{deepReview.summary}</p>
                    <div className={styles.deepReviewGrid}>
                      <div>
                        <strong>Protect these strengths</strong>
                        <ul>{deepReview.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                      <div>
                        <strong>Highest-impact improvements</strong>
                        <ul>{deepReview.priorities.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    </div>
                    <div className={styles.humanInputPreview}>
                      <span><UserRound size={18} /></span>
                      <div>
                        <strong>Next: add what only you can contribute</strong>
                        <p>
                          HumanSignal has turned the diagnosis into {deepReview.questions.length} focused input question{deepReview.questions.length === 1 ? "" : "s"}. You provide the experience, example or judgement; the coach helps you place it.
                        </p>
                        <div className={styles.inputPreviewTags}>
                          {deepReview.questions.map((item) => (
                            <span key={item.id}>{contributionForCategory(item.category)}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                ) : null}

                <div className={styles.analysisColumns}>
                  <section className={styles.analysisPanel}>
                    <div className={styles.panelTitle}><CheckCircle2 size={18} /> What is already working</div>
                    {reviewAnalysis.positiveSignals.length ? (
                      <ul>{reviewAnalysis.positiveSignals.map((item) => <li key={item}>{item}</li>)}</ul>
                    ) : (
                      <p>The draft has a subject, but it still needs visible experience, judgement or practical value.</p>
                    )}
                  </section>
                  <section className={styles.analysisPanel}>
                    <div className={styles.panelTitle}><MessageSquareText size={18} /> Familiar wording</div>
                    {reviewAnalysis.genericPatterns.length ? (
                      <ul>
                        {reviewAnalysis.genericPatterns.map((item) => (
                          <li key={item.phrase}><strong>{item.phrase}:</strong> {item.reason}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No major familiar LinkedIn phrases were detected.</p>
                    )}
                  </section>
                </div>

                <div className={styles.stickyActions}>
                  <span>The coach has selected {reviewQuestions.length} questions that require your own knowledge.</span>
                  <button type="button" className={styles.primaryButton} onClick={openReviewInput}>
                    Add what only I know <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}

            {reviewStep === 2 && reviewAnalysis && (
              <>
                {currentReviewQuestion ? (
                  <>
                    <WizardHeading
                      eyebrow={`Your contribution · Question ${reviewQuestionIndex + 1} of ${reviewQuestions.length}`}
                      title="Add what only you can contribute"
                      description="Answer naturally. This is not a test and Sitora will not invent the answer for you."
                    />

                    <div className={styles.singleQuestionLayout}>
                      <section className={styles.focusQuestionCard}>
                        <div className={styles.focusQuestionTopline}>
                          <span>{currentReviewQuestion.category}</span>
                          <small>{currentReviewQuestion.contribution}</small>
                        </div>
                        <h2>{currentReviewQuestion.question}</h2>
                        <p>{currentReviewQuestion.guidance}</p>

                        <label className={styles.focusAnswerLabel}>
                          <span>Your answer</span>
                          <textarea
                            autoFocus
                            value={reviewAnswers[currentReviewQuestion.id] ?? ""}
                            onChange={(event) =>
                              setReviewAnswers((current) => ({
                                ...current,
                                [currentReviewQuestion.id]: event.target.value.slice(0, 900),
                              }))
                            }
                            placeholder={currentReviewQuestion.answerStarter || "Write this in the words you would naturally use..."}
                          />
                        </label>

                        <div className={styles.answerMeta}>
                          <span>{(reviewAnswers[currentReviewQuestion.id] ?? "").length}/900 characters</span>
                          <span><Target size={13} /> {currentReviewQuestion.placement}</span>
                        </div>

                        {(reviewAnswers[currentReviewQuestion.id] ?? "").trim().length >= 20 ? (
                          <div className={styles.answerImpact}>
                            <CheckCircle2 size={17} />
                            <div>
                              <strong>This adds {currentReviewQuestion.contribution.toLowerCase()}.</strong>
                              <p>Your meaning will be preserved. You can choose exact placement or natural integration before publishing.</p>
                            </div>
                          </div>
                        ) : null}

                        <div className={styles.questionNavigation}>
                          <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={reviewQuestionIndex === 0 ? () => setReviewStep(1) : moveToPreviousReviewQuestion}
                          >
                            <ArrowLeft size={15} /> Back
                          </button>
                          <button type="button" className={styles.textButton} onClick={moveToNextReviewQuestion}>
                            Skip for now
                          </button>
                          <button type="button" className={styles.primaryButton} onClick={moveToNextReviewQuestion}>
                            {reviewQuestionIndex === reviewQuestions.length - 1 ? "Review my input" : "Next question"}
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </section>

                      <aside className={styles.coachPanel}>
                        <span className={styles.coachAvatar}><ShieldCheck size={22} /></span>
                        <small>Human-first rule</small>
                        <h3>The substance must come from you.</h3>
                        <p>
                          Sitora can identify the missing ingredient and help position it. It cannot know what you saw, believed, learned or measured unless you say it.
                        </p>
                        <div className={styles.questionDots} aria-label="Question progress">
                          {reviewQuestions.map((question, index) => (
                            <button
                              key={question.id}
                              type="button"
                              aria-label={`Go to question ${index + 1}`}
                              className={`${index === reviewQuestionIndex ? styles.questionDotActive : ""} ${(reviewAnswers[question.id] ?? "").trim() ? styles.questionDotAnswered : ""}`}
                              onClick={() => setReviewQuestionIndex(index)}
                            />
                          ))}
                        </div>
                        <div className={styles.completionMeter}>
                          <span style={{ width: `${(answeredReviewQuestions.length / Math.max(reviewQuestions.length, 1)) * 100}%` }} />
                        </div>
                        <small>{answeredReviewQuestions.length} of {reviewQuestions.length} answered</small>
                      </aside>
                    </div>
                  </>
                ) : (
                  <>
                    <WizardHeading
                      eyebrow="Your contribution"
                      title="You have put yourself back into the post"
                      description="Review the material you supplied, then choose how much help you want with placement."
                    />

                    <div className={styles.contributionSummary}>
                      {answeredReviewQuestions.length ? (
                        answeredReviewQuestions.map((question) => (
                          <article key={question.id}>
                            <div>
                              <span>{question.category}</span>
                              <strong>{question.contribution}</strong>
                            </div>
                            <p>“{reviewAnswers[question.id].trim()}”</p>
                            <small>{question.placement}</small>
                          </article>
                        ))
                      ) : (
                        <div className={styles.emptyContribution}>
                          <MessageSquareText size={22} />
                          <div>
                            <strong>You skipped every question.</strong>
                            <p>Go back and answer at least one question so the post gains something genuinely personal or specific.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.modeActions}>
                      <button
                        type="button"
                        className={styles.secondaryLargeButton}
                        disabled={answeredReviewQuestions.length < 1 || isWeaving}
                        onClick={() => prepareReviewFinal("guided")}
                      >
                        <Target size={18} />
                        <span>
                          <strong>Show me where to add it</strong>
                          <small>Keep the original draft and use a placement guide.</small>
                        </span>
                      </button>

                      <button
                        type="button"
                        className={styles.secondaryLargeButton}
                        disabled={answeredReviewQuestions.length < 1 || isWeaving}
                        onClick={() => prepareReviewFinal("exact")}
                      >
                        <MessageSquareText size={18} />
                        <span>
                          <strong>Use my words exactly</strong>
                          <small>Insert the answers without adapting their wording.</small>
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`${styles.primaryLargeButton} ${styles.weaveButton}`}
                        disabled={answeredReviewQuestions.length < 1 || isWeaving}
                        onClick={weaveReviewInput}
                      >
                        {isWeaving ? (
                          <LoaderCircle size={18} className={styles.spin} />
                        ) : (
                          <WandSparkles size={18} />
                        )}
                        <span>
                          <strong>
                            {isWeaving
                              ? "Weaving your input into the post"
                              : "Weave my input naturally — recommended"}
                          </strong>
                          <small>
                            Preserve my meaning while improving flow, transitions and wording.
                          </small>
                        </span>
                      </button>
                    </div>

                    {weaveError ? (
                      <div className={styles.weaveError}>
                        {weaveError} Your answers are still saved, so you can try again.
                      </div>
                    ) : null}

                    <div className={styles.summaryBackRow}>
                      <button type="button" className={styles.textButton} onClick={() => setReviewQuestionIndex(Math.max(0, reviewQuestions.length - 1))}>
                        <ArrowLeft size={14} /> Return to the questions
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {reviewStep === 3 && (
              <>
                <WizardHeading
                  eyebrow="Final review"
                  title="Keep the improvement, keep your voice"
                  description={
                    reviewMode === "woven"
                      ? "Your facts and opinions have been preserved, while the wording and transitions were adjusted so the post reads naturally."
                      : reviewMode === "exact"
                        ? "Your supplied answers have been inserted without adapting their wording."
                        : "The original draft remains untouched. Use the placement guide to decide where your own material belongs."
                  }
                />
                <div className={styles.editorReviewLayout}>
                  <div className={styles.largeEditorCard}>
                    <div className={styles.editorToolbar}>
                      <span><FilePenLine size={16} /> Final editable post</span>
                      <small>{finalReviewPost.trim().split(/\s+/).filter(Boolean).length} words</small>
                    </div>
                    <textarea
                      value={finalReviewPost}
                      onChange={(event) => setFinalReviewPost(event.target.value.slice(0, 5000))}
                    />
                    {reviewMode === "guided" ? (
                      <div className={styles.placementGuide}>
                        <div className={styles.placementGuideHeader}>
                          <Target size={16} />
                          <div>
                            <strong>Your placement guide</strong>
                            <small>These are your words. Copy or adapt them where they fit naturally.</small>
                          </div>
                        </div>
                        {answeredReviewQuestions.map((question) => (
                          <article key={question.id}>
                            <div>
                              <span>{question.contribution}</span>
                              <small>{question.placement}</small>
                            </div>
                            <p>{reviewAnswers[question.id]}</p>
                            <button type="button" className={styles.textButton} onClick={() => safeClipboard(reviewAnswers[question.id])}>
                              <Copy size={13} /> Copy this answer
                            </button>
                          </article>
                        ))}
                      </div>
                    ) : null}

                    {reviewMode === "woven" && weaveResult ? (
                      <div className={styles.placementGuide}>
                        <div className={styles.placementGuideHeader}>
                          <WandSparkles size={16} />
                          <div>
                            <strong>Your input was adapted for flow</strong>
                            <small>
                              The meaning was preserved. Review each change before publishing.
                            </small>
                          </div>
                        </div>

                        {weaveResult.integrations.map((integration) => (
                          <article key={integration.questionId}>
                            <div>
                              <span>How your input was woven in</span>
                              <small>{integration.placementReason}</small>
                            </div>
                            <p>
                              <strong>Your answer:</strong> {integration.originalAnswer}
                            </p>
                            <p>
                              <strong>Adapted wording:</strong> {integration.adaptedText}
                            </p>
                          </article>
                        ))}

                        <p className={styles.weaveCoachNote}>{weaveResult.coachNote}</p>
                      </div>
                    ) : null}

                    <div className={styles.editorActions}>
                      <button type="button" className={styles.secondaryButton} onClick={() => setReviewStep(2)}>
                        <ArrowLeft size={15} /> Change my answers
                      </button>
                      <button type="button" className={styles.primaryButton} onClick={() => copyValue(finalReviewPost)}>
                        <Copy size={15} /> {copied ? "Copied" : "Copy final post"}
                      </button>
                    </div>
                  </div>
                  <aside className={styles.signalSidebar}>
                    {liveReviewAnalysis ? (
                      <>
                        <div className={styles.scoreComparison}>
                          <span>
                            <small>Before</small>
                            <strong>{reviewAnalysis?.overallScore ?? "—"}</strong>
                          </span>
                          <ArrowRight size={19} />
                          <span>
                            <small>Now</small>
                            <strong>{liveReviewAnalysis.overallScore}</strong>
                          </span>
                        </div>
                        <h3>{liveReviewAnalysis.label}</h3>
                        <p>{liveReviewAnalysis.summary}</p>
                        <div className={styles.miniSignals}>
                          {signalKeys.map((key) => (
                            <div key={key}>
                              <span>{getSignalLabel(key)}</span>
                              <strong>{liveReviewAnalysis.scores[key]}/20</strong>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className={styles.emptySignal}>
                        <Brain size={28} />
                        <h3>Add enough substance to rescore</h3>
                        <p>The live diagnosis will return when the draft has at least 80 characters.</p>
                      </div>
                    )}
                  </aside>
                </div>
              </>
            )}
          </section>
        )}

        {flow === "learn" && (
          <section className={styles.wizardBody}>
            {learnStep === 0 && (
              <>
                <WizardHeading
                  eyebrow="Writing Academy"
                  title="Which skill would improve your posts most?"
                  description="Each lesson explains one principle, shows the difference and gives you an exercise with immediate coaching feedback."
                />
                <div className={styles.lessonGrid}>
                  {WRITING_LESSONS.map((lesson, index) => (
                    <button
                      type="button"
                      key={lesson.id}
                      className={`${styles.lessonCard} ${lessonId === lesson.id ? styles.lessonSelected : ""}`}
                      onClick={() => {
                        setLessonId(lesson.id);
                        setLessonPractice("");
                      }}
                    >
                      <span className={styles.lessonNumber}>0{index + 1}</span>
                      <BookOpen size={22} />
                      <strong>{lesson.title}</strong>
                      <p>{lesson.description}</p>
                      <small>{lesson.duration}</small>
                    </button>
                  ))}
                </div>
                <div className={styles.stickyActions}>
                  <span>Start with the skill that causes the most friction when you write.</span>
                  <button type="button" className={styles.primaryButton} disabled={!lessonId} onClick={() => setLearnStep(1)}>
                    Begin lesson <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}

            {learnStep === 1 && activeLesson && (
              <>
                <WizardHeading
                  eyebrow={`${activeLesson.duration} lesson`}
                  title={activeLesson.title}
                  description={activeLesson.principle}
                />
                <div className={styles.lessonLayout}>
                  <article className={styles.lessonContent}>
                    <section>
                      <h2>The principle</h2>
                      <p>{activeLesson.explanation}</p>
                    </section>
                    <div className={styles.exampleGrid}>
                      <div className={styles.weakExample}>
                        <small>Weak example</small>
                        <blockquote>{activeLesson.weakExample}</blockquote>
                      </div>
                      <div className={styles.strongExample}>
                        <small>Stronger example</small>
                        <blockquote>{activeLesson.strongExample}</blockquote>
                      </div>
                    </div>
                    <section className={styles.exerciseCard}>
                      <span className={styles.exerciseIcon}><PenLine size={20} /></span>
                      <div>
                        <small>Your exercise</small>
                        <h2>{activeLesson.exercise}</h2>
                      </div>
                      <textarea
                        value={lessonPractice}
                        onChange={(event) => setLessonPractice(event.target.value)}
                        placeholder={activeLesson.exercisePlaceholder}
                      />
                    </section>
                  </article>
                  <aside className={styles.coachPanel}>
                    <span className={styles.coachAvatar}><Target size={22} /></span>
                    <small>Success checks</small>
                    <h3>Before submitting, check:</h3>
                    <ul className={styles.checkList}>
                      {activeLesson.checks.map((check) => <li key={check}><Check size={14} /> {check}</li>)}
                    </ul>
                    <p>Your answer does not need to be perfect. It needs to demonstrate the principle.</p>
                  </aside>
                </div>
                <div className={styles.stickyActions}>
                  <span>Write at least one complete sentence.</span>
                  <button type="button" className={styles.primaryButton} disabled={lessonPractice.trim().length < 20} onClick={() => setLearnStep(2)}>
                    Get coach feedback <Brain size={17} />
                  </button>
                </div>
              </>
            )}

            {learnStep === 2 && activeLesson && lessonFeedback && (
              <>
                <WizardHeading
                  eyebrow="Immediate coach feedback"
                  title={`${lessonFeedback.score}/100 — ${lessonFeedback.headline}`}
                  description="The score is a training signal. The important part is understanding what strengthened or weakened the writing."
                />
                <div className={styles.feedbackLayout}>
                  <div className={styles.feedbackScore}>
                    <div className={styles.scoreCircle} style={{ "--score": `${lessonFeedback.score}%` } as React.CSSProperties}>
                      <strong>{lessonFeedback.score}</strong>
                      <span>Practice score</span>
                    </div>
                    <blockquote>{lessonPractice}</blockquote>
                  </div>
                  <div className={styles.feedbackPanels}>
                    <section className={styles.analysisPanel}>
                      <div className={styles.panelTitle}><CheckCircle2 size={18} /> What worked</div>
                      <ul>{lessonFeedback.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                    <section className={styles.analysisPanel}>
                      <div className={styles.panelTitle}><Target size={18} /> What to improve next</div>
                      <ul>{lessonFeedback.improvements.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  </div>
                </div>
                <div className={styles.finalActionGrid}>
                  <button type="button" className={styles.secondaryLargeButton} onClick={() => setLearnStep(1)}>
                    <RefreshCw size={18} />
                    <span><strong>Practise again</strong><small>Apply the feedback to this exercise.</small></span>
                  </button>
                  <button
                    type="button"
                    className={styles.primaryLargeButton}
                    onClick={() => {
                      setWriteSubject(lessonPractice);
                      setFlow("write");
                      setLastFlow("write");
                      setWriteStep(0);
                    }}
                  >
                    <PenLine size={18} />
                    <span><strong>Use this in a post</strong><small>Take the idea into the guided builder.</small></span>
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
