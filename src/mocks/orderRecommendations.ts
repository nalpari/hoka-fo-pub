import { recommendationImages } from '@/mocks/cartDisplay';
import { products } from '@/mocks/products';
import type { OrderRecommendation } from '@/types/component-contracts/components-common-organisms-OrderRecommendations-OrderRecommendations';

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
