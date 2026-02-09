import { useEffect, useRef, useState } from "react";
import { SubjectIdMap, type TodoItem } from "../../types/list";
import type { AddFeedbackRequest } from "../../types/feedback";
import { useMenteeStore } from "../../stores/menteeStroe";
import { useAuthStore } from "../../stores/authStore";
import { addFeedback, getFeedbackList } from "../../api/feedback";
import { useScrollStore } from "../../stores/scrollStore";

interface AssignmentBoardProps {
  todos: TodoItem[];
}

const AssignmentBoard = ({ todos }: AssignmentBoardProps) => {
  const [values, setValues] = useState<Record<number, string>>({});
  const { selectedMentee } = useMenteeStore();
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackIds, setFeedbackIds] = useState<Record<number, number>>({});
  const { id } = useAuthStore();
  const textareaRefs = useRef<Record<number, HTMLTextAreaElement | null>>({});
  const todoRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const { targetTaskId, clearTarget } = useScrollStore();

  useEffect(() => {
    // todos가 로드되고 targetTaskId가 있을 때만 스크롤
    if (!targetTaskId && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }

    if (targetTaskId && todos.length > 0 && !isLoading) {
      // 약간의 delay로 ref 연결 대기
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          const element = todoRefs.current[targetTaskId];

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });

            element.classList.add("highlight-task");
            setTimeout(() => {
              element.classList.remove("highlight-task");
              clearTarget();
            }, 2000);
          } else {
            // 한 번 더 재시도
            setTimeout(() => {
              const retryEl = todoRefs.current[targetTaskId];
              if (retryEl) {
                retryEl.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                retryEl.classList.add("highlight-task");
                setTimeout(() => {
                  retryEl.classList.remove("highlight-task");
                  clearTarget();
                }, 2000);
              } else {
                clearTarget();
              }
            }, 200);
          }
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        clearTarget();
      };
    }
  }, [targetTaskId, todos, isLoading, clearTarget]);

  useEffect(() => {
    let isMounted = true;

    const loadFeedbacks = async () => {
      if (todos.length === 0 || !selectedMentee?.menteeId) {
        setIsLoading(false);
        return;
      }

      try {
        // 멘티의 모든 피드백 목록 조회
        const feedbackList = await getFeedbackList(selectedMentee.menteeId);

        const newValues: Record<number, string> = {};
        const newFeedbackIds: Record<number, number> = {};

        if (feedbackList?.result?.feedbacks) {
          feedbackList.result.feedbacks.forEach((feedback) => {
            const matchedTodo = todos.find(
              (todo) => todo.id === feedback.taskId,
            );

            if (matchedTodo && feedback.detailContent) {
              newValues[matchedTodo.id] = feedback.detailContent;
              newFeedbackIds[matchedTodo.id] = feedback.feedbackId;
            }
          });
        }

        if (isMounted) {
          setValues(newValues);
          setFeedbackIds(newFeedbackIds);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("피드백 조회 실패:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFeedbacks();

    return () => {
      isMounted = false;
    };
  }, [todos, selectedMentee]);
  useEffect(() => {
    Object.entries(values).forEach(([todoId, value]) => {
      const el = textareaRefs.current[Number(todoId)];
      if (el && value) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    });
  }, [values]);

  const handleChange = (todoId: number, value: string) => {
    setValues((prev) => ({
      ...prev,
      [todoId]: value,
    }));

    const el = textareaRefs.current[todoId];
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleSubmit = async (todo: TodoItem) => {
    const content = values[todo.id];
    const taskCode = SubjectIdMap[todo.category];

    if (!content?.trim()) return;

    const payload: AddFeedbackRequest = {
      taskId: todo.id,
      menteeId: selectedMentee!.menteeId,
      mentorId: id!,
      subjectId: taskCode,
      feedbackDate: new Date().toISOString().slice(0, 10),
      detailContent: content,
    };

    try {
      const res = await addFeedback(payload);
      console.log(res);

      if (res?.result.feedbackId) {
        setFeedbackIds((prev) => ({
          ...prev,
          [todo.id]: res.result.feedbackId,
        }));
      }
    } catch {
      console.error("피드백 작성에 실패했습니다.");
    }
  };

  if (todos.length === 0) {
    return (
      <div className="flex w-full justify-center items-center">
        <span className="text-[#767676]">내용이 없습니다</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center py-10">
        <span className="text-[#767676]">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {todos.map((todo) => {
        const value = values[todo.id] ?? "";

        return (
          <div
            key={todo.id}
            ref={(el) => {
              todoRefs.current[todo.id] = el;
            }}
            className="transition-all duration-300"
          >
            <span className="font-semibold text-lg">{todo.title}</span>

            <div className="flex w-full gap-1 py-2">
              <div className="flex w-1/3 justify-center items-center bg-[#99999933] h-[130px] rounded-lg border border-[#767676] text-sm">
                <span className="text-[#767676]">등록된 과제가 없습니다</span>
              </div>

              <div className="relative flex flex-col w-2/3 min-h-[130px] bg-white rounded-lg">
                <span className="px-7 py-5 font-semibold text-lg">피드백</span>

                {!value && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#B0B0B0] text-sm">
                    내용이 없습니다
                  </div>
                )}

                <textarea
                  ref={(el) => {
                    textareaRefs.current[todo.id] = el;
                  }}
                  value={value}
                  onChange={(e) => handleChange(todo.id, e.target.value)}
                  rows={1}
                  className="
                    w-full
                    resize-none
                    overflow-hidden
                    outline-none
                    bg-transparent
                    text-[#767676]
                    px-7
                    pb-5
                  "
                />
                <button
                  className="
                    absolute
                    bottom-3
                    right-3
                    text-xs
                    px-3
                    py-1
                    border
                    rounded-2xl
                    bg-white
                    hover:bg-gray-50
                  "
                  onClick={() => handleSubmit(todo)}
                >
                  {feedbackIds[todo.id] ? "수정 완료" : "작성 완료"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentBoard;
