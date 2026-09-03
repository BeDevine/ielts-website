import { NextRequest, NextResponse } from "next/server";

type WritingResponse = { prompt: string; text: string };
type SpeakingResponse = { prompt: string; transcript: string };

export async function POST(req: NextRequest) {
  const { writingResponses, speakingResponses } = (await req.json()) as {
    writingResponses: WritingResponse[];
    speakingResponses: SpeakingResponse[];
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Assessment isn't configured yet. Set ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  const writingText = writingResponses
    .map((r, i) => `Prompt ${i + 1}: ${r.prompt}\nResponse: ${r.text || "(no response given)"}`)
    .join("\n\n");

  const speakingText = speakingResponses
    .map((r, i) => `Prompt ${i + 1}: ${r.prompt}\nTranscript: ${r.transcript || "(no response captured)"}`)
    .join("\n\n");

  const systemPrompt = `You are assessing informal IELTS practice responses for a lead-generation quiz on a coaching website. Be encouraging but honest. You are working from TEXT ONLY:
- For writing responses, assess grammatical range/accuracy, vocabulary, and coherence as you would for IELTS Writing, on a 1-9 band scale.
- For speaking responses, you only have a TEXT TRANSCRIPT (from speech recognition) — you cannot assess pronunciation, intonation, or fluency of delivery. Assess only grammatical range, vocabulary, and coherence visible in the transcript, on a 1-9 band scale, and note in the feedback that this is a text-only estimate.
Respond ONLY with valid JSON, no other text, no markdown fences, in this exact shape:
{"writingBand": <number 1-9, one decimal>, "writingFeedback": "<2-3 sentences>", "speakingBand": <number 1-9, one decimal>, "speakingFeedback": "<2-3 sentences, must mention this is text-only and doesn't assess pronunciation>"}`;

  const userPrompt = `WRITING RESPONSES:\n${writingText || "(none provided)"}\n\nSPEAKING TRANSCRIPTS:\n${speakingText || "(none provided)"}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Anthropic API error:", detail);
      return NextResponse.json({ error: "Assessment failed. Try again shortly." }, { status: 502 });
    }

    const data = await res.json();
    const rawText = data.content?.[0]?.text || "{}";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Assessment error:", err);
    return NextResponse.json({ error: "Assessment failed. Try again shortly." }, { status: 502 });
  }
}
