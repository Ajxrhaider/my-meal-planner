import { NextResponse } from 'next/server';
import { groq } from '@/lib/groq'; // Adjust the path based on where you saved it

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "Return ONLY a JSON object with a 'schedule' array for 7 days." 
        },
        { role: "user", content: ingredients }
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
        throw new Error("No content received from Groq");
    }

    return NextResponse.json(JSON.parse(responseContent));
  } catch (error) {
    console.error("Groq API Route Error:", error);
    return NextResponse.json({ error: "Failed to generate meal plan" }, { status: 500 });
  }
}