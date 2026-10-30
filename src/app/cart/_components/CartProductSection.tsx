'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Icon } from '@/components/common/atoms/Icon';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { itemKey } from '@/app/cart/cart-item';
import type { CartPreviewRow } from '@/app/cart/cart-preview';
import { faXmark } from '@/icons/fontAwesome';
import { getCartImage } from '@/mocks/cartDisplay';

import { CartDialogs } from './CartDialogs';

type CartSelectionBarProps = {
  allSelected: boolean;
  selectedCount: number;
  totalCount: number;
  soldOutCount: number;
  onSelectAll: (checked: boolean) => void;
};

/** 전체 선택과 삭제 버튼의 확인용 표시를 제공합니다. (Displays cart selection and preview removal buttons.) */
function CartSelectionBar({
  allSelected,
  selectedCount,
  totalCount,
  soldOutCount,
  onSelectAll,
}: CartSelectionBarProps) {
  const mobile = usePlatform() === 'mobile';

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Checkbox
        aria-label="전체 상품 선택"
        checked={allSelected}
        onCheckedChange={onSelectAll}
        label={
          <Typography variant="body4">
            {mobile ? (
              <>
                전체{' '}
                <Typography as="span" variant="body4" weight="medium">
                  ({selectedCount}/{totalCount})
                </Typography>
              </>
            ) : (
              `선택상품 ${selectedCount}개`
            )}
          </Typography>
        }
      />
      <HStack gap={{ base: '3', _mobile: '2' }}>
        <Button variant="link" size={mobile ? 'md' : 'sm'} disabled={selectedCount === 0}>
          선택상품 삭제
        </Button>
        <Button variant="link" size={mobile ? 'md' : 'sm'} disabled={soldOutCount === 0}>
          품절상품 삭제
        </Button>
      </HStack>
    </HStack>
  );
}

type CartItemRowProps = {
  row: CartPreviewRow;
  selected: boolean;
  favorite: boolean;
  onSelect: (checked: boolean) => void;
  onEdit: () => void;
  onFavorite: () => void;
};

