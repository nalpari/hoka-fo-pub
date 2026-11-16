'use client';

import { useState } from 'react';

import { cartApparelOptionPreview, cartOptionPreview } from '@/app/cart/cart-preview';

import { CartDialogs, CartLimitDialog } from './CartDialogs';

/** 장바구니 모달의 고정 시안 상태를 엽니다. (Opens a fixed cart dialog preview state.) */
export function CartModalPreview({
  kind,
}: {
  kind: 'options' | 'apparelOptions' | 'apparelChanged' | 'limit';
}) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return kind !== 'limit' ? (
    <CartDialogs
      initialSize={kind === 'apparelChanged' ? 'M' : undefined}
      editingRow={
        kind === 'apparelOptions' || kind === 'apparelChanged'
          ? cartApparelOptionPreview
          : cartOptionPreview
      }
      optionType={kind === 'apparelOptions' || kind === 'apparelChanged' ? 'apparel' : 'shoes'}
      unavailableColors={kind === 'options' ? ['White'] : undefined}
      onEditClose={() => setOpen(false)}
    />
  ) : (
    <CartLimitDialog onClose={() => setOpen(false)} />
  );
}
