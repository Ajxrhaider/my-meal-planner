import { NextResponse } from 'next/server';
import { groq } from '@/lib/groq'; 

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "Return ONLY a JSON object. Structure: { \"schedule\": [ { \"day\": \"Monday\", \"breakfast\": { \"name\": \"\" }, \"lunch\": { \"name\": \"\" }, \"dinner\": { \"name\": \"\" } } ] }" 
        },
        { role: "user", content: `Ingredients: ${ingredients}` }
      ],
      // UPDATED TO MATCH YOUR KEY LIST
      model: "llama-3.1-8b-instant", 
      response_format: { type: "json_object" },
      temperature: 0.1, // Low temperature for consistent JSON
    });

    const responseContent = completion.choices[0]?.message?.content;
    return NextResponse.json(JSON.parse(responseContent || "{}"));
  } catch (error) {
    console.error("Groq Error:", error);
    return NextResponse.json({ error: "Protocol Error: Model mismatch or limit reached." }, { status: 500 });
  }
}