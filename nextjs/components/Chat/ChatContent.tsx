import ChatbotMessage from "./ChatbotMessage";
import UserMessage from "./UserMessage";

const ChatContent = () => {
    return (
        <div className="flex flex-col items-center gap-4 h-full p-4 pb-8 rounded-b-xl overflow-y-auto">
            <UserMessage userMessage="Tell me about Beethoven's Symphony No. 1." />
            <ChatbotMessage chatbotMessage={`Yoyoyoyoyooyo\nYO YO MAAA`} />
            <UserMessage
                userMessage="Hi, it's me again, I'm back (hey) Let's talk ASAP Do you have the time? (Let's talk) A-S-A-P, baby Hurry up, don't be lazy A-S-A-P, baby Hurry up, don't say maybe 할 얘기 다 한 줄 알고 빨간색 눌러 (ah) 끊고 나니 생각나서 다시 또 울려 There's this one more thing I'll show you come with me So much to do and lots to see"
            />
            <ChatbotMessage
                chatbotMessage="Just for a minute Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik Just for a minute Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik A-S-A-P, baby Hurry up, don't say maybe A-S-A-P, baby Hurry up, don't say maybe"
            />
            <UserMessage
                userMessage="Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik (Tik-tok, tik-tok, tik-tok, tik, tik) Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik Tik-tok, tik-tok, tik-tok, tik, tik"            />
            <ChatbotMessage
                chatbotMessage="Hi, it's me again, I'm back (hey) Let's talk ASAP Do you have the time? (Do you like it?) (Let's talk) A-S-A-P, baby Hurry up, don't be lazy A-S-A-P, baby Hurry up, don't say maybe"
            />
        </div>
    );
};

export default ChatContent;
