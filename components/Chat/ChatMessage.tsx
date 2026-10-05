import { Message } from "@/types";
import { IconCheck, IconCopy, IconUser } from "@tabler/icons-react";
import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import { StarMark } from "../Layout/StarMark";

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, isLast }) => {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === "assistant";

  const processedContent = message.content.replace(/\[([^\]]*)\]/g, "**[$1]**");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  if (!isAssistant) {
    // ——— USER: sapphire bubble, right aligned ———
    return (
      <div className="animate-fadeIn flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-2 pr-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b5878]">You</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-ink-700 to-ink-950 text-white shadow">
            <IconUser size={13} />
          </span>
        </div>
        <div
          dir="auto"
          className="max-w-[85%] rounded-2xl rounded-tr-md bg-gradient-to-br from-ink-700 via-ink-900 to-[#2a1e63] px-4 py-3 text-white shadow-card ring-1 ring-ink-950/20 sm:max-w-[75%]"
        >          <div className="sacred-prose sacred-prose-light whitespace-pre-wrap text-[15px] leading-relaxed">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  // ——— ASSISTANT: parchment scroll card ———
  return (
    <div className="animate-fadeIn group flex gap-3">
      {/* Avatar rail */}
      <div className="flex shrink-0 flex-col items-center">
        <StarMark
          size="h-9 w-9"
          circular
        />
        <div className="mt-1.5 w-px flex-1 bg-gradient-to-b from-gold-600/40 to-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="font-serif text-[14.5px] font-bold text-ink-950">Rabbi Eliyahu</span>
          <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6e5614] ring-1 ring-gold-600/30">
            Torah Companion
          </span>
        </div>

        <div className="relative rounded-2xl rounded-tl-md border border-gold-600/25 bg-parchment-50 px-4 py-3.5 shadow-card">
          {/* top gold accent */}
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-600/50 to-transparent" />
          <div
            // Base direction is LTR: responses open with Hebrew ("בעזרת השם")
            // but are predominantly English, so the block must stay left-aligned.
            // Inline Hebrew phrases still order correctly via the bidi algorithm.
            dir="ltr"
            className="sacred-prose text-left"
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <p>{children}</p>,
              }}
            >
              {processedContent}
            </ReactMarkdown>
          </div>

          {/* copy action */}
          <button
            onClick={handleCopy}
            title="Copy response"
            aria-label="Copy response"
            className="absolute -bottom-2 right-3 flex items-center gap-1 rounded-full border border-ink-900/15 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#5b5878] opacity-0 shadow-sm transition hover:text-ink-950 focus-visible:opacity-100 group-hover:opacity-100"
          >
            {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};
