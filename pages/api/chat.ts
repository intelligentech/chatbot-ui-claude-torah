import { Message } from "@/types";
import { ClaudeStream } from "@/utils";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    console.log("API route called");
    const { messages } = (await req.json()) as {
      messages: Message[];
    };
    console.log("Received messages:", messages);

    const charLimit = 100000; // Claude 3 Sonnet has a much higher context limit
    let charCount = 0;
    let messagesToSend = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (charCount + message.content.length > charLimit) {
        break;
      }
      charCount += message.content.length;
      messagesToSend.push(message);
    }

    const stream = await ClaudeStream(messagesToSend);
    console.log("Stream received from ClaudeStream");

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export default handler;
