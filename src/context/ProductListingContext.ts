'use client';

import { createContext } from 'react';

import type { FilterValues } from '@/components/catalog/productListing.types';
import type { Product } from '@/mocks/products';

export type ProductListingQuery = { filters: FilterValues; sort: string; searchQuery: string };

/**
 * [개발팀 바인딩]
 * 상품/검색 목록에 items, totalCount, hasMore를 각각 연결합니다. 서버가 필터/정렬한 결과를 다시 목 목록 기준으로 가공하지 않습니다.
 * onQueryChange에는 URL의 검색/분류/정렬 조건이 전달됩니다. onPreviewQueryChange는 모바일 시트의 적용 전 조건이며 본 조회와 구분합니다.
 * mobileResultCount는 적용 전 조건의 서버 건수입니다. 응답 순서/취소/페이지 누적은 서비스 소유자가 관리하고 콜백 참조는 안정적으로 유지합니다.
 * onLoadMore는 추가 페이지를 반영한 뒤 resolve, 실패는 reject합니다. 재조회는 onRetry, 조회 중/실패는 pending/error로 전달합니다.
 */
export type ProductListingBinding = {
  items: readonly Product[];
  totalCount: number;
  hasMore: boolean;
  pending?: boolean;
  error?: string;
  mobileResultCount?: number;
  onQueryChange: (query: ProductListingQuery) => void;
  onPreviewQueryChange?: (query: ProductListingQuery) => void;
  onLoadMore: () => void | Promise<void>;
  onRetry?: () => void | Promise<void>;
};

export const ProductListingContext = createContext<ProductListingBinding | null>(null);
