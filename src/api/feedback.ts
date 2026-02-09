import type { AddFeedbackReponse, AddFeedbackRequest } from "../types/feedback";
import { api } from "./axios";

export async function addFeedback(payload: AddFeedbackRequest): Promise<AddFeedbackReponse> {
    const res = await api.post<AddFeedbackReponse>("/feedback", payload);
    return res.data;
}