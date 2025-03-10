import { messageListAtom } from "@/app/lib/atoms";
import ChatbotMessage from "./ChatbotMessage";
import UserMessage from "./UserMessage";
import { useAtom } from "jotai/react/useAtom";

const ChatContent = () => {
    const [messageList, setMessageList] = useAtom(messageListAtom);

    return (
        <div className="flex flex-col items-center gap-4 h-full p-4 pb-8 rounded-b-xl overflow-y-auto">
            {messageList.map((message) => {
                if (message.from === "user") {
                    return <UserMessage userMessage={message.content} />
                }
                return <ChatbotMessage chatbotMessage={message.content} />
            })}
            {/* <UserMessage userMessage="Tell me about Beethoven's Symphony No. 1." />
            <ChatbotMessage chatbotMessage={`Yoyoyoyoyooyo\nYO YO MAAA`} /> */}
        </div>
    );
};

export default ChatContent;
