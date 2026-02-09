import type { MenteeResponse } from "../types/mentee";
import { api } from "./axios";

export async function getMentees(): Promise<MenteeResponse> {
  const res = await api.get("/mentoring/mentees");
  return res.data;
}