import { useState } from "react"; 
import SeolStudy from "../assets/seolStudyLogo.svg";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  
  const [errorId, setErrorId] = useState(false);
  const [errorPw, setErrorPw] = useState(false);

  const isActive = id.trim() !== "" && pw.trim() !== "";

  const handleLogin = () => {
    setErrorId(false);
    setErrorPw(false);

    if (id !== "admin") {
      setErrorId(true);
      return;
    }
    if (pw !== "1234") {
      setErrorPw(true);
      return;
    }
  };

  return (
    <div className="h-full mt-[172.5px] flex flex-col items-center">
      <div className="w-[382px] h-[588px] mt-[1px]">
        
        <img src={SeolStudy} alt="설 스터디 로고" className="w-[269px] h-[153px] mb-[32px] mx-auto" />

        <div className="w-[382px] flex flex-col">
          {/* 아이디 영역 */}
          <div className="flex flex-col">
            <div className="text-[18px] text-[#111111] mx-[8px]">
              사용자 아이디
            </div>
            <input 
              placeholder="ID" 
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (errorId) setErrorId(false); 
              }} 
              className={`w-[382px] h-[50px] px-[12px] py-[14.5px] rounded-[12px] bg-white text-[15px] outline-none border transition-colors ${
                errorId ? "border-[#FF3B30]" : "focus:border-[#FF6738]"
              }`}
            />
            {/* 에러 메시지 */}
            <div className={`h-[34px] transition-opacity duration-200 ${errorId ? "opacity-100" : "opacity-0"}`}>
              <span className="text-[#FF6738] text-[13px] mt-[8px] mx-[8px]">존재하지 않는 계정입니다.</span>
            </div>
          </div>

          {/* 비밀번호 영역 */}
          <div className="flex flex-col">
            <div className="text-[18px] text-[#111111] mx-[8px]">
              비밀번호
            </div>
            <input 
              type="password" 
              placeholder="PW" 
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                if (errorPw) setErrorPw(false); 
              }}
              className={`w-[382px] h-[50px] px-[12px] py-[14.5px] rounded-[12px] bg-white text-[15px] outline-none border transition-colors ${
                errorPw ? "border-[#FF3B30]" : "focus:border-[#FF6738]"
              }`}
            />
            {/* 에러 메시지 */}
            <div className={`h-[34px] transition-opacity duration-200 ${errorPw ? "opacity-100" : "opacity-0"}`}>
              <span className="text-[#FF3B30] text-[13px] mt-[8px] mx-[8px]">올바른 비밀번호를 입력해주세요.</span>
            </div>
          </div>
        </div>

        {/* 로그인 버튼*/}
        <button 
          onClick={handleLogin}
          disabled={!isActive}
          className={`w-[382px] h-[57px] rounded-[12px] mt-[86px] flex justify-center items-center text-white text-[18px] transition-all duration-300
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