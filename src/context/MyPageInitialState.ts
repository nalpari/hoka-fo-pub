'use client';

/**
 * [개발팀 바인딩]
 * 이 컨텍스트는 기존 주소/리뷰 Storybook 초기 상태용입니다. 운영의 늦은 응답/재조회는 MyPageDataContext.addresses/reviews로 연결합니다.
 */

import { createContext } from 'react';

import type { Address } from '@/types/mypage-address.types';

export const MyPageInitialStateContext = createContext<{
  addresses?: Address[];
  readyReviewCount?: number;
}>({});
