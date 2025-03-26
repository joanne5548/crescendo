import { UIMessage } from "ai";
import clsx from "clsx";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";

const NewTabLink: Components["a"] = (props) => {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
};

interface UserMessageProps {
    message: UIMessage;
}

const MessageBubble = ({ message }: UserMessageProps) => {
    return (
        <div
            className={clsx(
                "sm:w-[55%] sm:min-w-[28rem] whitespace-pre-wrap px-3 py-2 sm:p-3 rounded-b-xl border-[1px] border-slate-200 shadow-xl bg-slate-100 ",
                message.role === "user"
                    ? "rounded-tl-xl self-end"
                    : "rounded-tr-xl"
            )}
        >
            {message.role === "user" ? (
                <div>{message.content}</div>
            ) : (
                <div className="prose **:m-0 prose-li:whitespace-normal text-black">
                    <ReactMarkdown components={{ a: NewTabLink }}>
                        {message.content}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
