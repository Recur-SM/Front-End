import type { TodoItem } from "../types/list";

export const mockTodos: TodoItem[] = [
  {
    id: '1',
    title: '수학 오답 노트',
    date: '1월 18일',
    file: '수학_오답노트_양식_설스터디.pdf',
    goal: '오답노트 정리',
    isFeedback: true,
    category: '수학',
  },
  {
    id: '2',
    title: '단어 읽기',
    date: '1월 18일',
    goal: '3개 이상 틀리지 않기',
    isFeedback: false,
    category: '영어',
  },
  {
    id: '3',
    title: '강지연 국어',
    date: '1월 18일',
    goal: '',
    isFeedback: false,
    category: '국어',
  },
  {
    id: '4',
    title: '문법 강의',
    date: '1월 18일',
    file: '언어(문법)_오답노트_설스터디.pdf',
    goal: '오답노트 정리',
    isFeedback: false,
    category: '국어',
  },
  {
    id: '5',
    title: '문학인강',
    date: '1월 18일',
    file: '언어(문법)_오답노트_설스터디.pdf',
    goal: '오답노트 정리',
    isFeedback: false,
    category: '국어',
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
  id: string;
  value: boolean;
}): Promise<TodoItem> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const todo = mockTodos.find((t) => t.id === id);
  if (!todo) throw new Error('Todo not found');
  
  return { ...todo, isFeedback: value };
};