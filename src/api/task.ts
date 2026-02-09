import { api } from "./axios";
import type { AddTaskRequest, AddTaskResponse, FileUploadResponse } from "../types/task";

export async function addTask(payload: AddTaskRequest): Promise<AddTaskResponse> {
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