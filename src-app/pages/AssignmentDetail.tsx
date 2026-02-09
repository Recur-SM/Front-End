import { useState, useRef } from "react";
import Download from "../assets/download_active.svg";
import Upload from "../assets/upload.svg";

const AssignmentDetailPage = () => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const feedbackText = "오늘도 역시 중요한 문제가 많군요! 채영학생 오답은 보면서 알려줄게 많은 맛이 쏠쏠한거 같습니다~  1. 삼각함수 그래프에서의 활용 부분 : 지수함수 도형에서의 활용과 마찬가지로, 도형의 특성들을 활용하는 것이 중요합니다. 다만 지수함수와는 다르게, “sin 과 cos의 평행이동 관계”, “점대칭성”, “선대칭성”, “주기성”을 더 복잡하게 활용한 문제들이 많습니다. 결국 좌표들을 구할 때 삼각함수 그래프 자체의 특성들을 더 신경써야 하는 것이지요! 2. Sin 과 Cos에 대한 기타 성질들 : Cos는 X좌표, Sin은 y좌표이다 / sin/cos = tan 이다 / sin과 cos는 최솟값이 -1, 최댓값이 1이다 ⇒ 이 세가지 사실은 sin과 cos에 대한 가장 기본적인 성질입니다. 그러나 수1에서도, 미적분까지도 계속해서 쓰이는 특성들입니다. 그냥 언제나 나올 수 있게 몸에 배어있는 것이 좋습니다!";
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full min-h-[600px] overflow-x-hidden mt-[32px] pb-[16px] flex flex-col gap-[8px]">
            {/* 날짜 */}
            <div className="text-[20px] font-semibold">1월 8일</div>
            
            {/* 하얀 컨테이너 */}
            <div className="w-[384px] min-h-[675px] p-[12px] rounded-[8px] flex flex-col itmes-center bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
                <div className="w-full text-[20px] font-semibold mt-[1px] mb-[25px] flex">수학 오답 노트</div>

                <div className="w-full h-[102px] gap-[16px] mb-[16px]">
                    <div className="w-full h-[43px] flex flex-col mb-[16px]">
                        <div className="text-[14px] font-medium text-[#111111]">학습지</div>
                        <div className="flex itmes-center gap-[2px]">
                            <div className="text-[14px] font-medium text-[#FF6738]">수학_오답노트_양식_설스터디.pdf</div>
                            <img src={Download} alt="다운로드" className="w-[22px] h-[22px]"></img>
                        </div>
                    </div>
                    <div className="w-full h-[43px] flex flex-col">
                        <div className="text-[14px] font-medium text-[#111111]">목표</div>
                        <div className="text-[14px] font-medium text-[#767676]">양식 맞춰서 오답 풀이에 적용하기</div>
                    </div>
                </div>

                {/* 사진 업로드 */}
                <div className="w-[252px] h-[335px] rounded-[8px] border border-[#999999] mb-[16px] mx-auto shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] overflow-hidden cursor-pointer">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                    />

                    {image ? (
                        <img 
                            src={image} 
                            alt="과제 인증샷" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-[8px]">
                            <img src={Upload} alt="업로드" className="w-[39px] h-[39px]"></img>
                            <div className="text-[12px] text-[#767676] font-medium text-center">
                                과제 사진을<br />업로드 해주세요
                            </div>
                        </div>
                    )}
                </div>

                {/* 피드백 */}
                <div className="w-[358px] min-h-[128px] rounded-[12px] p-[12px] border border-[#999999]">
                    <div className="text-[20px] font-semibold mb-[16px]">피드백</div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
                        {feedbackText ? (
                            /* 피드백 내용이 있을 때 */
                            <div className="text-[12px] leading-[1.6] text-[#505050]">
                                {feedbackText}
                            </div>
                        ) : (
                            /* 피드백 내용이 없을 때 */
                            <div className="flex-1 flex items-center justify-center mb-[20px] text-[12px] text-[#767676]">
                                내용이 없습니다
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AssignmentDetailPage;