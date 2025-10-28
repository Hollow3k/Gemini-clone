import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({apiKey: "AIzaSyAnR89RRiXvXLCIGe0LMtgZ_ZpvlP5WGZY"}); //OG
const ai = new GoogleGenAI({apiKey: "AIzaSyAHteZv7yayTwoL6uDmPSCe4NdmADJjTsQ"});

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
    // 2. Extract the substring starting from the '{' character
    const jsonString = fullErrorString.substring(startIndex);
    
    try {
        // 3. Now, parse the valid JSON string
        const errorObject = JSON.parse(jsonString);
        
        // 4. Extract the reason field (as shown in the previous response)
        const reason = errorObject.error.details[0].reason;
        
        console.log("Extracted Reason:", reason);
        // Output: Extracted Reason: API_KEY_INVALID
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