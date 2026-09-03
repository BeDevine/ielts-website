"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  LISTENING_ITEMS,
  SPEAKING_PROMPTS,
  READING_ITEMS,
  WRITING_PROMPTS,
  getItemCount,
  type TestType,
  type Length,
  type MCQItem,
} from "./question-data";

type Stage = "select" | "listening" | "reading" | "writing" | "speaking" | "grading" | "result";

function mcqBandMidpoint(pct: number) {
  if (pct >= 0.85) return { mid: 8, label: "Band 7–9" };
  if (pct >= 0.65) return { mid: 6.5, label: "Band 6–7" };
  if (pct >= 0.4) return { mid: 5.5, label: "Band 5–6" };
  return { mid: 4.5, label: "Band 4–5" };
}

export default function QuizClient() {
  const [stage, setStage] = useState<Stage>("select");
  const [testType, setTestType] = useState<TestType>("Academic");
  const [length, setLength] = useState<Length>("short");

  const [index, setIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [writingAnswers, setWritingAnswers] = useState<Record<string, string>>({});
  const [speakingAnswers, setSpeakingAnswers] = useState<Record<string, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const [assessment, setAssessment] = useState<{
    writingBand: number;
    writingFeedback: string;
    speakingBand: number;
    speakingFeedback: string;
  } | null>(null);
  const [assessmentError, setAssessmentError] = useState<string | null>(null);

  const count = getItemCount(length);
  const listeningItems = LISTENING_ITEMS.slice(0, count);
  const readingItems = READING_ITEMS[testType].slice(0, count);
  const writingPrompts = WRITING_PROMPTS[testType].slice(0, count);
  const speakingPrompts = SPEAKING_PROMPTS.slice(0, count);

  function startQuiz() {
    setIndex(0);
    setStage("listening");
  }

  function playAudio(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  function answerMcq(item: MCQItem, optionIndex: number) {
    setMcqAnswers((prev) => ({ ...prev, [item.id]: optionIndex }));
  }

  function nextInStage(items: { id: string }[], nextStage: Stage) {
    if (index + 1 < items.length) {
      setIndex((i) => i + 1);
    } else {
      setIndex(0);
      setStage(nextStage);
    }
  }

  function startRecording(promptId: string) {
    const SpeechRecognitionCtor =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;

    if (!SpeechRecognitionCtor) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    let finalTranscript = speakingAnswers[promptId] || "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      setSpeakingAnswers((prev) => ({ ...prev, [promptId]: finalTranscript + interim }));
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }

  function stopRecording() {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }

  async function finishAndGrade() {
    setStage("grading");
    setAssessmentError(null);

    try {
      const res = await fetch("/api/quiz-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          writingResponses: writingPrompts.map((p) => ({
            prompt: p.prompt,
            text: writingAnswers[p.id] || "",
          })),
          speakingResponses: speakingPrompts.map((p) => ({
            prompt: p.prompt,
            transcript: speakingAnswers[p.id] || "",
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setAssessmentError(data.error || "Couldn't complete the assessment.");
        setStage("result");
        return;
      }

      const data = await res.json();
      setAssessment(data);
      setStage("result");
    } catch {
      setAssessmentError("Couldn't complete the assessment. Try again shortly.");
      setStage("result");
    }
  }

  function handleRestart() {
    setStage("select");
    setIndex(0);
    setMcqAnswers({});
    setWritingAnswers({});
    setSpeakingAnswers({});
    setAssessment(null);
    setAssessmentError(null);
  }

  // ---------- SELECTION SCREEN ----------
  if (stage === "select") {
    return (
      <div className="mt-12 rounded-2xl border border-line bg-white/60 p-8">
        <h2 className="font-display text-lg text-ink">Set up your check</h2>
        <p className="mt-2 text-sm text-ink/60">
          Covers Listening and Reading now, with Writing and Speaking checks coming soon.
          Best experienced in Chrome.
        </p>

        <div className="mt-6">
          <span className="block text-xs font-medium uppercase tracking-wide text-ink/60">
            Test type
          </span>
          <div className="mt-2 flex gap-3">
            {(["Academic", "General Training"] as TestType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTestType(t)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  testType === t ? "border-brass bg-brass/10 text-ink" : "border-line text-ink/70"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <span className="block text-xs font-medium uppercase tracking-wide text-ink/60">
            Length
          </span>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => setLength("short")}
              className={`rounded-full border px-4 py-2 text-sm ${
                length === "short" ? "border-brass bg-brass/10 text-ink" : "border-line text-ink/70"
              }`}
            >
              Short (4 per skill, ~8 min)
            </button>
            <button
              onClick={() => setLength("long")}
              className={`rounded-full border px-4 py-2 text-sm ${
                length === "long" ? "border-brass bg-brass/10 text-ink" : "border-line text-ink/70"
              }`}
            >
              Full (8 per skill, ~15 min)
            </button>
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:-translate-y-0.5 transition-transform"
        >
          Start
        </button>
      </div>
    );
  }

  // ---------- GRADING ----------
  if (stage === "grading") {
    return (
      <div className="mt-12 rounded-2xl border border-line bg-white/60 p-8 text-center">
        <p className="text-sm text-ink/60">Reviewing your Writing and Speaking responses…</p>
      </div>
    );
  }

  // ---------- LISTENING ----------
  if (stage === "listening") {
    const item = listeningItems[index];
    const selected = mcqAnswers[item.id];
    return (
      <div className="mt-12">
        <StageHeader label="Listening" index={index} total={listeningItems.length} />
        <div className="mt-8 rounded-2xl border border-line bg-white/60 p-8">
          <button
            onClick={() => playAudio(item.passage || "")}
            className="mb-5 flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink/70 hover:border-brass"
          >
            ▶ Play audio
          </button>
          <h2 className="font-display text-lg text-ink">{item.prompt}</h2>
          <div className="mt-6 space-y-3">
            {item.options.map((option, i) => (
              <button
                key={i}
                onClick={() => answerMcq(item, i)}
                className={`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  selected === i ? "border-brass bg-brass/10 text-ink" : "border-line text-ink/75 hover:border-brass/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <NextButton
          disabled={selected === undefined}
          isLast={index + 1 >= listeningItems.length}
          onClick={() => nextInStage(listeningItems, "reading")}
        />
      </div>
    );
  }

  // ---------- READING ----------
  if (stage === "reading") {
    const item = readingItems[index];
    const selected = mcqAnswers[item.id];
    return (
      <div className="mt-12">
        <StageHeader label="Reading" index={index} total={readingItems.length} />
        <div className="mt-8 rounded-2xl border border-line bg-white/60 p-8">
          <p className="mb-5 rounded-lg bg-paper p-4 text-sm leading-relaxed text-ink/70">
            {item.passage}
          </p>
          <h2 className="font-display text-lg text-ink">{item.prompt}</h2>
          <div className="mt-6 space-y-3">
            {item.options.map((option, i) => (
              <button
                key={i}
                onClick={() => answerMcq(item, i)}
                className={`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  selected === i ? "border-brass bg-brass/10 text-ink" : "border-line text-ink/75 hover:border-brass/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <NextButton
          disabled={selected === undefined}
          isLast={index + 1 >= readingItems.length}
          onClick={() => nextInStage(readingItems, "result")}
        />
      </div>
    );
  }

  // ---------- WRITING ----------
  if (stage === "writing") {
    const item = writingPrompts[index];
    const text = writingAnswers[item.id] || "";
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    return (
      <div className="mt-12">
        <StageHeader label="Writing" index={index} total={writingPrompts.length} />
        <div className="mt-8 rounded-2xl border border-line bg-white/60 p-8">
          <h2 className="font-display text-lg text-ink">{item.prompt}</h2>
          <textarea
            value={text}
            onChange={(e) => setWritingAnswers((prev) => ({ ...prev, [item.id]: e.target.value }))}
            rows={6}
            placeholder={`Write at least ${item.minWords} words…`}
            className="mt-5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-brass"
          />
          <p className="mt-2 font-mono text-xs text-ink/40">{wordCount} words</p>
        </div>
        <NextButton
          disabled={wordCount < 5}
          isLast={index + 1 >= writingPrompts.length}
          onClick={() => nextInStage(writingPrompts, "speaking")}
        />
      </div>
    );
  }

  // ---------- SPEAKING ----------
  if (stage === "speaking") {
    const item = speakingPrompts[index];
    const transcript = speakingAnswers[item.id] || "";
    return (
      <div className="mt-12">
        <StageHeader label="Speaking" index={index} total={speakingPrompts.length} />
        <div className="mt-8 rounded-2xl border border-line bg-white/60 p-8">
          <h2 className="font-display text-lg text-ink">{item.prompt}</h2>

          {!speechSupported ? (
            <>
              <p className="mt-4 text-xs text-ink/50">
                Speech recognition isn't supported in this browser (try Chrome). Type what
                you would have said instead:
              </p>
              <textarea
                value={transcript}
                onChange={(e) => setSpeakingAnswers((prev) => ({ ...prev, [item.id]: e.target.value }))}
                rows={4}
                className="mt-3 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
              />
            </>
          ) : (
            <>
              <div className="mt-5 flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={() => startRecording(item.id)}
                    className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
                  >
                    ● Start speaking
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white"
                  >
                    ■ Stop
                  </button>
                )}
                {isRecording && <span className="text-xs text-ink/50">Listening…</span>}
              </div>
              <p className="mt-4 min-h-[3rem] rounded-lg bg-paper p-4 text-sm text-ink/70">
                {transcript || "Your speech will appear here as text once you start."}
              </p>
            </>
          )}
        </div>
        <NextButton
          disabled={!transcript}
          isLast={index + 1 >= speakingPrompts.length}
          onClick={() => {
            if (index + 1 < speakingPrompts.length) {
              setIndex((i) => i + 1);
            } else {
              finishAndGrade();
            }
          }}
        />
      </div>
    );
  }

  // ---------- RESULT ----------
  if (stage === "result") {
    const listeningCorrect = listeningItems.filter((i) => mcqAnswers[i.id] === i.correctIndex).length;
    const readingCorrect = readingItems.filter((i) => mcqAnswers[i.id] === i.correctIndex).length;
    const listeningPct = listeningCorrect / listeningItems.length;
    const readingPct = readingCorrect / readingItems.length;
    const listeningBand = mcqBandMidpoint(listeningPct);
    const readingBand = mcqBandMidpoint(readingPct);

    const writingBand = assessment?.writingBand ?? null;
    const speakingBand = assessment?.speakingBand ?? null;

    const midpoints = [listeningBand.mid, readingBand.mid, writingBand, speakingBand].filter(
      (v): v is number => v !== null
    );
    const overall = midpoints.reduce((a, b) => a + b, 0) / midpoints.length;

    return (
      <div className="mt-12 rounded-2xl border border-line bg-white/60 p-8">
        <span className="font-mono text-xs uppercase tracking-wide text-teal">Your result</span>
        <h2 className="mt-3 font-display text-2xl text-ink">Roughly Band {overall.toFixed(1)}</h2>
        <p className="mt-2 text-sm text-ink/60">
          {testType} · {length === "short" ? "Short" : "Full"} check
        </p>

        {assessmentError && (
          <p className="mt-4 text-sm text-ink/50">
            Writing and Speaking assessment isn't switched on yet — check back soon.
          </p>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <SkillCard label="Listening" value={`${listeningCorrect}/${listeningItems.length} correct`} band={listeningBand.label} />
          <SkillCard label="Reading" value={`${readingCorrect}/${readingItems.length} correct`} band={readingBand.label} />
          <SkillCard
            label="Writing"
            value={writingBand ? `Estimated Band ${writingBand}` : "Coming soon"}
            band={assessment?.writingFeedback || "We're still building this section — check back soon."}
          />
          <SkillCard
            label="Speaking"
            value={speakingBand ? `Estimated Band ${speakingBand}` : "Coming soon"}
            band={assessment?.speakingFeedback || "We're still building this section — check back soon."}
          />
        </div>

        <p className="mt-6 text-xs text-ink/45">
          This is an informal indicator, not an official score. Writing and Speaking are
          assessed from text only — pronunciation and delivery aren't evaluated here.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:-translate-y-0.5 transition-transform"
          >
            Get in touch about lessons
          </Link>
          <button
            onClick={handleRestart}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink/70 hover:border-brass hover:text-brass"
          >
            Retake the check
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function StageHeader({ label, index, total }: { label: string; index: number; total: number }) {
  return (
    <>
      <div className="flex items-center justify-between text-xs text-ink/45">
        <span className="font-mono uppercase tracking-wide text-teal">{label}</span>
        <span className="font-mono">
          {index + 1} / {total}
        </span>
      </div>
      <div className="mt-3 h-1 w-full rounded-full bg-line">
        <div
          className="h-1 rounded-full bg-brass transition-all"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </>
  );
}

function NextButton({
  disabled,
  isLast,
  onClick,
}: {
  disabled: boolean;
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-40"
      >
        {isLast ? "Continue" : "Next"}
      </button>
    </div>
  );
}

function SkillCard({ label, value, band }: { label: string; value: string; band?: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <span className="font-mono text-[11px] uppercase tracking-wide text-brass">{label}</span>
      <p className="mt-1 font-display text-lg text-ink">{value}</p>
      {band && <p className="mt-1 text-xs text-ink/50">{band}</p>}
    </div>
  );
}
