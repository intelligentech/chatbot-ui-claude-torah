import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  // Pre-process the content to wrap bracketed text in bold syntax
  const processedContent = message.content.replace(/\[([^\]]*)\]/g, '**[$1]**');

  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div
        className={`${
          message.role === "assistant" 
            ? "bg-[#f7e1ff] bg-opacity-60 text-neutral-900" 
            : "bg-blue-500 bg-opacity-60 text-white"
        } rounded-2xl px-3 py-2 max-w-[75%]`}
      >
        <div className="prose prose-sm">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-0 last:mb-0">{children}</p>
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
