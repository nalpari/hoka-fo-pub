'use client';

import { SystemStatusPage } from '@/components/features/not-found/SystemStatusPage';

export default function ErrorPage() {
  return <SystemStatusPage status="unavailable" />;
}
