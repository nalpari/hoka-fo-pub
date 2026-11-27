import type { Metadata } from 'next';

import { IaStructurePage } from '@/app/screen-index/_components/IaStructurePage';

export const metadata: Metadata = {
  title: '화면검수용 목록 | HOKA',
  robots: { index: false, follow: false },
};

/** 검수용 IA 화면과 미리보기 링크를 표시합니다. (Displays the IA screens and preview links for review.) */
export default function ScreenReviewPage() {
  return <IaStructurePage reviewOnly />;
}
