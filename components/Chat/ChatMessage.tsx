import { Message } from "@/types";
import { FC } from "react";

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div
        className={`flex items-center ${
          message.role === "assistant" 
            ? "bg-[#f7e1ff] bg-opacity-85 text-neutral-900" 
            : "bg-blue-500 bg-opacity-85 text-white"
        } rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        {message.content}
      </div>
    </div>
  );
};
