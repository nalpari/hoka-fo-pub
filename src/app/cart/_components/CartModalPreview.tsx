'use client';

import { useState } from 'react';

import { cartOptionPreview } from '@/app/cart/cart-preview';

import { CartDialogs, CartLimitDialog } from './CartDialogs';

/** 장바구니 모달의 고정 시안 상태를 엽니다. (Opens a fixed cart dialog preview state.) */
export function CartModalPreview({ kind }: { kind: 'options' | 'limit' }) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return kind === 'options' ? (
    <CartDialogs editingRow={cartOptionPreview} onEditClose={() => setOpen(false)} />
  ) : (
    <CartLimitDialog onClose={() => setOpen(false)} />
  );
}
