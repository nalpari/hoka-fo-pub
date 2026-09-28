import { ProductInquiryNoticeSection } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryNoticeSection';

type ProductInquiryDeliveryNoticeProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function ProductInquiryDeliveryNotice({
  isOpen,
  onToggle,
}: ProductInquiryDeliveryNoticeProps) {
  return (
    <ProductInquiryNoticeSection isOpen={isOpen} onToggle={onToggle} title="배송 및 반품">
      배송은 결제 완료 후 순차적으로 출고되며, 반품 기준은 상품 수령일 기준으로 적용됩니다.
    </ProductInquiryNoticeSection>
  );
}
