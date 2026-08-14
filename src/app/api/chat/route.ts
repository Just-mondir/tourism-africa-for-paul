import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Returning stub response.");
      return NextResponse.json({
        message:
          "Hello! I am currently in demo mode because the Gemini API key hasn't been configured yet. Once added, I'll be able to help you plan your African journey!",
      });
    }

    // Build conversation history for Gemini
    const systemInstruction =
      "You are a helpful and knowledgeable travel assistant for AfricGuide, an African tourism platform. You help users plan trips across all African countries, provide destination info about safaris, beaches, culture, history, adventure, and city experiences, and give friendly advice. Keep replies concise and enthusiastic.";

    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(
        errorData.error?.message || "Failed to fetch from Gemini"
      );
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand that.";

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
