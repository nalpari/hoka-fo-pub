import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { CartItemRow } from './CartItemRow';
import { itemKey } from './cart-item';
import { OrderActionBar } from '@/shared/components/molecules/OrderActionBar/OrderActionBar';

import { OrderRecommendations } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendations';
import Link from 'next/link';
import { HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { OrderPageLayout } from '@/shared/components/layouts/OrderPageLayout/OrderPageLayout';
import type { CartItem } from '@/shared/types/cart';

const textAction = css({
  p: '0',
  border: '0',
  borderRadius: '0',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});

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
            <HStack justifyContent="space-between" alignItems="center">
              <Checkbox
                aria-label="전체 상품 선택"
                checked={selectedKeys.length === allKeys.length}
                onCheckedChange={onSelectAll}
                label={<Typography variant="body4">선택상품 {selectedCount}개</Typography>}
              />
              <HStack gap="3">
                <Button variant="link" size="sm" onClick={onRemoveSelected}>
                  선택상품 삭제
                </Button>
                <Button variant="link" size="sm" onClick={onRemoveSoldOut}>
                  품절상품 삭제
                </Button>
              </HStack>
            </HStack>
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
            <HStack justifyContent="space-between" px="4" py="5" bg="black.10">
              <Typography variant="body4">결제예정금액</Typography>
              <Typography variant="body3" weight="semibold">
                {total.toLocaleString()}원
              </Typography>
            </HStack>
            <Typography variant="body5" tone="subtle">
              * 장바구니에 담긴 상품은 30일 동안 보관됩니다. 더 오래 상품을 보관하시려면 관심 상품에
              담아주시기 바랍니다.
            </Typography>
          </Stack>
          <OrderRecommendations />
          <ContentSection
            as="section"
            gap="2"
            pt="4"
            borderTop="1px solid var(--colors-black-20)"
            title="고객센터 안내"
            headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading7' } }}
          >
            <Typography variant="body4">HOKA/HOKA 고객센터 내용 미정</Typography>
            <Typography variant="body4">TEL. 080-665-5552</Typography>
            <Typography variant="body5" tone="subtle">
              *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
            </Typography>
            <Link href="/support/inquiries/new" className={textAction}>
              1:1 문의하기 &gt;
            </Link>
            <ContentHeader
              titleAs="h3"
              title={<>운영시간</>}
              titleProps={{ variant: 'body4', weight: 'semibold' }}
            />
            <Typography variant="body5">평일 09:00 ~ 18:00</Typography>
            <Typography variant="body5" tone="subtle">
              *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
            </Typography>
          </ContentSection>
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
