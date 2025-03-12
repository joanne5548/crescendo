import { openai } from "@ai-sdk/openai";
import {
    Pinecone,
    QueryResponse,
    RecordMetadata,
    ScoredPineconeRecord,
} from "@pinecone-database/pinecone";
import { embed } from "ai";
import { queryResult } from "../interfaces";
import { getSystemPrompt } from "./pineconePrompt";

const cleanQueryResponse = (queryResponse: QueryResponse<RecordMetadata>) => {
    return queryResponse.matches.map(
        (record: ScoredPineconeRecord<RecordMetadata>) => {
            if (
                !record.score ||
                !record.metadata ||
                !record.metadata.text ||
                !record.metadata.referenceUrl
            ) {
                throw new Error("Query does not have correct structure.");
            }

            const extractedData: queryResult = {
                score: record.score,
                text: record.metadata.text as string,
                referenceUrl: record.metadata.referenceUrl as string, // what if it doesn't have reference url?
            };

            return extractedData;
        }
    );
}

const buildContext = (queryResponse: QueryResponse<RecordMetadata>) => {
    // naive approach, just append top k texts with its reference url
    const cleanedQueryResponse = cleanQueryResponse(queryResponse);

    let context = "";
    cleanedQueryResponse.forEach((query: queryResult) => {
        context += `${query.text} Reference url: ${query.referenceUrl}`;
        context += "\n";
    });
    console.log(context);

    const systemPrompt = getSystemPrompt(context);
    console.log(systemPrompt);
    return systemPrompt;
}

export const getContext = async (message: string) => {
    try {
        console.log(process.env.PINECONE_API_KEY);
        console.log("Running getContext");
        if (!process.env.PINECONE_API_KEY) {
            throw Error("Pinecone API not defined");
        }
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });

        const { embedding } = await embed({
            model: openai.embedding("text-embedding-3-small"),
            value: message,
        });

        const index = pc.index("beethoven-symphony-openai");

        const queryResponse = await index.namespace("symphony-no-1").query({
            topK: 2,
            vector: embedding,
            includeValues: true,
            includeMetadata: true,
        });

        const context = buildContext(queryResponse);

        return context;
    } catch (error) {
        console.log(`Pinecone Error: ${error}`);
    }
};
