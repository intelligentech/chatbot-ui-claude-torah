import { IconDots } from "@tabler/icons-react";
import { FC } from "react";

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="flex flex-col items-start">
      <div
        className="flex items-center bg-[#f7e1ff] bg-opacity-60 text-neutral-900 rounded-2xl px-4 py-3 w-fit shadow-sm"
        style={{ overflowWrap: "anywhere" }}
      >
        <IconDots className="animate-pulse" />
        <span className="ml-2 text-sm italic text-neutral-600">Rabbi Eliyahu is contemplating...</span>
      </div>
    </div>
  );
};
