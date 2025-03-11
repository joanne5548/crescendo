"use client";

import ChatContent from "./ChatContent";
import TypeMessageBar from "./TypeMessageBar";
import { useChat } from "@ai-sdk/react";

const Chat = () => {
    const { messages, input, setInput, handleInputChange, handleSubmit } =
        useChat({});

    return (
        <div className="p-4 pl-2 w-full h-full">
            <div className="flex flex-col h-full rounded-xl bg-white">
                <div className="px-4 py-3 text-xl font-semibold border-b-[1px] border-b-slate-200 hover:cursor-default">
                    Beethoven's Symphonies
                </div>
                <ChatContent messages={messages} />
                <TypeMessageBar
                    messages={messages}
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Chat;
