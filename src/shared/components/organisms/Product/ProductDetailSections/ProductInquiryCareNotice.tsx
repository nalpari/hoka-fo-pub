import { ProductInquiryNoticeSection } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryNoticeSection';

type ProductInquiryCareNoticeProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function ProductInquiryCareNotice({ isOpen, onToggle }: ProductInquiryCareNoticeProps) {
  return (
    <ProductInquiryNoticeSection isOpen={isOpen} onToggle={onToggle} title="세탁 및 손질방법">
      소재별 권장 관리 방법을 확인해 제품의 형태와 색상을 오래 유지해 주세요.
    </ProductInquiryNoticeSection>
  );
}
