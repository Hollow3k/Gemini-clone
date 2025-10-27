import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: "AIzaSyAnR89RRiXvXLCIGe0LMtgZ_ZpvlP5WGZY"});

async function runChat(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });
  return response.text;
}

export default runChat;