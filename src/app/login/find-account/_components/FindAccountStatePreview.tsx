'use client';

import { useState } from 'react';

import { FindAccountContent } from './FindAccountContent';

/**
 * [ 개발팀 바인딩 ] preview 입력만 로컬로 편집하며 발송/인증/타이머/이동을 실행하지 않습니다. 오류와 남은 시간은 고정입니다.
 * 운영 requestId·인증 결과·pending/실패/재시도는 AccountServicesContext.recovery 및 FindAccountRouteContent에서 관리합니다.
 */
/** 계정 찾기의 오류·인증번호·만료 상태를 표시합니다. (Displays fixed recovery error, code and expiry states.) */
export function FindAccountStatePreview({ state }: { state: 'error' | 'code-entry' | 'expired' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  return (
    <FindAccountContent
      name={name}
      phone={phone}
      code={code}
      requested={state !== 'error'}
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
      onConfirmCode={() => {}}
      onSubmit={(event) => event.preventDefault()}
    />
  );
}
