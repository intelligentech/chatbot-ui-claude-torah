import { IconHeartHandshake, IconSparkles } from "@tabler/icons-react";
import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/20 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        {/* Brand */}
        <a
          href="https://eliyahu.chat"
          className="group flex items-center gap-3"
        >
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-[22px] shadow-glow ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              ✡️
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-ink-950">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[22px] font-bold tracking-tight text-parchment-50">
                Eliyahu<span className="text-gold-300">.chat</span>
              </span>
              <span className="hidden rounded-full border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-200 sm:inline-block">
                v5.2 Adar 5786
              </span>
            </div>
            <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/50">
              An AskJudaism.org Project
            </div>
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://lawsofnoah.com"
            className="hidden rounded-full px-3 py-2 text-[13px] font-medium text-white/70 transition hover:bg-white/10 hover:text-white md:block"
          >
            7 Laws of Noah
          </a>
          <a
            href="https://ko-fi.com/askjudaism"
            className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-2 text-[13px] font-semibold text-ink-950 shadow-glow transition hover:brightness-110 active:scale-95"
          >
            <IconHeartHandshake size={16} stroke={2.2} />
            <span className="hidden sm:inline">Sustain Torah</span>
            <span className="sm:hidden">Donate</span>
          </a>
        </div>
      </div>
      {/* gold hairline glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-1.5 px-4 py-1.5 text-[11.5px] text-white/45">
        <IconSparkles size={13} className="text-gold-300/80" />
        <span className="tracking-wide">
          Where timeless Torah wisdom meets seeking souls
        </span>
      </div>
    </header>
  );
};
