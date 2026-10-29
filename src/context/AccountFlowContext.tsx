'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

import type {
  MarketingPreferences,
  RegistrationInformation,
} from '@/app/signup/information/registration.types';
import type { PhoneInformation } from '@/components/phone-verification/phone-verification.types';

export type VerifiedIdentity = {
  proof: string;
  information: PhoneInformation;
  accountStatus: 'new' | 'existing';
};

export type Consent = { id: string; version: string; accepted: boolean };

export type RecoveryResult = {
  maskedAccountId: string;
  resetProof: string;
  displayName?: string;
  accountLocked?: boolean;
};

/** BO의 현재 약관 식별자·버전·본문과 선택 가능한 이전 본문을 표시합니다. */
export type SignupTerm = {
  id: string;
  version: string;
  required: boolean;
  label: string;
  body: ReactNode;
  dates?: string;
  previousVersions?: readonly { id: string; label: string; body: ReactNode; dates?: string }[];
};

/**
 * [ 개발팀 바인딩 ]
 * recovery.verify의 accountLocked는 서버 판정이며 true이면 잠금 안내로 이동합니다. resetProof는 저장소에 보관하지 않습니다.
 * 가입/계정 찾기/잠금해제 경로를 감싸는 Client Provider의 value에 실제 함수를 전달합니다.
 * 휴대폰 인증 어댑터는 PhoneVerificationContext.verify에서 proof, information, accountStatus를 반환해야 합니다.
 * 인증 proof는 서버가 발급한 참조값입니다. 화면의 유효성 검사나 고정 인증번호를 실제 인증으로 사용하지 않습니다.
 * signupTerms에는 BO 약관의 안정적인 id/version/required/label/body를 전달합니다. register에는 이 버전의 동의와 입력값이 함께 전달됩니다.
 * checkId는 { available }을 반환하고, register/unlock/resetPassword는 서버 처리 완료 후 resolve합니다. 거절/실패는 Error로 reject합니다.
 * AccountFlowProvider는 라우트 사이에 유지해야 합니다. 새로고침으로 임시 proof가 사라지면 재인증하며 비밀번호/proof를 저장소에 쓰지 않습니다.
 */
export type AccountServices = {
  /** BO 본문은 안전한 ReactNode로 변환해서 전달합니다. 동의는 현재 id/version으로 제출하며 과거 본문 조회는 동의 버전을 바꾸지 않습니다. */
  signupTerms: readonly SignupTerm[];
  checkId: (id: string) => Promise<{ available: boolean }>;
  register: (input: {
    information: RegistrationInformation;
    preferences: MarketingPreferences;
    identity: VerifiedIdentity;
    consents: readonly Consent[];
  }) => Promise<void>;
  recovery: {
    request: (input: {
      name: string;
      phone: string;
    }) => Promise<{ requestId: string; expiresInSeconds: number }>;
    verify: (input: {
      requestId: string;
      code: string;
      name: string;
      phone: string;
    }) => Promise<RecoveryResult>;
    resetPassword: (input: { resetProof: string; password: string }) => Promise<void>;
  };
  unlock: (identity: VerifiedIdentity) => Promise<void>;
};

export const AccountServicesContext = createContext<AccountServices | null>(null);

type Flow = {
  identity: VerifiedIdentity | null;
  consents: readonly Consent[];
  recovery: RecoveryResult | null;
  setIdentity: (identity: VerifiedIdentity | null) => void;
  setConsents: (consents: readonly Consent[]) => void;
  setRecovery: (result: RecoveryResult | null) => void;
};

const AccountFlowContext = createContext<Flow | null>(null);

/** 인증과 가입 단계의 임시 상태를 메모리에 유지합니다. (Keeps temporary verification and signup state in memory.) */
export function AccountFlowProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentity] = useState<VerifiedIdentity | null>(null);
  const [consents, setConsents] = useState<readonly Consent[]>([]);
  const [recovery, setRecovery] = useState<RecoveryResult | null>(null);
  return (
    <AccountFlowContext.Provider
      value={{ identity, consents, recovery, setIdentity, setConsents, setRecovery }}
    >
      {children}
    </AccountFlowContext.Provider>
  );
}

export function useAccountFlow() {
  return useContext(AccountFlowContext);
}
