import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages
        })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Failed to get response reader");
      }

      let accumulatedContent = "";
      let partialLine = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = (partialLine + chunk).split('\n');
        partialLine = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'content_block_delta' && data.delta?.text) {
                accumulatedContent += data.delta.text;
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }

        setMessages(prevMessages => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage.role === 'assistant') {
            return [
              ...prevMessages.slice(0, -1),
              { ...lastMessage, content: accumulatedContent }
            ];
          } else {
            return [
              ...prevMessages,
              { role: 'assistant', content: accumulatedContent }
            ];
          }
        });
      }

      if (partialLine) {
        try {
          const data = JSON.parse(partialLine.slice(6));
          if (data.type === 'content_block_delta' && data.delta?.text) {
            accumulatedContent += data.delta.text;
          }
        } catch (e) {
          console.error("Error parsing final SSE data:", e);
        }
      }

      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage.role === 'assistant') {
          return [
            ...prevMessages.slice(0, -1),
            { ...lastMessage, content: accumulatedContent }
          ];
        } else {
          return [
            ...prevMessages,
            { role: 'assistant', content: accumulatedContent }
          ];
        }
      });

    } catch (error) {
      console.error("Error in handleSend:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Shalom aleichem, child! Proceed to ask me anything, or simply express the thoughts on your mind. I'm here with you!`
      }
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Shalom aleichem, child! Proceed to ask me anything, or simply express the thoughts on your mind. I'm here with you!`
      }
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Chat with Eliyahu</title>
        <meta
          name="description"
          content="A chat with the prophet Elijah in AI form."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
