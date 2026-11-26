'use client';

import { Box, Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';

import { OrderActionBar } from '@/components/common/layouts/OrderActionBar';

import { type CheckoutRow } from '@/app/checkout/checkout-summary';

import { CheckoutAgreement } from './CheckoutAgreement';
import { type CheckoutCouponPreview, CheckoutDiscountSummary } from './CheckoutDiscountSummary';
import { CheckoutPayment, type PaymentMethod } from './CheckoutPayment';
import {
  type AddressEditorPreview,
  CheckoutShipping,
  type ShippingErrors,
} from './CheckoutShipping';
import { CheckoutSummary } from './CheckoutSummary';

type CheckoutContentProps = {
  initialCouponDialog?: CheckoutCouponPreview;
  editShipping?: boolean;
  initialAddressChangeOpen?: boolean;
  initialAddressEditor?: AddressEditorPreview;
  initialDeliveryRequest?: string;
  rows: readonly CheckoutRow[];
  payment: PaymentMethod;
  errors?: ShippingErrors;
  showAgreementError?: boolean;
  onPaymentChange: (payment: PaymentMethod) => void;
};

/** 주문서 섹션과 입력·선택 UI를 배치합니다. (Arranges checkout sections and input controls.) */
export function CheckoutContent({
  initialCouponDialog,
  editShipping = false,
  initialAddressChangeOpen,
  initialAddressEditor,
  initialDeliveryRequest,
  rows,
  payment,
  errors,
  showAgreementError = false,
  onPaymentChange,
}: CheckoutContentProps) {
  return (
    <Grid
      gridTemplateColumns={{ base: '720px 360px', _mobile: '1fr' }}
      rowGap={{ base: '48px', _mobile: '32px' }}
      columnGap={{ base: '56px', _mobile: '0px' }}
      alignItems="start"
    >
      <Box gridColumn="1" gridRow={{ base: 'auto', _mobile: '1' }}>
        {/* 주문자 및 배송지 정보 */}
        <CheckoutShipping
          errors={errors}
          initialEditing={editShipping}
          initialAddressChangeOpen={initialAddressChangeOpen}
          initialAddressEditor={initialAddressEditor}
          initialDeliveryRequest={initialDeliveryRequest}
        />
      </Box>
      <Box gridColumn="1" gridRow={{ base: 'auto', _mobile: '2' }}>
        {/* 주문상품 정보 및 할인 적용 */}
        <CheckoutSummary rows={rows} />
      </Box>
      <Box gridColumn="1" gridRow={{ base: 'auto', _mobile: '4' }}>
        {/* 결제 정보 */}
        <CheckoutPayment payment={payment} onPaymentChange={onPaymentChange} />
      </Box>
      <Stack
        gap={{ base: '28px', _mobile: '24px' }}
        display={{ base: 'flex', _mobile: 'contents' }}
        gridColumn={{ base: '2', _mobile: '1' }}
        gridRow={{ base: '1 / span 3', _mobile: 'auto' }}
        pos={{ base: 'sticky', _mobile: 'static' }}
        top="120px"
        bg={{ base: 'black.10', _mobile: 'transparent' }}
        border="0"
        p={{ base: '24px', _mobile: '0px' }}
      >
        <Box gridColumn="1" gridRow={{ base: 'auto', _mobile: '3' }}>
          {/* 주문금액·할인금액·배송비·총 결제 금액 */}
          <CheckoutDiscountSummary initialCouponDialog={initialCouponDialog} />
        </Box>
        <Stack gap={{ base: '28px', _mobile: '0px' }} gridColumn="1" gridRow="5">
          {/* 결제 동의 */}
          <CheckoutAgreement showError={showAgreementError} />
          {/* 결제하기 액션 */}
          <OrderActionBar>
            <Button type="button" variant="primary" fullWidth>
              결제하기
            </Button>
            <Box display={{ base: 'block', _mobile: 'none' }} mt="8px">
              <Button type="button" variant="secondary" fullWidth>
                취소하기
              </Button>
            </Box>
          </OrderActionBar>
        </Stack>
      </Stack>
    </Grid>
  );
}
