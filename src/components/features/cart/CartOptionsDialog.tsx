'use client';

import { useState } from 'react';
import type { Product } from '@/mocks/products';
import { getCartImage } from '@/mocks/cartDisplay';
import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';
import type { CartItem } from '@/types/cart';
import { CartOptionsContent } from './CartOptionsContent';
import { css } from 'styled-system/css';

/** 상품 옵션 초안을 확인한 뒤 변경 사항을 저장합니다. (Edits and confirms a draft of cart product options.) */
export function CartOptionsDialog({
  item,
  product,
  onClose,
  onSave,
}: {
  item: CartItem;
  product: Product;
  onClose: () => void;
  onSave: (next: CartItem) => void;
}) {
  const [draft, setDraft] = useState(item);
  const color = product.colorOptions?.find((option) => option.color === draft.color);
  const widths = color?.widths;
  const width = widths?.find((option) => option.label === draft.width);
  const sizes = width?.sizes ?? product.sizes;
  const soldOut = width?.soldOut ?? product.soldOut;
  const valid = sizes.includes(draft.size) && !soldOut.includes(draft.size);

  return (
    <ConfirmDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="옵션 변경하기"
      closeLabel="옵션 변경 닫기"
      size="sm"
      mobilePresentation="fullscreen"
      confirmLabel="확인"
      headerProps={{
        css: css.raw({
          _mobile: {
            bg: 'white',
            flexShrink: '0',
            borderBottom: '1px solid var(--colors-black-20)',
          },
        }),
      }}
      footerProps={{
        css: css.raw({
          _mobile: {
            borderTop: '1px solid var(--colors-black-20)',
            pt: '4',
            pb: 'max(32px, env(safe-area-inset-bottom))',
          },
        }),
      }}
      confirmDisabled={!valid}
      onConfirm={() => onSave(draft)}
    >
      <CartOptionsContent
        draft={draft}
        name={product.name}
        image={getCartImage(
          draft,
          product.colorThumbnails?.find((option) => option.label === draft.color)?.image ??
            product.primaryImage,
        )}
        widths={widths?.map((option) => option.label) ?? ['Regular', 'Wide', 'X-Wide']}
        sizes={sizes}
        soldOut={soldOut}
        colorOptions={product.colors.map((value) => ({
          id: value,
          label: value,
          image:
            product.colorThumbnails?.find((option) => option.label === value)?.image ??
            product.primaryImage,
        }))}
        onWidthChange={(width) => setDraft({ ...draft, width })}
        onColorChange={(color) => setDraft({ ...draft, color })}
        onSizeChange={(size) => setDraft({ ...draft, size })}
        onQuantityChange={(quantity) => setDraft({ ...draft, quantity })}
      />
    </ConfirmDialog>
  );
}
