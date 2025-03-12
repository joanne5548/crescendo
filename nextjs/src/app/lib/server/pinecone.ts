import { openai } from "@ai-sdk/openai";
import {
    Index,
    Pinecone,
    QueryResponse,
    RecordMetadata,
    RecordValues,
    ScoredPineconeRecord,
} from "@pinecone-database/pinecone";
import { embed } from "ai";
import { queryResult } from "../interfaces";
import { getSystemPrompt } from "./pineconePrompt";

const cleanQueryResponse = (queryResponse: QueryResponse<RecordMetadata>) => {
    return queryResponse.matches.map(
        (record: ScoredPineconeRecord<RecordMetadata>) => {
            if (
                !record.id ||
                !record.score ||
                !record.metadata ||
                !record.metadata.text
            ) {
                throw new Error("Query does not have correct structure.");
            }

            const extractedData: queryResult = {
                id: record.id,
                score: record.score,
                text: record.metadata.text as string,
                ...(record.metadata.referenceUrl && {
                    referenceUrl: record.metadata.referenceUrl as string,
                }),
            };

            return extractedData;
        }
    );
};

const getNamespace = async (
    index: Index<RecordMetadata>,
    embedding: RecordValues
) => {
    try {
        const queryResponse = await index.namespace("namespace").query({
            topK: 1,
            vector: embedding,
            includeValues: false,
            includeMetadata: true,
        });

        const namespaceId = cleanQueryResponse(queryResponse)[0].id;

        const i = namespaceId.indexOf(":");
        if (i === -1) {
            throw Error("Retrieved namespace has invalid id.");
        }
        const namespace = namespaceId.substring(i + 1);

        return namespace;
    } catch (error) {
        console.log(`Pinecone error during namespace retrieval: ${error}`);
    }
};

const buildContext = (queryResponse: QueryResponse<RecordMetadata>) => {
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
};

export const getContext = async (message: string) => {
    try {
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

        const namespace = await getNamespace(index, embedding);

        const queryResponse = await index.namespace(`${namespace}`).query({
            topK: 2,
            vector: embedding,
            includeValues: false,
            includeMetadata: true,
        });

        const context = buildContext(queryResponse);

        return context;
    } catch (error) {
        console.log(`Pinecone Error: ${error}`);
    }
};
