import { css } from 'styled-system/css';
import { Fragment } from 'react';
import { Grid } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductDetailDeliveryContent } from './ProductDetailDeliveryContent';
import { ProductDetailReturnGuide } from './ProductDetailReturnGuide';
import type { ProductDetailSpecification } from './productDetailPresentation';

const item = css({ py: '6', borderBottom: '1px solid var(--color-black-20)' });

export function ProductDetailSupportSections({
  specifications,
}: {
  specifications: readonly ProductDetailSpecification[];
}) {
  return (
    <Accordion
      indicatorSize="13px"
      itemClassName={item}
      items={[
        {
          value: 'notice',
          title: <Typography variant="heading9">상품 고시 정보</Typography>,
          content: (
            <Grid as="dl" gridTemplateColumns="120px 1fr" gap="4" py="6">
              {specifications.map((specification) => (
                <Fragment key={specification.label}>
                  <Typography as="dt" variant="body3">
                    {specification.label}
                  </Typography>
                  <Typography as="dd" variant="body3">
                    {typeof specification.value === 'string'
                      ? specification.value
                      : specification.value.join(' | ')}
                  </Typography>
                </Fragment>
              ))}
            </Grid>
          ),
        },
        {
          value: 'delivery',
          title: <Typography variant="heading9">배송 및 반품</Typography>,
          content: <ProductDetailDeliveryContent />,
        },
        {
          value: 'returns',
          title: <Typography variant="heading9">반품 정책</Typography>,
          content: <ProductDetailReturnGuide />,
        },
      ]}
    />
  );
}
