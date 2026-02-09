interface TopbarProps {
  activeTab: "학습 관리" | "과제 관리";
  setActiveTab: (tab: "학습 관리" | "과제 관리") => void;
}

const Topbar: React.FC<TopbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["학습 관리", "과제 관리"] as const;

  return (
    <>
      <header className="h-[7.04vh] w-full relative flex items-end justify-center">
        {/* 탭 메뉴 */}
        <nav className="flex gap-[3.33vw] h-full items-end">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab;

            return (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                cursor-pointer text-base relative transition-all
                pb-[1vh] px-[0.21vw]
                ${
                  isSelected
                    ? "text-gray-900 border-b-[0.28vh] border-gray-800"
                    : "text-gray-400 border-b-[0.28vh] border-transparent"
                }
              `}
              >
                {tab}
              </div>
            );
          })}
        </nav>
      </header>
    </>
  );
};

export default Topbar;
