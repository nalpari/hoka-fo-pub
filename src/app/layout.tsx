import type { Metadata } from 'next';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { ShopShell } from '@/shared/ShopShell';
import { detectPlatform } from '@/shared/lib/device';
import { css } from 'styled-system/css';
import 'simplebar-react/dist/simplebar.min.css';
import '@/shared/styles/global.scss';

const webPlatform = css({ minW: 'var(--layout-web-min-width)' });

export const metadata: Metadata = {
  title: 'HOKA Wireframe',
  description: 'Adaptive publishing wireframe',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const platform = detectPlatform(requestHeaders.get('user-agent'));

  return (
    <html lang="ko">
      <body className={`platform-${platform}`}>
        <Suspense fallback={<main className="loading">화면을 불러오는 중입니다.</main>}>
          <div className={platform === 'web' ? webPlatform : undefined}>
            <ShopShell platform={platform}>{children}</ShopShell>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
