export interface AddTaskRequest {
  menteeId: number;
  mentorId: number;
  subjectCode: string;
  taskName: string;
  taskDate: string;
  taskGoal?: string;
  taskType: "FIXED" | "ADDITIONAL"; 
  learningMaterialType?: "COLUMN" | "PDF";
  columnContent?: string;
  comment?: string;
}

export interface AddTaskResult {
  taskId: number;
  menteeId: number;
  mentorId: number;
  subjectName: string;
  subjectCode: string;
  taskName: string;
  taskDate: string;
  taskGoal: string;
  taskType: "FIXED" | "ADDITIONAL";
  learningMaterialType: "COLUMN" | "PDF";
  pdfFileUrl: string;
  columnContent: string;
  comment: string;
  isFixed: boolean;
  createdAt: string;
}

export interface AddTaskResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AddTaskResult;
}

export interface FileUploadResult {
  taskId: number;
  attachmentUrl: string;
}

export interface FileUploadResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FileUploadResult;
}

export interface Task {
  taskId: number;
  subjectName: string;
  subjectCode: string;
  taskName: string;
  taskDate: string;
  taskGoal: string;
  taskType: "FIXED" | "ADDITIONAL";
  learningMaterialType: "COLUMN" | "PDF";
  pdfFileUrl: string;
  columnContent: string;
  comment: string;
  isCompleted: boolean;
  studyTime: number;
  completionPhotoUrl: string;
  completedAt: string;
  hasFeedback: boolean;
}

export interface TaskResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    plannerDate: string;
    tasks: Task[];
  };
}