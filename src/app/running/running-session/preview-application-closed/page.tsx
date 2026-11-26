import { RunningSessionDetailContent } from '@/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent';

/** 신청 고정 상태를 표시합니다. (Displays a fixed application state.) */
export default function Page() {
  return <RunningSessionDetailContent previewApplication="closed" />;
}
