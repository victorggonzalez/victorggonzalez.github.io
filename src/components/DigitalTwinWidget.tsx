"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bot, SendHorizonal, User2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hi, I am Victor's Digital Twin. Ask me about his experience, projects, skills, or education.",
  },
];

const STORAGE_KEY = "digital-twin-messages";
const DIGITAL_TWIN_API_BASE = process.env.NEXT_PUBLIC_DIGITAL_TWIN_API_URL?.replace(/\/+$/, "") ?? "";
const STARTER_PROMPTS = [
  "What impact did Victor have at Nexthink?",
  "Which technologies does Victor use most?",
  "Summarize Victor's current role in two bullets.",
];

function getDigitalTwinEndpoint() {
  if (!DIGITAL_TWIN_API_BASE) return "/api/digital-twin";
  if (DIGITAL_TWIN_API_BASE.endsWith("/api/digital-twin")) return DIGITAL_TWIN_API_BASE;
  return `${DIGITAL_TWIN_API_BASE}/api/digital-twin`;
}

export default function DigitalTwinWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Message[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      // Ignore invalid local storage payload.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const canSend = useMemo(() => !loading && input.trim().length > 0, [input, loading]);
  const hasUserMessages = useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages]
  );

  async function submitMessage(rawContent: string) {
    const question = rawContent.trim();
    if (!question || loading) return;
    setError("");
    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(getDigitalTwinEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const contentType = response.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? ((await response.json()) as { reply?: string; error?: string }) : null;

      if (!response.ok) {
        if (response.status === 405) {
          throw new Error(
            "Digital Twin is unavailable on this static deployment. Use a server-capable host (for example Vercel) for AI chat."
          );
        }
        throw new Error(data?.error ?? "Unable to get a response.");
      }
      if (!data?.reply) {
        throw new Error("Unable to get a response.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitMessage(input);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      {isOpen && (
        <section className="mb-3 w-[min(94vw,400px)] overflow-hidden rounded-2xl border border-cyan-200/20 bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur-md">
          <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2 text-zinc-100">
              <span className="flex size-6 items-center justify-center rounded-md bg-cyan-300/20 text-cyan-100">
                <Bot className="size-4" />
              </span>
              <p className="text-sm font-semibold">Digital Twin</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-zinc-400 transition hover:bg-white/10 hover:text-zinc-100"
              aria-label="Close Digital Twin"
            >
              <X className="size-4" />
            </button>
          </header>

          <div className="max-h-[390px] space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`}>
                <div
                  className={`mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-zinc-400 ${
                    message.role === "assistant" ? "" : "justify-end"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <>
                      <Bot className="size-3.5 text-cyan-200" />
                      <span>Digital Twin</span>
                    </>
                  ) : (
                    <>
                      <span>You</span>
                      <User2 className="size-3.5 text-zinc-300" />
                    </>
                  )}
                </div>
                <div className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[87%] rounded-2xl border p-3 ${
                      message.role === "assistant"
                        ? "border-cyan-200/20 bg-cyan-500/10 text-zinc-100"
                        : "border-cyan-300/30 bg-cyan-300/90 text-zinc-950"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="text-sm leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => (
                              <strong className="font-semibold text-white">{children}</strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
                            ),
                            li: ({ children }) => <li>{children}</li>,
                            code: ({ children }) => (
                              <code className="rounded bg-black/30 px-1 py-0.5 font-mono text-xs text-cyan-100">
                                {children}
                              </code>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-200 underline underline-offset-2"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
            {loading && (
              <div className="max-w-[87%] rounded-2xl border border-cyan-200/20 bg-cyan-500/10 p-3 text-sm text-zinc-300">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 animate-pulse rounded-full bg-zinc-300" />
                  <span className="size-1.5 animate-pulse rounded-full bg-zinc-300 [animation-delay:140ms]" />
                  <span className="size-1.5 animate-pulse rounded-full bg-zinc-300 [animation-delay:280ms]" />
                </span>
              </div>
            )}
          </div>

          {!hasUserMessages && !loading && (
            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 pb-2 pt-3">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitMessage(prompt)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-cyan-200/40 hover:bg-cyan-300/10"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="border-t border-white/10 p-3">
            <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-zinc-900/70 p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Victor's career..."
                className="max-h-24 min-h-11 w-full resize-y bg-transparent px-1 py-1 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <SendHorizonal className="size-4" />
              </button>
            </div>
            {error && <p className="text-xs text-red-300">{error}</p>}
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-cyan-400/90 text-zinc-950 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-300"
        aria-label={isOpen ? "Close Digital Twin chat" : "Open Digital Twin chat"}
      >
        <Bot className="size-6" />
      </button>
    </div>
  );
}
