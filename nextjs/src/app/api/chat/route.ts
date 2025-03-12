import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage } from "ai";

export async function POST(req: Request) {
    try {
        const { messages }: {messages: UIMessage[]} = await req.json();
        console.log(messages);

        const result = streamText({
            model: openai("gpt-4o-mini"),
            // system: "Provide Context!",
            messages: messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log(`Network Error: ${error}`);
    }
}
