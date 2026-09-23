"use client";

import { useState } from "react";

export default function TestimonialForm() {
  const [values, setValues] = useState({ name: "", company: "", context: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong. Try again.");
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-white/60 p-8">
        <h2 className="font-display text-xl text-ink">Thank you!</h2>
        <p className="mt-2 text-sm text-ink/65">
          Your testimonial has been submitted and will appear here once reviewed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white/60 p-8 space-y-5">
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">Your name</label>
        <input
          required
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
          Company <span className="normal-case text-ink/40">(optional)</span>
        </label>
        <input
          value={values.company}
          onChange={(e) => setValues({ ...values, company: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
          Context <span className="normal-case text-ink/40">(optional, e.g. "IELTS student, 2025")</span>
        </label>
        <input
          value={values.context}
          onChange={(e) => setValues({ ...values, context: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">Your testimonial</label>
        <textarea
          required
          rows={4}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-brass"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-60"
      >
        {status === "sending" ? "Submitting…" : "Submit testimonial"}
      </button>
    </form>
  );
}
