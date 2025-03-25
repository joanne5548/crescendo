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
import { QueryResult, TopicNames, TopicToIndex } from "../types";
import { getSystemPrompt } from "./pineconePrompt";
import { useAtomValue } from "jotai";
import { SelectedTopicAtom } from "../atoms";

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

            const extractedData: QueryResult = {
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
        const cleanedResponse = cleanQueryResponse(queryResponse)[0];

        console.log(`Namespace similarity score: ${cleanedResponse.score}`);
        if (cleanedResponse.score < 0.4) {
            return null;
        }

        const namespaceId = cleanedResponse.id;
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
    cleanedQueryResponse.forEach((query: QueryResult) => {
        context += `${query.text} Reference url: ${query.referenceUrl}`;
        context += "\n";
    });

    const systemPrompt = getSystemPrompt(context);
    console.log(`System Prompt retrieved:\n${systemPrompt}`);
    return systemPrompt;
};

export const getContext = async (message: string, selectedTopic: TopicNames) => {
    try {
        if (!process.env.PINECONE_API_KEY) {
            throw Error("Pinecone API Key not defined");
        }

        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });

        // console.log(TopicToIndex[selectedTopic]);
        const index = pc.index(TopicToIndex[selectedTopic]);

        const { embedding } = await embed({
            model: openai.embedding("text-embedding-3-small"),
            value: message,
        });

        const namespace = await getNamespace(index, embedding);
        if (!namespace) {
            return null;
        }
        console.log(`Namespace selected: ${namespace}`);

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
