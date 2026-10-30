'use client';

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
const errors = {
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

/** [ 개발팀 바인딩 ] 가입 오류/수신내역의 고정 fixture입니다. 중복확인·가입 제출·완료 이동은 없으며 실제 proof·동의·입력 payload와 요청 결과는 AccountServicesContext 소유자가 연결합니다. */
/** 가입 입력 오류 또는 수신내역 모달을 표시합니다. (Displays fixed registration errors or the marketing summary.) */
export function RegistrationStatePreview({ marketing = false }: { marketing?: boolean }) {
  const [information, setInformation] = useState(emptyInformation);
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
        stage={marketing ? 'additional' : 'information'}
        information={information}
        preferences={preferences}
        domainChoice={domainChoice}
        notice=""
        duplicateNotice=""
        fieldErrors={
          marketing
            ? { id: '', email: '', domain: '', name: '', password: '', confirmation: '' }
            : errors
        }
        addressOpen={addressOpen}
        onAddressOpen={setAddressOpen}
        onChange={(key, value) => setInformation((previous) => ({ ...previous, [key]: value }))}
        onPreferenceChange={(key, value) =>
          setPreferences((previous) => ({ ...previous, [key]: value }))
        }
        onDomainChoice={setDomainChoice}
        onDuplicateCheck={() => {}}
        onSubmit={(event) => event.preventDefault()}
        onCancel={() => {}}
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
