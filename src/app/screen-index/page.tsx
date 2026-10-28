import type { Metadata } from 'next';

import { IaStructurePage } from '@/app/screen-index/_components/IaStructurePage';

export const metadata: Metadata = {
  title: 'IA 구조도 | HOKA',
  robots: { index: false, follow: false },
};

/** 독립 페이지에서 IA 구조도와 작업 현황을 표시합니다. (Displays the IA structure and delivery status on a standalone page.) */
export default function ScreenIndexPage() {
  return <IaStructurePage />;
}
