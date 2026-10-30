'use client';

/**
 * [개발팀 바인딩]
 * CheckoutContext에 배송지·쿠폰·견적과 submit을 연결합니다. ShopShell.state.products/cart도 동일한 실제 ID/옵션으로 공급합니다.
 * submit 성공은 결제 승인/주문 저장 완료입니다. 실패는 reject해 입력을 유지합니다. UI 검증/표시 금액은 서버 검증을 대신하지 않습니다.
 */
import Image from 'next/image';

import { useContext, useState } from 'react';
import {
  CheckoutContext,
  type CheckoutCouponGroup,
  type CheckoutCouponSelection,
} from '@/context/CheckoutContext';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { Flex, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { checkoutCouponOptions, getCheckoutCouponDiscount } from '@/app/checkout/checkout-coupons';
import { type CheckoutRow, checkoutShippingFee } from '@/app/checkout/checkout-summary';
import { getCartImage } from '@/mocks/cartDisplay';

/** 상품별 쿠폰 초안과 적용 결과를 표시합니다. (Displays per-product coupon drafts and application results.) */
function CheckoutCouponPicker({
  onCouponChange,
  total,
  rows,
}: {
  onCouponChange: (id: string, selection?: CheckoutCouponSelection) => void;
  total: number;
  rows: readonly CheckoutRow[];
}) {
  const binding = useContext(CheckoutContext);
  const request = useRequestAction();
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<CheckoutCouponSelection>({
    products: {},
    cart: 'none',
  });
  const [draft, setDraft] = useState<CheckoutCouponSelection>(selection);
  const demoRows = rows;
  const groups: readonly CheckoutCouponGroup[] = binding
    ? (binding.couponGroups ?? [])
    : demoRows.map(({ item, product }) => ({
        id: `${item.id}-${item.color}-${item.width}-${item.size}`,
        name: product.name,
        image: getCartImage(item, product.primaryImage ?? '/images/mypage/speedgoat-7-gtx.png'),
        option: `${item.width} / ${item.color} / ${item.size} / ${item.quantity}개`,
        coupons: checkoutCouponOptions
          .filter((c) => c.value?.startsWith('product') || c.value?.startsWith('family-7'))
          .map((c) => ({
            id: c.value,
            label: String(c.label),
            discount: getCheckoutCouponDiscount(
              c.value ?? 'none',
              [{ item, product }],
              product.price * item.quantity,
            ),
          })),
      }));
  const cartCoupons: CheckoutCouponGroup['coupons'] =
    binding?.cartCoupons ??
    (
      binding?.couponOptions ??
      checkoutCouponOptions.filter(
        (option) => !option.value.startsWith('product') && !option.value.startsWith('family-7'),
      )
    ).map((option) => ({
      id: option.value,
      label: String(option.label),
      discount: binding ? 0 : getCheckoutCouponDiscount(option.value, demoRows, total),
    }));
  const current = binding?.couponSelection ?? selection;
  const selectedDiscount =
    groups.reduce(
      (sum, group) =>
        sum + (group.coupons.find((c) => c.id === draft.products[group.id])?.discount ?? 0),
      0,
    ) + (cartCoupons.find((c) => c.id === draft.cart)?.discount ?? 0);
  return (
    <>
      <input type="hidden" name="couponSelection" value={JSON.stringify(current)} />
      <Button
        variant="secondary"
        fullWidth
        className={css({ scrollMarginBottom: '160px' })}
        onClick={() => {
          setDraft(current);
          setOpen(true);
        }}
      >
        보유 쿠폰 조회
      </Button>
      <ModalDialog
        open={open}
        onOpenChange={(value) => {
          if (!request.pending) setOpen(value);
        }}
        title="보유 쿠폰 조회"
        closeLabel="보유 쿠폰 조회 닫기"
        size="md"
        mobilePresentation="fullscreen"
        actions={{
          kind: 'single',
          label: '쿠폰 적용하기',
          buttonProps: {
            disabled: request.pending || Boolean(binding?.couponGroups && !binding.applyCoupons),
          },
          onConfirm: () => {
            void request.run(async () => {
              if (binding?.applyCoupons) await binding.applyCoupons(draft);
              else {
                onCouponChange(draft.cart, draft);
                setSelection(draft);
              }
              setOpen(false);
            });
          },
        }}
      >
        <BindingFeedback pending={request.pending} error={request.error} />
        <Stack gap="6">
          <Typography variant="heading7">상품 쿠폰</Typography>
          {groups.map((group) => (
            <details
              key={group.id}
              open
              className={css({ borderBottom: '1px solid var(--colors-black-20)', pb: '4' })}
            >
              <summary className={css({ cursor: 'pointer', mb: '4' })}>
                <HStack gap="4">
                  {group.image ? <Image src={group.image} width={80} height={80} alt="" /> : null}
                  <Stack gap="2">
                    <Typography variant="body3">{group.name}</Typography>
                    <Typography variant="body5">{group.option}</Typography>
                    <Typography variant="body5">
                      사용 가능 쿠폰 {group.coupons.filter((c) => !c.disabled).length}개
                    </Typography>
                  </Stack>
                </HStack>
              </summary>
              <Radio
                ariaLabel={`${group.name} 상품 쿠폰`}
                value={draft.products[group.id] ?? 'none'}
                onValueChange={(id) =>
                  setDraft((previous) => ({
                    ...previous,
                    products: { ...previous.products, [group.id]: id },
                  }))
                }
                options={[
                  { value: 'none', label: '적용 쿠폰 없음' },
                  ...group.coupons.map((c) => ({
                    value: c.id,
                    label: `${c.label}  -${c.discount.toLocaleString()}원`,
                    disabled: c.disabled,
                  })),
                ]}
              />
            </details>
          ))}
          {!groups.length ? (
            <Typography variant="body4" tone="tertiary">
              상품별 적용 가능한 쿠폰이 없습니다.
            </Typography>
          ) : null}
          <Typography variant="heading7">장바구니 쿠폰</Typography>
          <Radio
            ariaLabel="장바구니 쿠폰"
            value={draft.cart}
            onValueChange={(cart) => setDraft((previous) => ({ ...previous, cart }))}
            options={cartCoupons.map((c) => ({
              value: c.id,
              label: c.label,
              disabled: 'disabled' in c ? c.disabled : false,
            }))}
          />
          <Stack gap="3" bg="black.10" p="4">
            <AmountRow label="주문금액" amount={total} />
            <AmountRow label="할인금액" amount={selectedDiscount} discount />
            <AmountRow
              label="총 결제금액"
              amount={Math.max(0, total - selectedDiscount)}
              emphasis
            />
          </Stack>
        </Stack>
      </ModalDialog>
    </>
  );
}

/** 주문 금액과 쿠폰 선택 결과를 요약합니다. (Summarizes order amounts and coupon selection.) */
export function CheckoutDiscountSummary({
  total,
  rows,
  discount,
  itemCount,
  coupon,
  maxBenefit,
  onCouponChange,
  onMaxBenefitChange,
}: {
  total: number;
  rows: readonly CheckoutRow[];
  discount: number;
  itemCount: number;
  coupon: string;
  maxBenefit: boolean;
  onCouponChange: (coupon: string, selection?: CheckoutCouponSelection) => void;
  onMaxBenefitChange: (checked: boolean) => void;
}) {
  const binding = useContext(CheckoutContext);
  const shippingFee = binding?.shippingFee ?? checkoutShippingFee;
  return (
    <Stack gap="4">
      <Stack gap="3" border="1px solid var(--colors-black-20)">
        <AmountRow label={`주문금액 (상품 ${itemCount}개)`} amount={total} px="4" pt="4" />
        <AmountRow label="상품 할인금액" amount={0} px="4" />
        <Stack gap="2" px="4">
          <Flex justifyContent="flex-end">
            <Checkbox
              label="최대 혜택 적용"
              checked={maxBenefit}
              onCheckedChange={onMaxBenefitChange}
            />
          </Flex>
          <CheckoutCouponPicker rows={rows} total={total} onCouponChange={onCouponChange} />
        </Stack>
        <Typography variant="body5" className={css({ px: '4' })}>
          {
            (binding?.couponOptions ?? checkoutCouponOptions).find(
              (option) => option.value === coupon,
            )?.label
          }
        </Typography>
        <AmountRow label="쿠폰 할인금액" amount={discount} discount px="4" />
        <AmountRow label="배송비" amount={shippingFee} px="4" />
        <AmountRow
          label="총 결제 금액"
          amount={total - discount + shippingFee}
          emphasis
          emphasizeLabel
          p="4"
          bg="black.10"
          borderTop="1px solid var(--colors-black-20)"
        />
      </Stack>
      <Stack gap="1">
        <Typography variant="body5" tone="subtle">
          - 쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 할인 및 쿠폰 적용 후 실 결제금액의 최대 30%까지 마일리지 사용 가능합니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 마일리지는 5,000점 이상 보유 시 100점 단위로 사용 가능합니다.
        </Typography>
      </Stack>
    </Stack>
  );
}
