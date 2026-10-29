/**
 * [개발팀 바인딩]
 * RegistrationInformation은 입력 초안이며 서버 가입 DTO가 아닙니다. confirmation은 화면 검증용이고 email/domain은 어댑터에서 조합합니다.
 * 실제 제출은 AccountServicesContext.register에서 identity.proof와 약관 id/version/accepted를 함께 검증합니다. 사용자 ID/휴대폰 중복 판단은 서버에서 확정합니다.
 */

import type { FormEvent } from 'react';

export type RegistrationInformation = {
  id: string;
  name: string;
  password: string;
  confirmation: string;
  birthDate: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  email: string;
  domain: string;
  anniversary: string;
};

export type MarketingPreferences = { email: string; sms: string; kakao: string };

export type RegistrationContentProps = {
  stage: 'information' | 'additional';
  information: RegistrationInformation;
  preferences: MarketingPreferences;
  domainChoice: string;
  notice: string;
  duplicateNotice: string;
  fieldErrors: {
    id: string;
    email: string;
    domain: string;
    name: string;
    password: string;
    confirmation: string;
  } & Partial<Record<keyof RegistrationInformation, string>>;
  addressOpen: boolean;
  onChange: (key: keyof RegistrationInformation, value: string) => void;
  onPreferenceChange: (key: keyof MarketingPreferences, value: string) => void;
  onDomainChoice: (value: string) => void;
  onDuplicateCheck: () => void;
  onAddressOpen: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};
