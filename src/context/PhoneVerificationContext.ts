'use client';

import { createContext } from 'react';
import type { VerifiedIdentity } from '@/context/AccountFlowContext';

import type { PhoneInformation } from '@/components/phone-verification/PhoneVerificationContent';

/**
 * [개발팀 바인딩]
 * request는 입력 개인정보로 인증을 요청하고 실제 requestId/유효 초를 반환합니다. 타이머는 이 요청이 성공한 뒤 시작합니다.
 * verify에는 같은 requestId/code/information이 전달됩니다. 가입/잠금해제에서는 서버 proof와 accountStatus를 가진 VerifiedIdentity를 반환합니다.
 * 일반 인증 소비자의 void 반환은 호환용입니다. 가입 분기를 위해 임의로 기존회원/신규회원 여부를 추정하지 않습니다.
 * 인증 실패/만료는 Error로 reject합니다. 입력 정보 변경 후 도착한 이전 인증 응답은 훅이 무시합니다.
 */
export type PhoneVerificationService = {
  request: (
    information: PhoneInformation,
  ) => Promise<{ requestId: string; expiresInSeconds: number }>;
  verify: (input: {
    requestId: string;
    code: string;
    information: PhoneInformation;
  }) => Promise<VerifiedIdentity | void>;
};

export const PhoneVerificationContext = createContext<PhoneVerificationService | null>(null);
