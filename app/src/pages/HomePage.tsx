import Tabbar from "../components/tabbar";

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#F7F7F7]">
      {/* 중앙 테스트 문구 */}
      <div className="text-xl font-bold text-gray-800">
        test
      </div>

      {/* 하단 탭바 컴포넌트 */}
      <Tabbar />
    </div>
  );
};

export default HomePage;