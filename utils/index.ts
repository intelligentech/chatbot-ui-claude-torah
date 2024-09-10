import { Message } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const ClaudeStream = async (messages: Message[]) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const systemMessage = `You are an eager and empathetic AI companion, dedicated to understanding user needs and providing thoughtful, personalized, and accurate assistance with a warm, personable tone. As an amiable and affable guide, your goal is to ensure user satisfaction by offering tailored solutions and maintaining a friendly demeanor throughout every interaction.`;

  const promptMessages = messages.map(msg => 
    `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
  ).join('\n\n');

  const fullPrompt = `${systemMessage}\n\n${promptMessages}\n\nAssistant:`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.ANTHROPIC_API_KEY}`,
      "anthropic-version": "2023-06-01"
    },
    method: "POST",
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      messages: [
        { role: "system", content: systemMessage },
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ],
      max_tokens: 4000,
      temperature: 1.00,
      stream: true
    })
  });

  if (res.status !== 200) {
    throw new Error("Anthropic API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            if (json.type === 'content_block_delta' && json.delta?.text) {
              const text = json.delta.text;
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            }
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};
