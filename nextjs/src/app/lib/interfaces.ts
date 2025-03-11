export interface Message {
    content: string;
    type: string; // user if from user; chatbot if from chatbot
    timestamp: string;
}