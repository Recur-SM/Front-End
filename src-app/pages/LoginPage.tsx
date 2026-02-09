import { useState } from "react"; 
import SeolStudy from "../assets/seolStudyLogo.svg";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const isActive = id.trim() !== "" && pw.trim() !== "";

  return (
    <div className="h-full mt-[172.5px] flex flex-col items-center">
      <div className="w-[382px] h-[588px] mt-[1px]">
        
        {/* 설 스터디 로고 */}
        <img src={SeolStudy} alt="설 스터디 로고" className="w-[269px] h-[153px] mb-[32px] mx-auto" />

        {/* 입력란 */}
        <div className="w-[382px] h-[226px] flex flex-col justify-between">
          {/* 아이디 */}
          <div>
            <div className="text-[18px] text-[#111111] mx-[8px] my-[10px]">
              사용자 아이디
            </div>
            <input 
              placeholder="ID" 
              value={id}
              onChange={(e) => setId(e.target.value)} 
              className="w-[382px] h-[50px] px-[12px] py-[14.5px] rounded-[12px] bg-white text-[15px] outline-none border focus:border-[#FF6738] transition-colors"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <div className="text-[18px] text-[#111111] mx-[8px] my-[10px]">
              비밀번호
            </div>
            <input 
              type="password" 
              placeholder="PW" 
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-[382px] h-[50px] px-[12px] py-[14.5px] rounded-[12px] bg-white text-[15px] outline-none border focus:border-[#FF6738] transition-colors"
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button 
          disabled={!isActive}
          className={`w-[382px] h-[57px] rounded-[12px] mt-[120px] flex justify-center items-center text-white text-[18px] transition-all duration-300
            ${isActive ? "bg-[#FF6738] cursor-pointer" : "bg-[#999999] cursor-not-allowed"}
          `}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;