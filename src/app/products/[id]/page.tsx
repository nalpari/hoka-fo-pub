'use client';

import { useShop } from '@/shared/ShopShell';
import { ProductDetailPage } from '@/shared/features/product/ProductDetailPage';

export default function Page() {
  const { add } = useShop();
  return <ProductDetailPage onAddToCart={add} />;
}
