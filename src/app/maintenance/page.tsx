import { SystemStatusPage } from '@/components/not-found/SystemStatusPage';

/** 서비스 점검 안내 화면을 표시합니다 (Displays the maintenance page composition). */
export default function MaintenancePage() {
  return (
    <SystemStatusPage
      status="maintenance"
      maintenance={{ schedule: '점검 일정은 추후 안내드립니다.', reason: '시스템 정기점검' }}
    />
  );
}
