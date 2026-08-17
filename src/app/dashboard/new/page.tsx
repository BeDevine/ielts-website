import Link from "next/link";
import PostForm from "../post-form";

export default function NewPostPage() {
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
        <h1 className="font-display text-2xl text-ink">New post</h1>
        <PostForm />
      </section>
    </main>
  );
}
