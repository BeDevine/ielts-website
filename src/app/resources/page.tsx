import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Free IELTS Resources | TRIELTS",
  description:
    "Hand-picked free IELTS resources: official practice tests, band descriptors, study sites, YouTube channels, and how to practise with AI.",
  openGraph: {
    title: "Free IELTS Resources | TRIELTS",
    description: "Hand-picked free IELTS resources, plus how to practise with AI.",
  },
};

type Resource = { name: string; url: string; description: string };

const SECTIONS: { title: string; intro: string; items: Resource[] }[] = [
  {
    title: "Official IELTS",
    intro: "Start here. These come from the organisations that run the test.",
    items: [
      {
        name: "IELTS.org",
        url: "https://ielts.org",
        description:
          "The official IELTS site: test format, scoring, and the public band descriptors examiners mark Writing and Speaking against.",
      },
      {
        name: "British Council free practice tests",
        url: "https://takeielts.britishcouncil.org/prepare-test/free-practice-tests",
        description:
          "Free official practice tests for Academic and General Training - the best way to get used to the timing.",
      },
      {
        name: "IDP IELTS",
        url: "https://ielts.idp.com",
        description: "Official preparation articles, videos and test booking from IDP, one of the IELTS partners.",
      },
    ],
  },
  {
    title: "Free study sites",
    intro: "Well-established sites with free lessons, model answers and tips.",
    items: [
      {
        name: "IELTS Liz",
        url: "https://ieltsliz.com",
        description: "A huge library of free lessons and model answers for all four papers, with videos.",
      },
      {
        name: "IELTS Simon",
        url: "https://ielts-simon.com",
        description: "Short, clear model answers and writing tips, especially useful for Task 2 essays.",
      },
      {
        name: "BBC Learning English",
        url: "https://www.bbc.co.uk/learningenglish",
        description: "Free grammar, vocabulary and listening practice - try the 6 Minute English series.",
      },
    ],
  },
  {
    title: "YouTube channels",
    intro: "Good for listening practice and picking up natural, accurate English.",
    items: [
      {
        name: "BBC Learning English",
        url: "https://www.youtube.com/user/bbclearningenglish",
        description: "Short, well-made lessons on grammar, vocabulary and pronunciation.",
      },
      {
        name: "English with Lucy",
        url: "https://www.youtube.com/@EnglishwithLucy",
        description: "Clear British English pronunciation, grammar and vocabulary.",
      },
      {
        name: "Rachel's English",
        url: "https://www.youtube.com/user/rachelsenglish",
        description: "Detailed pronunciation lessons - helpful for Speaking, whatever accent you're aiming for.",
      },
    ],
  },
  {
    title: "Vocabulary & pronunciation tools",
    intro: "Quick tools worth bookmarking.",
    items: [
      {
        name: "Cambridge Dictionary",
        url: "https://dictionary.cambridge.org",
        description: "Clear definitions, example sentences and audio in British and American English.",
      },
      {
        name: "YouGlish",
        url: "https://youglish.com",
        description: "Type any word or phrase and hear real people say it in YouTube clips.",
      },
    ],
  },
];

const AI_PROMPTS: { label: string; prompt: string }[] = [
  {
    label: "Speaking Part 1",
    prompt:
      "Act as an IELTS Speaking examiner. Ask me Part 1 questions one at a time about my home town and my work or studies. After six questions, give me feedback on fluency, vocabulary, grammar and pronunciation.",
  },
  {
    label: "Speaking Part 2",
    prompt:
      "Give me an IELTS Speaking Part 2 cue card. Wait while I prepare for one minute, then let me speak for two minutes. Afterwards, tell me what I could have developed further.",
  },
  {
    label: "Writing Task 2",
    prompt:
      "Here is an IELTS Writing Task 2 question and my essay. Assess it against the four official Writing criteria and list my three biggest weaknesses. Don't rewrite the essay for me.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Resources</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">Free IELTS resources</h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          The resources I recommend to my own students. All free, all worth your time - and
          none of them a substitute for regular practice.
        </p>

        {SECTIONS.map((section) => (
          <div key={section.title} className="mt-12">
            <h2 className="font-display text-xl text-ink">{section.title}</h2>
            <p className="mt-1 text-sm text-ink/60">{section.intro}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {section.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-line bg-white/50 p-5 transition-colors hover:border-brass"
                >
                  <h3 className="font-display text-base text-ink group-hover:text-brass">
                    {item.name} <span className="text-ink/40">↗</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Practise with AI */}
        <div className="mt-14 rounded-2xl border border-brass/30 bg-brass/5 p-6 sm:p-8">
          <span className="font-mono text-xs uppercase tracking-wide text-brass">Practise with AI</span>
          <h2 className="mt-2 font-display text-xl text-ink">Extra practice between sessions</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">
            AI chat tools such as ChatGPT, Claude or Gemini are a genuinely useful way to get more
            speaking and writing practice. For Speaking, use the app&apos;s voice mode so you
            actually talk rather than type. Copy one of these to get started:
          </p>
          <div className="mt-5 space-y-4">
            {AI_PROMPTS.map((p) => (
              <div key={p.label} className="rounded-xl border border-line bg-white p-4">
                <span className="font-mono text-[11px] uppercase tracking-wide text-teal">{p.label}</span>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{p.prompt}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink/65">
            A word of caution: treat any band score an AI gives you as a rough guess, not an
            official result - they can be generous, and they can be wrong. Use AI for volume of
            practice, and a qualified teacher for accurate feedback on what&apos;s holding your
            score back.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-line bg-white/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-lg text-ink">Want structured, expert feedback?</h2>
            <p className="mt-1 text-sm text-ink/65">
              Free resources get you practice. Coaching tells you exactly what to fix.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:-translate-y-0.5 transition-transform"
          >
            Request a consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
