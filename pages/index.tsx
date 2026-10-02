import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message, Role } from "@/types";
import { IconArrowDown } from "@tabler/icons-react";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";

const WELCOME_MESSAGE: Message = {
  role: "assistant" as Role,
  content: `Shalom aleichem, dear soul! I am Rabbi Eliyahu of AskJudaism, here to learn with you in matters of Torah wisdom, spiritual growth, and life's deeper questions.\n\nWhether you seek understanding in Jewish teachings, guidance on your journey, or simply wish to explore — I am here to listen.\n\nWhat thoughts or questions are on your heart today?`,
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showJump, setShowJump] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (instant = false) => {
    messagesEndRef.current?.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "end" });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowJump(distanceFromBottom > 320);
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);
    requestAnimationFrame(() => scrollToBottom(true));

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
      setTimeout(() => scrollToBottom(false), 60);
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

  useEffect(() => {
    scrollToBottom(messages.length <= 2);
  }, [messages.length, loading]);

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
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-300">
              בס״ד · Torah · Tefillah · Teshuva
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/70" />
          </div>

          <h1 className="font-serif text-center text-[30px] font-bold leading-tight tracking-tight text-parchment-50 sm:text-[42px]">
            Ask <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">Rabbi Eliyahu</span>
          </h1>
          <p className="mb-5 mt-2 max-w-xl text-center text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
            A sacred havruta for Torah learning, spiritual growth, and life&apos;s deepest questions — grounded in authentic mesorah.
          </p>

          {/* Chat card */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="relative w-full max-w-[880px]"
          >
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
              onSuggestion={handleSuggestion}
            />
            <div ref={messagesEndRef} />

            {showJump && (
              <button
                onClick={() => scrollToBottom(false)}
                className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-gold-500/30 bg-ink-950/90 px-4 py-2 text-[12.5px] font-medium text-gold-200 shadow-sacred backdrop-blur transition hover:bg-ink-900 active:scale-95"
              >
                <IconArrowDown size={14} />
                Latest message
              </button>
            )}
          </div>

          {/* Trust row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[12px] text-white/45">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur">📖 Sourced in Tanakh · Talmud · Rishonim</span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur">🕊️ Pastoral & non-judgmental</span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur">🔒 Private — nothing stored</span>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
