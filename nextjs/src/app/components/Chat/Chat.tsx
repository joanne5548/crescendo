import ChatContent from "./ChatContent";
import TypeMessageBar from "./TypeMessageBar";

const Chat = () => {
    return (
        <div className="p-4 pl-2 w-full h-full">
            <div className="flex flex-col h-full rounded-xl bg-white">
                <div className="px-4 py-3 text-xl font-semibold border-b-[1px] border-b-slate-200 hover:cursor-default">
                    Beethoven's Symphonies
                </div>
				<ChatContent />
				<TypeMessageBar />
            </div>
        </div>
    );
};

export default Chat;
