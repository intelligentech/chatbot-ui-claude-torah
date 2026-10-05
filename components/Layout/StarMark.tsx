import { FC } from "react";

interface StarMarkProps {
  size?: string;
  circular?: boolean;
}

/**
 * Crisp vector Star of David brand mark.
 * Replaces the ✡️ emoji so the mark renders identically on every device.
 */
export const StarMark: FC<StarMarkProps> = ({ size = "h-11 w-11", circular = false }) => {
  return (
    <span
      aria-hidden
      className={`flex ${size} items-center justify-center bg-gradient-to-br from-gold-200 via-gold-400 to-gold-700 text-ink-950 shadow-glow ring-1 ring-white/40 ${
        circular ? "rounded-full" : "rounded-2xl"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        width="62%"
        height="62%"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.1}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M12 4.2 19.3 16.8H4.7L12 4.2Z" />
        <path d="M12 19.8 4.7 7.2h14.6L12 19.8Z" />
      </svg>
    </span>
  );
};
