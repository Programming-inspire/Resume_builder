import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY!;
    const modelName = process.env.GEMINI_MODEL!;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(
      "Explain how AI works in a few words."
    );

    return NextResponse.json({
      output: result.response.text(),
    });
  }catch (error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unknown error";

  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
}

}
