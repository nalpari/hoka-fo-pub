'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Icon } from '@/components/common/atoms/Icon';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { itemKey } from '@/app/cart/cart-item';
import { cartPreviewAmounts, type CartPreviewRow } from '@/app/cart/cart-preview';
import { getCartImage } from '@/mocks/cartDisplay';

type CartProductSectionProps = {
  rows: readonly CartPreviewRow[];
};

type CartItemProps = {
  row: CartPreviewRow;
  selected: boolean;
  onSelect: (checked: boolean) => void;
};

/** 모바일 장바구니 상품 카드를 표시합니다. (Displays a mobile cart product card.) */
function CartMobileItem({ row, selected, onSelect }: CartItemProps) {
  const { item, product, amount, soldOut } = row;
  const [favorite, setFavorite] = useState(false);

  return (
    <Stack as="li" gap="0" bg="black.10" minH={{ base: '185px', _mobile: '164px' }}>
      <HStack justifyContent="space-between" alignItems="center" w="100%" px="4" pt="4">
        <Checkbox
          aria-label={`${product.name} 선택`}
          checked={selected}
          disabled={soldOut}
          onCheckedChange={onSelect}
          label={null}
        />
        <Button variant="icon" size={20} aria-label={`${product.name} 삭제`}>
          <Icon name="xmark-regular" size={20} />
        </Button>
      </HStack>
      <Stack
        flex="1"
        minW="0"
        pl="4"
        pr="4"
        pt={{ base: '8', _mobile: '0' }}
        pb={{ base: '8', _mobile: '4' }}
        gap="3"
      >
        <Box opacity={soldOut ? '0.4' : '1'}>
          <OrderProductSummary
            variant="cart"
            image={getCartImage(item, product.primaryImage)}
            name={product.name}
            gender={product.gender ?? 'All Gender'}
            optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} ${item.quantity}개`}
            amount={amount}
          >
            <HStack
              justifyContent="space-between"
              pt={{ base: '1', _mobile: '0.5' }}
              pb={{ base: '0', _mobile: '2' }}
              gap="1"
            >
              <Button variant="link" size="sm">
                옵션변경
              </Button>
              <Wishlist
                active={favorite}
                ariaLabel="관심상품"
                label="관심상품"
                iconSize="14px"
                onActiveChange={setFavorite}
              />
            </HStack>
          </OrderProductSummary>
        </Box>
      </Stack>
    </Stack>
  );
}

/** PC 장바구니 상품 행을 표시합니다. (Displays a desktop cart product row.) */
function CartDesktopItem({ row, selected, onSelect }: CartItemProps) {
  const { item, product, amount, soldOut } = row;
  const [quantity, setQuantity] = useState(item.quantity);
  const [favorite, setFavorite] = useState(false);

  return (
    <Grid
      as="li"
      gridTemplateColumns="minmax(0, 604fr) minmax(0, 158fr) minmax(0, 200fr) minmax(0, 170fr)"
      alignItems="center"
      gap="0"
      py="8"
      borderBottom="1px solid var(--colors-black-20)"
    >
      <HStack minW="0" gap="4" px="6" alignItems="flex-start">
        <Checkbox
          aria-label={`${product.name} 선택`}
          checked={selected}
          disabled={soldOut}
          onCheckedChange={onSelect}
          label={null}
        />
        <Box flex="1" minW="0" opacity={soldOut ? '0.4' : '1'}>
          <OrderProductSummary
            variant="cart"
            image={getCartImage(item, product.primaryImage)}
            name={product.name}
            gender={product.gender ?? 'All Gender'}
            optionText={`옵션 : ${item.width} / ${item.color} / ${item.size}`}
            optionAction={
              <Button variant="link" size="md" disabled={soldOut}>
                옵션변경
              </Button>
            }
            hideAmount
          >
            <Wishlist
              active={favorite}
              ariaLabel={`${product.name} 관심상품`}
              label="관심상품"
              iconSize="14px"
              onActiveChange={setFavorite}
            />
          </OrderProductSummary>
        </Box>
      </HStack>
      <HStack justifyContent="center" px="6" opacity={soldOut ? '0.4' : '1'}>
        <fieldset disabled={soldOut}>
          <NumberStepper
            ariaLabel={`${product.name} 수량`}
            min={1}
            value={quantity}
            onChange={setQuantity}
          />
        </fieldset>
      </HStack>
      <HStack justifyContent="flex-end" opacity={soldOut ? '0.4' : '1'}>
        <Typography variant="body3" weight="medium">
          {amount.toLocaleString()}원
        </Typography>
      </HStack>
      <Stack gap="2" w="80px" justifySelf="center" opacity={soldOut ? '0.4' : '1'}>
        {soldOut ? (
          <Button variant="primary" colorway="black" size="short" fullWidth disabled>
            품절
          </Button>
        ) : (
          <Button variant="primary" colorway="black" size="short" fullWidth>
            주문하기
          </Button>
        )}
        <Button variant="secondary" size="short" fullWidth>
          삭제하기
        </Button>
      </Stack>
    </Grid>
  );
}

/**
 * 장바구니의 상품 목록과 금액 표시를 구성합니다. (Composes the cart product list and amount display.)
 *
 * [ 개발팀 바인딩 ] 상품 행의 amount/soldOut과 요약 금액은 고정 표시 예시이며 서로 재계산하지 않습니다.
 * 체크 선택은 화면 확인용 로컬 상태이며 삭제·주문·옵션 저장 요청과 목록 갱신은 연결하지 않습니다.
 * 실제 선택과 요청 처리는 개발팀 장바구니 소유자에서 연결합니다. 옵션 편집 디자인은 preview-options 경로에서 확인합니다.
 */
export function CartProductSection({ rows }: CartProductSectionProps) {
  const mobile = usePlatform() === 'mobile';
  const CartItem = mobile ? CartMobileItem : CartDesktopItem;
  const availableKeys = rows.filter((row) => !row.soldOut).map(({ item }) => itemKey(item));
  const [selectedKeys, setSelectedKeys] = useState(() =>
    rows.filter((row) => row.initialSelected && !row.soldOut).map(({ item }) => itemKey(item)),
  );
  const selectedCount = selectedKeys.length;
  const allSelected = availableKeys.length > 0 && selectedCount === availableKeys.length;

  const handleSelect = (key: string, checked: boolean) => {
    setSelectedKeys((keys) =>
      checked
        ? keys.includes(key)
          ? keys
          : [...keys, key]
        : keys.filter((value) => value !== key),
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedKeys(checked ? availableKeys : []);
  };

  return (
    <Stack gap={{ base: '0', _mobile: '4' }}>
      <Box mb={{ base: '6', _mobile: '0' }}>
        <HStack justifyContent="space-between" alignItems={{ base: 'flex-end', _mobile: 'center' }}>
          <Checkbox
            aria-label="전체 상품 선택"
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            label={
              <Typography web="body2" mo="body4">
                전체{' '}
                <Typography as="span" web="body2" mo="body4" weight="medium">
                  ({selectedCount}/{rows.length})
                </Typography>
              </Typography>
            }
          />
          <HStack gap={{ base: '3', _mobile: '2' }}>
            <Button variant="link" size="md" disabled={selectedCount === 0}>
              선택상품 삭제
            </Button>
            <Button variant="link" size="md" disabled={rows.every((row) => !row.soldOut)}>
              품절상품 삭제
            </Button>
          </HStack>
        </HStack>
      </Box>
      <Grid
        gridTemplateColumns="minmax(0, 604fr) minmax(0, 158fr) minmax(0, 200fr) minmax(0, 170fr)"
        gap="0"
        py="5"
        borderTop="2px solid var(--colors-black-100)"
        borderBottom="1px solid var(--colors-black-100)"
        display={{ base: 'grid', _mobile: 'none' }}
      >
        <HStack px="6" gap="4">
          <Checkbox
            aria-label="전체 상품 선택"
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            label={null}
          />
          <Box flex="1" textAlign="center">
            <Typography variant="headingKr9">상품/옵션정보</Typography>
          </Box>
        </HStack>
        <Box textAlign="center">
          <Typography variant="headingKr9">수량</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="headingKr9">가격</Typography>
        </Box>
        <Box />
      </Grid>
      <Stack as="ul" gap={{ base: '0', _mobile: '4' }} listStyleType="none">
        {rows.map((row) => {
          const key = itemKey(row.item);

          return (
            <CartItem
              key={key}
              row={row}
              selected={selectedKeys.includes(key)}
              onSelect={(checked) => handleSelect(key, checked)}
            />
          );
        })}
      </Stack>
      <Box mt={{ base: '4', _mobile: '0' }}>
        <Typography variant="body5" tone="tertiary">
          * 장바구니에 담긴 상품은 30일 동안 보관됩니다. 더 오래 상품을 보관하시려면 관심 상품에
          담아주시기 바랍니다.
        </Typography>
      </Box>
      <Box display={{ _mobile: 'none' }} mt="6">
        <Grid gridTemplateColumns="minmax(0, 1fr) 375px" border="1px solid var(--colors-black-100)">
          <Stack gap="5" p="8" justifyContent="center">
            <HStack justifyContent="space-between">
              <Typography variant="body3" weight="medium">
                상품금액
              </Typography>
              <Typography variant="body3" weight="medium">
                {cartPreviewAmounts.product.toLocaleString()}원
              </Typography>
            </HStack>
            <Box borderTop="1px solid var(--colors-black-20)" />
            <HStack justifyContent="space-between">
              <Typography variant="body3" weight="medium">
                배송비
              </Typography>
              <Typography variant="body3" weight="medium">
                {cartPreviewAmounts.shipping.toLocaleString()}원
              </Typography>
            </HStack>
          </Stack>
          <Stack alignItems="flex-end" gap="6" p="8" borderLeft="1px solid var(--colors-black-100)">
            <Stack alignItems="flex-end" gap="0.5">
              <Typography variant="body3" weight="medium">
                결제예정금액
              </Typography>
              <Typography variant="body5" tone="tertiary">
                (상품가격 + 배송비)
              </Typography>
            </Stack>
            <HStack gap="0.5" alignItems="baseline">
              <Typography variant="heading7">
                {cartPreviewAmounts.total.toLocaleString()}
              </Typography>
              <Typography variant="headingKr9">원</Typography>
            </HStack>
          </Stack>
        </Grid>
      </Box>
    </Stack>
  );
}
