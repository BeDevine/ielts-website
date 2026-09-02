import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Barry Devine — IELTS Coach | TRIELTS",
  description:
    "Meet your IELTS coach: 17 years of international teaching experience, 5+ years focused specifically on IELTS. PGCE-qualified, with additional Cambridge, AP, and IB curriculum experience across 8 countries.",
  openGraph: {
    title: "Barry Devine — IELTS Coach | TRIELTS",
    description: "17 years of international teaching experience, 5+ years focused on IELTS.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Your coach</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">
          Barry Devine — Your IELTS Coach
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr] md:gap-12">
          {/* Photo */}
          <div>
            <img
              src="/barry-devine.jpg"
              alt="Barry Devine, IELTS coach"
              className="aspect-[4/5] w-full max-w-[240px] rounded-2xl border border-line object-cover"
            />
            <a
              href="https://www.linkedin.com/in/barrydevine/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline"
            >
              Connect on LinkedIn →
            </a>
          </div>

          <div>
            <p className="text-base leading-relaxed text-ink/75">
              I've spent the last 17 years teaching internationally — across Ireland, Italy,
              Switzerland, Poland, China, Vietnam, Mexico, and Malawi, as well as extensively online. For the last 5+ years, that
              work has been focused specifically on IELTS preparation, working with students
              of every age and background, from teenagers to senior executives preparing for
              relocation, study, or citizenship.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              I'm a PGCE-qualified teacher, and my background goes beyond English language
              instruction. I hold degrees in Computer Science and Business, and I've taught
              Cambridge IGCSE and A-Level English, Cambridge IGCSE and A-Level Business, and
              Computer Science across three major curricula — Cambridge, AP, and IB. That
              range means I bring a structured, analytical approach to coaching, and I'm
              equally comfortable communicating with individual students, HR departments, or
              institutional stakeholders.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              Every client — whether an individual preparing for a university application, a
              family relocating abroad, or an organisation coordinating training for staff —
              gets the same standard of preparation: specific, honest feedback, and a plan
              built around where they actually are, not a generic syllabus.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-brass">
                  Qualifications
                </span>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink/70">
                  <li>PGCE (Qualified Teacher)</li>
                  <li>Degree in Computer Science</li>
                  <li>Degree in Business</li>
                </ul>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-brass">
                  Teaching experience
                </span>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink/70">
                  <li>17 years, international</li>
                  <li>5+ years IELTS-focused</li>
                  <li>Ireland · Italy · Switzerland · Poland</li>
                  <li>China · Vietnam · Mexico · Malawi · Online</li>
                </ul>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-brass">
                  Cambridge curricula
                </span>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink/70">
                  <li>English (IGCSE &amp; A-Level)</li>
                  <li>Business (IGCSE &amp; A-Level)</li>
                  <li>Computer Science (GCSE &amp; A-Level)</li>
                </ul>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-brass">
                  Also taught
                </span>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink/70">
                  <li>AP Computer Science</li>
                  <li>IB Computer Science</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:-translate-y-0.5 transition-transform"
              >
                Request a consultation
              </Link>
              <Link
                href="/quiz"
                className="text-sm font-medium text-ink/70 underline decoration-line underline-offset-4 hover:text-brass self-center"
              >
                Take the level check →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
