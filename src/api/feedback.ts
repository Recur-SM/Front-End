import type { AddFeedbackReponse, AddFeedbackRequest, FeedbackListResponse, FeedbackResponse } from "../types/feedback";
import { api } from "./axios";

export async function addFeedback(payload: AddFeedbackRequest): Promise<AddFeedbackReponse> {
    const res = await api.post<AddFeedbackReponse>("/feedback", payload);
    return res.data;
}

export async function getFeedbackList(
    menteeId: number,
): Promise<FeedbackListResponse> {
    const res = await api.get(`/feedback/mentee/${menteeId}`);
    return res.data;
}

export async function getFeedback(
    feedbackId: number,
): Promise<FeedbackResponse> {
    const res = await api.get(`/feedback/mentee/${feedbackId}`);
    return res.data;
}