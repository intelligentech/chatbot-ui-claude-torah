import { Message } from "@/types";
import { ClaudeStream } from "@/utils";

export const config = {
  runtime: "edge"
};

// Anthropic requires strict user/assistant alternation starting with a user
// message. One bad turn (e.g. an error appended after a partial reply) used
// to brick every future request with a 400. Merge, don't trust.
const sanitizeMessages = (messages: Message[]): Message[] => {
  const out: Message[] = [];
  for (const msg of messages) {
    if (msg.role !== "user" && msg.role !== "assistant") continue;
    if (!msg.content.trim()) continue;
    const last = out[out.length - 1];
    if (last && last.role === msg.role) {
      last.content = `${last.content}\n\n${msg.content}`;
    } else {
      out.push({ role: msg.role, content: msg.content });
    }
  }
  while (out.length > 0 && out[0].role !== "user") {
    out.shift();
  }
  return out;
};

const handler = async (req: Request): Promise<Response> => {
  try {
    console.log("API route called");
    const { messages } = (await req.json()) as {
      messages: Message[];
    };
    console.log("Received messages:", messages);

    const messagesToSend = sanitizeMessages(messages);

    if (messagesToSend.length === 0 || messagesToSend[messagesToSend.length - 1].role !== "user") {
      throw new Error("No valid user message to send");
    }

    console.log("Calling ClaudeStream with messages:", messagesToSend);
    const stream = await ClaudeStream(messagesToSend);
    console.log("Stream received from ClaudeStream");

    if (!stream) {
      throw new Error("Failed to get stream from Claude");
    }

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      }
    });
  } catch (error) {
    console.error("Error in API route:", error);
    const detail = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: detail }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export default handler;
