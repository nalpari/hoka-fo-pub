'use client';
import { useState } from 'react';

import { PasswordResetCompleteModal, PasswordResetContent } from './PasswordResetContent';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 회원·인증 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
/** 재설정 오류와 완료 모달을 직접 표시합니다. (Displays fixed reset errors and the completion modal.) */
export function PasswordResetStatePreview({
  complete = false,
  errors = true,
}: {
  complete?: boolean;
  errors?: boolean;
}) {
  const [values, setValues] = useState({ password: '', confirmation: '' });
  const [open, setOpen] = useState(complete);
  return (
    <PasswordResetContent
      {...values}
      errors={
        complete || !errors
          ? {}
          : {
              password: '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
              confirmation: '동일한 비밀번호가 입력되었는지 확인해주세요.',
            }
      }
      completion={
        open ? (
          <PasswordResetCompleteModal onOpenChange={setOpen} onConfirm={() => setOpen(false)} />
        ) : null
      }
      onFieldChange={(key, value) => setValues((previous) => ({ ...previous, [key]: value }))}
      onSubmit={(event) => event.preventDefault()}
    />
  );
}
