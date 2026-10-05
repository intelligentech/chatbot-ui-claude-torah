import { IconHeartHandshake, IconScale, IconSparkles } from "@tabler/icons-react";
import { FC } from "react";
import { StarMark } from "./StarMark";

export const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/20 bg-ink-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        {/* Brand */}
        <a
          href="https://eliyahu.chat"
          className="group flex items-center gap-3 rounded-xl"
          aria-label="Eliyahu.chat home"
        >
          <span className="relative transition-transform duration-300 group-hover:scale-105">
            <StarMark size="h-11 w-11" />
            <span
              aria-hidden
              className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-ink-950 bg-emerald-400"
            />
          </span>
          <span className="leading-none">
            <span className="flex items-center gap-2">
              <span className="font-serif text-[22px] font-bold tracking-tight text-white">
                Eliyahu<span className="text-gold-200">.chat</span>
              </span>
              <span className="hidden rounded-full border border-gold-400/40 bg-gold-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-100 sm:inline-block">
                v5.2 Adar 5786
              </span>
            </span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
              An AskJudaism.org Project
            </span>
          </span>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://lawsofnoah.com"
            className="hidden items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:border-gold-200/70 hover:bg-white/15 hover:text-gold-100 active:scale-95 md:flex"
          >
            <IconScale size={15} />
            7 Laws of Noah
          </a>
          <a
            href="https://ko-fi.com/askjudaism"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-4 py-2 text-[13px] font-bold text-ink-950 shadow-glow ring-1 ring-white/30 transition hover:brightness-105 active:scale-95"
          >
            <IconHeartHandshake size={16} stroke={2.2} />
            <span className="hidden sm:inline">Sustain Torah</span>
            <span className="sm:hidden">Donate</span>
          </a>
        </div>
      </div>
      {/* gold hairline glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-1.5 text-[12.5px] font-medium text-white/70">
        <IconSparkles
          size={13}
          className="shrink-0 text-gold-300"
        />
        <span className="tracking-wide">Where timeless Torah wisdom meets seeking souls</span>
        <span
          aria-hidden
          className="text-white/25 md:hidden"
        >
          ·
        </span>
        <a
          href="https://lawsofnoah.com"
          className="font-semibold text-gold-200 transition hover:text-gold-100 hover:underline hover:underline-offset-4 md:hidden"
        >
          7 Laws of Noah
        </a>
      </div>
    </header>
  );
};
