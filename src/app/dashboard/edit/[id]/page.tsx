import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PostForm from "../../post-form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="font-display text-lg tracking-tight text-ink">
            ← Dashboard
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-2xl text-ink">Edit post</h1>
        <PostForm
          initial={{
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            published: post.published,
          }}
        />
      </section>
    </main>
  );
}
