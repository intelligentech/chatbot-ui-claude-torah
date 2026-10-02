import { Message } from "@/types";
import { IconCheck, IconCopy, IconUser } from "@tabler/icons-react";
import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";

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
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-800/50">
            You
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-ink-700 to-ink-950 text-white shadow">
            <IconUser size={13} />
          </span>
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-gradient-to-br from-ink-800 via-ink-900 to-[#2a1e63] px-4 py-3 text-white shadow-card sm:max-w-[75%]">
          <div className="sacred-prose sacred-prose-light whitespace-pre-wrap text-[15px] leading-relaxed">
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
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-parchment-50 via-gold-200 to-gold-500 text-[18px] shadow-card ring-1 ring-gold-600/30">
            ✡️
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-parchment-100 bg-emerald-500" />
        </div>
        <div className="mt-1.5 w-px flex-1 bg-gradient-to-b from-gold-500/40 to-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="font-serif text-[14px] font-bold text-ink-900">
            Rabbi Eliyahu
          </span>
          <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-700 ring-1 ring-gold-500/25">
            Torah Companion
          </span>
        </div>

        <div className="relative rounded-2xl rounded-tl-md border border-gold-500/20 bg-parchment-50/95 px-4 py-3.5 shadow-card backdrop-blur">
          {/* top gold accent */}
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <div
            dir="auto"
            className="sacred-prose"
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
            className="absolute -bottom-2 right-3 flex items-center gap-1 rounded-full border border-ink-900/10 bg-white px-2.5 py-1 text-[11px] font-medium text-ink-800/60 opacity-0 shadow-sm transition group-hover:opacity-100 hover:text-ink-900 hover:opacity-100"
          >
            {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};
