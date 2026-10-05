import { FC } from "react";
import { IconEraser } from "@tabler/icons-react";

interface Props {
  onReset: () => void;
}

export const ResetChat: FC<Props> = ({ onReset }) => {
  return (
    <button
      onClick={() => onReset()}
      className="group flex items-center gap-2 rounded-full border border-ink-900/15 bg-white py-1.5 pl-2 pr-3.5 text-[13px] font-semibold text-ink-900 shadow-sm transition hover:border-gold-600/50 hover:shadow-card active:scale-95"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-white transition group-hover:bg-gold-700">
        <IconEraser size={14} />
      </span>
      New conversation
    </button>
  );
};
