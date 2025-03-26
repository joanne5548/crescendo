export interface QueryResult {
    id: string;
    score: number;
    text: string;
    referenceUrl?: string;
}

export const TopicList = ["Beethoven's Symphonies", "Rachmaninoff's Piano Concertos"] as const;
export const PineconeIndexName = ["beethoven-symphony-openai", "rachmaninoff-openai"] as const;

export type TopicNames = (typeof TopicList)[number];
type PineconeIndexNames = (typeof PineconeIndexName)[number];

export const TopicToIndex: { [key in TopicNames]: PineconeIndexNames } = {
    "Beethoven's Symphonies": "beethoven-symphony-openai",
    "Rachmaninoff's Piano Concertos": "rachmaninoff-openai",
};
