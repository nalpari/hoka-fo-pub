import { css } from 'styled-system/css';
import { Accordion } from '@/components/common/atoms/Accordion/Accordion';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ProductDetailDeliveryContent } from './ProductDetailDeliveryContent';
import { CareInstructions } from '@/components/features/care-guide/CareInstructions';
import { shoeCareSections } from '@/components/features/care-guide/care.data';
import type { ProductDetailSpecification } from './productDetailPresentation';
import { ProductDetailNoticeTable } from './ProductDetailNoticeTable';

const root = css({ borderTop: '1px solid var(--color-black-20)' });

const item = css({ borderBottom: '1px solid var(--color-black-20)' });

const trigger = css({ minH: '77px' });

/** 상품 고시·배송·관리 안내 섹션을 구성합니다. (Composes product specification, delivery, and care sections.) */
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
          title: <Typography variant="body3" mo="body4" weight="bold">상품 고시 정보</Typography>,
          content: <ProductDetailNoticeTable items={specifications} />,
        },
        {
          value: 'delivery',
          title: <Typography variant="body3" mo="body4" weight="bold">배송 및 반품</Typography>,
          content: <ProductDetailDeliveryContent />,
        },
        {
          value: 'care',
          title: <Typography variant="body3" mo="body4" weight="bold">관리 방법</Typography>,
          content: <CareInstructions sections={shoeCareSections} />,
        },
      ]}
    />
  );
}
