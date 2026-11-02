import { PhoneVerificationStatePreview } from '@/components/phone-verification/PhoneVerificationStatePreview';

/** 지정한 디자인 상태를 직접 표시합니다. (Displays the specified design state directly.) */
export default function Page() {
  return (
    <PhoneVerificationStatePreview
      state="code-entry"
      unlock
      initialDetail="고유식별 정보 처리동의"
      termKind="optional"
    />
  );
}
