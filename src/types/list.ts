import type { TabType } from "./filter";

export const TODAYTASKTITLE = ["제목", "날짜", "학습지", "목표", "피드백 작성"];
export const FEEDBACKTITLE = ["제목", "날짜", "학습지", "목표", "피드백"];
export const ADDTODOTITLE = ["제목", "날짜", "학습지", "목표", "피드백 작성", "과목"];

export const SubjectMap: Record<string, string> = {
    국어: "KOR",
    영어: "ENG",
    수학: "MATH",
};

export const SubjectIdMap: Record<string, number> = {
    국어: 1,
    영어: 2,
    수학: 3,
};

export type ListType = "할일" | "피드백";

export type FilterableItem = TodoItem | FeedbackItem;

export interface BaseItem {
  id: number;
  title: string;
  date: string;
  file?: string;
  goal?: string;
  category: TabType;
}

export interface TodoItem extends BaseItem {
  type: "할일";
  isFeedback: boolean;
}

export interface FeedbackItem extends BaseItem {
  type: "피드백";
  feedback: string;
}

export type ListItem =
  | TodoItem
  | FeedbackItem

export interface ListProps {
  title: string;
  type: ListType;
}

export const LIST_TITLES: Record<ListType, string[]> = {
  할일: TODAYTASKTITLE,
  피드백: FEEDBACKTITLE,
};