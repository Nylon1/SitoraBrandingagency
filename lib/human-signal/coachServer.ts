import type { CoachRequest } from "./coachTypes";

const POST_TYPE_ENUM = [
  "experience",
  "opinion",
  "lesson",
  "guide",
  "industry",
  "case-study",
  "founder",
  "product",
  "discussion",
] as const;

export const COACH_SYSTEM_PROMPT = `You are Sitora HumanSignal, a rigorous LinkedIn writing coach.

Your job is to help a professional discover and express their own knowledge. You do not manufacture a personal brand, invent stories or turn every idea into formulaic thought leadership.

Non-negotiable rules:
1. Never invent an experience, client, result, number, quotation, belief or event.
2. Use only the user's supplied material.
3. Prefer specific coaching questions over polished generic prose.
4. Do not promise virality, reach or algorithmic outcomes.
5. Avoid clichés such as "game changer", "in today's fast-paced world", "unlock the power", "the future is here" and dramatic one-line hooks.
6. Preserve uncertainty. When the user has not supplied evidence, ask for it rather than implying it exists.
7. Write in plain British English.
8. Make every output useful for learning: explain why an angle, question or priority matters.
9. Output only JSON matching the supplied schema.
10. Write in a natural, thoughtful professional voice rather than an overly polished or computer-generated style.
11. Use a natural mixture of medium and longer sentences. Do not place every sentence on a separate line.
12. Where the subject involves judgement, interpretation or personal experience, do not present the author's view as an unquestionable fact.
13. Use measured phrases such as "In my view", "Based on what I have seen", "From our experience" or "The better question may be" only when they accurately reflect the author's meaning.
14. Do not mechanically insert the same phrases into every post.
15. Avoid exaggerated certainty, corporate jargon, artificial controversy, motivational slogans and formulaic LinkedIn language.
16. Preserve the author's facts, meaning, experience, opinion and level of confidence.
17. Prefer coherent paragraphs and gentle transitions over repeated one-line statements.`;

const coachQuestionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    question: { type: "string" },
    guidance: { type: "string" },
    placeholder: { type: "string" },
  },
  required: ["id", "question", "guidance", "placeholder"],
};

export const COACH_SCHEMAS = {
  idea_angles: {
    type: "object",
    additionalProperties: false,
    properties: {
      angles: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            premise: { type: "string" },
            postType: { type: "string", enum: [...POST_TYPE_ENUM] },
            whyItWorks: { type: "string" },
            suggestedOpening: { type: "string" },
            workingSubject: { type: "string" },
          },
          required: [
            "id",
            "title",
            "premise",
            "postType",
            "whyItWorks",
            "suggestedOpening",
            "workingSubject",
          ],
        },
      },
      coachObservation: { type: "string" },
    },
    required: ["angles", "coachObservation"],
  },
  builder_questions: {
    type: "object",
    additionalProperties: false,
    properties: {
      questions: {
        type: "array",
        minItems: 4,
        maxItems: 6,
        items: coachQuestionSchema,
      },
      coachNote: { type: "string" },
    },
    required: ["questions", "coachNote"],
  },
  deep_review: {
    type: "object",
    additionalProperties: false,
    properties: {
      headline: { type: "string" },
      summary: { type: "string" },
      strengths: {
        type: "array",
        minItems: 1,
        maxItems: 3,
        items: { type: "string" },
      },
      priorities: {
        type: "array",
        minItems: 2,
        maxItems: 3,
        items: { type: "string" },
      },
      questions: {
        type: "array",
        minItems: 2,
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: { type: "string" },
            category: {
              type: "string",
              enum: [
                "experience",
                "judgement",
                "evidence",
                "specificity",
                "action",
                "clarity",
                "structure",
              ],
            },
            question: { type: "string" },
            guidance: { type: "string" },
            answerStarter: { type: "string" },
            contribution: { type: "string" },
            placement: { type: "string" },
          },
          required: [
            "id",
            "category",
            "question",
            "guidance",
            "answerStarter",
            "contribution",
            "placement",
          ],
        },
      },
    },
    required: ["headline", "summary", "strengths", "priorities", "questions"],
  },
  weave_review: {
    type: "object",
    additionalProperties: false,
    properties: {
      revisedPost: {
        type: "string",
      },
      integrations: {
        type: "array",
        minItems: 1,
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            questionId: { type: "string" },
            originalAnswer: { type: "string" },
            adaptedText: { type: "string" },
            placementReason: { type: "string" },
          },
          required: [
            "questionId",
            "originalAnswer",
            "adaptedText",
            "placementReason",
          ],
        },
      },
      coachNote: {
        type: "string",
      },
    },
    required: ["revisedPost", "integrations", "coachNote"],
  },
} as const;

