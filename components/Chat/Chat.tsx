import { Message } from "@/types";
import { IconFlame } from "@tabler/icons-react";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
  onSuggestion: (text: string) => void;
}

const SUGGESTIONS = [
  { emoji: "🕯️", label: "Meaning of Shabbat", prompt: "What is the deeper meaning of Shabbat and how can I experience it more fully?" },
  { emoji: "📜", label: "What is Teshuva?", prompt: "Can you explain the concept of teshuva and how to begin the process?" },
  { emoji: "🙏", label: "How to pray", prompt: "How should I approach prayer when my heart feels distant?" },
  { emoji: "✨", label: "Parshat HaShavua", prompt: "Share a short inspiring teaching from the weekly Torah portion." },
];

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset, onSuggestion }) => {
  const showWelcome = messages.length <= 1;

  return (
    <div className="glass-edge overflow-hidden rounded-[28px] border border-white/40 bg-parchment-100/85 shadow-sacred backdrop-blur-2xl">
      {/* Card header */}
      <div className="flex items-center justify-between gap-3 border-b border-gold-500/20 bg-gradient-to-r from-white/70 via-parchment-50/80 to-white/70 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[13px] font-medium text-ink-900/70">
            Rabbi Eliyahu is <span className="font-semibold text-emerald-700">present</span>
            <span className="mx-1.5 text-ink-900/25">·</span>
            <span className="hidden sm:inline">Havruta companion · PaRDeS learning</span>
            <span className="sm:hidden">Online</span>
          </span>
        </div>
        <ResetChat onReset={onReset} />
      </div>

      {/* Welcome hero */}
      {showWelcome && (
        <div className="relative overflow-hidden border-b border-gold-500/15 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-800 px-5 pb-7 pt-8 text-center sm:px-8">
          <div className="hebrew-watermark absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[110px] font-black tracking-tight sm:text-[150px]">
            תורה אור
          </div>
          <div className="relative">
            <div className="mx-auto mb-4 flex h-16 w-16 animate-[floatY_6s_ease-in-out_infinite] items-center justify-center rounded-3xl bg-gradient-to-br from-gold-200 via-gold-400 to-gold-700 text-[32px] shadow-glow ring-1 ring-white/40">
              ✡️
            </div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-300">
              בס״ד · With Heaven&apos;s Help
            </p>
            <h2 className="font-serif mx-auto max-w-md text-[28px] font-bold leading-tight text-parchment-50 sm:text-[34px]">
              Shalom aleichem, dear soul
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-[14.5px] leading-relaxed text-white/65">
              I am <span className="font-semibold text-gold-200">Rabbi Eliyahu</span> — your havruta in Torah, prayer, and life&apos;s deeper questions. What is on your heart today?
            </p>

            <div className="mx-auto mt-5 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => onSuggestion(s.prompt)}
                  disabled={loading}
                  className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-left backdrop-blur transition hover:border-gold-400/50 hover:bg-gold-500/15 active:scale-[0.98] disabled:opacity-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[17px] transition group-hover:scale-110">
                    {s.emoji}
                  </span>
                  <span className="text-[13.5px] font-medium text-white/85 group-hover:text-white">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="sacred-scroll max-h-[62vh] min-h-[320px] overflow-y-auto px-4 py-6 sm:px-6">
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
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
              <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-gold-700/70">
                <IconFlame size={12} />
                Torah is eternal dialogue
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* Input dock */}
      <div className="border-t border-gold-500/20 bg-gradient-to-b from-white/60 to-parchment-200/90 px-3 pb-3 pt-3 backdrop-blur sm:px-5 sm:pb-4">
        <ChatInput
          onSend={onSend}
          disabled={loading}
        />
      </div>
    </div>
  );
};
