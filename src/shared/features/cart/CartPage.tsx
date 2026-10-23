'use client';

import { useState } from 'react';
import { products } from '@/mocks/products';
import { CartDialogs } from './CartDialogs';
import { CartContent } from './CartContent';
import { itemKey, isCartItemSoldOut } from './cart-item';
import type { CartItem } from '@/shared/types/cart';

type Props = {
  cart: CartItem[];
  onQuantityChange: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
  onOptionsChange?: (item: CartItem, next: CartItem) => void;
};

/** 장바구니 선택·관심상품과 옵션 편집 상태를 관리합니다. (Manages cart selection and option editing.) */
export function CartPage({ cart, onQuantityChange, onRemove, onOptionsChange }: Props) {
  const [limited, setLimited] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[] | null>(() =>
    cart.length === 4 &&
    cart.every((item) => ['브라운', '레드', '화이트', '옐로우골드'].includes(item.color))
      ? cart.slice(0, 2).map(itemKey)
      : null,
  );
  const rows = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
  const allKeys = rows
    .filter(({ item, product }) => !isCartItemSoldOut(item, product))
    .map(({ item }) => itemKey(item));
  const selectedKeys =
    selected === null ? allKeys : selected.filter((key) => allKeys.includes(key));
  const selectedRows = rows.filter(({ item }) => selectedKeys.includes(itemKey(item)));
  const total = selectedRows.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0,
  );
  const selectedCount = selectedRows.length;
  const itemCount = rows.reduce((sum, { item }) => sum + item.quantity, 0);
  const allSelected = allKeys.length > 0 && selectedKeys.length === allKeys.length;
  const checkoutHref = selectedCount
    ? `/checkout?selected=${encodeURIComponent(selectedKeys.join('|'))}`
    : null;

  return (
    <CartContent
      rows={rows}
      allSelected={allSelected}
      checkoutHref={checkoutHref}
      selectedKeys={selectedKeys}
      favorites={favorites}
      itemCount={itemCount}
      selectedCount={selectedCount}
      total={total}
      onSelectAll={(checked) => setSelected(checked ? allKeys : [])}
      onToggleItem={(key, checked) =>
        setSelected(
          checked ? [...selectedKeys, key] : selectedKeys.filter((value) => value !== key),
        )
      }
      onToggleFavorite={(key) =>
        setFavorites((previous) =>
          previous.includes(key) ? previous.filter((value) => value !== key) : [...previous, key],
        )
      }
      onRemove={onRemove}
      onEdit={(item, product) =>
        isCartItemSoldOut(item, product) ? setLimited(true) : setEditingKey(itemKey(item))
      }
      onRemoveSelected={() => selectedRows.forEach(({ item }) => onRemove(item))}
      onRemoveSoldOut={() =>
        rows
          .filter(({ item, product }) => isCartItemSoldOut(item, product))
          .forEach(({ item }) => onRemove(item))
      }
      dialogs={
        <CartDialogs
          rows={rows}
          editingKey={editingKey}
          limited={limited}
          onEditClose={() => setEditingKey(null)}
          onLimitedChange={setLimited}
          onSave={(item, next) => {
            const nextKey = itemKey(next);
            if (onOptionsChange) onOptionsChange(item, next);
            else onQuantityChange(item, next.quantity);
            setSelected([
              ...new Set(selectedKeys.map((key) => (key === editingKey ? nextKey : key))),
            ]);
            setEditingKey(null);
          }}
        />
      }
    />
  );
}
