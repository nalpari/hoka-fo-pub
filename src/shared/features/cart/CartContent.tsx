import { AmountRow } from '@/shared/components/molecules/AmountRow/AmountRow';
import { orderRecommendations } from '@/mocks/orderRecommendations';
import { CartSelectionBar } from './CartSelectionBar';
import { CartProductList } from './CartProductList';
import { CartSupportInfo } from './CartSupportInfo';
import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { OrderActionBar } from '@/shared/components/molecules/OrderActionBar/OrderActionBar';

import { OrderRecommendations } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendations';
import { HStack, Stack } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { OrderPageLayout } from '@/shared/components/layouts/OrderPageLayout/OrderPageLayout';
import type { CartItem } from '@/shared/types/cart';

type Props = {
  rows: { item: CartItem; product: Product }[];
  allKeys: string[];
  selectedKeys: string[];
  favorites: string[];
  itemCount: number;
  selectedCount: number;
  total: number;
  dialogs: ReactNode;
  onSelectAll: (checked: boolean) => void;
  onToggleItem: (key: string, checked: boolean) => void;
  onRemove: (item: CartItem) => void;
  onEdit: (item: CartItem, product: Product) => void;
  onToggleFavorite: (key: string) => void;
  onRemoveSelected: () => void;
  onRemoveSoldOut: () => void;
};

export function CartContent({
  rows,
  allKeys,
  selectedKeys,
  favorites,
  itemCount,
  selectedCount,
  total,
  dialogs,
  onSelectAll,
  onToggleItem,
  onRemove,
  onEdit,
  onToggleFavorite,
  onRemoveSelected,
  onRemoveSoldOut,
}: Props) {
  return (
    <OrderPageLayout
      step={1}
      title={
        <HStack gap="1" alignItems="baseline">
          <Typography as="h1" web="heading6" mo="heading5">
            장바구니
          </Typography>
          <Typography variant="body4">(총 {itemCount}개)</Typography>
        </HStack>
      }
    >
      {dialogs}
      {rows.length ? (
        <Stack gap={{ base: '10', _mobile: '6' }}>
          <Stack gap="4">
            <CartSelectionBar
              allSelected={selectedKeys.length === allKeys.length}
              selectedCount={selectedCount}
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
            <AmountRow label="결제예정금액" amount={total} emphasis px="4" py="5" bg="black.10" />
            <Typography variant="body5" tone="subtle">
              * 장바구니에 담긴 상품은 30일 동안 보관됩니다. 더 오래 상품을 보관하시려면 관심 상품에
              담아주시기 바랍니다.
            </Typography>
          </Stack>
          <OrderRecommendations items={orderRecommendations} />
          <CartSupportInfo />
          <OrderActionBar>
            {selectedCount ? (
              <ButtonLink
                href={`/checkout?selected=${encodeURIComponent(selectedKeys.join('|'))}`}
                variant="primary"
                fullWidth
              >
                주문하기
              </ButtonLink>
            ) : (
              <Button variant="primary" fullWidth disabled>
                주문하기
              </Button>
            )}
          </OrderActionBar>
        </Stack>
      ) : (
        <Stack alignItems="center" gap="4" py="20" borderTop="1px solid var(--colors-black-20)">
          <Typography variant="body3">장바구니에 담은 상품이 없습니다.</Typography>
          <ButtonLink href="/products" variant="secondary">
            쇼핑 계속하기
          </ButtonLink>
        </Stack>
      )}
    </OrderPageLayout>
  );
}
