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
          One-to-one coaching, priced accordingly. No group classes, no shared attention —
          every session is built around your specific score gap and timeline.
        </p>

        <PricingClient />
      </section>
    </main>
  );
}
