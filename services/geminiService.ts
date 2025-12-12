import { UserResponse, AnalysisReport } from "../types";

export const generateReadinessReport = async (
  responses: UserResponse[]
): Promise<AnalysisReport> => {
  const res = await fetch("/api/generate-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ responses }),
  });

  if (!res.ok) {
    console.error("API error", res.status, await res.text());
    throw new Error("Failed to generate readiness report");
  }

  return (await res.json()) as AnalysisReport;
};
