import { InquiryFormStatePreview } from '@/app/support/inquiries/new/_components/InquiryFormStatePreview';

/** 모바일 첨부 방법 선택 시트를 직접 표시합니다. (Displays the mobile attachment source sheet directly.) */
export default function Page() {
  return <InquiryFormStatePreview state="attachment-picker" />;
}
