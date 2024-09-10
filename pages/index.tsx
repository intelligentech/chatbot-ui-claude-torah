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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.type === 'content_block_start' || parsed.type === 'content_block_delta') {
              if (parsed.delta?.text) {
                accumulatedContent += parsed.delta.text;
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
            }
          } catch (e) {
            console.error("Error parsing chunk:", e);
          }
        }
      }
    } catch (error) {
      console.error("Error in handleSend:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Claude, an AI assistant created by Anthropic. I'm here to help you with various tasks such as answering questions, providing information, and assisting with analysis. How can I help you today?`
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
        content: `Hi there! I'm Claude, an AI assistant created by Anthropic. I'm here to help you with various tasks such as answering questions, providing information, and assisting with analysis. How can I help you today?`
      }
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Claude Chatbot</title>
        <meta
          name="description"
          content="A simple chatbot using Anthropic's Claude 3.5 Sonnet model with Next.js, TypeScript, and Tailwind CSS."
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
