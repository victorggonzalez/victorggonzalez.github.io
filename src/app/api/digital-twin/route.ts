import { NextResponse } from "next/server";
import { getDigitalTwinSystemPrompt } from "@/lib/digitalTwinContext";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 1500;

export async function POST(req: Request) {
  try {
    const systemPrompt = getDigitalTwinSystemPrompt();
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is missing in environment variables." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const incomingMessages = (body.messages ?? []).filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        m.content.length <= MAX_CONTENT_LENGTH
    );

    if (!incomingMessages.length) {
      return NextResponse.json({ error: "At least one message is required." }, { status: 400 });
    }
    if (incomingMessages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: `Too many messages. Maximum is ${MAX_MESSAGES}.` },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        messages: [
          { role: "system", content: systemPrompt },
          ...incomingMessages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter request failed", {
        status: response.status,
        body: errorText.slice(0, 500),
      });
      return NextResponse.json(
        { error: "Digital Twin service is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: "No response from model." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Digital Twin route error", error);
    return NextResponse.json(
      { error: "Unexpected server error while processing your request." },
      { status: 500 }
    );
  }
}
