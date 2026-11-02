'use client';
import { useSearchParams } from 'next/navigation';

import { useState } from 'react';

import type {
  MarketingPreferences,
  RegistrationInformation,
} from '@/app/signup/information/registration.types';

import {
  RegistrationContent,
  RegistrationMarketingConsentSummaryModal,
} from './RegistrationContent';
const emptyInformation: RegistrationInformation = {
  id: '',
  name: '',
  password: '',
  confirmation: '',
  birthDate: '',
  phone: '',
  postalCode: '',
  address: '',
  addressDetail: '',
  email: '',
  domain: '',
  anniversary: '',
};
const fixedErrors = {
  id: '아이디는 영어소문자로 시작해야 하며, 영어,숫자,_(언더바)를 사용하여 5~20자로 구성할 수 있습니다.',
  email: '올바른 이메일 형식으로 입력해 주세요',
  domain: '올바른 도메인 형식으로 입력해 주세요',
  name: '올바른 이름을 입력해주세요',
  password: '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
  confirmation: '비밀번호가 일치하지 않습니다',
  postalCode: '우편번호를 입력해 주세요.',
  address: '주소를 입력해 주세요.',
  addressDetail: '상세주소를 입력해 주세요.',
};
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 회원·인증 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
/** 가입 입력 오류 또는 수신내역 모달을 표시합니다. (Displays fixed registration errors or the marketing summary.) */
export function RegistrationStatePreview({
  marketing = false,
  errors = true,
}: {
  marketing?: boolean;
  errors?: boolean;
}) {
  const searchParams = useSearchParams();
  const additional = marketing || searchParams.get('step') === 'additional';
  const [information, setInformation] = useState(
    errors
      ? emptyInformation
      : { ...emptyInformation, birthDate: '19830522', phone: '010-6698-5552' },
  );
  const [preferences, setPreferences] = useState<MarketingPreferences>({
    email: 'no',
    sms: 'no',
    kakao: 'no',
  });
  const [domainChoice, setDomainChoice] = useState('direct');
  const [addressOpen, setAddressOpen] = useState(false);
  const [open, setOpen] = useState(marketing);
  return (
    <>
      <RegistrationContent
        stage={additional ? 'additional' : 'information'}
        information={information}
        preferences={preferences}
        domainChoice={domainChoice}
        notice=""
        duplicateNotice=""
        fieldErrors={
          !errors || marketing
            ? { id: '', email: '', domain: '', name: '', password: '', confirmation: '' }
            : fixedErrors
        }
        addressOpen={addressOpen}
        onAddressOpen={setAddressOpen}
        onChange={(key, value) => setInformation((previous) => ({ ...previous, [key]: value }))}
        onPreferenceChange={(key, value) =>
          setPreferences((previous) => ({ ...previous, [key]: value }))
        }
        onDomainChoice={setDomainChoice}
        onSubmit={(event) => event.preventDefault()}
      />
      {open && (
        <RegistrationMarketingConsentSummaryModal
          preferences={preferences}
          onOpenChange={setOpen}
          onConfirm={() => setOpen(false)}
        />
      )}
    </>
  );
}
