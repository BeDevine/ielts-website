import type { Metadata } from "next";
import PricingClient from "./pricing-client";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Pricing | TRIELTS",
  description:
    "Private IELTS coaching rates, from single sessions to volume packages. Custom quotes available for organisations and government institutions.",
  openGraph: {
    title: "Pricing | TRIELTS",
    description: "Private IELTS coaching rates, from single sessions to volume packages.",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Investment</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">Private coaching rates</h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          Focused, personalised coaching, priced per session — not per person. Every session
          is built around your specific score gap and timeline.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-brass/40 bg-brass/10 px-5 py-4 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-wide text-brass shrink-0 mt-0.5">
            Group rate
          </span>
          <p className="text-sm leading-relaxed text-ink/75">
            The fee is the same whether it's one person or up to ten — bring a full team,
            department, or family group to a session at no extra cost. Ideal for
            organisations coordinating relocation or training cohorts.
          </p>
        </div>

        <PricingClient />
      </section>
    </main>
  );
}
