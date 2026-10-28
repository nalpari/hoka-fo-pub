'use client';

import { Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ProductAfterSalesContacts } from './ProductAfterSalesContacts';
import { ProductAfterSalesProcess } from './ProductAfterSalesProcess';
import { ProductAfterSalesQuestions } from './ProductAfterSalesQuestions';

export function ProductDetailAfterSalesContent() {
  return (
    <Stack gap="10" pt="6">
      <Typography as="p" variant="body5">
        HOKA 상품에 이상이 있거나 수선이 필요한 경우 구매처 또는 A/S 접수 창구로 문의해 주세요.
        <br />
        A/S 관련 문의는 고객센터 또는 1:1 문의를 이용해 주세요.
      </Typography>
      <ProductAfterSalesContacts />
      <ProductAfterSalesProcess />
      <ProductAfterSalesQuestions />
    </Stack>
  );
}
