
import { GoogleGenAI, Type } from "@google/genai";
import { ImageData, AnalysisResult } from "../types";

export const analyzeImage = async (
  image: ImageData,
  mode: string
): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const prompt = `Perform a ${mode} analysis of this image. Provide the results in a structured JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: image.base64,
              mimeType: image.mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: 'A brief 1-2 sentence overview of what is in the image.',
            },
            objects: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'A list of key objects detected in the image.',
            },
            colors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Dominant colors or color palette described in text.',
            },
            vibe: {
              type: Type.STRING,
              description: 'The mood or atmosphere of the image.',
            },
            details: {
              type: Type.STRING,
              description: 'A more detailed paragraph-long analysis focusing on context and composition.',
            },
          },
          required: ["summary", "objects", "colors", "vibe", "details"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};
