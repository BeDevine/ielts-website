import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import LogoutButton from "./logout-button";
import DeletePostButton from "./delete-post-button";

export const metadata: Metadata = {
  title: "Dashboard | TRIELTS",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  const siteStat = await db.siteStat.findUnique({ where: { id: "main" } }).catch(() => null);

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-lg tracking-tight text-ink">
            TRIELTS
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <span className="text-ink/60">Hi, {user?.name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 inline-flex items-center gap-3 rounded-xl border border-line bg-white/60 px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-wide text-ink/50">
            Site visits
          </span>
          <span className="font-display text-2xl text-ink">
            {(siteStat?.count ?? 0).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl text-ink">Your posts</h1>
          <Link
            href="/dashboard/new"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:-translate-y-0.5 transition-transform"
          >
            New post
          </Link>
        </div>

        <div className="mt-8 divide-y divide-line border-t border-line">
          {posts.length === 0 && (
            <p className="py-8 text-sm text-ink/60">
              No posts yet. Click "New post" to write your first one.
            </p>
          )}
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg text-ink">{post.title}</h2>
                  {!post.published && (
                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink/60">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink/40">
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {post.category}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Link href={`/dashboard/edit/${post.id}`} className="text-teal hover:underline">
                  Edit
                </Link>
                <DeletePostButton postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
