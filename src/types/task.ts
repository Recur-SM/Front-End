type TaskType = "FIXED" | "ADDITIONAL";
type MaterialType = "COLUMN" | "PDF";

export interface TaskDetailResult {
  task_id: number;
  task_date: string; 
  task_name: string;
  task_goal: string;
  task_type: TaskType;
  learning_material_type: MaterialType;
  pdf_file_url: string;
  column_content: string;
  is_fixed: boolean;
  created_at: string;  
  updated_at: string; 
}

export interface TaskDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TaskDetailResult;
}

export interface AddTaskRequest {
  menteeId: number;
  mentorId: number;
  subjectCode: string;
  taskName: string;
  taskDate: string;
  taskGoal?: string;
  taskType: TaskType; 
  learningMaterialType?: MaterialType;
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
  taskType: TaskType;
  learningMaterialType: MaterialType;
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
  taskType: TaskType;
  learningMaterialType: MaterialType;
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