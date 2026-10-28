'use client';

import { createContext } from 'react';

import type { Address } from '@/types/mypage-address.types';

export const MyPageInitialStateContext = createContext<{
  addresses?: Address[];
  readyReviewCount?: number;
}>({});
