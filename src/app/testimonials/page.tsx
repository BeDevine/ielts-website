import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import { db } from "@/lib/db";
import TestimonialForm from "./testimonials-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials | TRIELTS",
  description: "What clients say about coaching with TRIELTS.",
};

export default async function TestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Testimonials</p>
        <h1 className="mt-3 font-display text-2xl text-ink sm:text-3xl md:text-4xl">
          What clients say
        </h1>
        <p className="mt-3 text-ink/65">
          Real feedback from real clients. If you've worked with me, I'd love to hear from
          you too.
        </p>

        <div className="mt-10 space-y-6">
          {testimonials.length === 0 && (
            <p className="text-sm text-ink/50">No testimonials yet — be the first!</p>
          )}
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl border border-line bg-white/50 p-6">
              <p className="text-base leading-relaxed text-ink/80">"{t.message}"</p>
              <p className="mt-4 font-display text-sm text-ink">
                {t.name}
                {(t.company || t.context) && (
                  <span className="text-ink/50 font-body">
                    {" — "}
                    {[t.company, t.context].filter(Boolean).join(", ")}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl text-ink">Leave a testimonial</h2>
          <p className="mt-2 text-sm text-ink/60">
            Submissions are reviewed before appearing publicly.
          </p>
          <div className="mt-5">
            <TestimonialForm />
          </div>
        </div>
      </section>
    </main>
  );
}
