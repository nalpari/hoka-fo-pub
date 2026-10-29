'use client';

import { createContext, type ReactNode } from 'react';

import type { Product } from '@/mocks/products';
import type { BindingState } from '@/types/binding';

/** 개발팀 적용: API 상품을 Product로 변환하고 탭별 결과를 전달합니다. 서비스 모드에는 시안용 반복/절단을 적용하지 않습니다. 기타 영역은 기존 카드 조합을 ReactNode 슬롯으로 전달합니다. */
/**
 * [개발팀 바인딩]
 * bestSellers에는 탭별 실제 상품만 전달합니다. 3개 응답을 12개로 반복하지 않으며 빈 배열은 실제 빈 결과입니다.
 * onCategoryChange는 선택 탭을 전달합니다. 조회 상태를 pending/error/onRetry로 연결하고 오래된 탭 응답은 요청 소유자가 버립니다.
 * hero/categories/explore/shoeFinder는 기존 화면 조합을 전달하는 콘텐츠 슬롯입니다. BO 텍스트/이미지/링크를 기존 컴포넌트 props로 변환합니다.
 * Provider를 주지 않을 때만 로컬 시안 콘텐츠를 사용합니다. 운영 데이터 일부가 비었다고 목 배너나 목 상품으로 대체하지 않습니다.
 */
export const HomeContentContext = createContext<
  | (BindingState & {
      bestSellers: readonly Product[];
      onCategoryChange: (category: string) => void;
      hero: ReactNode;
      categories: ReactNode;
      explore: ReactNode;
      shoeFinder: ReactNode;
    })
  | null
>(null);
