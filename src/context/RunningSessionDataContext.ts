'use client';

import { createContext } from 'react';

import type { RunningSessionSession } from '@/components/running-session/runningSession.data';
import type { Product } from '@/mocks/products';
import type { BindingState, ListBinding } from '@/types/binding';

export type RunningSessionEntry = {
  id: string;
  session: RunningSessionSession;
  status: string;
  /** 신청일 표시값입니다. 서버 정렬은 entries.onQueryChange의 sort로 요청합니다. */
  appliedAt?: string;
  canCancel?: boolean;
};

export type SessionFact = { label: string; value: string; detail?: string };

/** 개발팀 적용: 신청내역은 운영 세션과 별도 응답입니다. 신청이 저장/승인된 뒤 apply를 resolve하고 목록을 재조회합니다. 예약금 결제가 필요하면 apply 내부에서 완료까지 처리합니다. */
/**
 * [개발팀 바인딩]
 * 일반 목록은 sessions, 마이페이지 신청내역은 entries에 연결합니다. entries의 id/status는 세션 id/status와 별도인 신청 식별자/신청 상태입니다.
 * detail.onQueryChange({ id })로 경로 세션을 조회한 뒤 session/facts/guide와 추천 상품을 전달합니다. 정원·예약금·신청기간은 facts에 포함합니다.
 * 실제 신청·예약금 결제·필수 동의 수집은 apply의 연결 소유자가 처리합니다. 완료 후 resolve하고 거절/결제 취소/실패는 reject합니다.
 * 신청 완료 뒤 해당 세션 상태와 신청내역을 재조회합니다. session: null의 조회 중/오류/없음은 pending/error로 구분합니다.
 */
export const RunningSessionDataContext = createContext<{
  sessions?: ListBinding<RunningSessionSession, { category: string }>;
  entries?: ListBinding<RunningSessionEntry, { category: string; sort?: 'latest' | 'oldest' }>;
  /** [ 개발팀 바인딩 ] 신청 ID로 취소를 요청하고 성공 후 entries 목록·건수를 갱신한 뒤 resolve합니다. 실패하면 reject하며 확인창을 유지합니다. */
  cancelEntry?: (entryId: string) => Promise<void>;
  detail?: BindingState & {
    session: RunningSessionSession | null;
    recommendedProducts?: readonly Product[];
    facts: readonly SessionFact[];
    guide: readonly { label: string; value: string }[];
    onQueryChange: (query: { id: string }) => void;
    apply: (sessionId: string) => Promise<void>;
  };
}>({});
