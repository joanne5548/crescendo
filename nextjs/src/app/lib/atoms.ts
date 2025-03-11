import { atom } from "jotai";
import { Message } from "./interfaces";

// Refactor the string type into an interface that contains:
// Message content, sender (user or chatbot)
// export const messageListAtom = atom<Message[]>([]);