"use client";

import { SelectedTopicAtom } from "@/app/lib/atoms";
import { TopicNames } from "@/app/lib/types";
import { useSetAtom } from "jotai";

interface TopicButtonProps {
    topic: TopicNames;
}

const TopicButton = ({ topic }: TopicButtonProps) => {
    const setSelectedTopic = useSetAtom(SelectedTopicAtom);

    const handleTopicClick = () => {
        setSelectedTopic(topic);
    };

    return (
        <div
            onClick={handleTopicClick}
            className="text-white px-3 py-2 rounded-lg hover:bg-slate-800 hover:cursor-pointer"
        >
            {topic}
        </div>
    );
};

export default TopicButton;
