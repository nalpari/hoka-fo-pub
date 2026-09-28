'use client';

import { lazy, Suspense } from 'react';
import type { Platform } from '@/shared/lib/device';

const WebApp = lazy(() => import('../platforms/web/WebApp'));

const MobileApp = lazy(() => import('../platforms/mobile/MobileApp'));

type AdaptiveRootProps = {
  platform: Platform;
};

export function AdaptiveRoot({ platform }: AdaptiveRootProps) {
  const App = platform === 'mobile' ? MobileApp : WebApp;

  return (
    <Suspense fallback={<main className="loading">화면을 불러오는 중입니다.</main>}>
      <App />
    </Suspense>
  );
}
