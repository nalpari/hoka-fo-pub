'use client';

import { createContext } from 'react';

import type { DropdownOption } from '@/components/common/atoms/Dropdown';

import type { CartItem } from '@/types/cart';

export type CheckoutSubmission = {
  items: readonly CartItem[];
  savedAddressId: string | null;
  payment: 'kakao' | 'naver' | 'toss' | 'card' | 'samsung' | 'payco';
  coupon: string;
  maxBenefit: boolean;
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

export type CheckoutBinding = {
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
