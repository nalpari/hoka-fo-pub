import { type InquiryPreview, InquiryPreviewContext } from '@/context/InquiryPreviewContext';

import Page from '@/app/support/inquiries/page';

/** 문의 페이지의 예시 상태를 제공합니다. (Provides an example state for the inquiry page.) */
export function InquiryPage({ preview = 'empty' }: { preview?: InquiryPreview }) {
  return (
    <InquiryPreviewContext value={preview}>
      <Page />
    </InquiryPreviewContext>
  );
}
