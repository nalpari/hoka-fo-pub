import { RunningSessionDetailContent } from '@/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent';
/** 세션 신청 완료 안내를 고정 표시합니다. (Displays the fixed session application completion notice.) */
export default function Page() {
  return <RunningSessionDetailContent previewApplication="complete" />;
}
