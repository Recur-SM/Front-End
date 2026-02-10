export interface PlannerResult {
  plannerId: number;
  menteeId: number;
  mentorId: number;
  plannerDate: string; 
  content: string;
  imageUrl: string;
  mentorComment: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlannerResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlannerResult;
}
