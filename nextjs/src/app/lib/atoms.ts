import { atom } from "jotai";
import { TopicNames } from "./types";

export const SelectedTopicAtom = atom<TopicNames>("Beethoven's Symphonies");
