import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div
        className={`flex items-center ${
          message.role === "assistant" 
            ? "bg-[#f7e1ff] bg-opacity-60 text-neutral-900" 
            : "bg-blue-500 bg-opacity-60 text-white"
        } rounded-2xl px-3 py-2 max-w-[75%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="w-full m-0">{children}</p>
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
