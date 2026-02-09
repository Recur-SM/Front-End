import type { AddTaskRequest, AddTaskResponse } from "../types/task";
import { api } from "./axios";

export async function addTask(payload: AddTaskRequest): Promise<AddTaskResponse> {
    const res = await api.post<AddTaskResponse>("/tasks", payload);
    return res.data;
}