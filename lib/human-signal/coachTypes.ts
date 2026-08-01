import type {
  AudienceId,
  CoachQuestion,
  IdeaAngle,
  IdeaSourceId,
  OutcomeId,
  PostTypeId,
} from "./wizardContent";

export type CoachTask =
  | "idea_angles"
  | "builder_questions"
  | "deep_review"
  | "weave_review";

export interface IdeaAnglesCoachRequest {
  task: "idea_angles";
  context: {
    ideaSource: IdeaSourceId;
    answers: Record<string, string>;
  };
}

export interface BuilderQuestionsCoachRequest {
  task: "builder_questions";
  context: {
    subject: string;
    postType: PostTypeId;
    audience: AudienceId;
    outcome: OutcomeId;
  };
}

export interface DeepReviewCoachRequest {
  task: "deep_review";
  context: {
    post: string;
    heuristicSummary: string;
    weakestSignals: string[];
  };
}

export interface WeaveReviewInput {
  questionId: string;
  category: string;
  question: string;
  answer: string;
  placement: string;
}

export interface WeaveReviewCoachRequest {
  task: "weave_review";
  context: {
    originalPost: string;
    inputs: WeaveReviewInput[];
  };
}

export type CoachRequest =
  | IdeaAnglesCoachRequest
  | BuilderQuestionsCoachRequest
  | DeepReviewCoachRequest
  | WeaveReviewCoachRequest;

export interface IdeaAnglesCoachResult {
  angles: IdeaAngle[];
  coachObservation: string;
}

export interface BuilderQuestionsCoachResult {
  questions: CoachQuestion[];
  coachNote: string;
}

export interface DeepReviewQuestion {
  id: string;
  category:
    | "experience"
    | "judgement"
    | "evidence"
    | "specificity"
    | "action"
    | "clarity"
    | "structure";
  question: string;
  guidance: string;
  answerStarter: string;
  contribution: string;
  placement: string;
}

export interface DeepReviewCoachResult {
  headline: string;
  summary: string;
  strengths: string[];
  priorities: string[];
  questions: DeepReviewQuestion[];
}

export interface WeaveReviewIntegration {
  questionId: string;
  originalAnswer: string;
  adaptedText: string;
  placementReason: string;
}

export interface WeaveReviewCoachResult {
  revisedPost: string;
  integrations: WeaveReviewIntegration[];
  coachNote: string;
}

export interface CoachApiSuccess<T> {
  ok: true;
  mode: "ai";
  data: T;
}

export interface CoachApiFailure {
  ok: false;
  error: string;
}

export type CoachApiResponse<T> = CoachApiSuccess<T> | CoachApiFailure;
