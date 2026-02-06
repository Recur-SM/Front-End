export type TabType = "전체" | "국어" | "영어" | "수학";
export const TABS: readonly TabType[] = [
  "전체",
  "국어",
  "영어",
  "수학",
] as const;

export interface FilterButtonProps {
  value: TabType;
  isActive: boolean;
  onClick: (value: TabType) => void;
}
