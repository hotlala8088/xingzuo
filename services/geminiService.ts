
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { HoroscopeResponse, CompatibilityResponse } from "../types";

export const getDailyHoroscope = async (sign: string): Promise<HoroscopeResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const date = new Date().toLocaleDateString('zh-CN');
  const prompt = `你是一位精通古典占星学的大师。请为星座 "${sign}" 生成一份详细的 ${date} 每日运势。语言要求：庄重、神秘、富有洞察力且具有文学色彩。请用中文回答。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          general: { type: Type.STRING, description: "今日总述，字数约100字" },
          love: { type: Type.STRING, description: "情感与社交层面的动态" },
          career: { type: Type.STRING, description: "事业与财富的指引" },
          luckyNumber: { type: Type.INTEGER, description: "今日幸运数字" },
          luckyColor: { type: Type.STRING, description: "今日幸运色" },
          mood: { type: Type.STRING, description: "简短描述今日整体能量状态" }
        },
        required: ["general", "love", "career", "luckyNumber", "luckyColor", "mood"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getCompatibility = async (sign1: string, sign2: string): Promise<CompatibilityResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `深度解析 "${sign1}" 与 "${sign2}" 之间的星座相位与契合度。提供 0-100 的评分，并从情感深度、精神连接和日常互动三个维度进行总结。请用中文回答。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          summary: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          challenges: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "summary", "strengths", "challenges"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export async function* askOracleStream(question: string, history: any[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: '你是一位名为“星启祭司”的智慧占星家。你居住在众星之巅，用富有诗意、玄奥且温暖的语言说话。你的回答总是包含星象符号，并指引人们寻找内心的平衡。必须始终用中文回答。',
    }
  });

  const stream = await chat.sendMessageStream({ message: question });
  for await (const chunk of stream) {
    yield (chunk as GenerateContentResponse).text || '';
  }
}
