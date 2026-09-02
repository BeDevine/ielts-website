"use client";

import { useState } from "react";
import SiteHeader from "@/components/site-header";

export default function ContactClient() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    whatsapp: "",
    testType: "",
    currentLevel: "",
    targetBand: "",
    testDate: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

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

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass";
  const labelClass = "block text-xs font-medium uppercase tracking-wide text-ink/60";

  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Get in touch</p>
        <h1 className="mt-3 font-display text-2xl text-ink sm:text-3xl md:text-4xl">Request a consultation</h1>
        <p className="mt-3 text-ink/65">
          Whether you're arranging preparation for yourself, your family, or your
          organisation, tell me a little about the timeline and goal and I'll follow up
          with next steps.
        </p>

        {status === "sent" ? (
          <div className="mt-8 rounded-2xl border border-line bg-white/60 p-6 sm:p-8 md:mt-10">
            <h2 className="font-display text-xl text-ink">Message sent</h2>
            <p className="mt-2 text-sm text-ink/65">
              Thanks — I'll reply as soon as I can, usually within a day or two.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5 md:mt-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Your name</label>
                <input
                  required
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Your email</label>
                <input
                  required
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  WhatsApp <span className="normal-case text-ink/40">(optional)</span>
                </label>
                <input
                  value={values.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="+353 ..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Test type</label>
                <select
                  value={values.testType}
                  onChange={(e) => update("testType", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Not sure yet</option>
                  <option value="Academic">Academic</option>
                  <option value="General Training">General Training</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass}>
                  Current level <span className="normal-case text-ink/40">(optional)</span>
                </label>
                <input
                  value={values.currentLevel}
                  onChange={(e) => update("currentLevel", e.target.value)}
                  placeholder="e.g. 5.5"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Target band <span className="normal-case text-ink/40">(optional)</span>
                </label>
                <input
                  value={values.targetBand}
                  onChange={(e) => update("targetBand", e.target.value)}
                  placeholder="e.g. 7.0"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Test date <span className="normal-case text-ink/40">(optional)</span>
                </label>
                <input
                  type="date"
                  value={values.testDate}
                  onChange={(e) => update("testDate", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>What do you need help with?</label>
              <textarea
                required
                rows={5}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="A little about your current level, timeline, and what you need help with."
                className={`${inputClass} leading-relaxed`}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send request"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
