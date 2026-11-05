/**
 * [ 개발팀 바인딩 ]
 * PhoneInformation은 인증 화면의 입력 모델입니다. 제공자별 통신사/내외국인/성별 코드를 어댑터에서 변환하고 인증 proof는 서버에서 발급받습니다.
 * PhoneVerificationContent는 입력·선택만 로컬로 처리합니다. 실제 발송/검증과 요청 상태는 통합 소유자가 연결합니다. 현재 연결 Context·요청은 없습니다.
 */

import type { FormEvent } from 'react';

export type PhoneInformation = {
  name: string;
  birthDate: string;
  nationality: string;
  gender: string;
  carrier: string;
  phone: string;
};

export type PhoneVerificationErrors = Partial<Record<keyof PhoneInformation, string>>;

export type PhoneVerificationContentProps = {
  pending?: boolean;
  expired?: boolean;
  onExpiredClose?: () => void;
  title?: string;
  description?: string;
  information: PhoneInformation;
  agreements: boolean[];
  showAgreementErrors?: boolean;
  fixedAgreementErrors?: boolean;
  requested: boolean;
  code: string;
  secondsLeft: number;
  resendWait: number;
  notice: string;
  noticeTone?: 'error' | 'info';
  codeError?: string;
  fieldErrors?: PhoneVerificationErrors;
  detail: string | null;
  initialPreviousPickerOpen?: boolean;
  designTerms?: boolean;
  designTermKind?: 'required' | 'optional';
  onInformationChange: (key: keyof PhoneInformation, value: string) => void;
  onAgreementChange: (index: number, checked: boolean) => void;
  onAllAgree: (checked: boolean) => void;
  onCodeChange: (value: string) => void;
  onRequest?: () => void;
  onConfirm: (event: FormEvent<HTMLFormElement>) => void;
  onDetail: (title: string | null) => void;
};
