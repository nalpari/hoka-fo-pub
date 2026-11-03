import { RouteContent } from '@/app/products/[id]/_components/ProductDetailContent';

/** 품절 옵션의 입고알림 선택 상태를 표시합니다. (Displays a sold-out option selected for restock notification.) */
export default function Page() {
  return <RouteContent preview="restock" />;
}
