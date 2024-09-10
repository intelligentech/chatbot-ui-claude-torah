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

    // Ensure the first message is from the user
    const filteredMessages = messages.filter(msg => msg.role !== 'system');
    const messagesToSend = filteredMessages[0].role === 'user' ? filteredMessages : filteredMessages.slice(1);

    console.log("Calling ClaudeStream with messages:", messagesToSend);
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
