import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-center">
      <div className="font-bold text-3xl flex items-center">
        <a
          className="ml-2 hover:opacity-50"
          href="https://code-scaffold.vercel.app"
        >
          {'\u{1F525}'}{'\u{2721}'} AI Eliyahu HaNavi, Elijah The Prophet 
        </a>
      </div>
    </div>
  );
};
