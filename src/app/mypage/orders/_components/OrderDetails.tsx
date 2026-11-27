import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { dataListBoundaryRecipe, dataListRecipe } from '@/components/common/atoms/DataList.recipe';
import {
  DescriptionList,
  type DescriptionListItem,
} from '@/components/common/atoms/DescriptionList';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type {
  ClaimDetailDisplay,
  OrderClaim,
  OrderDetailDisplay,
  OrderLine,
} from '@/components/orders/orders.types';
import { formatProductOptions } from '@/lib/formatProductOptions';

/** 주문 상세의 구분선이 있는 항목별 정보를 표시합니다. (Displays ruled key-value information for an order.) */
export function OrderInformationSection({
  title,
  items,
}: {
  title: string;
  items: readonly DescriptionListItem[];
}) {
  return (
    <ContentSection
      title={title}
      gap="0"
      headerProps={{
        titleAs: 'h2',
        titleProps: { web: 'h10', mo: 'h8' },
        css: css.raw({ pb: '12px', borderBottom: '1px solid var(--colors-black-100)' }),
      }}
    >
      <DescriptionList
        items={items}
        termProps={{ variant: 'b6', tone: 'subtle' }}
        descriptionProps={{ variant: 'b6', tone: 'primary' }}
        slotStyles={{
          root: css.raw({ display: 'block' }),
          row: css.raw({
            display: 'grid',
            gridTemplateColumns: '88px minmax(0, 1fr)',
            gap: '12px',
            py: '16px',
            borderBottom: '1px solid var(--colors-black-20)',
          }),
        }}
      />
    </ContentSection>
  );
}

type OrderDetailProps = {
  display: OrderDetailDisplay;
  onList: () => void;
  onTracking?: () => void;
