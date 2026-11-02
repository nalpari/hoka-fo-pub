'use client';
import { RouteContent } from '@/app/products/[id]/_components/ProductDetailContent';
/** 상품 옵션 필수 안내를 고정 표시합니다. (Displays the fixed product-option requirement.) */
export default function Page() {
  return <RouteContent preview="selection-required" />;
}
