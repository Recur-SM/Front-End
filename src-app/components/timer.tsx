import { useState, useEffect } from "react";
import PlayIcon from "../assets/play.svg"; 
import StopIcon from "../assets/stop.svg"; 
import PauseIcon from "../assets/pause.svg"; 

interface TimerProps {
    title: string;
}

const TimerItem = ({ title }: TimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: number | undefined;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className="w-full h-[44px] flex items-center px-[4px]">
            {/* 할 일 */}
            <span className="w-[107px] text-[14px] font-medium text-[#111111] truncate">
                {title}
            </span>
            
            <div className="flex items-center gap-[8px]">
                {/* 타이머 버튼 구역 */}
                {isActive ? (
                    /* 측정 중 */
                    <div className="w-full h-[44px] flex items-center gap-[4px]">
                        <button 
                            onClick={() => {setIsActive(false); setSeconds(0);}}
                            className="w-[24px] h-[24px] flex items-center justify-center"
                        >
                            <img src={StopIcon} alt="정지" className="w-full h-full" />
                        </button>
                        <button 
                            onClick={() => setIsActive(false)}
                            className="w-[24px] h-[24px] flex items-center justify-center"
                        >
                            <img src={PauseIcon} alt="일시정지" className="w-full h-full" />
                        </button>
                    </div>
                ) : (
                    /* 대기 중 */
                    <button 
                        onClick={() => setIsActive(true)}
                        className="w-[24px] h-[24px] flex items-center justify-center"
                    >
                        <img src={PlayIcon} alt="재생" className="w-full h-full" />
                    </button>
                )}
                
                {/* 시간 표시 */}
                <span className={`text-[12px] font-medium text-right transition-colors ${
                    isActive ? 'text-[#FF8A00]' : 'text-[#A1A1A1]'
                }`}>
                    {formatTime(seconds)}
                </span>
            </div>
        </div>
    );
};

export default TimerItem;