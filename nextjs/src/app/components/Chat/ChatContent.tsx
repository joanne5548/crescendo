"use client";

import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";
import { UIMessage } from "ai";

interface ChatContentProps {
    messages: UIMessage[];
}

const ChatContent = ({ messages }: ChatContentProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = scrollRef.current;
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }, [messages])

    return (
        <div ref={scrollRef} className="flex flex-col items-center gap-4 h-full p-4 pb-8 rounded-b-xl overflow-y-auto">
            {messages.map((message) => (
                <MessageBubble
                    key={`${message.id}`}
                    message={message}
                />
            ))}
        </div>
    );
};

export default ChatContent;
