export interface Submission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  department: string;
  submittedAt: string;
}

export interface SubmissionInput {
  fullName: string;
  email: string;
  mobile: string;
  department: string;
}

export interface SubmissionUpdate {
  fullName: string;
  mobile: string;
  department: string;
}

export interface SubmissionResult {
  success: boolean;
  error?: string;
}

export const DEPARTMENTS: readonly string[] = [
  'Engineering',
  'Marketing',
  'Human Resources',
  'Finance',
  'Operations',
  'Design'
] as const;