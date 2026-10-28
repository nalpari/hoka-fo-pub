'use client';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

/** 등록되지 않은 경로의 안내 화면을 표시합니다. (Displays the fallback for an unregistered route.) */
export default function NotFound() {
  return <SystemStatusPage status="not-found" />;
}
