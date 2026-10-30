import { RunningSessionEntriesContent } from '@/app/mypage/event-entries/_components/RunningSessionEntriesContent';

/** 러닝세션 신청 취소 모달을 열린 상태로 표시합니다. (Displays the running session cancellation dialog initially open.) */
export default function Page() {
  return <RunningSessionEntriesContent preview="cancel" />;
}
