import { orderRecommendations } from '@/mocks/orderRecommendations';
import { CartProductSection } from './CartProductSection';
import { CartEmptyState } from './CartEmptyState';
import { CartSupportInfo } from './CartSupportInfo';
import { CartOrderActions } from './CartOrderActions';
import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations/OrderRecommendations';
import { Box, Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { OrderPageLayout } from '@/components/common/layouts/OrderPageLayout/OrderPageLayout';
import type { CartItem } from '@/types/cart';

type Props = {
  rows: { item: CartItem; product: Product }[];
  allSelected: boolean;
  checkoutHref: string | null;
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

/** 상품 목록과 추천·고객센터 및 주문 액션을 배치합니다. (Lays out cart contents and order actions.) */
export function CartContent({
  rows,
  allSelected,
  checkoutHref,
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
        <ContentHeader
          title="장바구니"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          orientation="horizontal"
          gap="1"
          alignItems="baseline"
          justifyContent="flex-start"
          action={
            <Box display={{ _mobile: 'none' }}>
              <Typography variant="body4">(총 {itemCount}개)</Typography>
            </Box>
          }
        />
      }
    >
      {dialogs}
      {rows.length ? (
        <Stack gap="10" pb={{ _mobile: '12' }}>
          <CartProductSection
            rows={rows}
            allSelected={allSelected}
            selectedCount={selectedCount}
            selectedKeys={selectedKeys}
            favorites={favorites}
            total={total}
            onSelectAll={onSelectAll}
            onToggleItem={onToggleItem}
            onRemove={onRemove}
            onEdit={onEdit}
            onToggleFavorite={onToggleFavorite}
            onRemoveSelected={onRemoveSelected}
            onRemoveSoldOut={onRemoveSoldOut}
          />
          <OrderRecommendations items={orderRecommendations} layout="portrait" />
          <CartSupportInfo />
          <CartOrderActions total={total} checkoutHref={checkoutHref} />
        </Stack>
      ) : (
        <CartEmptyState />
      )}
    </OrderPageLayout>
  );
}
