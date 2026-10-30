'use client';

import { ProductListingPage } from './ProductListingPage';

const emptyResult = {
  items: [],
  totalCount: 0,
  hasMore: false,
  mobileResultCount: 0,
  onQueryChange: () => {},
  onLoadMore: () => {},
};

/**
 * [ 개발팀 바인딩 ] 이 조회 결과는 preview 전용 고정 데이터입니다. 필터 UI만 조작하며 조회/추가 요청은 실행하지 않습니다.
 * 운영 상품과 검색 조회·오류·재시도·응답 갱신은 ProductListingPage.data 또는 ProductListingContext 소유자가 연결합니다.
 */
/** 상품·검색 결과가 없는 고정 상태를 표시합니다. (Displays fixed empty catalogue or search results.) */
export function ProductListingStatePreview({ search = false }: { search?: boolean }) {
  return <ProductListingPage data={emptyResult} searchQuery={search ? 'Clifton' : ''} />;
}
