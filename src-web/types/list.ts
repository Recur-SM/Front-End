<<<<<<< HEAD
export const TODAYTASKTITLE = ["제목", "날짜", "학습지", "목표", "피드백 작성"];

export interface ListProps {
  title: string;
}

export interface TodoItem {
  id: string;
  title: string;
  date: string;
  file?: string;
  goal: string;
  isFeedback: boolean;
  category: '국어' | '영어' | '수학';
}
=======
import type { TabType } from "./filter";

export const TODAYTASKTITLE = ["제목", "날짜", "학습지", "목표", "피드백 작성"];
export const FEEDBACKTITLE = ["제목", "날짜", "학습지", "목표", "피드백"];
export const WEEKLYTITLE = ["제목", "날짜", "멘토 총평", "이번주 잘한 점", "다음주 보완할 점"];
export const ADDTODOTITLE = ["제목", "날짜", "학습지", "목표", "피드백 작성", "과목"];

export type ListType = "할일" | "피드백" | "주간";

export type FilterableItem = TodoItem | FeedbackItem;
export type WeeklyItem = WeeklyReportItem;

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

export interface WeeklyReportItem {
  type: "주간";
  id: number;
  title: string;
  period: string;
  mentorSummary: string;
  goodPoints: string;
  improvements: string;
}

export type ListItem =
  | TodoItem
  | FeedbackItem
  | WeeklyReportItem;

export interface ListProps {
  title: string;
  type: ListType;
}

export const LIST_TITLES: Record<ListType, string[]> = {
  할일: TODAYTASKTITLE,
  피드백: FEEDBACKTITLE,
  주간: WEEKLYTITLE,
};
>>>>>>> e4845d1d2761bc22bf059e99466ab1dd388d374f
