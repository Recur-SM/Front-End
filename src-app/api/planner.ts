import { api } from "./axios";
import type { PlannerUploadRequest, PlannerUploadResponse } from "../types/planner";

export async function uploadPlanner(
  payload: PlannerUploadRequest
): Promise<PlannerUploadResponse> {
  const { menteeId, plannerDate, content, image } = payload;
  const formData = new FormData();
  formData.append("image", image);

  const res = await api.post("/planners", formData, {
    params: { menteeId, plannerDate, content },
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}
