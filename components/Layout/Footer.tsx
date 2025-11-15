import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-700 py-2 px-8 items-center sm:justify-between justify-center">
      </div>
      <div className="text-center px-4 py-2">
        <p className="italic text-[16px] text-black">
        Disclaimer: This content is for educational and inspirational purposes only. For matters of practical Jewish law (halacha) and personal religious guidance, please consult with a qualified Orthodox Jewish Rabbi.
        </p>
        <div className="mt-3">© 2025 AskJudaism.com —&nbsp;
          <a 
            href="https://eliyahu.chat" 
            className="text-blue-600 hover:text-blue-800 underline font-medium text-lg transition-colors duration-500"
          >
            Eliyahu.chat
          </a>
        </div>
      </div>
    </div>
  );
};
