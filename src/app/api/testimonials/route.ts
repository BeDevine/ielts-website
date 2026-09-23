import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const testimonials = await db.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const { name, company, context, message } = await req.json();

  if (!name || !message) {
    return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
  }

  const testimonial = await db.testimonial.create({
    data: { name, company: company || null, context: context || null, message, approved: false },
  });

  return NextResponse.json(testimonial, { status: 201 });
}
