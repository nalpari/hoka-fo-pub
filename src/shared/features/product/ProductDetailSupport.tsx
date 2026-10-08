import { cva } from 'styled-system/css';
import { Accordion, type AccordionEntry } from '@/shared/components/atoms/Accordion/Accordion';
import { ProductDetailAfterSalesContent } from '@/shared/features/product/ProductDetailAfterSalesContent';
import { ProductDetailDeliveryContent } from '@/shared/features/product/ProductDetailDeliveryContent';
import { ProductDetailInquiryContent } from '@/shared/features/product/ProductDetailInquiryContent';

const root = cva({
  base: {
    borderTop: '1px solid var(--color-black-20)',
    '& > *': { borderBottom: '1px solid var(--color-black-20)' },
    '& button': { minH: '13', fontSize: '14' /* 기존 13px */, fontWeight: 'bold' },
    '& p': { pb: '4', color: 'var(--color-black-60)', fontSize: '12', lineHeight: 'body' },
  },
});

const items: AccordionEntry[] = [
  { value: 'inquiry', title: '상품 문의', content: <ProductDetailInquiryContent /> },
  {
    value: 'delivery',
    title: '배송 및 반품',
    content: <ProductDetailDeliveryContent />,
  },
  {
    value: 'after-sales',
    title: 'A/S 안내',
    content: <ProductDetailAfterSalesContent />,
  },
];

export function ProductDetailSupport() {
  return (
    <section aria-label="상품 안내" className={root()}>
      <Accordion indicatorSize="13px" items={items} multiple={false} />
    </section>
  );
}
