import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "IELTS FAQ: Scores, Retakes & Coaching | TRIELTS",
  description:
    "Clear answers to common IELTS questions: how the overall band is calculated, Academic vs General Training, One Skill Retake, results, and how coaching works.",
  openGraph: {
    title: "IELTS FAQ | TRIELTS",
    description: "Clear answers to common IELTS questions from an experienced IELTS coach.",
  },
};

type QA = { q: string; a: string };

const GROUPS: { title: string; items: QA[] }[] = [
  {
    title: "About the IELTS test",
    items: [
      {
        q: "How is the IELTS overall band score calculated?",
        a: "Your overall band is the average of your four section scores, rounded to the nearest half band. If the average ends in .25 it rounds up to the next half band, and if it ends in .75 it rounds up to the next whole band. For example, 6, 6, 6.5 and 6.5 average 6.25, which becomes an overall 6.5.",
      },
      {
        q: "Is there a pass mark for IELTS?",
        a: "No. IELTS has no pass or fail - you receive a band from 0 to 9. The score you need depends entirely on the university, employer or visa route you're applying to, so always check their exact requirement, including any minimum for each section.",
      },
      {
        q: "What's the difference between IELTS Academic and General Training?",
        a: "Listening and Speaking are the same in both. Reading and Writing are different: Academic is for university study and some professional registration, while General Training is mostly for work and migration. Check which version your organisation asks for before you book.",
      },
      {
        q: "How long are IELTS results valid?",
        a: "Most universities, employers and immigration authorities accept IELTS results for two years from the test date. Some set their own rules, so it's worth confirming with the organisation you're applying to.",
      },
      {
        q: "How quickly will I get my IELTS results?",
        a: "If you take IELTS on computer, results usually arrive within a few days - officially within 1 to 5 days, and often sooner. Paper-based results take around 13 days.",
      },
      {
        q: "Can I retake just one section of IELTS?",
        a: "Yes, with IELTS One Skill Retake - if you took the test on computer at a centre that offers it. You must sit the retake within 60 days of your original test, you can only do it once per test, and results arrive in 3 to 5 days. Check first that your university or visa authority accepts One Skill Retake results.",
      },
      {
        q: "Is IELTS on computer easier than on paper?",
        a: "No - the content, difficulty and scoring are the same. Choose the format you're most comfortable with. Computer gives you faster results and makes One Skill Retake possible; paper suits people who write faster by hand than they type.",
      },
      {
        q: "How long does the IELTS test take?",
        a: "Listening, Reading and Writing take about 2 hours 45 minutes in total, with no breaks between them. The Speaking test is 11 to 14 minutes and is sometimes on a different day.",
      },
    ],
  },
  {
    title: "Improving your score",
    items: [
      {
        q: "How long does it take to improve by one IELTS band?",
        a: "It depends on your starting level, which skill is holding you back, and how much you practise. In my experience, half a band in a few weeks of focused work is realistic for many students, while a full band usually takes a few months. The higher the band, the longer each step tends to take.",
      },
      {
        q: "Which part of IELTS do most people find hardest?",
        a: "Writing is the most common sticking point. Many candidates lose marks not because of their English, but because they don't fully answer the question or organise their ideas clearly - which is very fixable with targeted feedback.",
      },
      {
        q: "Can I prepare for IELTS on my own?",
        a: "Yes, especially for Listening and Reading - there are excellent free practice tests, and my Resources page lists the best ones. Writing and Speaking are much harder to improve alone, because it's difficult to see your own mistakes. That's where expert feedback makes the biggest difference.",
      },
    ],
  },
  {
    title: "Coaching with TRIELTS",
    items: [
      {
        q: "How do TRIELTS coaching sessions work?",
        a: "Sessions are 50 minutes, online by video call, and built around your target band, your deadline and the skills holding you back. You get detailed feedback after every session, not just a score.",
      },
      {
        q: "How much does IELTS coaching cost?",
        a: "£129 per 50-minute session, or less per session with a package: £120 each for 5, £110 each for 10, and £95 each for 20 sessions. The price is per session, not per person.",
      },
      {
        q: "Can I bring colleagues or family to a session?",
        a: "Yes, at no extra cost - you're booking my time, not a seat. Just bear in mind that the more people in a session, the less individual attention each person gets.",
      },
      {
        q: "Do you coach organisations and government clients?",
        a: "Yes. Organisations pay the same per-session rate, with invoicing and progress reporting available for HR, procurement or diplomatic requirements. For larger teams, we can plan how to split sessions so everyone gets enough attention.",
      },
      {
        q: "What if I need to reschedule a session?",
        a: "You can reschedule with 24 hours' notice at no charge. Packages are valid for 6 months from purchase.",
      },
      {
        q: "How do I get started?",
        a: "Request a free consultation through the contact page. We'll talk about your target band, your timeline and where you are now, and I'll suggest the best way forward.",
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">FAQ</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">IELTS questions, answered</h1>
        <p className="mt-3 text-ink/65">
          The questions my students ask most often, answered as simply as I can.
        </p>

        {GROUPS.map((group) => (
          <div key={group.title} className="mt-12">
            <h2 className="font-display text-xl text-ink">{group.title}</h2>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {group.items.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base text-ink">
                    <span>{item.q}</span>
                    <span className="mt-0.5 text-brass transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-line bg-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-lg text-ink">Still have a question?</h2>
            <p className="mt-1 text-sm text-ink/65">Ask me directly - I&apos;ll get back to you personally.</p>
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
