import Link from "next/link";
import { db } from "@/lib/db";

export default async function BlogIndexPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-lg tracking-tight text-ink">
            IELTS with You
          </Link>
          <Link href="/login" className="text-xs uppercase tracking-wide text-ink/60 hover:text-brass">
            Teacher login
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Resources</p>
        <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">Study notes</h1>
        <p className="mt-3 text-ink/65">Practical, specific notes — not generic tips.</p>

        <div className="mt-12 divide-y divide-line border-t border-line">
          {posts.length === 0 && <p className="py-8 text-sm text-ink/60">Nothing published yet.</p>}
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block py-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-wide text-teal">
                  {post.category}
                </span>
                <span className="font-mono text-[11px] text-ink/40">
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="mt-2 font-display text-xl text-ink group-hover:text-brass">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