function cleanAnswers(answers: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(answers)
      .map(([key, value]) => [key, value.trim()])
      .filter(([, value]) => value.length > 0),
  );
}

export function buildCoachInput(request: CoachRequest) {
  if (request.task === "idea_angles") {
    return JSON.stringify({
      task: request.task,
      instruction:
        "Create exactly three materially different LinkedIn post angles from the user's own notes. One should normally foreground a practical lesson, one a defensible point of view and one the human story or decision. Do not make claims beyond the notes. The suggested opening must be grounded in supplied words and should not be clickbait.",
      ideaSource: request.context.ideaSource,
      userNotes: cleanAnswers(request.context.answers),
    });
  }

  if (request.task === "builder_questions") {
    return JSON.stringify({
      task: request.task,
      instruction:
        "Create four to six ordered coaching questions that will let the user build the thinking for this specific post. Questions must be tailored to the subject, post type, reader and desired outcome. Ask for missing evidence or experience rather than inventing it. Each placeholder should begin a natural answer but must not imply facts.",
      subject: request.context.subject.trim(),
      postType: request.context.postType,
      audience: request.context.audience,
      desiredOutcome: request.context.outcome,
    });
  }

  if (request.task === "weave_review") {
    return JSON.stringify({
      task: request.task,
      instruction: `
Integrate the author's supplied answers naturally into the original LinkedIn post.

The final post must sound like a thoughtful professional expressing a considered personal view. It must not sound like computer-generated marketing copy.

Preserve every fact, experience, example, opinion and meaning supplied by the author. Do not invent, exaggerate, strengthen or assume anything.

You may:
- improve grammar and sentence structure
- adjust tense and pronouns
- remove repeated wording
- add gentle transitions
- combine related sentences
- use a natural mixture of medium and longer sentences
- lightly edit the sentences immediately before and after an insertion
- move an answer to the paragraph where it fits most naturally

Where the author is expressing judgement rather than an established fact, use appropriately measured language where it fits, such as:
- "In my view..."
- "Based on what I have seen..."
- "From our experience..."
- "There may not be a simple right or wrong answer..."
- "The better question may be..."
- "That does not necessarily mean..."

Do not use these phrases mechanically. Only use them when they reflect the author's actual meaning and level of certainty.

Avoid:
- corporate jargon
- exaggerated claims
- motivational slogans
- artificial controversy
- dramatic one-line hooks
- placing every sentence on a separate line
- repeated rhetorical questions
- excessive em dashes
- formulaic LinkedIn endings
- "game changer"
- "let that sink in"
- "the future is here"
- "here's the truth"

Do not paste the author's answers as disconnected paragraphs. Weave them into the argument so the post reads as one coherent piece written by the same person.

Return the complete revised post. Also explain how each answer was adapted and where it was placed.
      `,
      originalPost: request.context.originalPost.trim(),
      userInputs: request.context.inputs.map((input) => ({
        questionId: input.questionId,
        category: input.category,
        question: input.question,
        exactUserAnswer: input.answer.trim(),
        suggestedPlacement: input.placement,
      })),
    });
  }

  return JSON.stringify({
    task: request.task,
    instruction:
      "Give a concise expert diagnosis of this LinkedIn draft. Identify what is genuinely working and the two or three changes that would most improve clarity, specificity, human contribution and reader value. Then ask two or three precise questions that become the author's input form. Each question must request something only the author can genuinely supply. For each question, explain what the answer will contribute, give a neutral sentence starter that does not imply facts, and state where the answer would best fit. Do not rewrite the post and do not infer facts.",
    post: request.context.post.trim(),
    existingHeuristicSummary: request.context.heuristicSummary,
    weakestSignals: request.context.weakestSignals,
  });
}

export function responseFormatName(task: CoachRequest["task"]) {
  return `human_signal_${task}`;
}
