"use client";

import { ChatRequestOptions, UIMessage } from "ai";
import clsx from "clsx";
import { useRef } from "react";

interface TypeMessageBarProps {
    messages: UIMessage[];
    input: string;
    handleInputChange: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    handleSubmit: (
        event?: {
            preventDefault?: () => void;
        },
        chatRequestOptions?: ChatRequestOptions
    ) => void;
}

const TypeMessageBar = ({
    messages,
    input,
    handleInputChange,
    handleSubmit,
}: TypeMessageBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
                inputRef.current!.value = "";
            }}
            className="flex flex-col-reverse items-center pb-4"
        >
            <input
                type="text"
                value={input}
                ref={inputRef}
                onChange={handleInputChange}
                placeholder={clsx(
                    messages.length
                        ? "Reply to Crescendo"
                        : "Ask something about ..."
                )}
                className="p-3 w-1/2 min-w-[28rem] rounded-xl border-[1px] border-slate-200 shadow-2xl outline-none bg-slate-100
                            resize-none max-h-32"
            />
        </form>
    );
};

export default TypeMessageBar;
