import OpenAI from "openai";
import { UserResponse, AnalysisReport } from "../types";
import { DIMENSIONS } from "../constants";

const apiKey = process.env.API_KEY || '';

const client = new OpenAI({ apiKey });

export const generateReadinessReport = async (
  responses: UserResponse[]
): Promise<AnalysisReport> => {

  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return {
      overallReadiness: "Moderate",
      executiveSummary: "Please configure your API Key to get a real analysis. Your organization shows promise in basic visibility but lacks advanced control mechanisms.",
      keyStrengths: ["Initial Setup", "Basic Tracking"],
      criticalGaps: ["Real-time alerting", "Unit Economics"],
      roadmap: [
        { phase: "Immediate", action: "Implement a proxy gateway", impact: "High" },
        { phase: "Short-term", action: "Setup budget alerts", impact: "Medium" }
      ]
    };
  }

  const responsesText = responses
    .map(r => {
      const dimension = DIMENSIONS.find(d => d.id === r.dimensionId);
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

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // tu peux changer pour gpt-4.1 ou autre
      messages: [
        { role: "system", content: "You are an AI Cloud FinOps expert." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const text = completion.choices[0].message.content;
    if (!text) throw new Error("Empty response from OpenAI");

    return JSON.parse(text) as AnalysisReport;

  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};
