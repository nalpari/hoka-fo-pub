import { Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import type { CartItem } from '@/types/cart';
import { CartItemRow } from './CartItemRow';
import { itemKey } from './cart-item';

type Props = {
  rows: { item: CartItem; product: Product }[];
  selectedKeys: string[];
  favorites: string[];
  onToggleItem: (key: string, checked: boolean) => void;
  onRemove: (item: CartItem) => void;
  onEdit: (item: CartItem, product: Product) => void;
  onToggleFavorite: (key: string) => void;
};

export function CartProductList({
  rows,
  selectedKeys,
  favorites,
  onToggleItem,
  onRemove,
  onEdit,
  onToggleFavorite,
}: Props) {
  return (
    <Stack as="ul" gap="4" listStyleType="none">
      {rows.map(({ item, product }) => {
        const key = itemKey(item);
        return (
          <CartItemRow
            key={key}
            item={item}
            product={product}
            selected={selectedKeys.includes(key)}
            favorite={favorites.includes(key)}
            onSelect={(checked) => onToggleItem(key, checked)}
            onRemove={() => onRemove(item)}
            onEdit={() => onEdit(item, product)}
            onFavorite={() => onToggleFavorite(key)}
          />
        );
      })}
    </Stack>
  );
}
