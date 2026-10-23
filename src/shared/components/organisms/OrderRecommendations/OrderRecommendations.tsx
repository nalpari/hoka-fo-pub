import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { HStack } from 'styled-system/jsx';

import { OrderRecommendationItem } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendationItem';

import type { OrderRecommendation, OrderRecommendationLayout } from './OrderRecommendationItem';

export type OrderRecommendationsProps = {
  items: readonly OrderRecommendation[];
  title?: string;
  layout?: OrderRecommendationLayout;
};

/** 함께 구매할 상품을 가로 스크롤 목록으로 표시합니다. (Displays horizontally scrollable order recommendations.) */
export function OrderRecommendations({
  items,
  title = '함께 구매하면 좋은 상품',
  layout = 'compact',
}: OrderRecommendationsProps) {
  return (
    <ContentSection
      as="section"
      gap="4"
      overflow="hidden"
      title={title}
      headerProps={{
        titleAs: 'h2',
        titleProps: { web: 'heading8', mo: layout === 'portrait' ? 'heading6' : 'heading7' },
      }}
    >
      <HStack
        gap={layout === 'portrait' ? { base: '1', _mobile: '2.5' } : '1'}
        overflowX="auto"
        alignItems="flex-start"
        scrollbarWidth={layout === 'portrait' ? { _mobile: 'none' } : undefined}
      >
        {items.map((item) => (
          <OrderRecommendationItem key={item.id} item={item} layout={layout} />
        ))}
      </HStack>
    </ContentSection>
  );
}
