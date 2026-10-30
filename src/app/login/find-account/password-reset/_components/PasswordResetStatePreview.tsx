'use client';

import { useState } from 'react';

import { PasswordResetCompleteModal, PasswordResetContent } from './PasswordResetContent';

/** [ 개발팀 바인딩 ] 고정 오류/완료 마크업이며 비밀번호 변경·인증·성공 이동은 실행하지 않습니다. 실제 연결은 AccountServicesContext.recovery 소유자입니다. */
/** 재설정 오류와 완료 모달을 직접 표시합니다. (Displays fixed reset errors and the completion modal.) */
export function PasswordResetStatePreview({ complete = false }: { complete?: boolean }) {
  const [values, setValues] = useState({ password: '', confirmation: '' });
  const [open, setOpen] = useState(complete);
  return (
    <PasswordResetContent
      {...values}
      errors={
        complete
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
