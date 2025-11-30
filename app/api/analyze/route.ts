import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume text and Job Description are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY!;
    const modelName = process.env.GEMINI_MODEL!;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `You are an expert resume analyzer. Compare the RESUME with the JOB DESCRIPTION and return ONLY a valid JSON object (no markdown, no explanations).

Return JSON with exactly these keys:
- score: number between 0-100 representing match percentage
- strongAreas: array of 3-5 strings describing strengths that match the job
- missingAreas: array of 3-5 strings describing gaps compared to the job
- updatedResume: string containing an improved version of the resume
- updatedPoints: array of 3-5 strings describing improvements made

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY the JSON object, starting with { and ending with }. No markdown formatting, no explanations.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean up the response - remove markdown code blocks and extra whitespace
    let cleanJson = text.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }
    cleanJson = cleanJson.trim();

    const data = JSON.parse(cleanJson);

    // Add originalResume (which we already have from the request)
    data.originalResume = resumeText;

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
