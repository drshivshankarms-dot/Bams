import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Create a new instance of the GoogleGenAI client
// Note: In a real production app, ensure API_KEY is set in environment variables
// For this demo, we assume it's available.
const ai = new GoogleGenAI({ apiKey });

export const generateAyurvedaResponse = async (userPrompt: string): Promise<string> => {
  if (!apiKey) {
    return "Configuration Error: API Key is missing. Please set the API_KEY environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are 'AyurBot', a wise and knowledgeable Ayurvedic expert and clinical professor for BAMS students.
        Your name is Ayurveez Assistant.
        You have deep knowledge of Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, and modern clinical correlation.
        
        Guidelines:
        1. Answer student queries regarding subjects, textbooks, slokas, and clinical treatments.
        2. Use a polite, scholarly, yet accessible tone.
        3. If asked about treatments, provide the Ayurvedic perspective but always include a disclaimer that this is for educational purposes.
        4. Keep answers concise but informative. 
        5. If the query is unrelated to Ayurveda or medicine, politely steer the conversation back to Ayurveda.
        `,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I could not generate a response at this time. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently meditating (experiencing technical difficulties). Please check your connection or try again later.";
  }
};