'use client';

import { useState } from 'react';

import { PhoneVerificationContent } from './PhoneVerificationContent';

/**
 * [ 개발팀 바인딩 ] 인증 화면의 고정 상태 fixture입니다. 입력/약관/도움말만 로컬로 조작하며 요청·검증·카운트다운은 없습니다.
 * 실제 requestId/proof와 신규·기존 회원 판단, pending/실패/재시도는 각 라우트의 usePhoneVerification과 연결 소유자가 담당합니다.
 */
/** [ 개발팀 바인딩 ] initialDetail과 initialPreviousPickerOpen은 시안의 열린 팝업 fixture입니다. 잠금 해제 expired는 처음부터 모달을 열고 닫기만 로컬로 처리하며 인증 재요청·검증·해제 완료를 실행하지 않습니다. */
/** 가입·잠금 해제 인증의 고정 상태를 표시합니다. (Displays fixed signup and account-unlock verification states.) */
export function PhoneVerificationStatePreview({
  state,
  unlock = false,
  initialDetail = null,
  termKind = 'required',
  initialPreviousPickerOpen = false,
}: {
  state: 'error' | 'agreement-error' | 'code-entry' | 'expired';
  unlock?: boolean;
  initialDetail?: string | null;
  termKind?: 'required' | 'optional';
  initialPreviousPickerOpen?: boolean;
}) {
  const [information, setInformation] = useState({
    name: '',
    birthDate: '',
    nationality: '내국인',
    gender: '남자',
    carrier: 'SKT',
    phone: '',
  });
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [code, setCode] = useState('');
  const [detail, setDetail] = useState<string | null>(initialDetail);
  const [expiredOpen, setExpiredOpen] = useState(unlock && state === 'expired');
  return (
    <PhoneVerificationContent
      title={unlock ? '계정 잠금 해제' : '휴대폰 인증'}
      description={unlock ? '본인인증 완료 후 계정 잠금을 해제할 수 있습니다.' : undefined}
      information={information}
      agreements={agreements}
      code={code}
      detail={detail}
      designTerms={unlock && initialDetail !== null}
      designTermKind={termKind}
      initialPreviousPickerOpen={initialPreviousPickerOpen}
      expired={expiredOpen}
      onExpiredClose={() => setExpiredOpen(false)}
      requested={state === 'code-entry' || state === 'expired'}
      fixedAgreementErrors={state === 'agreement-error'}
      showAgreementErrors={state === 'agreement-error'}
      secondsLeft={state === 'expired' ? 0 : 125}
      resendWait={state === 'expired' ? 0 : 125}
      notice={state === 'expired' ? '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.' : ''}
      noticeTone="error"
      fieldErrors={
        state === 'error'
          ? {
              name: '이름을 입력해 주세요.',
              birthDate: '생년월일 8자리를 입력해 주세요.',
              phone: '휴대폰 번호를 입력해 주세요.',
            }
          : {}
      }
      onInformationChange={(key, value) =>
        setInformation((previous) => ({ ...previous, [key]: value }))
      }
      onAgreementChange={(index, checked) =>
        setAgreements((previous) => previous.map((value, i) => (i === index ? checked : value)))
      }
      onAllAgree={(checked) => setAgreements(agreements.map(() => checked))}
      onCodeChange={setCode}
      onDetail={setDetail}
      onRequest={() => {}}
      onConfirm={(event) => event.preventDefault()}
    />
  );
}
