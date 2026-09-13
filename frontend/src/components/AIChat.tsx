import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatedAvatar } from "./AnimatedAvatar";
import type { AvatarAnimState } from "./JashAvatar";
import { API_URL, cn } from "../lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What technologies does Jash use?",
  "Tell me about Jash's projects.",
  "What is Jash's focus area?",
  "How can I get in touch with Jash?",
];

function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="chat-markdown text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-ink-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-blue underline underline-offset-2 hover:text-accent-violet"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
          li: ({ children }) => <li className="pl-0.5">{children}</li>,
          h1: ({ children }) => <h4 className="mb-1.5 mt-2 text-[15px] font-semibold text-ink-900 first:mt-0">{children}</h4>,
          h2: ({ children }) => <h4 className="mb-1.5 mt-2 text-[15px] font-semibold text-ink-900 first:mt-0">{children}</h4>,
          h3: ({ children }) => <h4 className="mb-1.5 mt-2 text-sm font-semibold text-ink-900 first:mt-0">{children}</h4>,
          code: ({ children, className }) => {
            const isBlock = /language-/.test(className || "");
            return isBlock ? (
              <code className="my-2 block overflow-x-auto rounded-lg bg-ink-900/[0.08] p-3 font-mono text-[12.5px] text-ink-900">
                {children}
              </code>
            ) : (
              <code className="rounded bg-ink-900/[0.08] px-1.5 py-0.5 font-mono text-[12.5px] text-ink-900">
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-accent-blue/40 pl-3 italic text-ink-500">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-3 border-ink-900/10" />,
          table: ({ children }) => (
            <div className="my-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-ink-900/10 bg-ink-900/[0.04] px-2 py-1 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="border border-ink-900/10 px-2 py-1">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function AIChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Jash's AI assistant. Ask me about his projects, skills, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [error, setError] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<number>(0);

  // Derive avatar animation state from chat state
  const avatarState: AvatarAnimState = isStreaming
    ? "speaking"
    : isTyping
    ? "thinking"
    : isUserTyping
    ? "listening"
    : "idle";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Track user typing activity
  function handleInputChange(value: string) {
    setInput(value);
    setIsUserTyping(true);
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = window.setTimeout(() => {
      setIsUserTyping(false);
    }, 1500);
  }

  async function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;
    setError("");
    setIsUserTyping(false);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);
    setIsStreaming(false);

    // Placeholder assistant message
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "The assistant is unavailable right now.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload);
            const delta: string =
              parsed?.choices?.[0]?.delta?.content ??
              parsed?.choices?.[0]?.message?.content ??
              parsed?.content ??
              "";
            if (delta) {
              if (!isStreaming) setIsStreaming(true);
              full += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: full };
                return copy;
              });
            }
          } catch {
            // ignore malformed chunk
          }
        }
      }

      if (!full) {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "I couldn't generate a response just now — please try again in a moment.",
          };
          return copy;
        });
      }
    } catch (err) {
      setMessages((m) => m.slice(0, -1));
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label={open ? "Close AI chat" : "Chat with Jash's AI assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-glow-blue"
        style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="text-xl"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="orb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <AnimatedAvatar size={40} ring={false} animState={avatarState} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="apple-glass fixed bottom-24 right-4 z-50 flex h-[min(600px,70vh)] w-[min(400px,92vw)] flex-col overflow-hidden rounded-3xl shadow-2xl"
            role="dialog"
            aria-label="Chat with Jash's AI assistant"
          >
            <div className="flex items-center gap-3 border-b border-ink-900/[0.06] px-5 py-4">
              <AnimatedAvatar size={42} animState={avatarState} />
              <div>
                <p className="text-sm font-semibold text-ink-900 flex items-center gap-1.5">
                  Ask Jash{" "}
                  <span
                    className={cn(
                      "inline-block h-2 w-2 rounded-full",
                      avatarState === "speaking"
                        ? "bg-blue-500 animate-pulse"
                        : avatarState === "thinking"
                        ? "bg-amber-500 animate-pulse"
                        : avatarState === "listening"
                        ? "bg-violet-500 animate-pulse"
                        : "bg-emerald-500 animate-pulse"
                    )}
                  />
                </p>
                <p className="text-xs text-ink-400">
                  {avatarState === "speaking"
                    ? "Speaking..."
                    : avatarState === "thinking"
                    ? "Thinking..."
                    : avatarState === "listening"
                    ? "Listening..."
                    : "AI Assistant · Online"}
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain touch-pan-y px-5 py-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex items-end gap-2", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  {m.role === "assistant" && (
                    <AnimatedAvatar
                      size={26}
                      ring={false}
                      breathe={false}
                      animState={
                        i === messages.length - 1 && m.role === "assistant"
                          ? avatarState
                          : "idle"
                      }
                    />
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5",
                      m.role === "user"
                        ? "bg-ink-900 text-sm leading-relaxed text-white"
                        : "bg-ink-900/[0.05] text-ink-700"
                    )}
                  >
                    {m.content ? (
                      m.role === "assistant" ? (
                        <MarkdownMessage content={m.content} />
                      ) : (
                        m.content
                      )
                    ) : (
                      <span className="flex gap-1 py-0.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400 [animation-delay:-0.2s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400 [animation-delay:0.2s]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {error && <p className="text-center text-xs text-red-500">{error}</p>}
            </div>

            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 px-5 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-xs font-medium text-ink-500 hover:border-accent-blue/40 hover:text-accent-blue"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink-900/[0.06] p-3">
              <input
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Ask something…"
                className="flex-1 rounded-full border border-ink-900/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent-blue"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
