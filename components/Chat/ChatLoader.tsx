import { FC } from "react";

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="animate-fadeIn flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-parchment-50 via-gold-200 to-gold-500 text-[18px] shadow-card ring-1 ring-gold-600/30">
        ✡️
      </div>
      <div className="flex items-center gap-3 rounded-2xl rounded-tl-md border border-gold-500/20 bg-parchment-50/90 px-4 py-3 shadow-card">
        <div className="flex gap-1.5">
          <span className="typing-dot h-2 w-2 rounded-full bg-gold-600" />
          <span className="typing-dot h-2 w-2 rounded-full bg-gold-600" />
          <span className="typing-dot h-2 w-2 rounded-full bg-gold-600" />
        </div>
        <span className="shimmer-text font-serif text-[14px] font-medium italic">
          Rabbi Eliyahu is contemplating…
        </span>
      </div>
    </div>
  );
};
