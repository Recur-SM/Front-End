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

export interface AddPlannerCommentRequest {
  plannerId: number;
  menteeId: number;
  mentorId: number;
  mentorComment: string;
}

export interface AddPlannerCommentResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    plannerId: number;
    menteeId: number;
    mentorId: number;
    plannerDate: string;
    mentorComment: string;
    updatedAt: string; 
  };
}
