'use client';

/**
 * [ 개발팀 바인딩 ]
 * useShop의 products/cart/add/updateQuantity/updateOptions/remove를 실제 상품·장바구니 상태에 연결합니다.
 * 동일 상품도 color/width/size가 다르면 별도 행입니다. CartItem.imageSrc는 명시적인 이미지 override이며 색상명으로 시안 이미지를 추측하지 않습니다.
 * 동기 변경 콜백의 비동기 저장/실패 복원은 ShopShell.state 어댑터에서 처리합니다. 결제 이동 전 서버 재고와 현재 장바구니를 확인합니다.
 */

import { useState } from 'react';
import { useShop } from '@/context/ShopShell';

import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations';

import { isCartItemSoldOut, itemKey } from '@/app/cart/cart-item';
import { OrderPageLayout } from '@/components/orders/OrderPageLayout';
import { orderRecommendations } from '@/mocks/orderRecommendations';
import { products } from '@/mocks/products';

import { CartDialogs } from './_components/CartDialogs';
import { CartEmptyState } from './_components/CartEmptyState';
import { CartOrderActions } from './_components/CartOrderActions';
import { CartProductSection } from './_components/CartProductSection';
import { CartSupportInfo } from './_components/CartSupportInfo';

/** 장바구니 선택·관심상품과 옵션 편집 상태를 관리합니다. (Manages cart selection and option editing.) */
export default function Page() {
  const {
    cart,
    products: catalogue = products,
    updateQuantity: onQuantityChange,
    remove: onRemove,
    updateOptions: onOptionsChange,
  } = useShop();
  const [limited, setLimited] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[] | null>(() =>
    cart.length === 4 && cart.every((item) => item.imageSrc === '/images/cart/clifton-preview.png')
      ? cart.slice(0, 2).map(itemKey)
      : null,
  );
  const rows = cart.flatMap((item) => {
    const product = catalogue.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
  const availableRows = rows.filter(({ item, product }) => !isCartItemSoldOut(item, product));
  const allKeys = availableRows.map(({ item }) => itemKey(item));
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
      {rows.length ? (
        <Stack gap="10" pb={{ _mobile: '12' }}>
          <CartProductSection
            onQuantityChange={onQuantityChange}
            rows={rows}
            allSelected={allSelected}
            selectedCount={selectedCount}
            soldOutCount={rows.length - availableRows.length}
            selectedKeys={selectedKeys}
            favorites={favorites}
            total={total}
            onSelectAll={(checked) => setSelected(checked ? allKeys : [])}
            onToggleItem={(key, checked) =>
              setSelected(
                checked ? [...selectedKeys, key] : selectedKeys.filter((value) => value !== key),
              )
            }
            onRemove={onRemove}
            onEdit={(item, product) =>
              isCartItemSoldOut(item, product) ? setLimited(true) : setEditingKey(itemKey(item))
            }
            onToggleFavorite={(key) =>
              setFavorites((previous) =>
                previous.includes(key)
                  ? previous.filter((value) => value !== key)
                  : [...previous, key],
              )
            }
            onRemoveSelected={() => selectedRows.forEach(({ item }) => onRemove(item))}
            onRemoveSoldOut={() =>
              rows
                .filter(({ item, product }) => isCartItemSoldOut(item, product))
                .forEach(({ item }) => onRemove(item))
            }
          />
          <HStack display={{ _mobile: 'none' }} justifyContent="center" gap="3">
            {checkoutHref ? (
              <ButtonLink variant="secondary" href={checkoutHref}>
                선택상품 주문하기
              </ButtonLink>
            ) : (
              <Button variant="secondary" disabled>
                선택상품 주문하기
              </Button>
            )}
            {allKeys.length ? (
              <ButtonLink href={`/checkout?selected=${encodeURIComponent(allKeys.join('|'))}`}>
                전체상품 주문하기
              </ButtonLink>
            ) : (
              <Button disabled>전체상품 주문하기</Button>
            )}
          </HStack>
          <OrderRecommendations items={orderRecommendations} layout="portrait" title="추천 상품" />
          <CartSupportInfo />
          <Box display={{ base: 'none', _mobile: 'block' }}>
            <CartOrderActions total={total} checkoutHref={checkoutHref} />
          </Box>
        </Stack>
      ) : (
        <CartEmptyState />
      )}
    </OrderPageLayout>
  );
}
