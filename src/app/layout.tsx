/**
 * [개발팀 바인딩]
 * 운영 연결은 이 레이아웃 아래의 Client 어댑터에서 도메인 Provider를 조합합니다. 실제 API 함수는 Server Component의 일반 props로 넘기지 않습니다.
 * AccountFlowProvider를 가입/찾기/잠금해제 경로 전환 중 유지합니다. 인증 proof/동의 상태가 화면마다 새로 초기화되면 다음 단계에서 제출할 수 없습니다.
 * ShopShell.state와 각 Context의 타입/주석을 기준으로 DTO를 변환합니다. Provider가 없는 현재 기본 경로는 퍼블리싱 데모입니다.
 */

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Suspense } from 'react';
import { AccountFlowProvider } from '@/context/AccountFlowContext';
import { ShopShell } from '@/context/ShopShell';

import 'simplebar-react/dist/simplebar.min.css';
import '@/styles/global.scss';

// Keep all existing faces available without preloading every weight and italic variant.
const hoka = localFont({
  src: [
    { path: '../../public/fonts/TheFutureHOKA-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/TheFutureHOKA-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/TheFutureHOKA-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/TheFutureHOKA-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../../public/fonts/TheFutureHOKA-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/TheFutureHOKA-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: '../../public/fonts/TheFutureHOKA-Black.woff2', weight: '900', style: 'normal' },
    { path: '../../public/fonts/TheFutureHOKA-BlackItalic.woff2', weight: '900', style: 'italic' },
  ],
  variable: '--font-hoka',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

const pretendard = localFont({
  src: [
    { path: '../../public/fonts/Pretendard-Thin.woff2', weight: '100', style: 'normal' },
    { path: '../../public/fonts/Pretendard-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: '../../public/fonts/Pretendard-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Pretendard-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Pretendard-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Pretendard-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Pretendard-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Pretendard-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Pretendard-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'HOKA Wireframe',
  description: 'Adaptive publishing wireframe',
};

/** 공통 쇼핑 프레임을 서버 문서에 배치합니다. (Places the shared shopping frame in the server document.) */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${hoka.variable} ${pretendard.variable}`}>
      <body className="platform-web">
        <Suspense fallback={<main className="loading">화면을 불러오는 중입니다.</main>}>
          <ShopShell>
            <AccountFlowProvider>{children}</AccountFlowProvider>
          </ShopShell>
        </Suspense>
      </body>
    </html>
  );
}
