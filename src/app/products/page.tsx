'use client';

import { ProductListingPage } from '@/components/catalog/ProductListingPage';

/** [ 개발팀 바인딩 ] 현재 페이지는 ProductListingPage의 기본 표시 fixture와 URL 필터를 사용합니다. 실제 상품 목록 연결 소유자가 해당 컴포넌트의 data(items/totalCount/hasMore/pending/error)를 제공하고 조회·더보기·재시도와 응답 갱신 계약을 별도로 구현해야 합니다. 페이지 자체는 임의의 미리보기 props를 받지 않습니다. */

/** 상품 목록의 기본 라우트 화면을 표시합니다. (Displays the default product listing route.) */
export default function Page() {
  return <ProductListingPage />;
}
