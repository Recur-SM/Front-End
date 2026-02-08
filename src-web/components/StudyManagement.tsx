import List from "./List";
import CalendarWidget from "./calendar";

const StudyManagement = () => {
  return (
    <div>
      <List title="오늘 할 일" type="할일" />

      <List title="어제자 피드백" type="피드백" />

      <List title="주간 학습 리포트" type="주간" />

      <div className="flex-col px-3 py-3">
        <div className="flex font-semibold text-lg">월간 계획표</div>
        <div className="flex font-normal text-xs">
          스케줄을 한 눈에 확인해보세요
        </div>
        <CalendarWidget />
      </div>
    </div>
  );
};

export default StudyManagement;
