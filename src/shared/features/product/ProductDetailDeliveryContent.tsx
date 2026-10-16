'use client';

import { css } from 'styled-system/css';
import { ProductDetailShippingGuide } from './ProductDetailShippingGuide';
import { ProductDetailReturnPrecautions } from './ProductDetailReturnPrecautions';
import { ProductDetailDeliverySupport } from './ProductDetailDeliverySupport';
import { ProductDetailReturnGuide } from './ProductDetailReturnGuide';

const root = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12',
  py: '6',
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
  _mobile: { gap: '8', py: '4' },
});

export function ProductDetailDeliveryContent() {
  return (
    <div className={root}>
      <ProductDetailShippingGuide />
      <ProductDetailReturnPrecautions />
      <ProductDetailDeliverySupport />
      <ProductDetailReturnGuide />
    </div>
  );
}
