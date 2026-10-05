import { FC } from "react";
import { StarMark } from "../Layout/StarMark";

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="animate-fadeIn flex gap-3">
      <StarMark
        size="h-9 w-9"
        circular
      />
      <div
        role="status"
        aria-label="Rabbi Eliyahu is contemplating"
        className="flex items-center gap-3 rounded-2xl rounded-tl-md border border-gold-600/25 bg-parchment-50 px-4 py-3 shadow-card"
      >
        <div className="flex gap-1.5">
          <span className="typing-dot h-2 w-2 rounded-full bg-gold-700" />
          <span className="typing-dot h-2 w-2 rounded-full bg-gold-700" />
          <span className="typing-dot h-2 w-2 rounded-full bg-gold-700" />
        </div>
        <span className="loader-label font-serif text-[14px] font-bold italic">Rabbi Eliyahu is contemplating…</span>
      </div>
    </div>
  );
};
