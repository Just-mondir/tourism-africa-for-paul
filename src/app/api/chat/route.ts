import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Stub response if API key is not configured yet
      console.warn("OPENAI_API_KEY is not set. Returning stub response.");
      return NextResponse.json({ 
        message: "Hello! I am currently in demo mode because my OpenAI API key hasn't been configured in the .env file yet. Once added, I'll be able to help you plan your African journey!" 
      });
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful and knowledgeable travel assistant for AfricGuide, a luxury African tourism platform. You help users plan trips, provide destination info, and give friendly advice.",
          },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to fetch from OpenAI");
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
