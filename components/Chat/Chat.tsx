import { Message } from "@/types";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <ResetChat onReset={onReset} />
      </div>

      <div className="flex flex-col rounded-lg px-3 py-6 sm:p-6 sm:border border-neutral-400 bg-white bg-opacity-20 shadow-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className="my-2 sm:my-3"
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-2 sm:my-3">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} disabled={loading} />
        </div>
      </div>
    </>
  );
};
