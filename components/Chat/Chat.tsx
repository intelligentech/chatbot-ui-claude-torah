import { Message } from "@/types";
import {
  IconArrowDown,
  IconBook,
  IconChevronRight,
  IconFlame,
  IconHeartHandshake,
  IconMoon,
} from "@tabler/icons-react";
import { FC, useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";
import { StarMark } from "../Layout/StarMark";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
  onSuggestion: (text: string) => void;
}

const SUGGESTIONS = [
  {
    icon: IconFlame,
    label: "Meaning of Shabbat",
    prompt: "What is the deeper meaning of Shabbat and how can I experience it more fully?",
  },
  {
    icon: IconHeartHandshake,
    label: "What is Teshuva?",
    prompt: "Can you explain the concept of teshuva and how to begin the process?",
  },
  {
    icon: IconMoon,
    label: "How to pray",
    prompt: "How should I approach prayer when my heart feels distant?",
  },
  {
    icon: IconBook,
    label: "Parshat HaShavua",
    prompt: "Share a short inspiring teaching from the weekly Torah portion.",
  },
];

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset, onSuggestion }) => {
  const showWelcome = messages.length <= 1;
  const listRef = useRef<HTMLDivElement>(null);
  const [stickToBottom, setStickToBottom] = useState(true);

  const scrollToBottom = (smooth = false) => {
    const el = listRef.current;
    if (!el) return;
    if (smooth) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  const handleListScroll = () => {
    const el = listRef.current;
    if (!el) return;
    setStickToBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 120);
  };

  // Follow the conversation only while the reader is parked at the bottom,
  // so streaming tokens never yank someone re-reading history.
  useEffect(() => {
    if (stickToBottom) scrollToBottom();
  }, [messages, loading, stickToBottom]);

  return (
    <div className="glass-edge relative overflow-hidden rounded-[28px] border border-white/40 bg-parchment-100 shadow-sacred backdrop-blur-2xl">
      {/* Card header */}
      <div className="flex items-center justify-between gap-3 border-b border-gold-600/25 bg-gradient-to-r from-white via-parchment-50 to-white px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
          </span>
          <span className="truncate text-[13px] font-medium text-ink-800">
            Rabbi Eliyahu is <span className="font-bold text-emerald-800">present</span>
            <span className="mx-1.5 text-ink-900/40">·</span>
            <span className="hidden sm:inline">Havruta companion · PaRDeS learning</span>
            <span className="sm:hidden">Online</span>
          </span>
        </div>
        <ResetChat onReset={onReset} />
      </div>

      {/* Welcome hero */}
      {showWelcome && (
        <div className="relative overflow-hidden border-b border-gold-600/20 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-800 px-5 pb-7 pt-8 text-center sm:px-8">
          <div className="hebrew-watermark absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[110px] font-black tracking-tight sm:text-[150px]">
            תורה אור
          </div>
          <div className="relative">
            <div className="mb-4 flex justify-center">
              <StarMark size="h-16 w-16" />
            </div>
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-gold-200">
              בס״ד · With Heaven&apos;s Help
            </p>
            <h2 className="font-serif mx-auto max-w-md text-[28px] font-bold leading-tight text-white sm:text-[34px]">
              Shalom aleichem, dear soul
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-white/85">
              I am <span className="font-bold text-gold-100">Rabbi Eliyahu</span> — your havruta in Torah, prayer, and life&apos;s deeper questions. What is on your heart
              today?
            </p>

            <div className="mx-auto mt-5 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => onSuggestion(s.prompt)}
                  disabled={loading}
                  className="group flex min-h-[48px] items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-left backdrop-blur transition hover:border-gold-300/60 hover:bg-gold-400/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-400/20 text-gold-100 ring-1 ring-gold-300/30 transition group-hover:scale-110">
                    <s.icon size={17} />
                  </span>
                  <span className="flex-1 text-[13.5px] font-semibold text-white">{s.label}</span>
                  <IconChevronRight
                    size={15}
                    className="shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-gold-200"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        ref={listRef}
        onScroll={handleListScroll}
        className="sacred-scroll max-h-[62vh] min-h-[320px] overflow-y-auto px-4 py-6 sm:px-6"
      >
        <div className="flex flex-col gap-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isLast={index === messages.length - 1}
            />
          ))}

          {loading && <ChatLoader />}

          {!loading && !showWelcome && (
            <div className="flex items-center gap-3 pt-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-600/40 to-transparent" />
              <span className="flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-gold-700">
                <IconFlame size={13} />
                Torah is eternal dialogue
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-600/40 to-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* Jump to latest */}
      {!stickToBottom && messages.length > 1 && (
        <button
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-gold-600/40 bg-ink-950/95 px-4 py-2 text-[12.5px] font-semibold text-gold-100 shadow-sacred backdrop-blur transition hover:bg-ink-800 active:scale-95"
        >
          <IconArrowDown size={14} />
          Latest message
        </button>
      )}

      {/* Input dock */}
      <div className="border-t border-gold-600/25 bg-gradient-to-b from-white to-parchment-200 px-3 pb-3 pt-3 sm:px-5 sm:pb-4">
        <ChatInput
          onSend={onSend}
          disabled={loading}
        />
      </div>
    </div>
  );
};
