import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });

  if (!post || !post.published) notFound();

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-lg tracking-tight text-ink">
            TRIELTS
          </Link>
          <Link href="/blog" className="text-xs uppercase tracking-wide text-ink/60 hover:text-brass">
            All notes
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-2xl px-6 py-16">
        <span className="font-mono text-[11px] uppercase tracking-wide text-teal">
          {post.category}
        </span>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 font-mono text-xs text-ink/45">
          {post.author.name} ·{" "}
          {new Date(post.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="mt-10 whitespace-pre-wrap text-base leading-relaxed text-ink/80">
          {post.content}
        </div>
      </article>
    </main>
  );
}
