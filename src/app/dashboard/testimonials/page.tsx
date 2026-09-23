import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import TestimonialsAdmin from "./testimonials-admin";

export const metadata: Metadata = {
  title: "Testimonials | Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = testimonials.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
  }));

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
        <h1 className="font-display text-2xl text-ink">Testimonials</h1>
        <p className="mt-2 text-sm text-ink/60">
          Approve, edit, or delete testimonials submitted through the public page.
        </p>
        <TestimonialsAdmin testimonials={serialized} />
      </section>
    </main>
  );
}
