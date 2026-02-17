import Groq from "groq-sdk";

// Initialize the Groq client with your API key from environment variables
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Optional: You can also export helper functions here 
 * to keep your API routes even cleaner.
 */
export const getMealPlanChatCompletion = async (ingredients: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional nutritionist and chef. Output ONLY valid JSON for a 7-day meal plan based on the user's ingredients. Do not include any conversational text or markdown blocks.",
      },
      {
        role: "user",
        content: `Ingredients: ${ingredients}`,
      },
    ],
    model: "llama3-8b-8192",
    response_format: { type: "json_object" },
  });
};