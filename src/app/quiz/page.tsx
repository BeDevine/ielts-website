import Link from "next/link";
import QuizClient from "./quiz-client";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-lg tracking-tight text-ink">
            TRIELTS
          </Link>
          <Link href="/contact" className="text-xs uppercase tracking-wide text-ink/60 hover:text-brass">
            Contact
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">2-minute check</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">Where are you starting from?</h1>
        <p className="mt-3 text-ink/65">
          Ten quick questions across grammar, vocabulary, and reading. This is an informal
          indicator, not an official score — but it's a fast way to see roughly where you stand.
        </p>

        <QuizClient />
      </section>
    </main>
  );
}
