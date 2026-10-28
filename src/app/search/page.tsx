'use client';

import { useSearchParams } from 'next/navigation';
import { ProductListingPage } from '@/components/catalog/ProductListingPage';

/** 검색어를 읽고 공용 상품 목록의 검색 결과를 표시합니다. (Reads the query and displays results through the shared product listing.) */
export default function Page() {
  const params = useSearchParams();
  return <ProductListingPage searchQuery={params.get('q') ?? ''} />;
}
