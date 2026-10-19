import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Accordion, type AccordionEntry } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductDetailAfterSalesContent } from '@/shared/features/product/ProductDetailAfterSalesContent';
import { ProductDetailDeliveryContent } from '@/shared/features/product/ProductDetailDeliveryContent';
import { ProductDetailInquiryContent } from '@/shared/features/product/ProductDetailInquiryContent';

const wrapper = css({
  borderBottom: '1px solid var(--color-black-20)',
  py: '6',
  _mobile: { py: '4' },
});

const items: AccordionEntry[] = [
  {
    value: 'inquiry',
    title: <Typography variant="heading9">상품 문의</Typography>,
    content: <ProductDetailInquiryContent />,
  },
  {
    value: 'delivery',
    title: <Typography variant="heading9">배송 및 반품</Typography>,
    content: <ProductDetailDeliveryContent />,
  },
  {
    value: 'after-sales',
    title: <Typography variant="heading9">A/S 안내</Typography>,
    content: <ProductDetailAfterSalesContent />,
  },
];

export function ProductDetailSupport() {
  return (
    <Box as="section" aria-label="상품 안내" borderTop="1px solid var(--color-black-20)">
      <Accordion indicatorSize="13px" items={items} multiple={false} itemClassName={wrapper} />
    </Box>
  );
}
