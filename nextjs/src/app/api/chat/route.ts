import { getContext } from "@/app/lib/server/pinecone";
import { defaultSystemPrompt } from "@/app/lib/server/pineconePrompt";
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage } from "ai";

export async function POST(req: Request) {
    try {
        const { messages }: {messages: UIMessage[]} = await req.json();

        const lastMessage = messages[messages.length - 1].content;
        const context = await getContext(lastMessage);

        const result = streamText({
            model: openai("gpt-4o-mini"),
            system: context || defaultSystemPrompt,
            messages: messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log(`Network Error: ${error}`);
    }
}
