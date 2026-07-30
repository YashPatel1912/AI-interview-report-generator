const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function invokeGeminiAi() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Explain React",
    });

    console.log(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error.message);
  }
}


module.exports = invokeGeminiAi;
