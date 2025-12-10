export interface Student {
  id: string;
  name: string;
  branch: string;
  cgpa: number;
  skills: string[];
  projects: number;
  internships: number;
  placed: boolean;
  companyId?: string;
  package?: number; // LPA
  resumeText?: string;
}

export interface Company {
  id: string;
  name: string;
  minCgpa: number;
  offeredRole: string;
  package: number; // LPA
  hires: number;
  arrivalDate: string;
  rounds: number;
  requiredSkills: string[];
  salaryTrend: { year: number; package: number }[];
}

export enum PlacementProbability {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export interface PlacementStat {
  branch: string;
  placedCount: number;
  totalCount: number;
  avgPackage: number;
}

export interface ResumeAnalysisResult {
  score: number;
  keywordCount: number;
  missingSkills: string[];
  matchedSkills: string[];
  feedback: string;
}