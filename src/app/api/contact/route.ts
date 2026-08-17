import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, targetBand, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Email isn't configured yet. Set RESEND_API_KEY and CONTACT_TO_EMAIL." },
      { status: 500 }
    );
  }

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `IELTS site <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `New lesson inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        targetBand ? `Target band: ${targetBand}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!emailRes.ok) {
    const detail = await emailRes.text().catch(() => "");
    console.error("Resend error:", detail);
    return NextResponse.json({ error: "Couldn't send that message. Try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
