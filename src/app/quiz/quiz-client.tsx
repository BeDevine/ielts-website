"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  id: string;
  skill: "Grammar" | "Vocabulary" | "Reading";
  weight: number; // difficulty weighting, 1 (easier) - 4 (harder)
  prompt: string;
  passage?: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    skill: "Grammar",
    weight: 1,
    prompt: "Choose the correct sentence.",
    options: [
      "She have lived in London since 2019.",
      "She has lived in London since 2019.",
      "She living in London since 2019.",
      "She lived in London since 2019, still.",
    ],
    correctIndex: 1,
  },
  {
    id: "q2",
    skill: "Vocabulary",
    weight: 1,
    prompt: "Which word is closest in meaning to 'significant'?",
    options: ["Tiny", "Important", "Fast", "Quiet"],
    correctIndex: 1,
  },
  {
    id: "q3",
    skill: "Grammar",
    weight: 2,
    prompt: "Complete the sentence: \"If I ___ more time, I would travel more.\"",
    options: ["have", "had", "will have", "would have"],
    correctIndex: 1,
  },
  {
    id: "q4",
    skill: "Vocabulary",
    weight: 2,
    prompt: "Which word correctly completes: \"The report ___ a detailed analysis of the data.\"",
    options: ["makes", "does", "provides", "says"],
    correctIndex: 2,
  },
  {
    id: "q5",
    skill: "Grammar",
    weight: 3,
    prompt: "Choose the correct reported speech: He said, \"I am tired.\" → He said that he ___.",
    options: ["is tired", "was tired", "has been tired", "tired"],
    correctIndex: 1,
  },
  {
    id: "q6",
    skill: "Reading",
    weight: 2,
    passage:
      "Urban green spaces have been shown to reduce stress levels among city residents, but access to them remains uneven across income groups.",
    prompt: "According to the passage, what is unevenly distributed?",
    options: [
      "Stress levels",
      "City residents",
      "Access to green spaces",
      "Income groups",
    ],
    correctIndex: 2,
  },
  {
    id: "q7",
    skill: "Vocabulary",
    weight: 3,
    prompt: "Which word best fits: \"The findings were largely ___ with previous research.\"",
    options: ["consistent", "constant", "considerate", "consequent"],
    correctIndex: 0,
  },
  {
    id: "q8",
    skill: "Grammar",
    weight: 4,
    prompt: "Choose the correct sentence.",
    options: [
      "The proposal, that was submitted last week, was rejected.",
      "The proposal which was submitted last week was rejected.",
      "The proposal was submitted last week, was rejected.",
      "The proposal submit last week was rejected.",
    ],
    correctIndex: 1,
  },
  {
    id: "q9",
    skill: "Reading",
    weight: 4,
    passage:
      "While the policy was intended to reduce traffic congestion, early data suggests it has simply redistributed it to neighbouring districts rather than reducing it overall.",
    prompt: "What can be inferred about the policy's effect?",
    options: [
      "It successfully reduced congestion everywhere.",
      "It had no measurable effect at all.",
      "It may have shifted the problem rather than solved it.",
      "It was cancelled before any data was collected.",
    ],
    correctIndex: 2,
  },
  {
    id: "q10",
    skill: "Vocabulary",
    weight: 3,
    prompt: "Which word best completes: \"Critics ___ that the plan overlooks smaller businesses.\"",
    options: ["argue", "argues", "arguing", "to argue"],
    correctIndex: 0,
  },
];

const TOTAL_WEIGHT = QUESTIONS.reduce((sum, q) => sum + q.weight, 0);

function getResult(scoreWeight: number) {
  const pct = scoreWeight / TOTAL_WEIGHT;
  if (pct >= 0.85) {
    return {
      band: "Roughly Band 7–9",
      note: "You're already close to a strong score. At this stage it's about precision — task response, coherence, and polish, not fundamentals.",
    };
  }
  if (pct >= 0.65) {
    return {
      band: "Roughly Band 6–7",
      note: "A solid foundation. Targeted practice on your weaker task types would likely move the needle quickly.",
    };
  }
  if (pct >= 0.4) {
    return {
      band: "Roughly Band 5–6",
      note: "Core grammar and vocabulary need building up before higher-band techniques will stick.",
    };
  }
  return {
    band: "Roughly Band 4–5",
    note: "A focused plan on the fundamentals — grammar range and everyday vocabulary — will move this quickly.",
  };
}

export default function QuizClient() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[current];
  const isLast = current === QUESTIONS.length - 1;

  function selectAnswer(index: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: index }));
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  function handleRestart() {
    setAnswers({});
    setCurrent(0);
    setFinished(false);
  }

  if (finished) {
    const scoreWeight = QUESTIONS.reduce(
      (sum, q) => sum + (answers[q.id] === q.correctIndex ? q.weight : 0),
      0
    );
    const correctCount = QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length;
    const result = getResult(scoreWeight);

    return (
      <div className="mt-12 rounded-2xl border border-line bg-white/60 p-8">
        <span className="font-mono text-xs uppercase tracking-wide text-teal">Your result</span>
        <h2 className="mt-3 font-display text-2xl text-ink">{result.band}</h2>
        <p className="mt-2 text-sm text-ink/60">
          {correctCount} of {QUESTIONS.length} correct.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">{result.note}</p>

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
            Retake the quiz
          </button>
        </div>
      </div>
    );
  }

  const selected = answers[question.id];

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between text-xs text-ink/45">
        <span className="font-mono uppercase tracking-wide text-teal">{question.skill}</span>
        <span className="font-mono">
          {current + 1} / {QUESTIONS.length}
        </span>
      </div>

      <div className="mt-3 h-1 w-full rounded-full bg-line">
        <div
          className="h-1 rounded-full bg-brass transition-all"
          style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white/60 p-8">
        {question.passage && (
          <p className="mb-5 rounded-lg bg-paper p-4 text-sm leading-relaxed text-ink/70">
            {question.passage}
          </p>
        )}
        <h2 className="font-display text-lg text-ink">{question.prompt}</h2>

        <div className="mt-6 space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(index)}
              className={`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                selected === index
                  ? "border-brass bg-brass/10 text-ink"
                  : "border-line text-ink/75 hover:border-brass/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={selected === undefined}
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-40"
        >
          {isLast ? "See my result" : "Next question"}
        </button>
      </div>
    </div>
  );
}
