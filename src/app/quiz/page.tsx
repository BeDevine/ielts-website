import type { Metadata } from "next";
import QuizClient from "./quiz-client";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Free IELTS Level Check | TRIELTS",
  description:
    "A quick, informal 10-question IELTS level check covering grammar, vocabulary, and reading — see roughly where your current band sits.",
  openGraph: {
    title: "Free IELTS Level Check | TRIELTS",
    description: "A quick, informal 10-question IELTS level check.",
  },
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">2-minute check</p>
        <h1 className="mt-3 font-display text-2xl text-ink sm:text-3xl md:text-4xl">Where are you starting from?</h1>
        <p className="mt-3 text-ink/65">
          Ten quick questions across grammar, vocabulary, and reading. This is an informal
          indicator, not an official score — but it's a fast way to see roughly where you stand.
        </p>

        <QuizClient />
      </section>
    </main>
  );
}
