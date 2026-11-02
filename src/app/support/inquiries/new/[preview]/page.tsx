import { notFound } from 'next/navigation';

import { inquiryFormPreviews } from '@/app/support/inquiries/inquiryPreviews';
import { InquiryFormStatePreview } from '@/app/support/inquiries/new/_components/InquiryFormStatePreview';

/** 문의 폼의 준비 상태를 반응형 화면으로 표시합니다. (Displays a prepared inquiry form state responsively.) */
export default async function Page({ params }: { params: Promise<{ preview: string }> }) {
  const { preview } = await params;
  const entry = inquiryFormPreviews.find((item) => item.href.endsWith(`/${preview}`));
  if (!entry) notFound();
  return <InquiryFormStatePreview state={entry.state} />;
}
