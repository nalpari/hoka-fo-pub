'use client';

import { ProductDetailShippingGuide } from './ProductDetailShippingGuide';
import { ProductDetailReturnPrecautions } from './ProductDetailReturnPrecautions';
import { ProductDetailDeliverySupport } from './ProductDetailDeliverySupport';
import { ProductDetailReturnGuide } from './ProductDetailReturnGuide';
import { Stack } from 'styled-system/jsx';

export function ProductDetailDeliveryContent() {
  return (
    <Stack
      gap="12"
      py="6"
      wordBreak="keep-all"
      overflowWrap="anywhere"
      _mobile={{ gap: '8', py: '4' }}
    >
      <ProductDetailShippingGuide />
      <ProductDetailReturnPrecautions />
      <ProductDetailDeliverySupport />
      <ProductDetailReturnGuide />
    </Stack>
  );
}
