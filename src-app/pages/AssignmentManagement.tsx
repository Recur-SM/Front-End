import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import List from "../components/list";
import Clock from "../assets/clock.svg";
import Upload from "../assets/upload.svg";

const AssignmentManagementPage = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const feedbackText = "저 영어 공부하는 날을 조금 더 늘리고 싶어요 일주일에 3, 4일 정도로요. → 기존 과제를 더 자주 하고 싶다는 말인 거죠?? 알겠습니다!  방학 시간표에 점점 적응이 되어서 그런가 분량이 조금씩 늘어나는 게 보이네요! 이렇게 알차게 시간을 보내고 나면 많이 성장한 자신을 만날 수 있을 거니 지금처럼만 해주면 좋을 것 같습니다.  항상 응원하고 있어용 😉";

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            // 이후 axios로 DB에 file 전송 로직 추가
        }
    };

    return (
        <div className="w-full min-h-auto overflow-x-hidden py-[32px] flex flex-col gap-[8px]">
            {/* 공부 시간 기록 버튼 */}
            <div 
                onClick={() => navigate("/mentee/record")} // 3. 클릭 시 이동 연결
                className="w-[137px] h-[30px] rounded-[12px] flex justify-center items-center gap-[4px] ml-auto mr-[4px] border border-[#E5E5EC] text-[12px] text-[#767676] bg-white cursor-pointer active:bg-gray-50"
            >
                <img src={Clock} alt="시계" className="w-[20px] h-[20px]" />
                <span>공부 시간 기록하기</span>
            </div>

            {/* 오늘 할 일 리스트 */}
            <div className="w-[384px] min-h-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
                <List
                    title="오늘 할 일"
                    type={1}
                    items={[
                        { title: "수학 오답 노트", date: "2월 8일", file: "수학_오답노트_양식.pdf" },
                        { title: "단어 암기", date: "2월 8일" }
                    ]}
                />
            </div>

            {/* 피드백 & 사진 업로드 구역 */}
            <div className="w-[382px] h-[291px] flex justify-between items-center gap-[12px]">
                
                {/* 피드백 영역 */}
                <div className="w-[198px] h-[291px] rounded-[8px] px-[12px] py-[13px] flex flex-col bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
                    <div className="text-[20px] font-semibold mb-[16px]">피드백</div>
                    <div className="flex-1 overflow-y-auto text-[12px] leading-[1.6] text-[#505050] scrollbar-hide">
                        {feedbackText}
                    </div>
                </div>

                {/* 사진 업로드 영역 */}
                <div 
                    onClick={handleUploadClick}
                    className="w-[198px] h-[291px] rounded-[8px] flex flex-col bg-[#99999908] border border-[#767676] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] overflow-hidden cursor-pointer"
                >
                    {/* 숨겨진 파일 입력 필드 */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                    />

                    {image ? (
                        /* 사진 있을 때 */
                        <img 
                            src={image} 
                            alt="과제 인증샷" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        /* 사진 없을 때 */
                        <div className="w-full h-full flex flex-col items-center justify-center gap-[10px]">
                            <img src={Upload} alt="업로드" className="w-[39px] y-[39px]"></img>
                            <div className="text-[14px] text-[#A1A1A1] font-medium text-center">
                                플래너 사진을<br />업로드 해주세요
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentManagementPage;