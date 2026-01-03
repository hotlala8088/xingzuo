
import { GoogleGenAI, Type } from "@google/genai";
import { HoroscopeResponse, CompatibilityResponse } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailyHoroscope = async (sign: string): Promise<HoroscopeResponse> => {
  const ai = getAI();
  const date = new Date().toLocaleDateString('zh-CN');
  const prompt = `请为星座 "${sign}" 生成一份详细的 ${date} 每日运势。语言风格要神秘而具有洞察力。请用中文回答。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          general: { type: Type.STRING, description: "今日总述" },
          love: { type: Type.STRING, description: "情感与社交" },
          career: { type: Type.STRING, description: "事业与财运" },
          luckyNumber: { type: Type.INTEGER, description: "幸运数字" },
          luckyColor: { type: Type.STRING, description: "幸运颜色" },
          mood: { type: Type.STRING, description: "今日心情" }
        },
        required: ["general", "love", "career", "luckyNumber", "luckyColor", "mood"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getCompatibility = async (sign1: string, sign2: string): Promise<CompatibilityResponse> => {
  const ai = getAI();
  const prompt = `分析星座 "${sign1}" 和 "${sign2}" 之间的占星契合度。提供一个百分比评分 (0-100) 并从占星角度详细分析他们的关系动态。请用中文回答。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER, description: "契合度评分" },
          summary: { type: Type.STRING, description: "深度总结" },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "关系优势" },
          challenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "可能面临的挑战" }
        },
        required: ["score", "summary", "strengths", "challenges"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const askOracle = async (question: string, history: {role: string, parts: {text: string}[]}[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: '你是一位名为“星启天机”的古老而智慧的占星祭司。你用富有诗意、玄奥且温暖的语言说话。你根据占星学原理对人生、爱情和命运提供建议。你必须始终用中文回答。',
    }
  });

  const result = await chat.sendMessage({ message: question });
  return result.text;
};
