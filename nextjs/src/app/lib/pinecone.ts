import { openai } from "@ai-sdk/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { embed } from "ai";

export const getContext = async (message: string) => {
    try {
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY, // huhh how to fix
        });

        const { embedding } = await embed({
            model: openai.embedding("text-embedding-3-small"),
            value: message,
        });
        console.log(embedding);

        // const index = pc.index("beethoven-symphony-openai");

        // const queryResponse = await index.namespace("symphony-no-1").query({
        //     topK: 3,
        //     vector: embedding,
        //     includeValues: false,
        //     includeMetadata: true,
        // });
        // console.log(queryResponse);
        // return queryResponse;
        return "helo";
    } catch (error) {
        console.log(`Pinecone Error: ${error}`);
    }
};
