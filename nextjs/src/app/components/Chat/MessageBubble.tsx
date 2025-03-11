import { UIMessage } from "ai";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

interface UserMessageProps {
    message: UIMessage;
}

const MessageBubble = ({ message }: UserMessageProps) => {
    return (
        <div
            className={clsx(
                "w-1/2 min-w-[28rem] whitespace-pre-wrap p-3 rounded-b-xl border-[1px] border-slate-200 shadow-2xl bg-slate-100 ",
                message.role === "user" ? "rounded-tl-xl" : "rounded-tr-xl"
            )}
        >
            {message.role === "user" ? (
                <>{message.content}</>
            ) : (
                <div className="markdown">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
