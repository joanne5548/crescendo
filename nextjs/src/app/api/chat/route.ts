import { getContext } from "@/app/lib/server/pinecone";
import { getDefaultSystemPrompt } from "@/app/lib/server/pineconePrompt";
import { TopicNames } from "@/app/lib/types";
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage } from "ai";

export async function POST(req: Request) {
    try {
        const { messages, selectedTopic }: {
            messages: UIMessage[],
            selectedTopic: TopicNames,
        } = await req.json();

        const lastMessage = messages[messages.length - 1].content;
        const context = await getContext(lastMessage, selectedTopic);

        const result = streamText({
            model: openai("gpt-4o-mini"),
            system: context || getDefaultSystemPrompt(selectedTopic),
            messages: messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log(`Network Error: ${error}`);
    }
}
