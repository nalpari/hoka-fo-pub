import type { Product } from '@/mocks/products';
import type { CartItem } from '@/shared/types/cart';
import { CartOptionsDialog } from './CartOptionsDialog';
import { CartLimitDialog } from './CartLimitDialog';
import { itemKey } from './cart-item';

type Props = {
  rows: { item: CartItem; product: Product }[];
  editingKey: string | null;
  limited: boolean;
  onEditClose: () => void;
  onLimitedChange: (open: boolean) => void;
  onSave: (item: CartItem, next: CartItem) => void;
};

export function CartDialogs({
  rows,
  editingKey,
  limited,
  onEditClose,
  onLimitedChange,
  onSave,
}: Props) {
  return (
    <>
      {editingKey
        ? rows
            .filter(({ item }) => itemKey(item) === editingKey)
            .map(({ item, product }) => (
              <CartOptionsDialog
                key={editingKey}
                item={item}
                product={product}
                onClose={onEditClose}
                onSave={(next) => onSave(item, next)}
              />
            ))
        : null}
      <CartLimitDialog open={limited} onOpenChange={onLimitedChange} />
    </>
  );
}
