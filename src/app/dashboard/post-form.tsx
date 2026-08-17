"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type PostFormValues = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
};

export default function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(
    initial || { title: "", excerpt: "", content: "", category: "General", published: true }
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(initial?.id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch(isEditing ? `/api/posts/${initial!.id}` : "/api/posts", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">Category</label>
        <input
          value={values.category}
          onChange={(e) => setValues({ ...values, category: e.target.value })}
          placeholder="Writing, Listening, Speaking, Reading, Announcements…"
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
          Excerpt <span className="normal-case text-ink/40">(shown in listings — optional)</span>
        </label>
        <textarea
          value={values.excerpt}
          onChange={(e) => setValues({ ...values, excerpt: e.target.value })}
          rows={2}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">Content</label>
        <textarea
          required
          value={values.content}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          rows={14}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-brass"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => setValues({ ...values, published: e.target.checked })}
        />
        Published (visible on the site)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-60"
        >
          {saving ? "Saving…" : isEditing ? "Save changes" : "Publish post"}
        </button>
      </div>
    </form>
  );
}
