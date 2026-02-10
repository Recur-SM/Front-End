import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import List from "../components/list";
import Clock from "../assets/clock.svg";
import Upload from "../assets/upload.svg";
import { uploadPlanner } from "../api/planner";
import { useAuthStore } from "../stores/authStore";

const AssignmentManagementPage = () => {
    const navigate = useNavigate();
    const { id } = useAuthStore();
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const feedbackText = "분명하네요 ㅎㅎ 어제(1/5) 공부하면서 ’영어 과제’가 아침까진 있었는데, 갑자기 사라져서 당황하셨을 수도 있을 것 같습니다. 원래는 모든 ‘약점 맞춤 과제’가 3일 주기로 돌아가고 있었는데, 채영 학생이 일요일에 부담이 너무 많은 것 같아서 문법 강의는 월/목에, 문학 강의는 화/금에, 영어 과제는 수/토에 배분해뒀어요!! 이번주는 과제가 좀 복잡하게 배치되어있는데 잘 살펴서 해주시고, 다음주부터는 확실한 루틴 속에서 과제해주시면 됩니다!!";

    const handleUploadClick = () => {
        console.log("[planner] upload click", { hasImageFile: Boolean(imageFile), isSubmitting });
        if (imageFile && !isSubmitting) {
            handleSubmit();
            return;
        }
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("[planner] file selected", { name: file.name, size: file.size });
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            if (!isSubmitting) {
                handleSubmit(file);
            }
        }
    };

    const handleSubmit = async (fileOverride?: File) => {
        const fileToUpload = fileOverride ?? imageFile;
        
        // 현재 스토어에 저장된 id 값을 다시 확인
        console.log("[planner] submit check", { currentId: id, hasFile: Boolean(fileToUpload) });

        if (!id) {
            alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
            return;
        }
        if (!fileToUpload) return;

        try {
            setIsSubmitting(true);
            const plannerDate = new Date().toISOString().split("T")[0];

            // API 응답 결과를 변수에 담아 로그로 확인
            const response = await uploadPlanner({
                menteeId: id,
                plannerDate,
                content: "내용 없음",
                image: fileToUpload,
            });

            console.log("[planner] submit success", response); 
            alert("플래너가 성공적으로 업로드되었습니다!");
            
        } catch (e) {
            console.error("[planner] submit failed", e);
            alert("업로드 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-auto overflow-x-hidden pt-[99px] pb-[32px] flex flex-col gap-[8px]">
            {/* 공부 시간 기록 버튼 */}
            <div 
                onClick={() => navigate("/app/record")}
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

                {/* 사진 업로드 영역 */}
                <div 
                    onClick={handleUploadClick}
                    className="w-[198px] h-[291px] rounded-[8px] flex flex-col bg-[#99999908] border border-[#767676] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] overflow-hidden cursor-pointer"
                >
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
                        <div className="w-full h-full flex flex-col items-center justify-center gap-[10px]">
                            <img src={Upload} alt="업로드" className="w-[39px] h-[39px]"></img>
                            <div className="text-[14px] text-[#767676] font-medium text-center">
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