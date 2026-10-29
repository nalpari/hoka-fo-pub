'use client';

/**
 * [개발팀 바인딩]
 * 이 값은 상세 미리보기 단일 세션 주입 호환용입니다. 운영 상세의 조회 상태/정원/예약금/신청 요청은 RunClubDataContext.detail로 연결합니다.
 */

import { createContext } from 'react';

import type { RunClubSession } from '@/components/run-club/runClub.data';

export const RunClubSessionContext = createContext<RunClubSession | undefined>(undefined);
