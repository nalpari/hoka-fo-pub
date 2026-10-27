import type { ComponentProps } from 'react';
import { Box, Stack } from 'styled-system/jsx';
import { AmountRow } from '@/shared/components/molecules/AmountRow/AmountRow';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CartSelectionBar } from './CartSelectionBar';
import { CartProductList } from './CartProductList';
import { isCartItemSoldOut } from './cart-item';

export type CartProductSectionProps = ComponentProps<typeof CartProductList> &
  Omit<ComponentProps<typeof CartSelectionBar>, 'soldOutCount' | 'totalCount'> & { total: number };

/** 장바구니 선택 도구·상품 목록·금액과 보관 안내를 표시합니다. (Displays cart selection tools, products, total, and storage guidance.) */
export function CartProductSection({
  rows,
  allSelected,
  selectedCount,
  selectedKeys,
  favorites,
  total,
  onSelectAll,
  onToggleItem,
  onRemove,
  onEdit,
  onToggleFavorite,
  onRemoveSelected,
  onRemoveSoldOut,
}: CartProductSectionProps) {
  return (
    <Stack gap="4">
      <CartSelectionBar
        allSelected={allSelected}
        selectedCount={selectedCount}
        totalCount={rows.length}
        soldOutCount={rows.filter(({ item, product }) => isCartItemSoldOut(item, product)).length}
        onSelectAll={onSelectAll}
        onRemoveSelected={onRemoveSelected}
        onRemoveSoldOut={onRemoveSoldOut}
      />
      <CartProductList
        rows={rows}
        selectedKeys={selectedKeys}
        favorites={favorites}
        onToggleItem={onToggleItem}
        onRemove={onRemove}
        onEdit={onEdit}
        onToggleFavorite={onToggleFavorite}
      />
      <Box display={{ _mobile: 'none' }}>
        <AmountRow label="결제예정금액" amount={total} emphasis px="4" py="5" bg="black.10" />
      </Box>
      <Typography variant="body5" tone="tertiary">
        * 장바구니에 담긴 상품은 30일 동안 보관됩니다. 더 오래 상품을 보관하시려면 관심 상품에
        담아주시기 바랍니다.
      </Typography>
    </Stack>
  );
}
