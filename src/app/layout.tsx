import type { Metadata } from 'next';

import { Suspense } from 'react';
import { ShopShell } from '@/context/ShopShell';

import 'simplebar-react/dist/simplebar.min.css';
import '@/styles/global.scss';

export const metadata: Metadata = {
  title: 'HOKA Wireframe',
  description: 'Adaptive publishing wireframe',
};

/** 공통 쇼핑 프레임을 서버 문서에 배치합니다. (Places the shared shopping frame in the server document.) */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="platform-web">
        <Suspense fallback={<main className="loading">화면을 불러오는 중입니다.</main>}>
          <ShopShell>{children}</ShopShell>
        </Suspense>
      </body>
    </html>
  );
}
