'use client';

import type { ProductListingBinding } from '@/context/ProductListingContext';

import { ProductListingPage } from '@/components/catalog/ProductListingPage';
import { products } from '@/mocks/products';

const items = [
  { ...products[0], listingSoldOut: true },
  { ...products[1], listingSoldOut: false },
  { ...products[2], listingSoldOut: true },
  { ...products[3], listingSoldOut: false },
];

const data: ProductListingBinding = {
  items,
  totalCount: items.length,
  hasMore: false,
  mobileResultCount: items.length,
  onQueryChange: () => {},
  onLoadMore: () => {},
};

/**
 * [ 개발팀 바인딩 ] 정상·품절이 혼합된 고정 목록 fixture입니다. dim과 Sold Out은 변경 가능한 예시 디자인입니다.
 * listingSoldOut은 목록 표시 데이터이며 사이즈 재고나 상품 ID로 추정하지 않습니다. 운영 값은 목록 응답 매핑 소유자가 전달합니다.
 * preview는 조회·추가 요청을 실행하지 않습니다. 운영 조회의 pending/error·재시도·응답 갱신은 기존 ProductListingContext 소유자 책임입니다.
 */
/** 상품 목록의 품절 표시 예시를 제공합니다. (Provides a fixed example of sold-out listing presentation.) */
export function ProductSoldOutPreview() {
  return <ProductListingPage data={data} />;
}
