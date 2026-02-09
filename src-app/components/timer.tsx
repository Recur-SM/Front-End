import { useState, useEffect } from "react";
import PlayIcon from "../assets/play.svg"; 
import StopIcon from "../assets/stop.svg"; 
import PauseIcon from "../assets/pause.svg"; 

interface TimerProps {
  title: string;
  initialSeconds: number;
  isCompleted: boolean;
  onStatusChange: (time: number) => void;
}

const TimerItem = ({ title, initialSeconds, isCompleted, onStatusChange }: TimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: any;
    if (isActive && !isCompleted) {
      interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isCompleted]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="w-full h-[44px] flex items-center px-[4px]">
      <span className="w-[107px] text-[14px] font-medium text-[#111111] truncate">{title}</span>
      
      <div className="flex items-center gap-[8px]">
        {isCompleted ? (
          <button onClick={() => onStatusChange(seconds)}>
            <img src={PlayIcon} alt="다시 시작" className="w-[24px] h-[24px]" />
          </button>
        ) : (
          <div className="flex items-center gap-[4px]">
            {isActive ? (
              <>
                <button onClick={() => { setIsActive(false); onStatusChange(seconds); }}>
                  <img src={StopIcon} alt="정지" className="w-[24px] h-[24px]" />
                </button>
                <button onClick={() => setIsActive(false)}>
                  <img src={PauseIcon} alt="일시정지" className="w-[24px] h-[24px]" />
                </button>
              </>
            ) : (
              <button onClick={() => setIsActive(true)}>
                <img src={PlayIcon} alt="재생" className="w-[24px] h-[24px]" />
              </button>
            )}
          </div>
        )}
        
        <span className={`text-[12px] font-medium w-[60px] text-right ${
          isActive || isCompleted ? 'text-[#FF8A00]' : 'text-[#A1A1A1]'
        }`}>
          {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
};

export default TimerItem;