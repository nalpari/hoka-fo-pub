import { Stack } from 'styled-system/jsx';
import { ProductSupportContact } from './ProductSupportContact';
import { ProductSupportLink } from './ProductSupportLink';

const supportLinks = [
  {
    title: '배송 및 반품 관련 1:1 문의',
    description: '궁금하신 내용을 1:1 문의에 남겨 주시면 확인하여 답변드리겠습니다.',
    label: '1:1 문의',
    to: '/support/inquiries',
  },
  {
    title: 'FAQs',
    description: '자주 묻는 질문의 답변을 찾아보세요.',
    label: 'FAQs',
    to: '/support/faq',
  },
  {
    title: '주문/배송 조회',
    description: '구매하신 상품의 주문 및 배송 내역을 확인하실 수 있습니다.',
    label: '주문/배송 조회',
    to: '/mypage/orders',
  },
];

export function ProductDetailDeliverySupport() {
  return (
    <Stack
      as="section"
      border="1px solid token(colors.border.default)"
      p="8"
      gap="6"
      _mobile={{ p: '5' }}
      aria-label="배송 및 반품 고객센터"
    >
      <ProductSupportContact />
      {supportLinks.map(({ title, description, label, to }) => (
        <ProductSupportLink
          key={to}
          title={title}
          description={description}
          label={label}
          to={to}
        />
      ))}
    </Stack>
  );
}
