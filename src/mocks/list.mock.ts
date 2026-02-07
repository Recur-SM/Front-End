import type { FeedbackItem, TodoItem, WeeklyReportItem } from "../types/list";

export const mockTodos: TodoItem[] = [
  {
    id: 1,
    title: "수학 오답 노트",
    date: "2026-02-07",
    file: "수학_오답노트_양식_설스터디.pdf",
    goal: "오답노트 정리",
    isFeedback: true,
    category: "수학",
    type: "할일",
  },
  {
    id: 2,
    title: "단어 읽기",
    date: "2026-02-07",
    goal: "3개 이상 틀리지 않기",
    isFeedback: false,
    category: "영어",
    type: "할일",
  },
  {
    id: 3,
    title: "강지연 국어",
    date: "2026-02-07",
    goal: "",
    isFeedback: false,
    category: "국어",
    type: "할일",
  },
  {
    id: 4,
    title: "문법 강의",
    date: "2026-02-08",
    file: "언어(문법)_오답노트_설스터디.pdf",
    goal: "오답노트 정리",
    isFeedback: false,
    category: "국어",
    type: "할일",
  },
  {
    id: 5,
    title: "문학인강",
    date: "2026-02-08",
    file: "언어(문법)_오답노트_설스터디.pdf",
    goal: "오답노트 정리",
    isFeedback: false,
    category: "국어",
    type: "할일",
  },
];

export const mockFeedbacks: FeedbackItem[] = [
  {
    id: 1,
    title: "영어 과제",
    date: "1월 17일",
    feedback:
      "오늘도 수고하셨어요!! 지금처럼 꾸준히 틀린 문제가 있다면 오답 정리 꼼꼼히 해주세요!",
    category: "영어",
    type: "피드백",
  },
  {
    id: 2,
    title: "독서 2지문",
    date: "1월 17일",
    feedback: "오늘도 고생 많았어요. <보기>도 따로 잘 찍어서 올려주셨네요.",
    category: "국어",
    type: "피드백",
  },
];

export const mockWeeklyReports: WeeklyReportItem[] = [
  {
    id: 1,
    title: "1주차",
    period: "12월 1일 ~ 12월 6일",
    mentorSummary:
      "한 주 동안 수고하셨습니다! 첫 일주일인데 잘 따라와주셔서 너무 감사했어요. 다음주도 화이팅입니다!",
    goodPoints:
      "수학 비중이 많아서 다 해낼 수 있을까 걱정했는데 시간 분배를 잘 맞춰줬어요. 이렇게만 가면 될 것 같네요.",
    improvements:
      "영어 단어 시험 오답이 빠져있네요! 다음주에는 오답까지 꼼꼼하게 해봅시다!",
    type: "주간",
  },
  {
    id: 2,
    title: "2주차",
    period: "12월 7일 ~ 12월 13일",
    mentorSummary:
      "한 주 동안 고생하셨습니다. 이번주는 제가 계절학기라 ㅜㅜ 많이 신경써드리지 못한 것 같아 죄송하네요. 다음주도 같이 힘내봐요!",
    goodPoints:
      "이번주에 수학 오답 노트 작성 방식을 마스터 한 것 같네요! 이렇게 쭉 이어나가면 됩니다 ㅎㅎ",
    improvements:
      "아침에 잠이 많아졌네요. 다음주부터는 조금 더 일찍 일어나봅시다!",
    type: "주간",
  },
];

export const fetchMockTodos = async (): Promise<TodoItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTodos;
};

export const updateMockFeedback = async ({
  id,
  value,
}: {
  id: number;
  value: boolean;
}): Promise<TodoItem> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const todo = mockTodos.find((t) => t.id === id);
  if (!todo) throw new Error("Todo not found");

  return { ...todo, isFeedback: value };
};
