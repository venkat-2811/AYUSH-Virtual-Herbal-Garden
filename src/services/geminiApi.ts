
// Gemini API service for AI integration
// Using the provided API key: AIzaSyASkyEiWCjOXiMMXRySnRBOtVcwegvHWe4
// Gemini model: gemini-2.0-flash

const GEMINI_API_KEY = "AIzaSyASkyEiWCjOXiMMXRySnRBOtVcwegvHWe4";
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

interface GeminiRequestBody {
  contents: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
}

export async function queryGemini(prompt: string): Promise<string> {
  try {
    const requestBody: GeminiRequestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert in Ayurvedic herbal medicine and traditional gardening practices. 
              Provide informative, accurate and helpful responses about medicinal herbs, their properties, 
              uses, cultivation methods, and any other relevant information. 
              
              User query: ${prompt}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return "I apologize, but I couldn't process your request at the moment. Please try again later.";
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text || "No response generated.";
  } catch (error) {
    console.error("Error querying Gemini API:", error);
    return "I apologize, but I encountered an error while processing your request. Please try again later.";
  }
}

// Function to get AI-generated insights about a specific herb
export async function getHerbInsights(herbName: string, scientificName: string): Promise<string> {
  const prompt = `Please provide in-depth information about the herb ${herbName} (${scientificName}), 
  including its medicinal properties, traditional uses in Ayurvedic medicine, 
  growing conditions, and any interesting historical or cultural significance.`;
  
  return queryGemini(prompt);
}

// Function to get gardening tips for a specific herb
export async function getHerbGardeningTips(herbName: string): Promise<string> {
  const prompt = `Please provide detailed gardening tips for growing ${herbName} successfully, 
  including soil requirements, sunlight needs, watering schedule, 
  common pests or diseases, and harvesting techniques.`;
  
  return queryGemini(prompt);
}
