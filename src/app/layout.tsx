import type { Metadata } from 'next';
import 'simplebar-react/dist/simplebar.min.css';
import '@/shared/styles/global.scss';

export const metadata: Metadata = {
  title: 'HOKA Wireframe',
  description: 'Adaptive publishing wireframe',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
