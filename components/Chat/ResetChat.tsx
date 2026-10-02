import { FC } from "react";
import { IconEraser } from "@tabler/icons-react";

interface Props {
  onReset: () => void;
}

export const ResetChat: FC<Props> = ({ onReset }) => {
  return (
    <button
      onClick={() => onReset()}
      className="group flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/60 py-1.5 pl-2 pr-3 text-[13px] font-medium text-ink-800 shadow-sm backdrop-blur transition hover:border-gold-500/40 hover:bg-white hover:shadow-card active:scale-95"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-white transition group-hover:bg-gold-600">
        <IconEraser size={14} />
      </span>
      New conversation
    </button>
  );
};
