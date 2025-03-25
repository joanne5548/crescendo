export interface QueryResult {
    id: string;
    score: number;
    text: string;
    referenceUrl?: string;
}

export const TopicList = ["Beethoven's Symphonies", "test"] as const;
export const PineconeIndexName = ["beethoven-symphony-openai", "test"] as const;

export type TopicNames = (typeof TopicList)[number];

export const TopicToIndex: { [key in TopicNames]: string } = {
    "Beethoven's Symphonies": "beethoven-symphony-openai",
    test: "test",
};
