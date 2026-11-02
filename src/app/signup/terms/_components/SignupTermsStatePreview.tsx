'use client';
import { useState } from 'react';

import { SignupTermsContent } from './SignupTermsContent';

/** [ 개발팀 바인딩 ] 약관 오류는 고정 표시이며 동의 제출/가입 이동은 미연결입니다. 운영 약관 ID·버전과 제출은 AccountServicesContext 소유자가 관리합니다. */
/** [ 개발팀 바인딩 ] initialDetail은 직접 상태 URL의 최초 약관 선택입니다. 본문·날짜는 표시 fixture이며 동의 기록·버전 조회·가입 요청은 연결하지 않습니다. */
/** 필수 약관 오류와 약관 열람을 제공합니다. (Displays fixed required-consent errors and term details.) */
export function SignupTermsStatePreview({
  errors = true,
  initialDetail = null,
}: {
  errors?: boolean;
  initialDetail?: number | null;
}) {
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [detail, setDetail] = useState<number | null>(initialDetail);
  const [previous, setPrevious] = useState(false);
  const [picker, setPicker] = useState(false);
  const [version, setVersion] = useState<string>();
  return (
    <SignupTermsContent
      fixedErrors={errors}
      agreements={agreements}
      detail={detail}
      previous={previous}
      previousPickerOpen={picker}
      notice={errors ? '필수 약관에 모두 동의해 주세요.' : ''}
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
