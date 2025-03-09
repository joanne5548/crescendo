interface UserMessageProps {
    userMessage: string;
}

const UserMessage = ({ userMessage }: UserMessageProps) => {
    return (
        <div className="w-1/2 min-w-96 whitespace-pre-wrap p-3 rounded-b-xl rounded-tl-xl border-[1px] border-slate-200 shadow-2xl bg-slate-100">
            {userMessage}
        </div>
    );
};

export default UserMessage;
