import { Message } from "@/types";
import { IconArrowUp } from "@tabler/icons-react";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Props {
  onSend: (message: Message) => void;
  disabled?: boolean;
}

export const ChatInput: FC<Props> = ({ onSend, disabled = false }) => {
  const [content, setContent] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      return;
    }
    setContent(value);
  };

  const handleSend = () => {
    if (disabled) return;
    const trimmed = content.trim();
    if (!trimmed) {
      textareaRef.current?.focus();
      return;
    }
    onSend({ role: "user", content: trimmed });
    setContent("");
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = "auto";
      const h = Math.min(textareaRef.current.scrollHeight, 180);
      textareaRef.current.style.height = `${Math.max(h, 52)}px`;
    }
  }, [content]);

  // Desktop: focus the composer on load so typing starts instantly.
  // Skipped on touch devices to avoid popping the mobile keyboard.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      textareaRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const count = content.length;
  const nearLimit = count > 3500;

  return (
    <div
      className={`rounded-[20px] border bg-white shadow-sacred transition ${
        disabled
          ? "border-ink-900/10"
          : "border-ink-900/15 focus-within:border-gold-600 focus-within:ring-2 focus-within:ring-gold-500/40"
      }`}
    >
      <div className="flex items-end gap-2 p-2.5 pl-4">
        <textarea
          ref={textareaRef}
          className="max-h-[180px] min-h-[52px] flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-relaxed text-ink-950 placeholder:text-[#6f6e8a]"
          style={{ resize: "none" }}
          placeholder={disabled ? "Rabbi Eliyahu is reflecting…" : "Ask about Torah, halacha, hashkafa, tefillah…"}
          value={content}
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Message Rabbi Eliyahu"
        />

        <button
          onClick={handleSend}
          disabled={disabled || !content.trim()}
          aria-label="Send message"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-200 ${
            disabled || !content.trim()
              ? "cursor-not-allowed bg-ink-900/[0.08] text-ink-900/40"
              : "bg-gradient-to-b from-gold-400 to-gold-600 text-ink-950 shadow-glow ring-1 ring-gold-700/30 hover:brightness-105 hover:scale-105 active:scale-95"
          }`}
        >
          <IconArrowUp size={20} stroke={2.5} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-ink-900/10 px-4 py-2">
        <span className="hidden text-[11.5px] text-[#5b5878] sm:inline">
          <kbd className="rounded-md border border-ink-900/20 bg-ink-900/[0.05] px-1.5 py-0.5 font-sans text-[10.5px] font-bold text-ink-900">
            Enter
          </kbd>{" "}
          to send ·{" "}
          <kbd className="rounded-md border border-ink-900/20 bg-ink-900/[0.05] px-1.5 py-0.5 font-sans text-[10.5px] font-bold text-ink-900">
            Shift + Enter
          </kbd>{" "}
          for new line
        </span>
        <span className="text-[11.5px] text-[#5b5878] sm:hidden">Enter ↵ to send</span>
        <span className={`text-[11.5px] tabular-nums ${nearLimit ? "font-bold text-red-700" : "text-[#5b5878]"}`}>
          {count}/4000
        </span>
      </div>
    </div>
  );
};
