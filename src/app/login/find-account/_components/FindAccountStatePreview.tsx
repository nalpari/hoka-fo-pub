'use client';
import { useState } from 'react';

import { FindAccountContent } from './FindAccountContent';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 회원·인증 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
/** 계정 찾기의 오류·인증번호·만료 상태를 표시합니다. (Displays fixed recovery error, code and expiry states.) */
export function FindAccountStatePreview({
  state,
}: {
  state: 'initial' | 'error' | 'code-entry' | 'expired';
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  return (
    <FindAccountContent
      name={name}
      phone={phone}
      code={code}
      requested={state === 'code-entry' || state === 'expired'}
      secondsLeft={state === 'expired' ? 0 : 125}
      nameError={state === 'error' ? '이름을 올바르게 입력해주세요' : ''}
      phoneError={state === 'error' ? '휴대폰 번호를 올바르게 입력해주세요' : ''}
      notice={
        state === 'expired'
          ? { tone: 'error', message: '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.' }
          : null
      }
      onNameChange={setName}
      onPhoneChange={setPhone}
      onCodeChange={setCode}
      onSubmit={(event) => event.preventDefault()}
    />
  );
}
