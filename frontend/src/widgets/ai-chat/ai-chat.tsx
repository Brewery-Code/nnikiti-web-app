import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { i18n } from "@/shared/i18n";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { createMessage, requestAssistantReply, type ChatMessage } from "./model";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function BotIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="8" width="18" height="12" rx="3" />
      <path d="M12 8V4M8 2h8" />
      <circle cx="8.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white">
          <BotIcon size={14} />
        </span>
      )}
      <div
        className={
          isUser
            ? "max-w-[78%] rounded-2xl rounded-br-md bg-gradient-to-br from-violet-500 to-blue-500 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
            : "max-w-[82%] rounded-2xl rounded-bl-md border border-ui-sm bg-surface-lg px-3.5 py-2.5 text-[13.5px] leading-relaxed text-primary/90"
        }
      >
        {message.text}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white">
        <BotIcon size={14} />
      </span>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-ui-sm bg-surface-lg px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-violet-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

export function AiChat() {
  useLoadNamespace("aiChat", loadTranslations);
  const { t } = useTranslation("aiChat");

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const rawSuggestions = t("suggestions", { returnObjects: true });
  const suggestions: string[] = Array.isArray(rawSuggestions) ? rawSuggestions : [];

  // Seed the greeting the first time the panel opens.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([createMessage("assistant", t("greeting"))]);
    }
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(id);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || isTyping) return;
    setMessages((m) => [...m, createMessage("user", text)]);
    setInput("");
    setIsTyping(true);
    const reply = await requestAssistantReply(text, i18n.language);
    setMessages((m) => [...m, createMessage("assistant", reply)]);
    setIsTyping(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={t("title")}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.34, ease: EASE }}
            style={{ transformOrigin: "bottom right" }}
            className="dark-context grad-border flex h-[min(70dvh,580px)] max-h-[calc(100dvh-6.5rem)] w-[min(384px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[22px] bg-ink-900/95 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-ui-sm px-4 py-3.5">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(166,132,255,0.10), rgba(81,162,255,0.06))" }}
              />
              <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-[0_4px_14px_rgba(166,132,255,0.4)]">
                <BotIcon size={18} />
              </span>
              <div className="relative min-w-0 flex-1">
                <p className="font-display truncate text-[15px] font-bold leading-tight text-primary">
                  {t("title")}
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#34d399" }} />
                  {t("status")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="relative flex h-8 w-8 items-center justify-center rounded-full text-primary/60 transition-colors hover:bg-surface-md hover:text-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="scrollbar-hidden flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            {/* Suggestions (only before the user has written anything) */}
            {messages.length <= 1 && !isTyping && suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 px-4 pb-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-ui bg-surface-md px-3 py-1.5 text-[12px] text-primary/80 transition-colors hover:bg-surface-xl hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-ui-sm p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                className="placeholder-muted min-w-0 flex-1 rounded-[12px] border border-ui-sm bg-surface-md px-3.5 py-2.5 text-[16px] text-primary outline-none transition-colors focus:border-violet-500/60 sm:text-[13.5px]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label={t("send")}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-[0_4px_16px_rgba(166,132,255,0.35)] transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        whileTap={{ scale: 0.9 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-[0_8px_30px_rgba(139,92,246,0.45)] transition-shadow hover:shadow-[0_10px_38px_rgba(139,92,246,0.62)]"
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 0 rgba(166,132,255,0.55)", animation: "glow-pulse 3.5s ease-in-out infinite" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <BotIcon size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
