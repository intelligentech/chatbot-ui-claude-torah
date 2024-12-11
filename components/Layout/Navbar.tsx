import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-auto min-h-[50px] sm:min-h-[60px] border-b border-neutral-700 py-2 px-2 sm:px-8 items-center justify-center">
      <div className="font-bold text-3xl text-center">
        <a
          className="hover:opacity-50"
          href="https://code-scaffold.vercel.app"
        >
          <span className="whitespace-nowrap">{'\u{1F525}'}{'\u{2721}'} AI Eliyahu HaNavi</span>
          <br className="sm:hidden" />
          <span className="whitespace-nowrap sm:inline-block sm:ml-1">(Elijah The Prophet)</span>
        </a>
      </div>
    </div>
  );
};
