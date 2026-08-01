"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  Edit3,
  FilePenLine,
  Lightbulb,
  MousePointer2,
  Quote,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  WandSparkles,
} from "lucide-react";
import {
  analysePost,
  buildPlacementPlan,
  estimateReadingTime,
  getParagraphCount,
  getSignalLabel,
  getWordCount,
  integrateHumanInput,
  type HumanSignalAnalysis,
  type IntegratedInsertion,
  type PlacementSuggestion,
  type SignalKey,
} from "@/lib/human-signal/analysePost";
import styles from "./HumanSignal.module.css";

type Step = "draft" | "analysis" | "questions" | "placement" | "review";
type EditMode = "manual" | "integrated";

const STORAGE_KEY = "sitora-humansignal-draft-v2";

const examplePost = `AI is transforming healthcare by improving efficiency, reducing costs and enabling better patient outcomes.

Healthcare organisations should embrace innovation and use technology to create a more effective future.

The organisations that act now will be best positioned for what comes next.`;

const stepItems: Array<{ key: Step; label: string }> = [
  { key: "draft", label: "Draft" },
  { key: "analysis", label: "Signal" },
  { key: "questions", label: "Your input" },
  { key: "placement", label: "Place it" },
  { key: "review", label: "Review" },
];

function getScoreStatus(score: number) {
  if (score >= 14) return "Strong";
  if (score >= 8) return "Developing";
  return "Missing";
}

