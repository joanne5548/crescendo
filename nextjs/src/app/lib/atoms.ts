import { atom } from "jotai";

// Refactor the string type into an interface that contains:
// Message content, sender (user or chatbot)
export const messageListAtom = atom<string[]>([]);