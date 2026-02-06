import Header from "../components/header";
import Tabbar from "../components/tabbar";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-between bg-[#F7F7F7]">
      {/* 상단 헤더 컴포넌트 */}
      <Header />

      {/* 하단 탭바 컴포넌트 */}
      <Tabbar />
    </div>
  );
};

export default HomePage;