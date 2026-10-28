import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

/** 서비스 이용 불가 안내를 표시합니다 (Displays the service unavailable page composition). */
export default function ServiceUnavailablePage() {
  return <SystemStatusPage status="unavailable" />;
}
