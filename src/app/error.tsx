'use client';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

/** 라우트 오류와 재시도 동작을 표시합니다 (Displays the error page composition). */
export default function ErrorPage() {
  return <SystemStatusPage status="unavailable" />;
}
