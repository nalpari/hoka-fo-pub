import { css } from 'styled-system/css';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductDetailDeliveryContent } from './ProductDetailDeliveryContent';
import { CareInstructions } from '@/shared/features/care-guide/CareInstructions';
import { shoeCareSections } from '@/shared/features/care-guide/care.data';
import type { ProductDetailSpecification } from './productDetailPresentation';
import { ProductDetailNoticeTable } from './ProductDetailNoticeTable';

const root = css({ borderTop: '1px solid var(--color-black-20)' });

const item = css({ borderBottom: '1px solid var(--color-black-20)' });

const trigger = css({ minH: '77px' });

export function ProductDetailSupportSections({
  specifications,
}: {
  specifications: readonly ProductDetailSpecification[];
}) {
  return (
    <Accordion
      className={root}
      indicatorSize="16px"
      itemClassName={item}
      triggerClassName={trigger}
      items={[
        {
          value: 'notice',
          title: <Typography variant="productSupportTitle">상품 고시 정보</Typography>,
          content: <ProductDetailNoticeTable items={specifications} />,
        },
        {
          value: 'delivery',
          title: <Typography variant="productSupportTitle">배송 및 반품</Typography>,
          content: <ProductDetailDeliveryContent />,
        },
        {
          value: 'care',
          title: <Typography variant="productSupportTitle">관리 방법</Typography>,
          content: <CareInstructions sections={shoeCareSections} />,
        },
      ]}
    />
  );
}
