"use client";

import Link from "next/link";
import CurrencySelector, { useCurrency } from "./currency-selector";

const packages = [
  {
    name: "Single session",
    gbpPrice: 195,
    unitGbp: null,
    unitLabel: "per 60-minute session",
    description: "For a diagnostic, a focused skill review, or ongoing flexible booking.",
    features: ["Up to 10 people, 60 minutes", "Full written feedback after each session", "Book as you go"],
  },
  {
    name: "5-session package",
    gbpPrice: 925,
    unitGbp: 185,
    unitLabel: "per session",
    description: "A short, focused block — ideal for a specific skill gap or a near-term test date.",
    features: ["Everything in Single session", "Personalised study plan", "Priority scheduling"],
    highlighted: false,
  },
  {
    name: "10-session package",
    gbpPrice: 1750,
    unitGbp: 175,
    unitLabel: "per session",
    description: "The standard programme for moving up a full band, start to finish.",
    features: ["Everything in 5-session", "Full diagnostic + progress reviews", "Direct message access between sessions"],
    highlighted: true,
  },
  {
    name: "20-session package",
    gbpPrice: 3200,
    unitGbp: 160,
    unitLabel: "per session",
    description: "For an ambitious target band, a tight deadline, or sustained, intensive coaching.",
    features: ["Everything in 10-session", "Mock test with full band breakdown", "Flexible rescheduling"],
    highlighted: false,
  },
];

const audiences = [
  {
    name: "Individual coaching",
    description: "One-to-one, at the standard hourly rate, booked as you go or as a package.",
  },
  {
    name: "Intensive IELTS preparation",
    description: "The same rate, booked in a concentrated block ahead of a fixed test date.",
  },
  {
    name: "Executive & professional coaching",
    description: "The same rate, scheduled around a demanding calendar.",
  },
  {
    name: "Corporate programmes",
    description: "The same rate per session, for a team of up to 10 — invoicing arranged directly.",
  },
  {
    name: "Government & institutional programmes",
    description: "The same rate, with reporting and procurement-friendly invoicing on request.",
  },
];

export default function PricingClient() {
  const { currency, setCurrency, convert } = useCurrency();

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink/50">
          Prices shown in your selected currency are approximate. Billing is in GBP.
        </p>
        <CurrencySelector currency={currency} onChange={setCurrency} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {packages.map((pkg) =>
          pkg.highlighted ? (
            <div key={pkg.name} className="rounded-2xl bg-ink p-6 text-paper shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-wide text-brass">
                Most popular
              </span>
              <h2 className="mt-2 font-display text-lg">{pkg.name}</h2>
              <p className="mt-4 font-display text-3xl">{convert(pkg.gbpPrice)}</p>
              <p className="mt-1 font-mono text-xs text-paper/60">
                {pkg.unitGbp ? `${convert(pkg.unitGbp)} ${pkg.unitLabel}` : pkg.unitLabel}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/75">{pkg.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-paper/80">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brass">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div key={pkg.name} className="rounded-2xl border border-line bg-white/50 p-6">
              <h2 className="mt-2 font-display text-lg text-ink">{pkg.name}</h2>
              <p className="mt-4 font-display text-3xl text-ink">{convert(pkg.gbpPrice)}</p>
              <p className="mt-1 font-mono text-xs text-ink/50">
                {pkg.unitGbp ? `${convert(pkg.unitGbp)} ${pkg.unitLabel}` : pkg.unitLabel}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">{pkg.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-ink/70">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brass">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      <p className="mt-6 text-sm text-ink/50">
        Payment is arranged directly — bank transfer, card, or invoicing for organisations
        and institutions.
      </p>

      {/* Audience blurbs — same rate, different contexts */}
      <div className="mt-16">
        <h2 className="font-display text-xl text-ink">The same rate, wherever you're coming from</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          One hourly rate, one standard of preparation — no matter who's in the room.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.name} className="rounded-xl border border-line bg-white/40 p-5">
              <h3 className="font-display text-base text-ink">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{a.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-ink bg-ink px-8 py-10 text-paper md:flex md:items-center md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wide text-brass">
            Organisations &amp; government
          </span>
          <h2 className="mt-2 font-display text-2xl">Let's talk through the details</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/70">
            The rate itself doesn't change for organisations — it's the same per-session
            price as everyone else. What's worth a conversation: invoicing and payment
            terms, groups larger than 10, and any reporting your HR or procurement team
            needs.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink hover:-translate-y-0.5 transition-transform md:mt-0 md:ml-8 md:shrink-0"
        >
          Start the conversation
        </Link>
      </div>

      <p className="mt-8 text-sm text-ink/50">
        Packages are valid for 6 months from purchase. Sessions can be rescheduled with 24
        hours' notice at no charge.
      </p>
    </>
  );
}
