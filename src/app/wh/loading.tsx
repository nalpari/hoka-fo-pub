import { WorkHistoryLoading } from '@/app/wh/_components/WorkHistoryLoading';

/** 변경 내역을 조회하는 동안 로딩 상태를 표시합니다. (Displays loading while work history is fetched.) */
export default function Loading() {
  return <WorkHistoryLoading full />;
}
