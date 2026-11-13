import { initialAddresses } from '@/data/addressPreview';
import type { Address } from '@/types/mypage-address.types';

/** 시안의 네 행과 더보기 카운터를 위한 명시적 표시 fixture입니다. */
export const checkoutAddressPreview: readonly Address[] = [
  ...initialAddresses,
  { ...initialAddresses[1], id: 3 },
  { ...initialAddresses[1], id: 4 },
];

export const checkoutAddressPagePreview = { current: 1, total: 10 };
