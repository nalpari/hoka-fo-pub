import { css, cva } from 'styled-system/css';
import { Accordion, type AccordionEntry } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductDetailAfterSalesContent } from '@/shared/features/product/ProductDetailAfterSalesContent';
import { ProductDetailDeliveryContent } from '@/shared/features/product/ProductDetailDeliveryContent';
import { ProductDetailInquiryContent } from '@/shared/features/product/ProductDetailInquiryContent';

const root = cva({
  base: {
    borderTop: '1px solid var(--color-black-20)',
  },
});

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
    <section aria-label="상품 안내" className={root()}>
      <Accordion indicatorSize="13px" items={items} multiple={false} itemClassName={wrapper} />
    </section>
  );
}
