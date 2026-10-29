'use client';

import { createContext } from 'react';

import type { ProfileAddress, ProfileValues } from '@/app/mypage/profile/mypage-profile.types';
import type { ReviewListEntry, WrittenReview } from '@/app/mypage/reviews/reviews.types';
import type { Product } from '@/mocks/products';
import type { BindingState, ListBinding } from '@/types/binding';
import type { Address } from '@/types/mypage-address.types';

export type ProfileRecord = ProfileValues & {
  id: string;
  name: string;
  birthDate: string;
  address: ProfileAddress;
};

/** 개발팀 적용: 마스킹된 조회값과 편집 원본을 분리합니다. verifyPhone의 인증 참조를 save에 전달하고 전화번호가 바뀌면 무효화합니다. */
export type ProfileBinding = BindingState & {
  item: ProfileRecord | null;
  save: (
    input: ProfileValues & { address: ProfileAddress; phoneProof: string | null },
  ) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  withdraw: () => Promise<void>;
  requestPhone: (phone: string) => Promise<{ requestId: string; expiresInSeconds: number }>;
  verifyPhone: (input: { requestId: string; phone: string; code: string }) => Promise<string>;
};

export type HistoryItem = { id: string; product: Product; liked: boolean; requestedAt?: string };

export type HistoryBinding = ListBinding<HistoryItem, Record<string, never>> & {
  setLiked: (id: string, active: boolean) => Promise<void>;
  cancelRestock: (id: string) => Promise<void>;
};

export type CouponView = {
  id: string;
  name: string;
  benefit: string;
  condition: string;
  expiresAt: string;
  category: '상품 할인' | '배송 할인';
};

export type PaymentMethodView = { id: string; label: string; maskedNumber: string };

export type OverviewView = {
  name: string;
  tier: string;
  tierInitial: string;
  nextTierText: string;
  couponCount: number;
  wishlistCount: number;
  purchaseAmount: string;
  orders: readonly {
    name: string;
    gender: string;
    price: string;
    description: string;
    status: string;
    image: string;
    isNew?: boolean;
  }[];
  referralCode: string;
  referralCount: number;
  referralRewards: string;
};

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

/**
 * [개발팀 바인딩]
 * 마이페이지 라우트의 Client 연결 소유자에서 필요한 영역만 Provider.value로 지정합니다.
 * 영역을 생략하면 기존 데모입니다. 연결한 영역은 조회 중에도 items: [] 또는 item: null과 pending을 명시해 데모 값이 섞이지 않게 합니다.
 * profile.item은 실제 편집 원본입니다. 읽기 전용 마스킹 값과 원본 DTO의 구분/권한 검증은 어댑터에서 처리합니다.
 * histories의 id는 찜/열람/재입고 신청 식별자이며 product.id와 다를 수 있습니다. 변경 콜백에는 행 id가 전달됩니다.
 * coupons는 서버 필터 결과/전체 건수/추가 조회를 받습니다. register 후 보유 목록과 요약 쿠폰 수를 갱신합니다.
 * overview는 대시보드·등급·친구추천에서 공유됩니다. activities는 활동 내역, paymentMethods는 마스킹된 결제수단 목록입니다.
 * save/remove/setLiked/cancelRestock/register 성공 후 목록 반영 또는 query invalidation까지 연결 함수가 담당합니다. 실패는 reject해 기존 행/초안을 유지합니다.
 */
export const MyPageDataContext = createContext<{
  addresses?: AddressBinding;
  reviews?: ReviewsBinding;
  profile?: ProfileBinding;
  histories?: Partial<Record<'wishlist' | 'recent' | 'restock-alerts', HistoryBinding>>;
  coupons?: ListBinding<CouponView, { category: string }> & {
    register: (code: string) => Promise<void>;
    employeeCoupons?: readonly string[];
  };
  overview?: BindingState & { item: OverviewView | null };
  /** 개발팀 적용: 결제사 등록 창을 열고 실제 등록 완료/사용자 취소를 구분해 반환합니다. 목록 재조회는 연결 함수에서 처리하며 카드 원문은 화면에 전달하지 않습니다. */
  paymentMethods?: BindingState & {
    items: readonly PaymentMethodView[];
    register: () => Promise<'registered' | 'cancelled'>;
  };
  activities?: BindingState & {
    items: readonly { label: string; value: string; status?: string }[];
  };
}>({});
