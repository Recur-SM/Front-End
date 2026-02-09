export interface PlannerUploadRequest {
  menteeId: number;
  plannerDate: string;
  content: string;
  image: File;
}

export interface PlannerUploadResult {
  plannerId?: number;
  imageUrl?: string;
}

export interface PlannerUploadResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlannerUploadResult;
}
