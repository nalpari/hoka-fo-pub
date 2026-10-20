'use client';

import { SystemStatusPage } from '@/shared/features/not-found/SystemStatusPage';

export default function ErrorPage() {
  return <SystemStatusPage status="unavailable" />;
}
