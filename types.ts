export interface AssessmentDimension {
  id: string;
  label: string;
  description: string;
  category: 'Visibility' | 'Control' | 'Business Value';
  question: string;
}

export interface AssessmentOption {
  value: number;
  label: string;
  description: string;
}

export interface UserResponse {
  dimensionId: string;
  score: number; // 0, 5, 10
}

export interface AnalysisReport {
  overallReadiness: string;
  executiveSummary: string;
  keyStrengths: string[];
  criticalGaps: string[];
  roadmap: {
    phase: string;
    action: string;
    impact: string;
  }[];
}

export enum AppState {
  LANDING,
  ASSESSMENT,
  ANALYZING,
  RESULTS
}
