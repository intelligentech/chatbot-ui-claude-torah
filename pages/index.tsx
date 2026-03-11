import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message, Role } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (instant = false) => {
    messagesEndRef.current?.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
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
              { role: 'assistant' as Role, content: accumulatedContent }
            ];
          }
        });
        
        scrollToBottom(true);
      }


    } catch (error) {
      console.error("Error in handleSend:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant' as Role,
          content: 'I apologize, but I encountered an error processing your request. This may be due to connectivity issues or the API service being temporarily unavailable. Please try again in a moment, or check the footer for more information about potential service issues.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant" as Role,
        content: `Shalom aleichem, dear soul! I am Rabbi Eliyahu of AskJudaism, here to engage with you in matters of Torah wisdom, spiritual growth, and life's deeper questions. Whether you seek understanding in Jewish teachings, guidance on your spiritual journey, or simply wish to explore meaningful topics, I am here to listen and share insights drawn from our sacred traditions.

What thoughts or questions are on your heart today?`
      }
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Eliyahu.chat - An AskJudaism.org project</title>
        <meta
          name="description"
          content="Where timeless Torah wisdom meets seeking souls - a sacred space for divine guidance, authentic Jewish learning, and spiritual elevation through the voice of Eliyahu HaNavi."
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
  );
}
