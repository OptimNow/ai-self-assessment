import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { DIMENSIONS } from "../constants";
import { UserResponse, AnalysisReport } from "../types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY env var");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { responses } = body as { responses: UserResponse[] };

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const responsesText = responses
      .map((r) => {
        const dimension = DIMENSIONS.find((d) => d.id === r.dimensionId);
        return `${dimension?.label}: Score ${r.score}/10`;
      })
      .join("\n");

    const prompt = `
      You are an expert in Cloud FinOps and AI cost governance.

      Analyze the following AI Cost Readiness Assessment scores for an organization across 10 dimensions.
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
      model: "gpt-4o-mini", // ou autre modèle OpenAI
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

    const report = JSON.parse(text) as AnalysisReport;
    return res.status(200).json(report);
  } catch (error) {
    console.error("Error in /api/generate-report:", error);
    return res.status(500).json({ error: "Failed to generate readiness report" });
  }
}
