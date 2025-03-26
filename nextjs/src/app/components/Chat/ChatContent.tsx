"use client";

import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";
import { UIMessage } from "ai";
import { GiMusicalNotes } from "react-icons/gi";

interface ChatContentProps {
    messages: UIMessage[];
    status: "submitted" | "streaming" | "ready" | "error";
}

const ChatContent = ({ messages, status }: ChatContentProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = scrollRef.current;
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }, [messages])

    return (
        <div ref={scrollRef} className="flex flex-col gap-4 w-full sm:w-2/3 h-full self-center p-4 pb-8 rounded-b-xl overflow-y-auto">
            {messages.map((message) => (
                <MessageBubble
                    key={`${message.id}`}
                    message={message}
                />
            ))}
            {status === "submitted" &&
            <div className="flex flex-row gap-2 w-fit sm:w-1/2 sm:min-w-[28rem] whitespace-pre-wrap px-3 py-2 sm:p-3 rounded-b-xl border-[1px] border-slate-200 shadow-lg bg-slate-100 rounded-tr-xl">
                <GiMusicalNotes className="size-6 animate-wiggle"/>
                Thinking...
            </div>}
        </div>
    );
};

export default ChatContent;
