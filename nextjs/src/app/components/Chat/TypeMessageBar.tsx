"use client";

import { messageListAtom } from "@/app/lib/atoms";
import { useAtom } from "jotai";
import { useRef } from "react";

const TypeMessageBar = () => {
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [messageList, setMessageList] = useAtom(messageListAtom);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && textRef.current) {
            // send the data to backend!

            setMessageList([
                ...messageList,
                textRef.current.value
            ]);

            textRef.current.value = "";
        }
    };
    // Change placeholder to "Ask something about ..." if the chat is new
    return (
        <div className="flex flex-col-reverse items-center pb-4">
            <textarea
                ref={textRef}
                onKeyDown={handleKeyPress}
                placeholder="Reply to Crescendo"
                className="p-3 w-1/2 min-w-96 rounded-xl border-[1px] border-slate-200 shadow-2xl outline-none bg-slate-100
                            resize-none max-h-32"
            />
        </div>
    );
};

export default TypeMessageBar;
