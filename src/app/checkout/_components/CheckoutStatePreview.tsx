'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { checkoutPreviewRows, mobileCheckoutPreviewRows } from '@/app/checkout/checkout-summary';
import { initialAddresses } from '@/data/addressPreview';

import { CheckoutComplete } from './CheckoutComplete';
import { CheckoutContent } from './CheckoutForm';
import { CheckoutLayout } from './CheckoutLayout';
import type { PaymentMethod } from './CheckoutPayment';

/**
 * [ 개발팀 바인딩 ] preview는 고정 상품·금액·오류를 표시합니다. 로컬 쿠폰 선택은 할인액을 계산하지 않으며 동의 필수 여부도 검증하지 않습니다.
 * error와 required-fields의 필드·동의 오류는 고정값이며, required-fields에서는 안내도 열립니다.
 * 실제 주문서 통합 소유자가 배송지·주문 상품 ID·결제수단·동의 상태를 검증해 안내를 열고, 제출 중 중복 방지와 실패 시 입력 유지·재시도, 성공 시 완료 상태를 관리합니다. 미리보기에서는 안내만 닫힙니다.
 */
/** 주문서의 입력·쿠폰·오류·완료 상태를 직접 표시합니다. (Displays fixed checkout input, coupon, error, and completion states.) */
export function CheckoutStatePreview({
  state,
}: {
  state:
    | 'coupons'
    | 'coupon-change'
    | 'error'
    | 'required-fields'
    | 'complete'
    | 'shipping'
    | 'address-change'
    | 'address-edit'
    | 'address-new'
    | 'delivery-request';
}) {
  const platform = usePlatform();
  const [payment, setPayment] = useState<PaymentMethod>('kakao');
  const [requiredFieldsOpen, setRequiredFieldsOpen] = useState(state === 'required-fields');
  const showErrors = state === 'error' || state === 'required-fields';
  return (
    <CheckoutLayout completed={state === 'complete'}>
      {state === 'complete' ? (
        /* 주문완료 안내 및 추천 상품 */
        <CheckoutComplete />
      ) : (
        <CheckoutContent
          initialCouponDialog={
            state === 'coupon-change' ? 'change' : state === 'coupons' ? 'lookup' : undefined
          }
          editShipping={state === 'shipping' || showErrors}
          initialAddressChangeOpen={
            state === 'address-change' || state === 'address-edit' || state === 'address-new'
          }
          initialAddressEditor={
            state === 'address-edit'
              ? { kind: 'edit', address: initialAddresses[1] }
              : state === 'address-new'
                ? { kind: 'new' }
                : undefined
          }
          initialDeliveryRequest={state === 'delivery-request' ? 'custom' : undefined}
          rows={platform === 'mobile' ? mobileCheckoutPreviewRows : checkoutPreviewRows}
          payment={payment}
          errors={
            showErrors
              ? {
                  name: '받는 분을 입력해 주세요.',
                  phone: '연락처를 입력해 주세요.',
                  address: '주소를 입력해 주세요.',
                }
              : undefined
          }
          showAgreementError={showErrors}
          onPaymentChange={setPayment}
        />
      )}
      {state === 'required-fields' && (
        <ModalDialog
          variant="alert"
          open={requiredFieldsOpen}
          onOpenChange={setRequiredFieldsOpen}
          title="구매하기"
          closeLabel="필수 입력 안내 닫기"
          message="내용을 입력해주세요"
          description={
            <>
              필수입력 내용 중에 입력되지 않은 부분이 있습니다.
              <br />
              입력내용을 다시 확인해주세요.
            </>
          }
          actions={{ kind: 'single', onConfirm: () => setRequiredFieldsOpen(false) }}
        />
      )}
    </CheckoutLayout>
  );
}
