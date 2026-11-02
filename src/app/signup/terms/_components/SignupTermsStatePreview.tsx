'use client';
import { useState } from 'react';

import { SignupTermsContent } from './SignupTermsContent';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 회원·인증 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
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
      onDetail={(index) => {
        setDetail(index);
        setPrevious(false);
        setPicker(false);
      }}
      onPrevious={() => {
        if (previous) setPrevious(false);
        else setPicker(true);
      }}
      onPreviousPickerClose={() => setPicker(false)}
      previousVersionId={version}
      onPreviousVersionSelect={(version) => {
        setVersion(version);
        setPrevious(true);
        setPicker(false);
      }}
    />
  );
}
