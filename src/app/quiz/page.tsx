import type { Metadata } from "next";
import QuizClient from "./quiz-client";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Free IELTS Level Check | TRIELTS",
  description:
    "An informal IELTS level check covering Listening and Reading, with Writing and Speaking coming soon — Academic or General Training, short or full length. Best in Chrome.",
  openGraph: {
    title: "Free IELTS Level Check | TRIELTS",
    description: "An informal IELTS level check. Writing and Speaking sections coming soon.",
  },
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Level check</p>
        <h1 className="mt-3 font-display text-2xl text-ink sm:text-3xl md:text-4xl">Where are you starting from?</h1>
        <p className="mt-3 text-ink/65">
          Choose Academic or General Training, and a short or full-length check. Currently
          covers Listening and Reading, with Writing and Speaking checks on the way. This
          is an informal indicator, not an official score — best experienced in Chrome.
        </p>

        <QuizClient />
      </section>
    </main>
  );
}
