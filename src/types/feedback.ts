export interface AddFeedbackRequest {
  taskId: number;
  menteeId: number;
  mentorId: number;
  subjectId: number;
  feedbackDate: string;
  detailContent: string;
}

export interface AddFeedbackResult {
  feedbackId: number;
  taskId: number;
  taskName: string;
  menteeId: number;
  menteeName: string;
  mentorId: number;
  mentorName: string;
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  feedbackDate: string;
  detailContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddFeedbackReponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AddFeedbackResult;
}

export interface FeedbackListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MenteeFeedbackResult;
}

export interface Feedback {
  feedbackId: number;
  taskId: number;
  taskName: string;
  menteeId: number;
  menteeName: string;
  mentorId: number;
  mentorName: string;
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  feedbackDate: string; 
  detailContent: string;
  createdAt: string; 
  updatedAt: string; 
}

export interface MenteeFeedbackResult {
  menteeId: number;
  menteeName: string;
  feedbacks: Feedback[];
}

export interface FeedbackItem {
  feedbackId: number;
  taskId: number;
  title: string;
  date: string;
  content: string;
}