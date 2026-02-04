import { useState } from 'react';

const Topbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('학습 관리');

  return (
    <header className="h-[76px] w-full bg-white border-b border-gray-200 relative flex items-end justify-center">
      {/* 탭 메뉴 */}
      <nav className="flex gap-16 h-full items-end">
        {['학습 관리', '플래너'].map((tab) => {
          const isSelected = activeTab === tab;
          
          return (
            <div
              key={tab}
              // 클릭 시 상태를 변경하는 함수 추가
              onClick={() => setActiveTab(tab)}
              className={`
                cursor-pointer text-[15px] font-bold relative transition-all
                /* pb-[18px]로 글자를 바닥 선에서 띄워줍니다 */
                pb-[18px] px-1
                ${isSelected 
                  ? 'text-gray-900 border-b-[3px] border-gray-800'
                  : 'text-gray-400 border-b-[3px] border-transparent'
                }
              `}
            >
              {tab}
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Topbar;