export function HumanSignalMvp() {
  const [step, setStep] = useState<Step>("draft");
  const [post, setPost] = useState("");
  const [analysis, setAnalysis] = useState<HumanSignalAnalysis | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finalPost, setFinalPost] = useState("");
  const [editMode, setEditMode] = useState<EditMode>("integrated");
  const [insertions, setInsertions] = useState<IntegratedInsertion[]>([]);
  const [manualInsertedIds, setManualInsertedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [answerCopied, setAnswerCopied] = useState<string | null>(null);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setPost(saved);
  }, []);

  useEffect(() => {
    if (post) window.localStorage.setItem(STORAGE_KEY, post);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [post]);

  const wordCount = useMemo(() => getWordCount(post), [post]);
  const completedAnswers = Object.values(answers).filter((answer) => answer.trim()).length;
  const placementPlan = useMemo(
    () => (analysis ? buildPlacementPlan(analysis.questions, answers) : []),
    [analysis, answers],
  );
  const revisedAnalysis = useMemo(
    () => (finalPost.trim().length >= 80 ? analysePost(finalPost) : null),
    [finalPost],
  );

  function runAnalysis() {
    if (post.trim().length < 80) return;
    const result = analysePost(post);
    setAnalysis(result);
    setAnswers({});
    setFinalPost("");
    setInsertions([]);
    setManualInsertedIds([]);
    setStep("analysis");
  }

  function openManualEditor() {
    setEditMode("manual");
    setFinalPost(post);
    setInsertions([]);
    setManualInsertedIds([]);
    setStep("review");
  }

  function buildIntegratedPost() {
    if (!analysis) return;
    const result = integrateHumanInput(post, analysis.questions, answers);
    setEditMode("integrated");
    setFinalPost(result.post);
    setInsertions(result.insertions);
    setManualInsertedIds([]);
    setStep("review");
  }

  function insertAtCursor(item: PlacementSuggestion) {
    const textarea = editorRef.current;
    const start = textarea?.selectionStart ?? finalPost.length;
    const end = textarea?.selectionEnd ?? start;
    const before = finalPost.slice(0, start);
    const after = finalPost.slice(end);
    const prefix = before.length && !before.endsWith("\n\n") ? "\n\n" : "";
    const suffix = after.length && !after.startsWith("\n\n") ? "\n\n" : "";
    const insertedText = `${prefix}${item.answer}${suffix}`;
    const next = `${before}${insertedText}${after}`;
    const nextCursor = before.length + insertedText.length;

    setFinalPost(next);
    setManualInsertedIds((current) =>
      current.includes(item.questionId) ? current : [...current, item.questionId],
    );

    window.requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(nextCursor, nextCursor);
    });
  }

  async function copyText(value: string, id: string) {
    await navigator.clipboard.writeText(value);
    setAnswerCopied(id);
    window.setTimeout(() => setAnswerCopied(null), 1500);
  }

  async function copyPost() {
    if (!finalPost) return;
    await navigator.clipboard.writeText(finalPost);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function reset() {
    setStep("draft");
    setPost("");
    setAnalysis(null);
    setAnswers({});
    setFinalPost("");
    setInsertions([]);
    setManualInsertedIds([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  const activeIndex = stepItems.findIndex((item) => item.key === step);

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <section className={styles.shell}>
        <header className={styles.productHeader}>
          <a href="/" className={styles.brand} aria-label="Sitora home">
            <span className={styles.brandMark}>S</span>
            <span>
              <strong>Sitora</strong>
              <small>HumanSignal</small>
            </span>
          </a>

          <div className={styles.headerNote}>
            <ShieldCheck size={16} />
            Measures contribution, not AI probability
          </div>
        </header>

        <nav className={styles.progress} aria-label="HumanSignal progress">
          {stepItems.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={`${styles.progressItem} ${index <= activeIndex ? styles.progressActive : ""}`}
              onClick={() => {
                if (index < activeIndex) setStep(item.key);
              }}
              disabled={index > activeIndex}
            >
              <span>{index < activeIndex ? <Check size={13} /> : index + 1}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {step === "draft" && (
          <section className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <Sparkles size={15} /> Human contribution layer
              </div>
              <h1>
                Your post does not need another rewrite.
                <em> It needs more of you.</em>
              </h1>
              <p>
                Paste your LinkedIn draft. HumanSignal identifies where your experience,
                judgement or evidence is missing, then asks only the questions that can
                strengthen this specific post.
              </p>

              <div className={styles.promiseList}>
                <div>
                  <Target size={18} />
                  <span>Topic-aware questions rather than generic writing advice</span>
                </div>
                <div>
                  <UserRound size={18} />
                  <span>Your exact words remain visible and under your control</span>
                </div>
                <div>
                  <ShieldCheck size={18} />
                  <span>No invented stories, results, quotations or opinions</span>
                </div>
              </div>
            </div>

            <div className={styles.editorCard}>
              <div className={styles.editorTopline}>
                <div>
                  <span className={styles.statusDot} /> Draft analysis
                </div>
                <button type="button" onClick={() => setPost(examplePost)}>
                  Use an example
                </button>
              </div>

              <textarea
                value={post}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setPost(event.target.value.slice(0, 5000))}
                placeholder="Paste your LinkedIn post here..."
                aria-label="LinkedIn post draft"
              />

              <div className={styles.editorMeta}>
                <span>{wordCount} words</span>
                <span>{post.length}/5,000 characters</span>
                <span>{estimateReadingTime(post)}</span>
              </div>

              <button
                className={styles.primaryButton}
                type="button"
                onClick={runAnalysis}
                disabled={post.trim().length < 80}
              >
                Analyse my post <ArrowRight size={18} />
              </button>

              {post.trim().length > 0 && post.trim().length < 80 && (
                <p className={styles.helperText}>
                  Add at least 80 characters for a useful analysis.
                </p>
              )}
            </div>
          </section>
        )}

        {step === "analysis" && analysis && (
          <section className={styles.stage}>
            <button className={styles.backButton} type="button" onClick={() => setStep("draft")}>
              <ArrowLeft size={17} /> Edit draft
            </button>

            <div className={styles.stageHeading}>
              <div>
                <span className={styles.eyebrow}>Human Signal analysis</span>
                <h2>Make the post difficult for anyone else to have written.</h2>
                <div className={styles.topicChip}>Detected subject: {analysis.topic}</div>
              </div>
              <div className={styles.scoreOrb}>
                <strong>{analysis.overallScore}</strong>
                <span>/100</span>
                <small>{analysis.label}</small>
              </div>
            </div>

            <div className={styles.analysisGrid}>
              <div className={styles.scoreCard}>
                <div className={styles.cardHeadingRow}>
                  <div>
                    <h3>Signal profile</h3>
                    <p>{analysis.summary}</p>
                  </div>
                  <span className={styles.directionalBadge}>Directional score</span>
                </div>

                <div className={styles.signalRows}>
                  {(Object.entries(analysis.scores) as Array<[SignalKey, number]>).map(
                    ([key, value]) => {
                      const detail = analysis.explanations[key];
                      return (
                        <div className={styles.signalRow} key={key}>
                          <div className={styles.signalLabelRow}>
                            <span>{getSignalLabel(key)}</span>
                            <div>
                              <small data-status={detail.status}>{getScoreStatus(value)}</small>
                              <strong>{value}/20</strong>
                            </div>
                          </div>
                          <div className={styles.signalTrack}>
                            <span style={{ width: `${value * 5}%` }} />
                          </div>
                          <p>{detail.explanation}</p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <aside className={styles.analysisAside}>
                <div className={styles.insightCard}>
                  <Lightbulb size={24} />
                  <h3>Best opportunity</h3>
                  <p>
                    Focus on {analysis.weakestSignals.map(getSignalLabel).join(" and ").toLowerCase()}.
                    The next questions are selected specifically to fill those gaps.
                  </p>
                  <div className={styles.missingTags}>
                    {analysis.weakestSignals.map((signal) => (
                      <span key={signal}>{getSignalLabel(signal)}</span>
                    ))}
                  </div>
                </div>

                {analysis.genericPatterns.length > 0 && (
                  <div className={styles.patternCard}>
                    <Quote size={21} />
                    <h3>Familiar wording</h3>
                    <p>These phrases may make the draft feel interchangeable:</p>
                    <div className={styles.patternList}>
                      {analysis.genericPatterns.map((pattern) => (
                        <div key={pattern.phrase}>
                          <strong>{pattern.phrase}</strong>
                          <span>{pattern.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

            <div className={styles.stageActions}>
              <button className={styles.primaryButton} type="button" onClick={() => setStep("questions")}>
                Add my contribution <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {step === "questions" && analysis && (
          <section className={styles.stage}>
            <button className={styles.backButton} type="button" onClick={() => setStep("analysis")}>
              <ArrowLeft size={17} /> Back to analysis
            </button>

            <div className={styles.stageHeadingSimple}>
              <span className={styles.eyebrow}>Your input</span>
              <h2>Only you can supply the substance.</h2>
              <p>
                Answer naturally. HumanSignal will not turn your answer into a fabricated
                story or add details you did not provide.
              </p>
            </div>

            <div className={styles.questionStack}>
              {analysis.questions.map((item, index) => (
                <article className={styles.questionCard} key={item.id}>
                  <div className={styles.questionNumber}>{index + 1}</div>
                  <div className={styles.questionBody}>
                    <div className={styles.questionType}>{item.category}</div>
                    <h3>{item.question}</h3>
                    <p>{item.guidance}</p>
                    <textarea
                      value={answers[item.id] ?? ""}
                      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        setAnswers((current) => ({
                          ...current,
                          [item.id]: event.target.value.slice(0, 700),
                        }))
                      }
                      placeholder="Write what actually happened, what you believe or what you would advise..."
                      aria-label={item.question}
                    />
                    <div className={styles.answerMeta}>
                      <span>{item.placement}</span>
                      <span>{(answers[item.id] ?? "").length}/700</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.stageActionsSplit}>
              <p>
                <strong>{completedAnswers}</strong> of {analysis.questions.length} answered. One strong
                answer is enough to continue.
              </p>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => setStep("placement")}
                disabled={completedAnswers === 0}
              >
                See where my input fits <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {step === "placement" && analysis && (
          <section className={styles.stage}>
            <button className={styles.backButton} type="button" onClick={() => setStep("questions")}>
              <ArrowLeft size={17} /> Edit my answers
            </button>

            <div className={styles.stageHeadingSimple}>
              <span className={styles.eyebrow}>Placement guidance</span>
              <h2>Your words. Your choice of how to use them.</h2>
              <p>
                HumanSignal recommends where each answer can strengthen the argument. It does not
                need to rewrite the rest of the post.
              </p>
            </div>

            <div className={styles.placementGrid}>
              <div className={styles.placementStack}>
                {placementPlan.map((item, index) => (
                  <article className={styles.placementCard} key={item.questionId}>
                    <div className={styles.placementTopline}>
                      <span>Input {index + 1}</span>
                      <button type="button" onClick={() => copyText(item.answer, item.questionId)}>
                        {answerCopied === item.questionId ? <Check size={15} /> : <Clipboard size={15} />}
                        {answerCopied === item.questionId ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <blockquote>{item.answer}</blockquote>
                    <div className={styles.placementAdvice}>
                      <Target size={17} />
                      <span>{item.placement}</span>
                    </div>
                  </article>
                ))}
              </div>

              <aside className={styles.choicePanel}>
                <h3>How do you want to continue?</h3>
                <button type="button" className={styles.choiceCard} onClick={openManualEditor}>
                  <span className={styles.choiceIcon}><Edit3 size={21} /></span>
                  <span>
                    <strong>I’ll place it myself</strong>
                    <small>Open the original draft with your answers beside it. Insert them wherever you choose.</small>
                  </span>
                  <ArrowRight size={18} />
                </button>

                <button type="button" className={styles.choiceCard} onClick={buildIntegratedPost}>
                  <span className={styles.choiceIcon}><WandSparkles size={21} /></span>
                  <span>
                    <strong>Integrate my exact words</strong>
                    <small>Place only the answers you supplied. Every inserted paragraph will be highlighted.</small>
                  </span>
                  <ArrowRight size={18} />
                </button>

                <p className={styles.choiceNote}>
                  No additional experience, evidence or opinions will be generated in either mode.
                </p>
              </aside>
            </div>
          </section>
        )}

        {step === "review" && analysis && revisedAnalysis && (
          <section className={styles.stageWide}>
            <button className={styles.backButton} type="button" onClick={() => setStep("placement")}>
              <ArrowLeft size={17} /> Change placement method
            </button>

            <div className={styles.reviewHeading}>
              <div>
                <span className={styles.eyebrow}>Review</span>
                <h2>
                  {editMode === "manual"
                    ? "Build the final post in your own voice."
                    : "See exactly what HumanSignal added."}
                </h2>
                <p>
                  The score updates as you edit. Treat it as guidance, not a prediction of reach or
                  LinkedIn’s algorithm.
                </p>
              </div>

              <div className={styles.scoreChange}>
                <div>
                  <span>Before</span>
                  <strong>{analysis.overallScore}</strong>
                </div>
                <ArrowRight size={20} />
                <div>
                  <span>Current</span>
                  <strong>{revisedAnalysis.overallScore}</strong>
                </div>
              </div>
            </div>

            {editMode === "integrated" && insertions.length > 0 && (
              <div className={styles.changePreview}>
                <div className={styles.changePreviewHeading}>
                  <div>
                    <span className={styles.eyebrow}>Change preview</span>
                    <h3>Your supplied paragraphs are highlighted below.</h3>
                  </div>
                  <span>{insertions.length} addition{insertions.length === 1 ? "" : "s"}</span>
                </div>
                <div className={styles.previewPost}>
                  {finalPost.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => {
                    const insertion = insertions.find((item) => item.answer === paragraph.trim());
                    return (
                      <div
                        key={`${paragraph.slice(0, 18)}-${index}`}
                        className={insertion ? styles.addedParagraph : styles.originalParagraph}
                      >
                        {insertion && <small>Added from your {insertion.category} answer</small>}
                        <p>{paragraph}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className={styles.reviewGridWide}>
              <div className={styles.finalEditor}>
                <div className={styles.editorTopline}>
                  <div>
                    <span className={styles.statusDot} /> Final post
                  </div>
                  <span>{getParagraphCount(finalPost)} paragraphs</span>
                </div>
                <textarea
                  ref={editorRef}
                  value={finalPost}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setFinalPost(event.target.value.slice(0, 5000))}
                  aria-label="Revised LinkedIn post"
                />
                <div className={styles.editorMeta}>
                  <span>{getWordCount(finalPost)} words</span>
                  <span>{finalPost.length}/5,000 characters</span>
                  <span>{estimateReadingTime(finalPost)}</span>
                </div>
              </div>

              <aside className={styles.reviewSidebar}>
                {editMode === "manual" && (
                  <div className={styles.answerTray}>
                    <div className={styles.trayHeading}>
                      <MousePointer2 size={19} />
                      <div>
                        <h3>Your input tray</h3>
                        <p>Click in the editor, then insert an answer at the cursor.</p>
                      </div>
                    </div>
                    <div className={styles.trayItems}>
                      {placementPlan.map((item) => {
                        const inserted = manualInsertedIds.includes(item.questionId);
                        return (
                          <div className={styles.trayItem} key={item.questionId}>
                            <span>{item.category}</span>
                            <p>{item.answer}</p>
                            <small>{item.placement}</small>
                            <button type="button" onClick={() => insertAtCursor(item)}>
                              {inserted ? <Check size={15} /> : <FilePenLine size={15} />}
                              {inserted ? "Insert again" : "Insert at cursor"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className={styles.resultCard}>
                  <div className={styles.resultIcon}><Check size={22} /></div>
                  <h3>{revisedAnalysis.label}</h3>
                  <p>{revisedAnalysis.summary}</p>
                  <div className={styles.resultStats}>
                    <div>
                      <span>Human answers supplied</span>
                      <strong>{completedAnswers}</strong>
                    </div>
                    <div>
                      <span>Score movement</span>
                      <strong>
                        {revisedAnalysis.overallScore - analysis.overallScore >= 0 ? "+" : ""}
                        {revisedAnalysis.overallScore - analysis.overallScore}
                      </strong>
                    </div>
                    <div>
                      <span>Editing method</span>
                      <strong>{editMode === "manual" ? "Self-edited" : "Exact-word placement"}</strong>
                    </div>
                  </div>
                  <button className={styles.primaryButton} type="button" onClick={copyPost}>
                    {copied ? <Check size={18} /> : <Clipboard size={18} />}
                    {copied ? "Copied" : "Copy final post"}
                  </button>
                  <button className={styles.secondaryButton} type="button" onClick={reset}>
                    <RotateCcw size={17} /> Analyse another post
                  </button>
                </div>
              </aside>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
