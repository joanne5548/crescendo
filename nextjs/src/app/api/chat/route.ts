import { getContext } from "@/app/lib/server/pinecone";
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage } from "ai";

export async function POST(req: Request) {
    try {
        console.log("Running post request");
        const { messages }: {messages: UIMessage[]} = await req.json();
        console.log(messages);

        const lastMessage = messages[messages.length - 1].content;
        const context = await getContext(lastMessage);

        const result = streamText({
            model: openai("gpt-4o-mini"),
            system: context,
            messages: messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log(`Network Error: ${error}`);
    }
}
