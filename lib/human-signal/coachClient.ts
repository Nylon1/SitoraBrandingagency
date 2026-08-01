import type {
  BuilderQuestionsCoachResult,
  CoachApiResponse,
  CoachRequest,
  DeepReviewCoachResult,
  IdeaAnglesCoachResult,
  WeaveReviewCoachResult,
} from "./coachTypes";

export class HumanSignalCoachError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HumanSignalCoachError";
  }
}

export async function requestHumanSignalCoach(
  request: Extract<CoachRequest, { task: "idea_angles" }>,
): Promise<IdeaAnglesCoachResult>;
export async function requestHumanSignalCoach(
  request: Extract<CoachRequest, { task: "builder_questions" }>,
): Promise<BuilderQuestionsCoachResult>;
export async function requestHumanSignalCoach(
  request: Extract<CoachRequest, { task: "deep_review" }>,
): Promise<DeepReviewCoachResult>;
export async function requestHumanSignalCoach(
  request: Extract<CoachRequest, { task: "weave_review" }>,
): Promise<WeaveReviewCoachResult>;
export async function requestHumanSignalCoach(
  request: CoachRequest,
): Promise<
  | IdeaAnglesCoachResult
  | BuilderQuestionsCoachResult
  | DeepReviewCoachResult
  | WeaveReviewCoachResult
> {
  const response = await fetch("/api/human-signal/coach", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const payload = (await response.json().catch(() => null)) as
    | CoachApiResponse<
        | IdeaAnglesCoachResult
        | BuilderQuestionsCoachResult
        | DeepReviewCoachResult
        | WeaveReviewCoachResult
      >
    | null;

  if (!response.ok || !payload) {
    throw new HumanSignalCoachError("The intelligent coach is temporarily unavailable.");
  }

  if (!payload.ok) {
    const message = "error" in payload ? payload.error : "The intelligent coach is temporarily unavailable.";
    throw new HumanSignalCoachError(message);
  }

  return payload.data;
}
