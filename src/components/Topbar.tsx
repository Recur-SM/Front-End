import { useState } from 'react';

const Topbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('학습 관리');

  return (
    <header className="h-[7.04vh] w-full bg-white border-b border-gray-200 relative flex items-end justify-center">
      {/* 탭 메뉴 */}
      <nav className="flex gap-[3.33vw] h-full items-end">
        {['학습 관리', '플래너'].map((tab) => {
          const isSelected = activeTab === tab;
          
          return (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                cursor-pointer text-[1.39vh] font-bold relative transition-all
                pb-[1.67vh] px-[0.21vw]
                ${isSelected 
                  ? 'text-gray-900 border-b-[0.28vh] border-gray-800'
                  : 'text-gray-400 border-b-[0.28vh] border-transparent'
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