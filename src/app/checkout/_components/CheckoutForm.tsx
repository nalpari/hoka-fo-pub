'use client';

import Link from 'next/link';

import { useContext, useState } from 'react';
import {
  CheckoutContext,
  type CheckoutCouponSelection,
  type CheckoutSubmission,
} from '@/context/CheckoutContext';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderActionBar } from '@/components/common/layouts/OrderActionBar';

import {
  getCheckoutCouponDiscount,
  getMaximumCheckoutCoupon,
} from '@/app/checkout/checkout-coupons';
import { type CheckoutRow, checkoutShippingFee } from '@/app/checkout/checkout-summary';

import { CheckoutAgreement } from './CheckoutAgreement';
import { CheckoutComplete } from './CheckoutComplete';
import { CheckoutDiscountSummary } from './CheckoutDiscountSummary';
import { CheckoutPayment, type PaymentMethod } from './CheckoutPayment';
import { CheckoutShipping, type ShippingErrors } from './CheckoutShipping';
import { CheckoutSummary } from './CheckoutSummary';

function CheckoutPaymentNotice() {
  return (
    <Stack gap="2" pt="4" borderTop="1px solid var(--colors-black-20)">
      <Typography variant="body5" tone="subtle">
        아래 [결제하기] 버튼을 클릭하면 선택한 결제방법에 맞는 결제 창이 나타납니다.
      </Typography>
      <Typography variant="body5" tone="subtle">
        결제 창을 통해 입력되는 고객님의 정보는 안전하게 암호화되어 전송됩니다.
      </Typography>
      <Typography variant="body5" tone="subtle">
        결제 신청 시 승인 진행에 다소 시간이 소요될 수 있으므로 결과 화면이 나타날 때까지 기다려
        주십시오.
      </Typography>
    </Stack>
  );
}

type CheckoutContentProps = {
  editShipping?: boolean;
  rows: readonly CheckoutRow[];
  total: number;
  discount: number;
  payment: PaymentMethod;
  errors: ShippingErrors;
  coupon: string;
  maxBenefit: boolean;
  orderAgreed: boolean;
  privacyAgreed: boolean;
  agreementError: boolean;
  onPaymentChange: (payment: PaymentMethod) => void;
  onCouponChange: (coupon: string, selection?: CheckoutCouponSelection) => void;
  onMaxBenefitChange: (checked: boolean) => void;
  onOrderAgreedChange: (checked: boolean) => void;
  onPrivacyAgreedChange: (checked: boolean) => void;
};

/** Prepared checkout sections; the form owns validation, consent and coupon state. */
/** 주문 표시 데이터와 입력 상태를 배치합니다. (Arranges prepared checkout data and input state.) */
export function CheckoutContent({
  editShipping = false,
  rows,
  total,
  discount,
  payment,
  errors,
  coupon,
  maxBenefit,
  orderAgreed,
  privacyAgreed,
  agreementError,
  onPaymentChange,
  onCouponChange,
  onMaxBenefitChange,
  onOrderAgreedChange,
  onPrivacyAgreedChange,
}: CheckoutContentProps) {
  const binding = useContext(CheckoutContext);
  const shippingFee = binding?.shippingFee ?? checkoutShippingFee;
  return (
    <Grid
      gridTemplateColumns={{ base: 'minmax(0, 1fr) 300px', _mobile: '1fr' }}
      gap={{ base: '10', _mobile: '6' }}
      alignItems="start"
    >
      <Box gridColumn="1">
        <CheckoutShipping errors={errors} initialEditing={editShipping} />
      </Box>
      <Box gridColumn="1">
        <CheckoutSummary rows={rows} />
      </Box>
      <Box gridColumn="1" gridRow={{ base: 'auto', _mobile: '4' }}>
        <CheckoutPayment payment={payment} onPaymentChange={onPaymentChange} />
        <CheckoutPaymentNotice />
      </Box>
      <Stack
        gap="6"
        display={{ base: 'flex', _mobile: 'contents' }}
        gridColumn={{ base: '2', _mobile: '1' }}
        gridRow={{ base: '1 / span 3', _mobile: 'auto' }}
        pos={{ base: 'sticky', _mobile: 'static' }}
        top="120px"
        border={{ base: '1px solid var(--colors-black-20)', _mobile: '0' }}
        p={{ base: '4', _mobile: '0' }}
      >
        <Box gridColumn="1" gridRow="3">
          <CheckoutDiscountSummary
            rows={rows}
            total={total}
            discount={discount}
            itemCount={rows.reduce((n, { item }) => n + item.quantity, 0)}
            coupon={coupon}
            maxBenefit={maxBenefit}
            onCouponChange={onCouponChange}
            onMaxBenefitChange={onMaxBenefitChange}
          />
        </Box>
        <Stack gap="6" gridColumn="1" gridRow="5">
          <CheckoutAgreement
            orderAgreed={orderAgreed}
            privacyAgreed={privacyAgreed}
            error={agreementError}
            onOrderAgreedChange={onOrderAgreedChange}
            onPrivacyAgreedChange={onPrivacyAgreedChange}
          />
          <OrderActionBar>
            <Button type="submit" variant="primary" fullWidth>
              {(total - discount + shippingFee).toLocaleString()}원 결제하기
            </Button>
          </OrderActionBar>
        </Stack>
      </Stack>
    </Grid>
  );
}

type CheckoutFormProps = {
  completed: boolean;
  rows: readonly CheckoutRow[];
  total: number;
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
  pending?: boolean;
  error?: string;
  onSubmit: (input: CheckoutSubmission) => void;
};

