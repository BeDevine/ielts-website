"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [values, setValues] = useState({ name: "", email: "", targetBand: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong sending that. Try again in a moment.");
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-lg tracking-tight text-ink">
            TRIELTS
          </Link>
          <Link href="/quiz" className="text-xs uppercase tracking-wide text-ink/60 hover:text-brass">
            Level check
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Get in touch</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">Request a consultation</h1>
        <p className="mt-3 text-ink/65">
          Whether you're arranging preparation for yourself, your family, or your
          organisation, tell me a little about the timeline and goal and I'll follow up
          with next steps.
        </p>

        {status === "sent" ? (
          <div className="mt-10 rounded-2xl border border-line bg-white/60 p-8">
            <h2 className="font-display text-xl text-ink">Message sent</h2>
            <p className="mt-2 text-sm text-ink/65">
              Thanks — I'll reply as soon as I can, usually within a day or two.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
                Your name
              </label>
              <input
                required
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
                Your email
              </label>
              <input
                required
                type="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
                Target band <span className="normal-case text-ink/40">(optional)</span>
              </label>
              <input
                value={values.targetBand}
                onChange={(e) => setValues({ ...values, targetBand: e.target.value })}
                placeholder="e.g. 7.0 for a university application"
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                placeholder="A little about your current level, timeline, and what you need help with."
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-brass"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
