export interface QueryResult {
    id: string;
    score: number;
    text: string;
    referenceUrl?: string;
};

export const TopicList = ["Beethoven's Symphonies", "test"] as const;
export const PineconeIndexName = ["beethoven-symphony-openai", "test"] as const;

export type TopicNames = typeof TopicList[number];
// type PineconeIndexNames = "beethoven-symphon y-openai" | "test";