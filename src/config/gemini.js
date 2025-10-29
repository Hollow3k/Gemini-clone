import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_API_KEY});

async function runChat(prompt) {
try{
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });
  return response.text;
} catch(e){
  const fullErrorString = e.toString();
  const startIndex = fullErrorString.indexOf('{');

  if (startIndex !== -1) {
    const jsonString = fullErrorString.substring(startIndex);
    
    try {
        const errorObject = JSON.parse(jsonString);
        
        const reason = errorObject.error.details[0].reason;
        
        console.log("Extracted Reason:", reason);

        console.log(reason.toString());
        return reason.toString();

    } catch (e) {
      console.error("Failed to parse the extracted JSON:", e);
    }
  }
  else {
    console.error("Could not find the starting JSON character in the error string.");
  }
  }
}

export default runChat;