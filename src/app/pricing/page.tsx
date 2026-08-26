import Link from "next/link";
import PricingClient from "./pricing-client";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-lg tracking-tight text-ink">
            IELTS with You
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/quiz" className="hover:text-brass transition-colors">
              Level check
            </Link>
            <Link href="/blog" className="hover:text-brass transition-colors">
              Insights
            </Link>
            <Link href="/contact" className="hover:text-brass transition-colors">
              Consultation
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Investment</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">Private coaching rates</h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          One-to-one coaching, priced accordingly. No group classes, no shared attention —
          every session is built around your specific score gap and timeline.
        </p>

        <PricingClient />
      </section>
    </main>
  );
}
