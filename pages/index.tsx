import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message, Role } from "@/types";
import { IconBook, IconHeartHandshake, IconLock } from "@tabler/icons-react";
import Head from "next/head";
import { useCallback, useState } from "react";

const WELCOME_MESSAGE: Message = {
  role: "assistant" as Role,
  content: `Shalom aleichem, dear soul! I am Rabbi Eliyahu of AskJudaism, here to learn with you in matters of Torah wisdom, spiritual growth, and life's deeper questions.\n\nWhether you seek understanding in Jewish teachings, guidance on your journey, or simply wish to explore — I am here to listen.\n\nWhat thoughts or questions are on your heart today?`,
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
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
        const lines = (partialLine + chunk).split("\n");
        partialLine = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "content_block_delta" && data.delta?.text) {
                accumulatedContent += data.delta.text;
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }

        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage.role === "assistant") {
            return [...prevMessages.slice(0, -1), { ...lastMessage, content: accumulatedContent }];
          } else {
            return [...prevMessages, { role: "assistant" as Role, content: accumulatedContent }];
          }
        });
      }
    } catch (error) {
      console.error("Error in handleSend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant" as Role,
          content:
            "I apologize, but I encountered an error processing your request. This may be due to connectivity issues or the service being temporarily unavailable. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = useCallback(
    (prompt: string) => {
      if (loading) return;
      handleSend({ role: "user", content: prompt });
    },
    [loading, messages]
  );

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Head>
        <title>Eliyahu.chat — Ask Rabbi Eliyahu | AskJudaism.org</title>
        <meta
          name="description"
          content="Where timeless Torah wisdom meets seeking souls — a sacred space for divine guidance, authentic Jewish learning, and spiritual elevation."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          property="og:title"
          content="Eliyahu.chat — Ask Rabbi Eliyahu"
        />
        <meta
          property="og:description"
          content="Your havruta companion in Torah, prayer, and life's deeper questions."
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      {/* Ambient background layers */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
      >
        {/* floating orbs */}
        <div className="absolute -left-32 top-[-120px] h-[420px] w-[420px] rounded-full bg-gold-500/20 blur-[120px]" />
        <div className="absolute right-[-140px] top-[20%] h-[480px] w-[480px] rounded-full bg-indigo-600/25 blur-[130px]" />
        <div className="absolute bottom-[-160px] left-[30%] h-[380px] w-[520px] rounded-full bg-purple-700/20 blur-[130px]" />
        {/* giant Hebrew watermark */}
        <div className="hebrew-watermark absolute bottom-[6%] right-[2%] hidden text-[220px] font-black lg:block">
          שמע
        </div>
        <div className="hebrew-watermark absolute left-[2%] top-[18%] hidden text-[160px] font-black lg:block">
          אור
        </div>
        {/* film grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex flex-1 flex-col items-center px-3 pb-2 pt-5 sm:px-6 sm:pt-8">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/70" />
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gold-200">
              בס״ד · Torah · Tefillah · Teshuva
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/70" />
          </div>

          <h1 className="font-serif text-center text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[42px]">
            Ask{" "}
            <span className="bg-gradient-to-r from-gold-100 via-gold-300 to-gold-100 bg-clip-text text-transparent [filter:drop-shadow(0_2px_14px_rgba(201,162,39,0.3))]">
              Rabbi Eliyahu
            </span>
          </h1>
          <p className="mb-2 mt-1 max-w-xl text-center text-[15px] leading-relaxed text-white/85">
            A sacred havruta for Torah learning, spiritual growth, and life&apos;s deepest questions — grounded in authentic mesorah.
          </p>

          {/* Chat card */}
          <div className="w-full max-w-[880px]">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
              onSuggestion={handleSuggestion}
            />
          </div>

          {/* Trust row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[12.5px] font-medium text-white/80">
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur">
              <IconBook
                size={14}
                className="text-gold-200"
              />
              Sourced in Tanakh · Talmud · Rishonim
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur">
              <IconHeartHandshake
                size={14}
                className="text-gold-200"
              />
              Pastoral &amp; non-judgmental
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur">
              <IconLock
                size={14}
                className="text-gold-200"
              />
              Private — nothing stored
            </span>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
