import { notFound } from 'next/navigation';

import { InquiryListPreview } from '@/app/support/inquiries/_components/InquiryListPreview';
import { inquiryListPreviews } from '@/app/support/inquiries/inquiryPreviews';

/** 문의 목록 상태를 하나의 반응형 화면에서 직접 표시합니다. (Displays an inquiry list state directly in one responsive screen.) */
export default async function Page({ params }: { params: Promise<{ preview: string }> }) {
  const { preview } = await params;
  const entry = inquiryListPreviews.find((item) => item.href.endsWith(`/${preview}`));
  if (!entry) notFound();
  return <InquiryListPreview state={entry.state} />;
}
