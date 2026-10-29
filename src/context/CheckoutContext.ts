'use client';

import { createContext } from 'react';

import type { DropdownOption } from '@/components/common/atoms/Dropdown';

import type { CartItem } from '@/types/cart';

export type CheckoutCouponSelection = { products: Readonly<Record<string, string>>; cart: string };

export type CheckoutCouponGroup = {
  id: string;
  name: string;
  image?: string;
  option?: string;
  coupons: readonly { id: string; label: string; discount: number; disabled?: boolean }[];
};

export type CheckoutSubmission = {
  items: readonly CartItem[];
  savedAddressId: string | null;
  payment: 'kakao' | 'naver' | 'toss' | 'card' | 'samsung' | 'payco';
  coupon: string;
  maxBenefit: boolean;
  couponSelection?: CheckoutCouponSelection;
  saveAsDefaultAddress?: boolean;
  orderAgreed: boolean;
  privacyAgreed: boolean;
  shipping: Record<
    | 'name'
    | 'phone'
    | 'email'
    | 'otherPhone'
    | 'postalCode'
    | 'address'
    | 'addressDetail'
    | 'deliveryRequest'
    | 'deliveryMessage',
    string
  >;
};

/**
 * [ 개발팀 바인딩 ]
 * 결제 경로의 Client Provider에서 쿠폰 목록/현재 할인액/배송비/기본 배송지를 전달합니다. savedAddress: null은 직접 입력입니다.
 * onCouponChange/onMaxBenefitChange에서 상태를 갱신하고 서버 견적을 다시 조회합니다. discount/shippingFee가 결제 버튼 금액에도 사용됩니다.
 * submit은 상품 ID·옵션·수량, 선택 savedAddressId, 결제수단, couponSelection의 상품/장바구니 쿠폰 ID, saveAsDefaultAddress, 동의와 배송 필드 전체를 받습니다.
 * 화면 금액을 승인 금액으로 신뢰하지 말고 서버에서 재계산합니다. 결제사 승인과 주문 저장 완료 후 resolve하며 취소/실패는 reject합니다.
 * 성공 뒤 장바구니/쿠폰/주문 상태 갱신은 어댑터 책임입니다. 원 결제수단으로 환불하며 무통장 입금/환불계좌 입력은 이 계약에 없습니다.
 */
export type CheckoutBinding = {
  /** [ 개발팀 바인딩 ] 상품별 쿠폰과 장바구니 쿠폰은 서버 견적 데이터입니다. 적용은 전체 선택 ID를 받아 견적·할인액·현재 선택을 갱신한 뒤 resolve합니다. 실패 시 reject하며 열린 모달과 초안을 유지합니다. */
  couponGroups?: readonly CheckoutCouponGroup[];
  cartCoupons?: CheckoutCouponGroup['coupons'];
  couponSelection?: CheckoutCouponSelection;
  applyCoupons?: (selection: CheckoutCouponSelection) => Promise<void>;
  coupon: string;
  maxBenefit: boolean;
  discount: number;
  shippingFee: number;
  couponOptions: readonly DropdownOption[];
  pending?: boolean;
  error?: string;
  savedAddress: {
    id: string;
    label: string;
    name: string;
    phone: string;
    address: string;
    postalCode: string;
    addressDetail: string;
  } | null;
  onCouponChange: (coupon: string) => void;
  onMaxBenefitChange: (checked: boolean) => void;
  submit: (input: CheckoutSubmission) => Promise<void>;
};

export const CheckoutContext = createContext<CheckoutBinding | null>(null);
