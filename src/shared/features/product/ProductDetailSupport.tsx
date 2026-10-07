import { cva } from 'styled-system/css';
import { Accordion, type AccordionEntry } from '@/shared/components/atoms/Accordion/Accordion';
import { ProductDetailAfterSalesContent } from '@/shared/features/product/ProductDetailAfterSalesContent';
import { ProductDetailDeliveryContent } from '@/shared/features/product/ProductDetailDeliveryContent';
import { ProductDetailInquiryContent } from '@/shared/features/product/ProductDetailInquiryContent';

const root = cva({
  base: {
    borderTop: '1px solid #ddd',
    '& > *': { borderBottom: '1px solid #ddd' },
    '& button': { minH: '13', fontSize: '13px', fontWeight: '700' },
    '& p': { pb: '4', color: '#555', fontSize: '12px', lineHeight: '1.6' },
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
