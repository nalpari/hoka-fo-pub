'use client';

import type { ReactNode } from 'react';

import { cva } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

export const tiers = [
  {
    initial: 'E',
    name: 'ELITE',
    benefits: [
      {
        title: 'TIER 1. 10% 할인 쿠폰 (*월 1회 지급)',
        details: [
          '최대 구매 가능 금액 : 700,000원',
          '3개월 운영 후 5% 하향 조정 (정책 변경일 D-30 공지 필요)',
        ],
      },
      { title: '무료 반품 쿠폰 3장 (*연 3회 지급)', details: [] },
      { title: '스페셜 래플 응모 기회 제공 (이벤트, 상품 etc)', details: [] },
    ],
  },
  {
    initial: 'A',
    name: 'ADVANCED',
    benefits: [
      { title: 'TIER 2. 7% 할인 쿠폰 (월 1회 지급)', details: ['최대 구매 가능 금액 : 500,000원'] },
      { title: '무료 반품 쿠폰 2장 (연 2회 지급)', details: [] },
    ],
  },
  {
    initial: 'R',
    name: 'RUNNER',
    benefits: [
      { title: 'TIER 3. 5% 할인 쿠폰 (월 1회 지급)', details: ['최대 구매 가능 금액 : 300,000원'] },
      { title: '무료 반품 쿠폰 1장 (연 1회 지급)', details: [] },
    ],
  },
] as const;

export const tierCard = cva({
  base: {
    bg: 'white',
    borderBottom: '1px solid var(--colors-black-20)',
    flexDirection: 'row',
    gap: '12',
    alignItems: 'flex-start',
    _mobile: { bg: 'var(--tier-color)', flexDirection: 'column', gap: '4' },
  },
  variants: {
    tier: {
      ELITE: { '--tier-color': 'var(--colors-blue-100)' },
      ADVANCED: { '--tier-color': 'var(--colors-citrus-100)' },
      RUNNER: { '--tier-color': 'var(--colors-off-white-100)' },
    },
  },
});

export const commonBenefits = [
  {
    title: '멤버 ‘신규 가입’ 유도',
    items: [
      { text: '멤버 전용 상품(에너지 스타일 비회원 구매x)', details: [] },
      { text: '무료배송', details: [] },
      {
        text: '신규 가입 쿠폰 (10%쿠폰, *최초 1회 지급)',
        details: [
          '최대 구매 가능 금액 : 500,000원',
          '3개월 운영 후 5% 하향 조정(정책 변경일 D-30 공지 필요)',
        ],
      },
    ],
  },
  {
    title: '멤버 ‘첫 구매’ 유도',
    items: [
      {
        text: '첫 구매 감사 쿠폰(100,000원, *최초 1회 지급)',
        details: ['최소 주문 가능 금액 : 100,000원'],
      },
    ],
  },
  {
    title: '멤버 ‘재구매’ 유도',
    items: [
      {
        text: '생일 축하 쿠폰(10,000원, *연 1회 지급)',
        details: ['최소 주문 가능 금액 : 50,000원'],
      },
    ],
  },
  {
    title: '멤버 ‘CRM 채널’ 유입',
    items: [{ text: 'HOKA 카플친 추가 시 5,000원 쿠폰(*최초 1회 지급)', details: [] }],
  },
] as const;

/** 멤버십 혜택 한 항목을 표시합니다. (Displays one membership benefit.) */
export function RewardBenefitItem({ number, children }: { number: number; children: ReactNode }) {
  return (
    <HStack as="li" alignItems="flex-start" gap="1">
      <Typography as="span" mo="body4">
        {number}.
      </Typography>
      <Stack flex="1" minW="0" gap="2">
        {children}
      </Stack>
    </HStack>
  );
}
