/**
 * [ 개발팀 바인딩 ]
 * RegistrationContent는 information.email에 전체 이메일 주소를 표시하고 onChange('email', value)로 초안 변경을 전달합니다.
 * 같은 폼의 마케팅 수신 선택은 preferences로 표시하고 onPreferenceChange(key, value)로 이메일·문자 동의 변경을 전달합니다.
 * 고정 오류는 fieldErrors.email로 표시합니다. 현재 퍼블리싱 화면은 가입 요청을 실행하지 않습니다.
 * 서비스 연결 시 통합 소유자가 제출 시점의 초안, identity.proof, 약관 id/version/accepted와 수신 동의를 가입 요청에 매핑합니다.
 * confirmation은 화면 검증에 사용합니다. 통합 소유자는 요청 중 중복 제출을 막고, 실패 시 초안과 오류를 유지해 재시도를 제공하며, 성공 응답 후 완료 상태를 갱신합니다.
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
  anniversary: string;
};

export type MarketingPreferences = { email: string; sms: string; kakao: string };

export type RegistrationContentProps = {
  information: RegistrationInformation;
  preferences: MarketingPreferences;
  notice: string;
  duplicateNotice: string;
  fieldErrors: {
    id: string;
    email: string;
    name: string;
    password: string;
    confirmation: string;
  } & Partial<Record<keyof RegistrationInformation, string>>;
  addressOpen: boolean;
  onChange: (key: keyof RegistrationInformation, value: string) => void;
  onPreferenceChange: (key: keyof MarketingPreferences, value: string) => void;
  onDuplicateCheck?: () => void;
  onAddressOpen: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
};
