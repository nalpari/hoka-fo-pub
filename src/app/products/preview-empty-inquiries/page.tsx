import { RouteContent } from '@/app/products/[id]/_components/ProductDetailContent';

/** 상품 상세 전체에서 문의가 없는 상태를 표시합니다. (Displays the full product detail with no inquiries.) */
export default function Page() {
  return <RouteContent preview="empty-inquiries" />;
}
