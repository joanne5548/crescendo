interface ChatbotMessageProps {
    chatbotMessage: string;
}

const ChatbotMessage = ({ chatbotMessage }: ChatbotMessageProps) => {
  return (
    <div className="w-1/2 min-w-96 p-3 whitespace-pre-wrap rounded-b-xl rounded-tr-xl border-[1px] border-slate-200 shadow-2xl bg-slate-100">
      {chatbotMessage}
    </div>
  )
}

export default ChatbotMessage
