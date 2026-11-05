'use client';

/**
 * [ 개발팀 바인딩 ]
 * 이 값은 상세 미리보기 단일 세션 주입 호환용입니다. 운영 상세의 조회 상태/정원/예약금/신청 요청은 통합 소유자가 연결합니다. 현재 연결 Context·요청은 없습니다.
 */

import { createContext } from 'react';

import type { RunningSessionSession } from '@/components/running-session/runningSession.data';

export const RunningSessionSessionContext = createContext<RunningSessionSession | undefined>(undefined);
