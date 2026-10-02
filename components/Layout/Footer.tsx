import { IconLock } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-8 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3.5 py-1.5 text-[12.5px] font-medium text-emerald-200 backdrop-blur">
          <IconLock size={13} />
          Private by design — chats are never saved or recorded
        </div>

        <p className="font-serif max-w-xl text-[13px] italic leading-relaxed text-white/55">
          For educational and inspirational purposes only. For matters of practical halacha and personal guidance, please consult a qualified Orthodox rabbi.
        </p>

        <p className="text-[12.5px] leading-relaxed text-white/40">
          If no response arrives within 30 seconds, the AI provider may be down or funding may be depleted. Help keep Rabbi Eliyahu alive —{" "}
          <a
            href="https://ko-fi.com/askjudaism"
            className="font-semibold text-gold-300 underline decoration-gold-500/40 underline-offset-4 transition hover:text-gold-200"
          >
            Ko-Fi.com/AskJudaism
          </a>
        </p>

        <div className="flex items-center gap-3 text-[13px] font-medium">
          <span className="text-white/35">© 2026 AskJudaism.com</span>
          <span className="h-3 w-px bg-white/20" />
          <a
            href="https://eliyahu.chat"
            className="text-gold-300/90 transition hover:text-gold-200"
          >
            Eliyahu.chat
          </a>
          <span className="h-3 w-px bg-white/20" />
          <a
            href="https://lawsofnoah.com"
            className="text-gold-300/90 transition hover:text-gold-200"
          >
            7 Laws of Noah
          </a>
        </div>
      </div>
    </footer>
  );
};
