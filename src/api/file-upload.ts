import type { FileUploadResponse } from "../types/task";
import { api } from "./axios";

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
