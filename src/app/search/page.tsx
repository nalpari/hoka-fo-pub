'use client';

/**
 * [개발팀 바인딩]
 * q 쿼리가 ProductListingPage.searchQuery로 전달됩니다. ProductListingContext.onQueryChange에서 실제 검색하고 items/totalCount/hasMore를 갱신합니다.
 * 검색 오버레이의 추천 검색어와 이 경로의 실제 상품 검색 결과는 서로 다른 데이터입니다.
 */

import { useSearchParams } from 'next/navigation';

import { ProductListingPage } from '@/components/catalog/ProductListingPage';

/** 검색어를 읽고 공용 상품 목록의 검색 결과를 표시합니다. (Reads the query and displays results through the shared product listing.) */
export default function Page() {
  const params = useSearchParams();
  return <ProductListingPage searchQuery={params.get('q') ?? ''} />;
}
