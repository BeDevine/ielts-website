import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public, read-only: just the homepage visit total, for Bazzle's dashboard.
export const dynamic = "force-dynamic";

export async function GET() {
  const stat = await db.siteStat
    .findUnique({ where: { id: "main" } })
    .catch(() => null);
  return NextResponse.json(
    { visits: stat?.count ?? 0, at: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
