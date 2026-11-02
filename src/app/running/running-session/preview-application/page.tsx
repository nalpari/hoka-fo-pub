import { RunningSessionDetailContent } from '@/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent';
/** 고정 신청 안내를 직접 표시합니다. (Displays the fixed application notice directly.) */
export default function Page() {
  return <RunningSessionDetailContent previewApplication="unavailable" />;
}
