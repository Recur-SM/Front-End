import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from "../assets/arrow.svg";
import DownloadIcon from "../assets/download.svg";

interface ListItem {
  title: string;
  date: string;
  file?: string;
  subject?: string;
}

interface ListProps {
  title: string;
  type: 1 | 2 | 3;
  items?: ListItem[];
  onAdd?: (newTodo: { title: string; subject: string }) => void;
}

const List = ({ title, type, items = [], onAdd }: ListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeFilter, setActiveFilter] = useState("전체");
  const [newTitle, setNewTitle] = useState("");
  const [selectedSub, setSelectedSub] = useState("국");
  
  const navigate = useNavigate();
  const filters = ["전체", "국어", "영어", "수학"];

  const getTodayDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${month}월 ${date}일`;
  };
  
  const filteredItems = items.filter((item) => {
    if (activeFilter === "전체") return true;
    return item.subject === activeFilter;
  });

  const handleConfirm = () => {
    if (newTitle.trim() && onAdd) {
      const subjectMap: { [key: string]: string } = { "국": "국어", "영": "영어", "수": "수학" };
      onAdd({ title: newTitle, subject: subjectMap[selectedSub] });
      
      setNewTitle("");
      setIsAdding(false);
    }
  };

  const handleTitleClick = (item: ListItem) => {
    navigate('/app/assignment-detail', { state: { assignment: item } });
  };

  const handleDownload = (fileName: string) => {
    if (!fileName) return;

    const fileUrl = `/files/${fileName}`; 
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const truncateFileName = (name: string) => {
    if (name.length > 15) {
      return name.substring(0, 12) + "...";
    }
    return name;
  };

  return (
    <div className="w-full max-w-[430px] rounded-[24px]">
      
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-[20px] font-semibold text-[#111111]">{title}</h3>
        {(type === 1 || type === 2) && (
          <div className="flex gap-[4px]">
            {filters.map((f) => (
              <span 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-[14px] py-[2px] rounded-full text-[13px] transition-all cursor-pointer
                ${activeFilter === f 
                  ? 'border border-[#FF6738] text-[#FF6738]'
                  : 'border border-[#EEEEEE] text-[#111111]'
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 본문 영역 */}
      <div className="min-h-[100px] flex flex-col gap-1">
        
        {/* 타입 1 & 타입 2 공통 리스트 출력 */}
        {(type === 1 || type === 2) && (
          <>
            {filteredItems.length > 0 ? (
              <>
                {/* 리스트 헤더 */}
                <div className="grid grid-cols-[1.5fr_0.8fr_2.2fr] text-[14px] text-[#111111] font-semibold pb-[4px]">
                  <span>제목</span><span>날짜</span><span>학습지</span>
                </div>

                {/* 아이템 렌더링 */}
                {filteredItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[1.5fr_0.8fr_2.2fr] items-center text-[14px] py-[1px]">
                    {/* 제목 영역 */}
                    <div 
                      onClick={() => {
                        if (item.file) {
                          handleDownload(item.file);
                        } else {
                          handleTitleClick(item);
                        }
                      }}
                      className="flex items-center text-[#111111] cursor-pointer hover:text-[#FF6738] transition-colors group"
                    >
                        <span className="group-hover:underline">{item.title}</span>
                        <img src={ArrowIcon} className="w-[17px] h-[17px] mt-[2px]" alt="arrow" />
                    </div>

                    <span className="text-[#111111]">{item.date}</span>
                    
                    {/* 학습지 다운로드 영역 */}
                    <div className="flex items-center justify-between gap-2">
                      {/* 파일명 텍스트 클릭 시 다운로드 */}
                      <span 
                        onClick={() => item.file && handleDownload(item.file)}
                        className={item.file ? "text-[#FF6738] underline cursor-pointer" : "text-[#999999]"}
                      >
                        {item.file ? truncateFileName(item.file) : "-"}
                      </span>

                      {/* 다운로드 아이콘 클릭 시 다운로드 */}
                      {item.file && (
                        <img 
                          src={DownloadIcon} 
                          className="w-[18px] h-[18px] cursor-pointer hover:opacity-70 transition-opacity" 
                          alt="download"
                          style={{ filter: "invert(54%) sepia(87%) saturate(2321%) hue-rotate(336deg) brightness(101%) contrast(101%)" }}
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleDownload(item.file!);
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* 데이터가 없을 때 */
              <div className="flex flex-col items-center justify-center py-10">
                <span className="text-[#999999] text-[12px]">내용이 없습니다</span>
              </div>
            )}

            {/* 타입 1일 때만 '할 일 추가' 입력창 노출 */}
            {type === 1 && (
              <>
                {isAdding && (
                  <div className="grid grid-cols-[1.5fr_0.8fr_2.2fr] items-center py-1">
                    <input 
                      autoFocus
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-[66px] h-[28px] bg-transparent border border-[#EEEEEE] rounded-[4px] px-2 text-[14px] text-[#111111] outline-none transition-all placeholder:text-[#999999] focus:border-[#FF6738]" 
                      placeholder="제목" 
                    />
                    <span className="text-[14px] text-[#999999]">{getTodayDate()}</span>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {["국", "영", "수"].map((sub) => (
                          <button 
                            key={sub} 
                            onClick={() => setSelectedSub(sub)}
                            className={`w-[33px] h-[26px] rounded-full border text-[12px] flex items-center justify-center transition-all
                              ${selectedSub === sub ? "border-[#FF6738] text-[#FF6738]" : "border-[#999999] text-[#999999]"}
                            `}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 font-light text-[18px] mr-1">
                        <span onClick={() => setIsAdding(false)} className="cursor-pointer transition-colors text-[#999999] hover:text-[#FF6738] text-[14px]">✕</span>
                        <span className="text-[#E5E5EC] text-[14px]">|</span>
                        <span onClick={handleConfirm} className="cursor-pointer transition-colors text-[#999999] hover:text-[#FF6738]">✓</span>
                      </div>
                    </div>
                  </div>
                )}

                {!isAdding && (
                  <div 
                    onClick={() => setIsAdding(true)}
                    className="text-[#999999] text-[14px] mt-2 cursor-pointer hover:text-[#767676] flex items-center gap-1 w-fit"
                  >
                    <span className="text-[18px]">+</span> 할 일
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default List;