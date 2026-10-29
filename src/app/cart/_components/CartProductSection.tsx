'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Icon } from '@/components/common/atoms/Icon';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { isCartItemSoldOut, itemKey } from '@/app/cart/cart-item';
import { faXmark } from '@/icons/fontAwesome';
import { getCartImage } from '@/mocks/cartDisplay';
import { type Product } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

type CartSelectionBarProps = {
  allSelected: boolean;
  selectedCount: number;
  totalCount: number;
  soldOutCount: number;
  onSelectAll: (checked: boolean) => void;
  onRemoveSelected: () => void;
  onRemoveSoldOut: () => void;
};

/** 전체 선택과 선택·품절 상품 삭제를 제공합니다. (Provides cart selection and removal actions.) */
function CartSelectionBar({
  allSelected,
  selectedCount,
  totalCount,
  soldOutCount,
  onSelectAll,
  onRemoveSelected,
  onRemoveSoldOut,
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
        <Button
          variant="link"
          size={mobile ? 'md' : 'sm'}
          disabled={selectedCount === 0}
          onClick={onRemoveSelected}
        >
          선택상품 삭제
        </Button>
        <Button
          variant="link"
          size={mobile ? 'md' : 'sm'}
          disabled={soldOutCount === 0}
          onClick={onRemoveSoldOut}
        >
          품절상품 삭제
        </Button>
      </HStack>
    </HStack>
  );
}

type CartItemRowProps = {
  item: CartItem;
  product: Product;
  selected: boolean;
  favorite: boolean;
  onSelect: (checked: boolean) => void;
  onRemove: () => void;
  onEdit: () => void;
  onFavorite: () => void;
  onQuantityChange: (quantity: number) => void;
};

/** 선택·삭제·옵션 변경 액션과 품절 상태를 표시합니다. (Displays a cart item and its available actions.) */
function CartItemRow({
  item,
  product,
  selected,
  favorite,
  onSelect,
  onRemove,
  onEdit,
  onFavorite,
  onQuantityChange,
}: CartItemRowProps) {
  const soldOut = isCartItemSoldOut(item, product);
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
            value={item.quantity}
            onChange={onQuantityChange}
          />
        </fieldset>
        <Typography variant="body3" weight="semibold">
          {(product.price * item.quantity).toLocaleString()}원
        </Typography>
        <Stack gap="2">
          {soldOut ? (
            <Button size="short" disabled>
              품절
            </Button>
          ) : (
            <ButtonLink
              size="short"
              href={`/checkout?selected=${encodeURIComponent(itemKey(item))}`}
            >
              주문하기
            </ButtonLink>
          )}
          <Button variant="secondary" size="short" onClick={onRemove}>
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
        <Button variant="icon" size={18} aria-label={`${product.name} 삭제`} onClick={onRemove}>
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
            optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} ${item.quantity}개`}
            amount={product.price * item.quantity}
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
  rows: { item: CartItem; product: Product }[];
  selectedKeys: string[];
  favorites: string[];
  onToggleItem: (key: string, checked: boolean) => void;
  onRemove: (item: CartItem) => void;
  onEdit: (item: CartItem, product: Product) => void;
  onToggleFavorite: (key: string) => void;
  allSelected: boolean;
  selectedCount: number;
  soldOutCount: number;
  total: number;
  onSelectAll: (checked: boolean) => void;
  onRemoveSelected: () => void;
  onRemoveSoldOut: () => void;
  onQuantityChange: (item: CartItem, quantity: number) => void;
};

/** 장바구니 선택 도구·상품 목록·금액과 보관 안내를 표시합니다. (Displays cart selection tools, products, total, and storage guidance.) */
export function CartProductSection({
  rows,
  allSelected,
  selectedCount,
  soldOutCount,
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
  onQuantityChange,
}: CartProductSectionProps) {
  return (
    <Stack gap="4">
      <CartSelectionBar
        allSelected={allSelected}
        selectedCount={selectedCount}
        totalCount={rows.length}
        soldOutCount={soldOutCount}
        onSelectAll={onSelectAll}
        onRemoveSelected={onRemoveSelected}
        onRemoveSoldOut={onRemoveSoldOut}
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
              onQuantityChange={(quantity) => onQuantityChange(item, quantity)}
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
