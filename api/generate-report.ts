import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

// In-memory rate limiter: max 10 requests per IP per minute
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const clientIp =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Too many requests. Please try again in a minute.",
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY environment variable" });
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { responses } = body as {
      responses?: Array<{ dimensionId: string; score: number }>;
    };

    if (!responses || !Array.isArray(responses)) {
      return res
        .status(400)
        .json({ error: "Invalid request body: 'responses' array is required" });
    }

    const responsesText = responses
      .map((r) => `Dimension ${r.dimensionId}: Score ${r.score}/10`)
      .join("\n");

    const prompt = `
      You are an expert in Cloud FinOps and AI cost governance.

      Analyze the following AI Cost Readiness Assessment scores for an organization across several dimensions.
      Scores range from 0 (not implemented) to 10 (fully optimized).

      Assessment Data:
      ${responsesText}

      Produce a JSON response with the following schema:
      {
        "overallReadiness": string,
        "executiveSummary": string,
        "keyStrengths": string[],
        "criticalGaps": string[],
        "roadmap": [
          { "phase": string, "action": string, "impact": string }
        ]
      }

      The tone should be concise, professional, and actionable for a CTO or VP Engineering.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI Cloud FinOps expert." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0].message.content;
    if (!text) {
      return res.status(500).json({ error: "Empty response from OpenAI" });
    }

    const report = JSON.parse(text);
    return res.status(200).json(report);
  } catch (error: any) {
    console.error("Error in /api/generate-report:", error);
    return res.status(500).json({
      error: "OPENAI_CALL_FAILED",
      details: error?.message ?? String(error),
    });
  }
}
