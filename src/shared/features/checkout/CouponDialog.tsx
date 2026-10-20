'use client';

import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import type { CheckoutRow } from './checkout-summary';
import { CouponProductItem } from './CouponProductItem';
import { CartCouponOptions } from './CartCouponOptions';
import { CouponAmountSummary } from './CouponAmountSummary';

export function CouponDialog({
  open,
  onOpenChange,
  rows,
  total,
  onApply,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rows: readonly CheckoutRow[];
  total: number;
  onApply: (discount: number) => void;
}) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [cartCoupon, setCartCoupon] = useState('none');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [applied, setApplied] = useState({
    selected: {} as Record<string, string>,
    cartCoupon: 'none',
  });
  const productDiscount = rows.reduce(
    (sum, { item, product }) =>
      sum +
      Math.floor(
        product.price *
          item.quantity *
          Number(selected[`${item.id}-${item.color}-${item.width}-${item.size}`] ?? 0),
      ),
    0,
  );
  const discount = Math.min(
    total,
    productDiscount + Number(cartCoupon === 'none' ? 0 : cartCoupon),
  );

  return (
    <ModalDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setSelected(applied.selected);
          setCartCoupon(applied.cartCoupon);
        }
        onOpenChange(next);
      }}
      title="보유 쿠폰 조회"
      closeLabel="쿠폰 닫기"
      size="sm"
      mobilePresentation="fullscreen"
      footer={
        <Button
          variant="primary"
          size="short"
          fullWidth
          onClick={() => {
            onApply(discount);
            setApplied({ selected, cartCoupon });
            onOpenChange(false);
          }}
        >
          쿠폰 적용하기
        </Button>
      }
    >
      <Stack gap="6">
        <Typography as="h2" variant="body3" weight="semibold">
          상품 쿠폰
        </Typography>
        {rows.map(({ item, product }) => {
          const key = `${item.id}-${item.color}-${item.width}-${item.size}`;
          return (
            <CouponProductItem
              key={key}
              item={item}
              product={product}
              expanded={expanded === key}
              selected={selected[key] ?? '0'}
              onExpandedChange={(open) => setExpanded(open ? key : null)}
              onSelect={(value) => setSelected({ ...selected, [key]: value })}
            />
          );
        })}
        <Typography as="h2" variant="body3" weight="semibold">
          장바구니 쿠폰
        </Typography>
        <CartCouponOptions
          value={cartCoupon}
          onValueChange={setCartCoupon}
          eligible={total - productDiscount >= 50000}
        />
        <CouponAmountSummary total={total} discount={discount} />
      </Stack>
    </ModalDialog>
  );
}
