import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/backIcon.svg";
import TimerItem from "../components/timer"; 

const Record = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([
        { id: 1, title: "단어 암기", time: 0, isCompleted: false },
        { id: 2, title: "강지연 국어", time: 0, isCompleted: false },
        { id: 3, title: "수학 오답 노트", time: 5554, isCompleted: true },
    ]);

    const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

    const handleStatusChange = (id: number, currentTime: number, nextStatus: boolean) => {
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, isCompleted: nextStatus, time: currentTime } : task
        ));

        if (nextStatus === false) {
            setActiveTaskId(id);
        } else {
            if (activeTaskId === id) setActiveTaskId(null);
        }
    };

    const todoTasks = tasks.filter(t => !t.isCompleted);
    const completedTasks = tasks.filter(t => t.isCompleted);

    return (
        <div className="webapp-root w-full min-h-screen pt-[99px] pb-[32px] flex flex-col items-center gap-[8px]">
            <div className="w-[384px] flex justify-end px-[4px]">
                <div 
                    onClick={() => navigate("/mentee-a/assignment-management")}
                    className="w-[89px] h-[30px] rounded-[12px] flex justify-center items-center gap-[4px] border border-[#E5E5EC] text-[12px] text-[#767676] bg-white cursor-pointer active:bg-gray-50"
                >
                    <img src={BackIcon} alt="돌아가기" className="w-[20px] h-[20px]" />
                    <span>돌아가기</span>
                </div>
            </div>

            <div className="w-[384px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] flex flex-col gap-[20px]">
                <div>
                    <h3 className="text-[20px] font-semibold text-[#111111] mb-[24px]">1월 8일 할 일</h3>
                    <div className="flex flex-col gap-[4px]">
                        {todoTasks.map(task => (
                            <TimerItem 
                                key={task.id} 
                                title={task.title} 
                                initialSeconds={task.time}
                                isCompleted={false}
                                autoStart={activeTaskId === task.id}
                                onStatusChange={(time) => handleStatusChange(task.id, time, true)} 
                            />
                        ))}
                    </div>
                </div>

                {completedTasks.length > 0 && (
                    <>
                        <hr className="border-[#E5E5EC]" />
                        <div>
                            <h3 className="text-[20px] font-semibold text-[#111111] mb-[24px]">완료</h3>
                            <div className="flex flex-col gap-[4px]">
                                {completedTasks.map(task => (
                                    <TimerItem 
                                        key={task.id} 
                                        title={task.title} 
                                        initialSeconds={task.time}
                                        isCompleted={true}
                                        onStatusChange={(time) => handleStatusChange(task.id, time, false)} 
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Record;