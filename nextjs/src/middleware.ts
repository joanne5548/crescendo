import { Pinecone } from "@pinecone-database/pinecone";
import { UIMessage } from "ai";
import { NextResponse } from "next/server";
import { getContext } from "./app/lib/pinecone";

export const config = {
    matcher: "/api/chat",
};

export async function middleware(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json();
        const lastMessage = messages[messages.length - 1].content;
        
        const context = await getContext(lastMessage);

        return NextResponse.next();
    } catch (error) {
        console.log(`Middleware error: ${error}`);
    }
}
