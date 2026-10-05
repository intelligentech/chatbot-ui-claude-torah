import { IconLock } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-8 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3.5 py-1.5 text-[12.5px] font-semibold text-emerald-100 backdrop-blur">
          <IconLock size={13} />
          Private by design — chats are never saved or recorded
        </div>

        <p className="font-serif max-w-xl text-[13.5px] italic leading-relaxed text-white/80">
          For educational and inspirational purposes only. For matters of practical halacha and personal guidance, please consult a qualified Orthodox rabbi.
        </p>

        <p className="max-w-xl text-[13px] leading-relaxed text-white/70">
          If no response arrives within 30 seconds, the AI provider may be down or funding may be depleted. Help keep Rabbi Eliyahu alive —{" "}
          <a
            href="https://ko-fi.com/askjudaism"
            className="font-bold text-gold-200 underline decoration-gold-400/50 underline-offset-4 transition hover:text-gold-100"
          >
            Ko-Fi.com/AskJudaism
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-semibold">
          <span className="font-medium text-white/60">© 2026 AskJudaism.com</span>
          <span
            aria-hidden
            className="h-3 w-px bg-white/25"
          />
          <a
            href="https://eliyahu.chat"
            className="text-gold-200 transition hover:text-gold-100 hover:underline hover:underline-offset-4"
          >
            Eliyahu.chat
          </a>
          <span
            aria-hidden
            className="h-3 w-px bg-white/25"
          />
          <a
            href="https://lawsofnoah.com"
            className="text-gold-200 transition hover:text-gold-100 hover:underline hover:underline-offset-4"
          >
            7 Laws of Noah
          </a>
        </div>
      </div>
    </footer>
  );
};
