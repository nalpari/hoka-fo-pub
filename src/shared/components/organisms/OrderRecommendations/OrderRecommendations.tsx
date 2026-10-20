import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { HStack } from 'styled-system/jsx';
import { products } from '@/mocks/products';
import { recommendationImages } from '@/mocks/cartDisplay';

import { OrderRecommendationItem } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendationItem';

const suggestions = products.slice(0, 4);

export function OrderRecommendations() {
  return (
    <ContentSection
      as="section"
      gap="4"
      overflow="hidden"
      title="함께 구매하면 좋은 상품"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading7' } }}
    >
      <HStack gap="1" overflowX="auto" alignItems="flex-start">
        {suggestions.map((product, index) => (
          <OrderRecommendationItem
            key={product.id}
            product={product}
            imageSrc={recommendationImages[index] ?? product.primaryImage}
          />
        ))}
      </HStack>
    </ContentSection>
  );
}
