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
    features: ["One-to-one, 60 minutes", "Full written feedback after each session", "Book as you go"],
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
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-2xl border p-6 ${
              pkg.highlighted ? "border-brass bg-white shadow-sm" : "border-line bg-white/50"
            }`}
          >
            {pkg.highlighted && (
              <span className="font-mono text-[10px] uppercase tracking-wide text-brass">
                Most popular
              </span>
            )}
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
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-ink bg-ink px-8 py-10 text-paper md:flex md:items-center md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wide text-brass">
            Organisations &amp; government
          </span>
          <h2 className="mt-2 font-display text-2xl">Custom quotes for teams and institutions</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/70">
            Volume rates, scheduled invoicing, progress reporting for HR or procurement, and
            coordinated booking for multiple staff. Every institutional engagement is quoted
            individually against your requirements.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink hover:-translate-y-0.5 transition-transform md:mt-0 md:ml-8 md:shrink-0"
        >
          Request a quote
        </Link>
      </div>

      <p className="mt-8 text-sm text-ink/50">
        Packages are valid for 6 months from purchase. Sessions can be rescheduled with 24
        hours' notice at no charge.
      </p>
    </>
  );
}
