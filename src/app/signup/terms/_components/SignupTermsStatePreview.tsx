'use client';
import { useState } from 'react';

import { SignupTermsContent } from './SignupTermsContent';

/** [ 개발팀 바인딩 ] 약관 오류는 고정 표시이며 동의 제출/가입 이동은 미연결입니다. 운영 약관 ID·버전과 제출은 AccountServicesContext 소유자가 관리합니다. */
/** 필수 약관 오류와 약관 열람을 제공합니다. (Displays fixed required-consent errors and term details.) */
export function SignupTermsStatePreview() {
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [detail, setDetail] = useState<number | null>(null);
  const [previous, setPrevious] = useState(false);
  const [picker, setPicker] = useState(false);
  const [version, setVersion] = useState<string>();
  return (
    <SignupTermsContent
      fixedErrors
      agreements={agreements}
      detail={detail}
      previous={previous}
      previousPickerOpen={picker}
      notice="필수 약관에 모두 동의해 주세요."
      onAllChange={(checked) => setAgreements(agreements.map(() => checked))}
      onChange={(index, checked) =>
        setAgreements((items) => items.map((value, i) => (i === index ? checked : value)))
      }
      onDetail={setDetail}
      onPrevious={() => {
        setPrevious(true);
        setPicker(true);
      }}
      onPreviousPickerClose={() => setPicker(false)}
      previousVersionId={version}
      onPreviousVersionSelect={setVersion}
      onCancel={() => {}}
      onNext={() => {}}
    />
  );
}
