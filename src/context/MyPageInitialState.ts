'use client';

import { createContext } from 'react';
import type { Address } from '@/components/mypage/mypage-address.types';

export const MyPageInitialStateContext = createContext<{
  addresses?: Address[];
  readyReviewCount?: number;
}>({});
