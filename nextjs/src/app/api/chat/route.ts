import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

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
