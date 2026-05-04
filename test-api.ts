import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBAEdZXbctKirNPT_IwvKSNcczQRj2t_PM";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

async function run() {
  try {
    const result = await model.generateContent("Test prompt");
    console.log("Success:", await result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
