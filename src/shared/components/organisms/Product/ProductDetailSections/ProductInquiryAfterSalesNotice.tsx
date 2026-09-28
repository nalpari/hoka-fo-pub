import { ProductInquiryNoticeSection } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryNoticeSection';

type ProductInquiryAfterSalesNoticeProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function ProductInquiryAfterSalesNotice({
  isOpen,
  onToggle,
}: ProductInquiryAfterSalesNoticeProps) {
  return (
    <ProductInquiryNoticeSection isOpen={isOpen} onToggle={onToggle} title="A/S 안내">
      제품 상태 확인 후 수선 가능 여부와 절차를 안내해 드립니다.
    </ProductInquiryNoticeSection>
  );
}