/** 상품 선택과 수량의 로컬 표시를 제공합니다. (Displays local cart selection and quantity controls.) */
function CartItemRow({ row, selected, favorite, onSelect, onEdit, onFavorite }: CartItemRowProps) {
  const { item, product, amount, soldOut } = row;
  const [quantity, setQuantity] = useState(item.quantity);
  const platform = usePlatform();
  if (platform !== 'mobile')
    return (
      <Grid
        as="li"
        gridTemplateColumns="32px minmax(0, 1fr) 120px 140px 100px"
        alignItems="center"
        gap="6"
        py="6"
        borderBottom="1px solid var(--colors-black-20)"
        opacity={soldOut ? '0.4' : '1'}
      >
        <Checkbox
          aria-label={`${product.name} 선택`}
          checked={selected}
          disabled={soldOut}
          onCheckedChange={onSelect}
          label={null}
        />
        <OrderProductSummary
          variant="coupon"
          hideAmount
          image={getCartImage(item, product.primaryImage)}
          name={product.name}
          optionText={`옵션 : ${item.width} / ${item.color} / ${item.size}`}
          amount={product.price}
        >
          <Button variant="link" size="sm" onClick={onEdit} disabled={soldOut}>
            옵션변경
          </Button>
        </OrderProductSummary>
        <fieldset disabled={soldOut} className={css({ border: 0, p: 0, minW: 0 })}>
          <NumberStepper
            ariaLabel={`${product.name} 수량`}
            min={1}
            value={quantity}
            onChange={setQuantity}
          />
        </fieldset>
        <Typography variant="body3" weight="semibold">
          {amount.toLocaleString()}원
        </Typography>
        <Stack gap="2">
          {soldOut ? (
            <Button size="short" disabled>
              품절
            </Button>
          ) : (
            <Button size="short">주문하기</Button>
          )}
          <Button variant="secondary" size="short">
            삭제하기
          </Button>
        </Stack>
      </Grid>
    );

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
        <Button variant="icon" size={18} aria-label={`${product.name} 삭제`}>
          <Icon fontAwesomeIcon={faXmark} size={14} />
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
            optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} ${quantity}개`}
            amount={amount}
          >
            <HStack
              justifyContent="space-between"
              pt={{ base: '1', _mobile: '0.5' }}
              pb={{ base: '0', _mobile: '2' }}
              gap="1"
            >
              <Button variant="link" size="sm" onClick={onEdit}>
                옵션변경
              </Button>
              <Wishlist
                active={favorite}
                ariaLabel="관심상품"
                label="관심상품"
                iconSize="12px"
                onActiveChange={onFavorite}
              />
            </HStack>
          </OrderProductSummary>
        </Box>
      </Stack>
    </Stack>
  );
}

type CartProductSectionProps = {
  rows: CartPreviewRow[];
  total: number;
};

/**
 * 장바구니 고정 표시와 최소 UI 조작을 제공합니다. (Displays fixed cart data with local UI controls.)
 *
 * [ 개발팀 바인딩 ] rows의 amount/soldOut과 total은 준비된 표시 예시이며 재계산하지 않습니다.
 * 체크·수량·관심·옵션 선택은 로컬 확인용입니다. 삭제·주문·옵션 저장 요청과 목록 갱신은 미연결입니다.
 * 실제 요청과 성공/실패/pending 처리는 개발팀 장바구니 소유자에서 연결합니다.
 */
export function CartProductSection({ rows, total }: CartProductSectionProps) {
  const availableKeys = rows.filter((row) => !row.soldOut).map(({ item }) => itemKey(item));
  const [selectedKeys, setSelectedKeys] = useState(() =>
    rows.filter((row) => row.initialSelected && !row.soldOut).map(({ item }) => itemKey(item)),
  );
  const [favorites, setFavorites] = useState<string[]>([]);
  const [editingRow, setEditingRow] = useState<CartPreviewRow | null>(null);
  const [limited, setLimited] = useState(false);

  return (
    <Stack gap="4">
      <CartDialogs
        editingRow={editingRow}
        limited={limited}
        onEditClose={() => setEditingRow(null)}
        onLimitedChange={setLimited}
      />
      <CartSelectionBar
        allSelected={availableKeys.length > 0 && selectedKeys.length === availableKeys.length}
        selectedCount={selectedKeys.length}
        totalCount={rows.length}
        soldOutCount={rows.filter((row) => row.soldOut).length}
        onSelectAll={(checked) => setSelectedKeys(checked ? availableKeys : [])}
      />
      <Grid
        gridTemplateColumns="32px minmax(0, 1fr) 120px 140px 100px"
        gap="6"
        py="3"
        borderTop="1px solid var(--colors-black-100)"
        borderBottom="1px solid var(--colors-black-20)"
        display={{ base: 'grid', _mobile: 'none' }}
      >
        <Box />
        <Typography variant="body4">상품정보/옵션</Typography>
        <Typography variant="body4">수량</Typography>
        <Typography variant="body4">가격</Typography>
        <Box />
      </Grid>
      <Stack as="ul" gap="4" listStyleType="none">
        {rows.map((row) => {
          const { item } = row;
          const key = itemKey(item);
          return (
            <CartItemRow
              key={key}
              row={row}
              selected={selectedKeys.includes(key)}
              favorite={favorites.includes(key)}
              onSelect={(checked) =>
                setSelectedKeys((keys) =>
                  checked ? [...keys, key] : keys.filter((value) => value !== key),
                )
              }
              onEdit={() => (row.soldOut ? setLimited(true) : setEditingRow(row))}
              onFavorite={() =>
                setFavorites((keys) =>
                  keys.includes(key) ? keys.filter((value) => value !== key) : [...keys, key],
                )
              }
            />
          );
        })}
      </Stack>
      <Box display={{ _mobile: 'none' }}>
        <Grid gridTemplateColumns="1fr 1fr" border="1px solid var(--colors-black-20)" p="6" gap="8">
          <Stack gap="3">
            <AmountRow label="상품금액" amount={total} />
            <Typography variant="body5" tone="tertiary">
              배송비는 주문 시 확인할 수 있습니다.
            </Typography>
          </Stack>
          <AmountRow label="결제예정금액" amount={total} emphasis />
        </Grid>
      </Box>
      <Typography variant="body5" tone="tertiary">
        * 장바구니에 담긴 상품은 30일 동안 보관됩니다. 더 오래 상품을 보관하시려면 관심 상품에
        담아주시기 바랍니다.
      </Typography>
    </Stack>
  );
}
