'use client';

import { useState } from 'react';
import { ProductInquiryEmptyState } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryEmptyState';
import { ProductInquiryNotices } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryNotices';
import { ProductInquiryToolbar } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryToolbar';
import { Box } from 'styled-system/jsx';

/** 상품별 문의 목록과 구매 전 안내를 제공합니다. */
export function ProductInquiry() {
  const [privateOnly, setPrivateOnly] = useState(false);

  return (
    <Box maxW="760px">
      <ProductInquiryToolbar privateOnly={privateOnly} onPrivateOnlyChange={setPrivateOnly} />
      <ProductInquiryEmptyState privateOnly={privateOnly} />
      <ProductInquiryNotices />
    </Box>
  );
}
