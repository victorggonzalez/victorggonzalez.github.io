import type { IncomingHttpHeaders } from "http";
import { getDigitalTwinSystemPrompt } from "../src/lib/digitalTwinContext";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ServerlessRequest = {
  method?: string;
  headers: IncomingHttpHeaders;
  body?: unknown;
};

type ServerlessResponse = {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => {
    json: (payload: unknown) => void;
    end: () => void;
  };
};

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 1500;

function applyCors(res: ServerlessResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "OPENROUTER_API_KEY is missing in environment variables." });
      return;
    }

    const body = (req.body ?? {}) as { messages?: ChatMessage[] };
    const incomingMessages = (body.messages ?? []).filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        m.content.length <= MAX_CONTENT_LENGTH
    );

    if (!incomingMessages.length) {
      res.status(400).json({ error: "At least one message is required." });
      return;
    }

    if (incomingMessages.length > MAX_MESSAGES) {
      res.status(400).json({ error: `Too many messages. Maximum is ${MAX_MESSAGES}.` });
      return;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        messages: [{ role: "system", content: getDigitalTwinSystemPrompt() }, ...incomingMessages],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter request failed", {
        status: response.status,
        body: errorText.slice(0, 500),
      });
      res.status(502).json({ error: "Digital Twin service is temporarily unavailable. Please try again." });
      return;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      res.status(502).json({ error: "No response from model." });
      return;
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Digital Twin serverless handler error", error);
    res.status(500).json({ error: "Unexpected server error while processing your request." });
  }
}
