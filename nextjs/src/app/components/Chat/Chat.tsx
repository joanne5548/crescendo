"use client";

import ChatContent from "./ChatContent";
import TypeMessageBar from "./TypeMessageBar";
import { useChat } from "@ai-sdk/react";
import { useAtomValue } from "jotai";
import { SelectedTopicAtom } from "@/app/lib/atoms";

const Chat = () => {
    const selectedTopic = useAtomValue(SelectedTopicAtom);
    const { messages, input, status, handleInputChange, handleSubmit } =
        useChat({
            id: selectedTopic as string,
            body: {
                selectedTopic: selectedTopic,
            }
        });

    return (
        <div className="p-4 pl-2 w-full h-full">
            <div className="flex flex-col h-full rounded-xl bg-white">
                <div className="px-4 py-3 text-xl font-semibold border-b-[1px] border-b-slate-200 hover:cursor-default">
                    {selectedTopic ? selectedTopic : "Crescendo"}
                </div>
                {selectedTopic ? (
                    <>
                        <ChatContent messages={messages} status={status} />
                        <TypeMessageBar
                            messages={messages}
                            input={input}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                    </>
                ) : (
                    <div className="flex justify-center items-center h-full text-xl">
                        Click topics on the left to start chatting with Crescendo!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
