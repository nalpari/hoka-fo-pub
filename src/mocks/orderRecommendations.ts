import { products } from './products';
import { recommendationImages } from './cartDisplay';
import type { OrderRecommendation } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendationItem';

export const orderRecommendations: readonly OrderRecommendation[] = products
  .slice(0, 4)
  .map((product, index) => ({
    id: product.id,
    name: product.name,
    gender: product.gender,
    price: product.price,
    href: `/products/${product.id}`,
    imageSrc: recommendationImages[index] ?? product.primaryImage,
  }));
