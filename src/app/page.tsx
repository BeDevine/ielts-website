import Link from "next/link";
import { db } from "@/lib/db";

export default async function HomePage() {
  const recentPosts = await db.post
    .findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    })
    .catch(() => []);

  return (
    <main>
      {/* Nav */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-lg tracking-tight">IELTS with You</span>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/quiz" className="hover:text-brass transition-colors">
              Level check
            </Link>
            <Link href="/blog" className="hover:text-brass transition-colors">
              Resources
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-ink px-4 py-1.5 text-xs uppercase tracking-wide text-paper hover:bg-brass transition-colors"
            >
              Book a lesson
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-ink/20 px-4 py-1.5 text-xs uppercase tracking-wide hover:border-brass hover:text-brass transition-colors"
            >
              Teacher login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">
              IELTS Academic &amp; General Training
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-6xl">
              Preparation that's honest about
              <em className="text-brass not-italic"> where you actually are.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70">
              No recycled worksheets. Every lesson is built from your last practice test —
              what cost you marks, and exactly what to fix before the next one.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                Ask about lessons
              </Link>
              <Link
                href="/quiz"
                className="text-sm font-medium text-ink/70 underline decoration-line underline-offset-4 hover:text-brass"
              >
                Not sure of your level? Take the 2-minute check →
              </Link>
            </div>
          </div>

          {/* Signature element: a stamped band-score seal */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-56 -rotate-6 rounded-full border-[3px] border-brass/70 md:w-72">
              <div className="absolute inset-3 rounded-full border border-dashed border-brass/50" />
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
                  Target
                </span>
                <span className="font-display text-6xl font-semibold text-ink md:text-7xl">
                  9
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  Overall Band
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The path — band scores are a real sequence, so numbering earns its place here */}
      <section id="approach" className="border-t border-line bg-white/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-2xl text-ink md:text-3xl">The path to your band</h2>
          <p className="mt-3 max-w-xl text-ink/70">
            Every student starts at a different point. Coaching is built around where the
            score gap actually is, not a fixed syllabus.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[
              {
                band: "Band 4–5",
                title: "Find the ceiling",
                copy: "A full diagnostic across all four papers to see exactly what's holding the score down.",
              },
              {
                band: "Band 5–6",
                title: "Fix the fundamentals",
                copy: "Grammar range, task response, and the listening/reading habits that cost easy marks.",
              },
              {
                band: "Band 6–7",
                title: "Build precision",
                copy: "Targeted drills on your specific weak task types, with timed practice under real conditions.",
              },
              {
                band: "Band 7–9",
                title: "Polish for the ceiling",
                copy: "Fine detail work — lexical range, coherence, and pronunciation nuance examiners reward.",
              },
            ].map((stage) => (
              <div key={stage.band} className="bg-paper px-6 py-8">
                <span className="font-mono text-xs uppercase tracking-wide text-brass">
                  {stage.band}
                </span>
                <h3 className="mt-3 font-display text-lg text-ink">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{stage.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-ink md:text-3xl">Latest study notes</h2>
            <Link href="/blog" className="text-sm text-teal hover:underline">
              View all
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <p className="mt-8 text-sm text-ink/60">
              Nothing published yet — new notes will appear here.
            </p>
          ) : (
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-line bg-white/50 p-6 transition-colors hover:border-brass"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wide text-teal">
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg text-ink group-hover:text-brass">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink/65">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-ink/50 md:flex-row">
          <span>© {new Date().getFullYear()} IELTS with You.</span>
          <div className="flex gap-6">
            <Link href="/quiz" className="hover:text-brass">
              Level check
            </Link>
            <Link href="/contact" className="hover:text-brass">
              Contact
            </Link>
            <Link href="/login" className="hover:text-brass">
              Teacher login
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
