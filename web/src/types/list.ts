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