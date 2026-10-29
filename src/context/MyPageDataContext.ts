'use client';

import { createContext } from 'react';

import type { ReviewListEntry, WrittenReview } from '@/app/mypage/reviews/reviews.types';
import type { Address } from '@/types/mypage-address.types';

export type AddressBinding = {
  items: readonly Address[];
  pending?: boolean;
  error?: string;
  save: (address: Omit<Address, 'id'> & { id?: number }) => Promise<void>;
  remove: (id: number) => Promise<void>;
};

export type ReviewsBinding = {
  ready: readonly ReviewListEntry[];
  written: readonly ReviewListEntry[];
  pending?: boolean;
  error?: string;
  save: (id: ReviewListEntry['id'], review: WrittenReview) => Promise<void>;
};

export const MyPageDataContext = createContext<{
  addresses?: AddressBinding;
  reviews?: ReviewsBinding;
}>({});
