import { api } from "./axios";
import type {
  AddTaskRequest,
  AddTaskResponse,
  FileUploadResponse,
  MonthlyTaskResponse,
  SubmitTaskResponse,
  TaskDetailResponse,
  TaskResponse,
} from "../types/task";

export async function addTask(
  payload: AddTaskRequest,
): Promise<AddTaskResponse> {
  const res = await api.post<AddTaskResponse>("/tasks", payload);
  return res.data;
}

export async function fileUpload(
  task_id: number,
  file: File,
): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(`/tasks/${task_id}/attachment`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getTasks(
  mentee_id: number,
  date: string,
): Promise<TaskResponse> {
  const res = await api.get("/tasks", {
    params: { mentee_id, date },
  });
  return res.data;
}

export async function getTaskDetail(
  task_id: number,
  mentee_id: number,
): Promise<TaskDetailResponse> {
  const res = await api.get(`/tasks/${task_id}`, {
    params: { mentee_id: mentee_id },
  });
  return res.data;
}

export async function getMonthlyTask(
  mentee_id: number,
  year: number,
  month: number,
): Promise<MonthlyTaskResponse> {
  const res = await api.get("/tasks/monthly", {
    params: { mentee_id: mentee_id, year: year, month: month },
  });
  return res.data;
}

export async function submitTask(
  task_id: number,
  completion_photo: string,
): Promise<SubmitTaskResponse> {
  const formData = new FormData();
  formData.append("completion_photo", completion_photo);

  const res = await api.post(`/tasks/${task_id}/submit`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: { task_id: task_id },
  });
  return res.data;
}