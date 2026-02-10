import type {
  AddPlannerCommentRequest,
  AddPlannerCommentResponse,
  PlannerResponse,
} from "../types/planner";
import { api } from "./axios";

export async function getPlanner(
  menteeId: number,
  plannerDate: string,
): Promise<PlannerResponse> {
  const res = await api.get("/planners", {
    params: { menteeId, plannerDate },
  });
  return res.data;
}

export async function addPlannerComment(
  payload: AddPlannerCommentRequest,
): Promise<AddPlannerCommentResponse> {
  const res = await api.post("/planners/comment", payload);
  return res.data;
}
