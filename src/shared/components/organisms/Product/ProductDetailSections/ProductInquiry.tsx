'use client';

import { useState } from 'react';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { ProductInquiryNotices } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryNotices';
import { ProductInquiryToolbar } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryToolbar';
import { Box } from 'styled-system/jsx';

/** 상품별 문의 목록과 구매 전 안내를 제공합니다. */
export function ProductInquiry() {
  const [privateOnly, setPrivateOnly] = useState(false);

  return (
    <Box maxW="760px">
      <ProductInquiryToolbar privateOnly={privateOnly} onPrivateOnlyChange={setPrivateOnly} />
      <EmptyState
        title={privateOnly ? '공개로 등록된 문의글이 없습니다.' : '등록된 문의글이 없습니다.'}
        variant="minimal"
      />
      <ProductInquiryNotices />
    </Box>
  );
}
