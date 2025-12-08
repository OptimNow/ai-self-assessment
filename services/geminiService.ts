import { GoogleGenAI, Type } from "@google/genai";
import { UserResponse, AnalysisReport } from "../types";
import { DIMENSIONS } from "../constants";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateReadinessReport = async (responses: UserResponse[]): Promise<AnalysisReport> => {
  if (!apiKey) {
    // Fallback mock for development if no key is provided
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

  const responsesText = responses.map(r => {
    const dimension = DIMENSIONS.find(d => d.id === r.dimensionId);
    return `${dimension?.label}: Score ${r.score}/10`;
  }).join('\n');

  const prompt = `
    Analyze the following AI Cost Readiness Assessment scores for an organization.
    The scores are based on 10 dimensions of FinOps maturity for AI.
    0 means not implemented, 5 means partial, 10 means fully optimized.

    Assessment Data:
    ${responsesText}

    Generate a strategic readiness report. Be professional, concise, and actionable for a CTO/VP of Engineering.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallReadiness: { type: Type.STRING, description: "A short phrase describing the overall state (e.g., 'Emerging', 'Maturing', 'Leader')" },
            executiveSummary: { type: Type.STRING, description: "A 2-3 sentence summary of the assessment." },
            keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of top 2-3 performing areas." },
            criticalGaps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of bottom 2-3 areas needing attention." },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING, description: "Timeframe (e.g., Immediate, Q2, Long-term)" },
                  action: { type: Type.STRING, description: "Specific action to take." },
                  impact: { type: Type.STRING, description: "Expected business impact." }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisReport;

  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};
