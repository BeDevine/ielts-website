import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

// Anything that identifies itself as automated is ignored
const BOT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|fetch|curl|wget|python|java\/|go-http|httpclient|axios|headless|lighthouse|pagespeed|vercel|monitor|scan|uptime|checker/i;

export async function POST(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const isBot = !userAgent || BOT_PATTERN.test(userAgent);
  const isTeacher = Boolean(req.cookies.get(SESSION_COOKIE_NAME)?.value);

  if (!isBot && !isTeacher) {
    await db.siteStat
      .upsert({
        where: { id: "main" },
        update: { count: { increment: 1 } },
        create: { id: "main", count: 1 },
      })
      .catch(() => {});
  }

  return new NextResponse(null, { status: 204 });
}
