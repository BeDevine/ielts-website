import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import SiteHeader from "@/components/site-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });

  if (!post) return { title: "Post not found | TRIELTS" };

  return {
    title: `${post.title} | TRIELTS`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });

  if (!post || !post.published) notFound();

  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />

      <article className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <span className="font-mono text-[11px] uppercase tracking-wide text-teal">
          {post.category}
        </span>
        <h1 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl md:text-4xl">
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

        <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-ink/80 md:mt-10">
          {post.content}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <Link href="/blog" className="text-sm text-teal hover:underline">
            ← All tips
          </Link>
        </div>
      </article>
    </main>
  );
}
