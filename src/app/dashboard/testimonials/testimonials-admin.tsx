"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  company: string | null;
  context: string | null;
  message: string;
  approved: boolean;
  createdAt: string;
};

export default function TestimonialsAdmin({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: "", company: "", context: "", message: "" });
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);

  async function toggleApproved(t: Testimonial) {
    await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...t, approved: !t.approved }),
    });
    router.refresh();
  }

  function startEdit(t: Testimonial) {
    setEditingId(t.id);
    setEditValues({ name: t.name, company: t.company || "", context: t.context || "", message: t.message });
  }

  async function saveEdit(t: Testimonial) {
    await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editValues, approved: t.approved }),
    });
    setEditingId(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (confirmingDelete !== id) {
      setConfirmingDelete(id);
      return;
    }
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setConfirmingDelete(null);
    router.refresh();
  }

  if (testimonials.length === 0) {
    return <p className="mt-8 text-sm text-ink/60">No testimonials submitted yet.</p>;
  }

  return (
    <div className="mt-8 divide-y divide-line border-t border-line">
      {testimonials.map((t) => (
        <div key={t.id} className="py-5">
          {editingId === t.id ? (
            <div className="space-y-3">
              <input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
                placeholder="Name"
              />
              <input
                value={editValues.company}
                onChange={(e) => setEditValues({ ...editValues, company: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
                placeholder="Company (optional)"
              />
              <input
                value={editValues.context}
                onChange={(e) => setEditValues({ ...editValues, context: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
                placeholder="Context (optional)"
              />
              <textarea
                value={editValues.message}
                onChange={(e) => setEditValues({ ...editValues, message: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => saveEdit(t)}
                  className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded-full border border-line px-4 py-2 text-xs text-ink/60"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                      t.approved ? "bg-teal/15 text-teal" : "bg-ink/10 text-ink/60"
                    }`}
                  >
                    {t.approved ? "Published" : "Pending review"}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">"{t.message}"</p>
                  <p className="mt-2 font-display text-sm text-ink">
                    {t.name}
                    {(t.company || t.context) && (
                      <span className="text-ink/50 font-body">
                        {" — "}
                        {[t.company, t.context].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-4 text-sm">
                <button onClick={() => toggleApproved(t)} className="text-teal hover:underline">
                  {t.approved ? "Unpublish" : "Approve & publish"}
                </button>
                <button onClick={() => startEdit(t)} className="text-ink/60 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  onBlur={() => setConfirmingDelete(null)}
                  className={confirmingDelete === t.id ? "text-red-600" : "text-ink/60 hover:text-red-600"}
                >
                  {confirmingDelete === t.id ? "Confirm delete?" : "Delete"}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
