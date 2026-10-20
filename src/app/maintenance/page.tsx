import { SystemStatusPage } from '@/shared/features/not-found/SystemStatusPage';

export default function MaintenancePage() {
  return (
    <SystemStatusPage
      status="maintenance"
      maintenance={{ schedule: '점검 일정은 추후 안내드립니다.', reason: '시스템 정기점검' }}
    />
  );
}
