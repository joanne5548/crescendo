import { atom } from "jotai";
import { TopicNames } from "./types";

export const SelectedTopicAtom = atom<TopicNames | null>(null);
