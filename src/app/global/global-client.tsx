"use client";

import { useState } from "react";
import Link from "next/link";
import { LANGUAGES } from "./language-data";

export default function GlobalClient() {
  const [selected, setSelected] = useState(LANGUAGES[0].code);
  const lang = LANGUAGES.find((l) => l.code === selected) || LANGUAGES[0];

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => setSelected(l.code)}
            className={`rounded-full border px-4 py-2 text-sm ${
              selected === l.code ? "border-brass bg-brass/10 text-ink" : "border-line text-ink/70 hover:border-brass/50"
            }`}
          >
            {l.nativeName}
          </button>
        ))}
      </div>

      <div dir={lang.dir} className="mt-10 rounded-2xl border border-line bg-white/60 p-8">
        <p className="font-display text-xl text-ink">{lang.tagline}</p>
        <p className="mt-4 text-base leading-relaxed text-ink/75">{lang.intro}</p>

        <h2 className="mt-8 font-display text-lg text-ink">{lang.audiencesTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {lang.audiences.map((a) => (
            <div key={a.name} className="rounded-xl bg-paper p-4">
              <h3 className="font-display text-sm text-ink">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{a.description}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-8 font-display text-lg text-ink">{lang.pricingTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">{lang.pricingText}</p>

        <h2 className="mt-8 font-display text-lg text-ink">{lang.contactTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">{lang.contactText}</p>

        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:-translate-y-0.5 transition-transform"
        >
          {lang.contactCta}
        </Link>
      </div>

      <p className="mt-6 text-xs text-ink/40">
        AI-assisted translation. If anything reads unclearly, please reach out in English or
        your preferred language and we'll gladly assist.
      </p>
    </>
  );
}
