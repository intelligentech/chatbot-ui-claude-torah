import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-700 py-2 px-8 items-center sm:justify-between justify-center">
      </div>
      <div className="text-center px-4 py-2">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 mx-auto max-w-md">
          <p className="text-blue-800 text-[14px] font-medium">
            🔒 Privacy Notice: Chats are not saved or recorded
          </p>
        </div>
        <p className="italic text-[16px] text-black">
        Disclaimer: This content is for educational and inspirational purposes only. For matters of practical Jewish law (halacha) and personal religious guidance, please consult with a qualified Orthodox Jewish Rabbi.
        </p>
        <p className="mt-3 text-[14px] text-gray-600">
          If the chat does not return a response within 30 seconds, either the AI Provider (Anthropic) servers are down or the funding account has run out. To donate and keep Rabbi Eliyahu alive:&nbsp;
          <a 
            href="https://ko-fi.com/askjudaism" 
            className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-500"
          >
            https://Ko-Fi.com/AskJudaism
          </a>
        </p>
        <div className="mt-3">© 2025 AskJudaism.com —&nbsp;
          <a 
            href="https://eliyahu.chat" 
            className="text-blue-600 hover:text-blue-800 underline font-medium text-lg transition-colors duration-500"
          >
            Eliyahu.chat
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
         <a 
            href="https://lawsofnoah.com" 
            className="text-blue-600 hover:text-blue-800 underline font-medium text-lg transition-colors duration-500"
          >
            7 Laws of Noah
          </a>
        </div>
      </div>
    </div>
  );
};
