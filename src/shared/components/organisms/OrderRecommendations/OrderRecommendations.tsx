import { Stack, HStack } from 'styled-system/jsx';
import { products } from '@/mocks/products';
import { recommendationImages } from '@/mocks/cartDisplay';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { OrderRecommendationItem } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendationItem';

const suggestions = products.slice(0, 4);

export function OrderRecommendations() {
  return (
    <Stack as="section" gap="4" overflow="hidden">
      <Typography as="h2" web="heading8" mo="heading7">
        함께 구매하면 좋은 상품
      </Typography>
      <HStack gap="1" overflowX="auto" alignItems="flex-start">
        {suggestions.map((product, index) => (
          <OrderRecommendationItem
            key={product.id}
            product={product}
            imageSrc={recommendationImages[index] ?? product.primaryImage}
          />
        ))}
      </HStack>
    </Stack>
  );
}