/** 결제 입력과 제출 검증 상태를 관리합니다. (Manages checkout inputs and submission validation state.) */
export function CheckoutForm({
  completed,
  rows,
  total,
  payment,
  onPaymentChange,
  onSubmit,
  pending,
  error,
}: CheckoutFormProps) {
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'address', string>>>({});
  const binding = useContext(CheckoutContext);
  const [demoCoupon, setCoupon] = useState('none');
  const [demoMaxBenefit, setMaxBenefit] = useState(false);
  const [demoSelection, setDemoSelection] = useState<CheckoutCouponSelection | undefined>();
  const coupon = binding?.coupon ?? demoCoupon;
  const maxBenefit = binding?.maxBenefit ?? demoMaxBenefit;
  const discount =
    binding?.discount ??
    (demoSelection
      ? Math.min(
          total,
          rows.reduce(
            (sum, row) =>
              sum +
              getCheckoutCouponDiscount(
                demoSelection.products[
                  `${row.item.id}-${row.item.color}-${row.item.width}-${row.item.size}`
                ] ?? 'none',
                [row],
                row.product.price * row.item.quantity,
              ),
            0,
          ) + getCheckoutCouponDiscount(demoSelection.cart, rows, total),
        )
      : getCheckoutCouponDiscount(coupon, rows, total));
  const [agreementError, setAgreementError] = useState(false);
  const [orderAgreed, setOrderAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  if (completed) return <CheckoutComplete />;

  if (rows.length === 0 && binding?.pending)
    return <Typography role="status">주문 정보를 불러오고 있습니다.</Typography>;
  if (rows.length === 0 && binding?.error)
    return <Typography role="alert">{binding.error}</Typography>;

  if (rows.length === 0) return <CheckoutEmptyState />;

  return (
    <form
      noValidate
      onInput={(event) => {
        const input = event.target as HTMLInputElement;
        if (input.value.trim()) setErrors((previous) => ({ ...previous, [input.name]: undefined }));
      }}
      aria-busy={pending || binding?.pending}
      onSubmit={(event) => {
        event.preventDefault();
        if (pending || binding?.pending) return;
        const data = new FormData(event.currentTarget);
        const nextErrors = {
          name: String(data.get('name') ?? '').trim() ? '' : '받는 분을 입력해 주세요.',
          phone: String(data.get('phone') ?? '').trim() ? '' : '연락처를 입력해 주세요.',
          address: String(data.get('address') ?? '').trim() ? '' : '주소를 입력해 주세요.',
        };
        setErrors(nextErrors);
        const missingAgreement = !orderAgreed || !privacyAgreed;
        setAgreementError(missingAgreement);
        if (Object.values(nextErrors).some(Boolean) || missingAgreement) {
          event.preventDefault();
          return;
        }
        const field = (key: string) => String(data.get(key) ?? '');
        onSubmit({
          items: rows.map(({ item }) => item),
          savedAddressId: field('savedAddressId') || null,
          payment,
          coupon,
          maxBenefit,
          couponSelection: data.get('couponSelection')
            ? (JSON.parse(String(data.get('couponSelection'))) as CheckoutCouponSelection)
            : undefined,
          saveAsDefaultAddress: data.get('saveAsDefaultAddress') === 'on',
          orderAgreed,
          privacyAgreed,
          shipping: {
            name: field('name'),
            phone: field('phone'),
            email: field('email'),
            otherPhone: field('otherPhone'),
            postalCode: field('postalCode'),
            address: field('address'),
            addressDetail: field('addressDetail'),
            deliveryRequest: field('deliveryRequest'),
            deliveryMessage: field('deliveryMessage'),
          },
        });
      }}
    >
      <fieldset
        disabled={pending || binding?.pending}
        className={css({ border: 0, p: 0, m: 0, minW: 0 })}
      >
        <CheckoutContent
          rows={rows}
          total={total}
          discount={discount}
          payment={payment}
          errors={errors}
          coupon={coupon}
          maxBenefit={maxBenefit}
          orderAgreed={orderAgreed}
          privacyAgreed={privacyAgreed}
          agreementError={agreementError}
          onPaymentChange={onPaymentChange}
          onCouponChange={(value, selection) => {
            if (binding) {
              binding.onCouponChange(value);
              return;
            }
            setDemoSelection(selection);
            setCoupon(value);
            setMaxBenefit(false);
          }}
          onMaxBenefitChange={(checked) => {
            if (binding) {
              binding.onMaxBenefitChange(checked);
              return;
            }
            setDemoSelection(undefined);
            setMaxBenefit(checked);
            if (checked) setCoupon(getMaximumCheckoutCoupon(rows, total));
          }}
          onOrderAgreedChange={(checked) => {
            setOrderAgreed(checked);
            if (checked && privacyAgreed) setAgreementError(false);
          }}
          onPrivacyAgreedChange={(checked) => {
            setPrivacyAgreed(checked);
            if (checked && orderAgreed) setAgreementError(false);
          }}
        />
      </fieldset>
      {(pending || binding?.pending) && (
        <Typography role="status">주문 정보를 처리하고 있습니다.</Typography>
      )}
      {(error || binding?.error) && <Typography role="alert">{error || binding?.error}</Typography>}
    </form>
  );
}

/** 주문할 상품이 없는 상태를 표시합니다. (Displays checkout without orderable items.) */
export function CheckoutEmptyState() {
  return (
    <Stack as="section" alignItems="center" gap="4" py="20">
      <Typography as="p" variant="body3">
        주문할 상품이 없습니다.
      </Typography>
      <Link href="/cart">장바구니로 돌아가기</Link>
    </Stack>
  );
}
