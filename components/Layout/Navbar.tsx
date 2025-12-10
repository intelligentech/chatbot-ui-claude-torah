import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-auto min-h-[50px] sm:min-h-[60px] border-b border-neutral-700 py-2 px-2 sm:px-8 items-center justify-center">
      <div className="font-bold text-3xl text-center">
        <a
          className="hover:opacity-50"
          href="https://eliyahu.chat"
        >
          <div className="flex justify-center mb-2">
            <img 
              src="https://unstoppablelinks.com/images/rabbieliyahu.webp" 
              alt="Rabbi Eliyahu" 
              width="90" 
              height="90"
              className="rounded"
            />
          </div>
          <span className="whitespace-nowrap"> {'\u{1F4AC}'}{'\u{1F310}'}{'\u{1F525}'} AI Rabbi Eliyahu</span>
          <br className="sm:hidden" />
          <span className="whitespace-nowrap sm:inline-block sm:ml-1">of AskJudaism.org <span className="text-lg">(v5.1.4-Dec2025)</span></span>
        </a>
      </div>
    </div>
  );
};
