'use client';

import { useState } from 'react';
import type { Product } from '@/mocks/products';
import { getCartImage } from '@/mocks/cartDisplay';
import { ConfirmDialog } from '@/shared/components/molecules/ConfirmDialog/ConfirmDialog';
import type { CartItem } from '@/shared/types/cart';
import { CartOptionsContent } from './CartOptionsContent';

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
      confirmLabel="변경"
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
