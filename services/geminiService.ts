
import { GoogleGenAI, Type } from "@google/genai";
import { Account, Transaction } from "../types.ts";

export const analyzeFinances = async (accounts: Account[], transactions: Transaction[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    أنت محاسب ذكي متطور. قم بتحليل البيانات المالية التالية:
    الحسابات: ${JSON.stringify(accounts.map(a => ({ name: a.name, balance: a.balance })))}
    العمليات الأخيرة: ${JSON.stringify(transactions.slice(-5))}
    
    المطلوب:
    1. حدد أي مشاكل محاسبية (مثل عدم توازن القيود).
    2. قدم نصيحة مالية لزيادة الأرباح أو تقليل المصاريف.
    3. توقع التدفق المالي القادم بناءً على التعلم الذاتي من البيانات.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            alerts: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendation: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["analysis", "alerts", "recommendation"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      analysis: "عذراً، تعذر الاتصال بالذكاء الاصطناعي. تعمل الخوارزميات المحلية حالياً.",
      alerts: ["تحقق من الاتصال بالإنترنت للميزات المتقدمة"],
      recommendation: "حافظ على توازن القيود يدوياً.",
      confidence: 0
    };
  }
};
