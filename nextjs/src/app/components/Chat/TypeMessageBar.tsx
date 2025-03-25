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
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
            textareaRef.current!.value = "";
        }
    };

    return (
        <div className="flex flex-col-reverse items-center w-full sm:w-auto px-8 sm:px-0 pb-4">
            <textarea
                value={input}
                ref={textareaRef}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder={clsx(
                    messages.length
                        ? "Reply to Crescendo"
                        : "Ask something about ..."
                )}
                className="p-3 w-full sm:w-1/2 sm:min-w-[28rem] rounded-xl border-[1px] border-slate-200 shadow-2xl outline-none bg-slate-100
                            resize-none max-h-32"
            />
        </div>
    );
};

export default TypeMessageBar;
