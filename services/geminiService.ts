import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

let chatSession: Chat | null = null;

const getClient = () => {
    // In a real app, you might want to handle the key more securely or via backend proxy
    // For this demo, we assume process.env.API_KEY is available as per instructions.
    // If not set, we'll return null and handle it in the UI.
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
};

export const initializeChat = async (): Promise<Chat | null> => {
    const ai = getClient();
    if (!ai) return null;

    chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "你是 'UusiBot'，UUSIMA 平台的智能教学助手。你的任务是帮助学生理解课程（物联网、大数据、云计算等），引导他们使用虚拟实验室，并礼貌、简明地回答技术问题。如果用户询问账号问题，请引导他们联系管理员。",
        },
    });
    return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (!chatSession) {
        await initializeChat();
    }
    
    if (!chatSession) {
        return "抱歉，我现在离线中。请检查 API Key 配置。";
    }

    try {
        const response: GenerateContentResponse = await chatSession.sendMessage({ message });
        return response.text || "我无法生成回答。";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "处理您的请求时出错。";
    }
};