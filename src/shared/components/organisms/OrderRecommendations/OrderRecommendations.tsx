import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { HStack } from 'styled-system/jsx';

import { OrderRecommendationItem } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendationItem';

import type { OrderRecommendation } from './OrderRecommendationItem';

export type OrderRecommendationsProps = { items: readonly OrderRecommendation[]; title?: string };

export function OrderRecommendations({
  items,
  title = '함께 구매하면 좋은 상품',
}: OrderRecommendationsProps) {
  return (
    <ContentSection
      as="section"
      gap="4"
      overflow="hidden"
      title={title}
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading7' } }}
    >
      <HStack gap="1" overflowX="auto" alignItems="flex-start">
        {items.map((item) => (
          <OrderRecommendationItem key={item.id} item={item} />
        ))}
      </HStack>
    </ContentSection>
  );
}
