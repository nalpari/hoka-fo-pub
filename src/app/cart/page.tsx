'use client';

import Link from 'next/link';

import { type ComponentProps, type ReactNode, useState } from 'react';
import { usePlatform } from '@/context/platform';
import { useShop } from '@/context/ShopShell';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Icon } from '@/components/common/atoms/Icon';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { ModalDialog } from '@/components/common/molecules/ModalDialog';
import { OrderActionBar } from '@/components/common/molecules/OrderActionBar';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';
import { type ProductOptionThumbnail } from '@/components/common/molecules/ProductOptionList';
import { ProductColorSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductColorSelector';
import { ProductSizeSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductSizeSelector';
import { ProductWidthSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductWidthSelector';

import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { OrderPageLayout } from '@/components/common/layouts/OrderPageLayout';

import { isCartItemSoldOut, itemKey } from '@/components/cart/cart-item';
import { faXmark } from '@/icons/fontAwesome';
import { getCartImage } from '@/mocks/cartDisplay';
import { orderRecommendations } from '@/mocks/orderRecommendations';
import { type Product, products } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

/** 최소 수량이 1인 수량 선택을 표시합니다. (Displays cart quantity selection with a minimum of one.) */
function CartOptionQuantity({ value, onChange }: Props) {
  return (
    <Stack gap="3" alignItems="flex-start">
      <Typography variant="body4" weight="semibold">
        수량
      </Typography>
      <NumberStepper min={1} value={value} onChange={onChange} />
    </Stack>
  );
}

type CartOptionsContentProps = {
  draft: CartItem;
  name: string;
  image: string;
  widths: readonly string[];
  sizes: readonly string[];
  soldOut: readonly string[];
  colorOptions: readonly ProductOptionThumbnail[];
  onWidthChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onQuantityChange: (value: number) => void;
};

/** 옵션 이미지와 발볼·색상·사이즈·수량 선택을 표시합니다. (Displays cart product option controls.) */
function CartOptionsContent({
  draft,
  name,
  image,
  widths,
  sizes,
  soldOut,
  colorOptions,
  onWidthChange,
  onColorChange,
  onSizeChange,
  onQuantityChange,
}: CartOptionsContentProps) {
  return (
    <Stack gap="6">
      <img
        src={image}
        alt={name}
        className={css({
          w: 'calc(100% + 48px)',
          maxW: 'none',
          mx: '-6',
          mt: '-6',
          aspectRatio: '1',
          objectFit: 'contain',
          bg: 'black.10',
          _mobile: { w: 'calc(100% + 32px)', mx: '-4' },
        })}
      />
      <ContentSection
        gap="6"
        title={<>{name}</>}
        headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading5' } }}
      >
        <Stack gap="10">
          <ProductWidthSelector
            appearance="cart"
            value={draft.width}
            options={widths}
            onValueChange={onWidthChange}
          />

          <ProductColorSelector
            appearance="cart"
            value={draft.color}
            options={colorOptions}
            onValueChange={onColorChange}
          />
          <ProductSizeSelector
            appearance="cart"
            value={draft.size}
            options={sizes.map((value) => ({
              value,
              state: soldOut.includes(value) ? 'soldOut' : 'available',
            }))}
            onValueChange={onSizeChange}
          />
          <CartOptionQuantity value={draft.quantity} onChange={onQuantityChange} />
        </Stack>
      </ContentSection>
    </Stack>
  );
}

/** 상품 옵션 초안을 확인한 뒤 변경 사항을 저장합니다. (Edits and confirms a draft of cart product options.) */
function CartOptionsDialog({
  item,
  product,
  onClose,
  onSave,
}: {
  item: CartItem;
  product: Product;
  onClose: () => void;
  onSave: (next: CartItem) => void;
}) {
  const [draft, setDraft] = useState(item);
  const color = product.colorOptions?.find((option) => option.color === draft.color);
  const widths = color?.widths;
  const width = widths?.find((option) => option.label === draft.width);
  const sizes = width?.sizes ?? product.sizes;
  const soldOut = width?.soldOut ?? product.soldOut;
  const valid = sizes.includes(draft.size) && !soldOut.includes(draft.size);

  return (
    <ModalDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="옵션 변경하기"
      closeLabel="옵션 변경 닫기"
      size="sm"
      mobilePresentation="fullscreen"
      headerProps={{
        css: css.raw({
          _mobile: {
            bg: 'white',
            flexShrink: '0',
            borderBottom: '1px solid var(--colors-black-20)',
          },
        }),
      }}
      footerProps={{
        css: css.raw({
          _mobile: {
            borderTop: '1px solid var(--colors-black-20)',
            pt: '4',
            pb: 'max(32px, env(safe-area-inset-bottom))',
          },
        }),
      }}
      actions={{
        kind: 'confirm',
        confirmLabel: '확인',
        confirmDisabled: !valid,
        onConfirm: () => onSave(draft),
      }}
    >
      <CartOptionsContent
        draft={draft}
        name={product.name}
        image={getCartImage(
          draft,
          product.colorThumbnails?.find((option) => option.label === draft.color)?.image ??
            product.primaryImage,
        )}
        widths={widths?.map((option) => option.label) ?? ['Regular', 'Wide', 'X-Wide']}
        sizes={sizes}
        soldOut={soldOut}
        colorOptions={product.colors.map((value) => ({
          id: value,
          label: value,
          image:
            product.colorThumbnails?.find((option) => option.label === value)?.image ??
            product.primaryImage,
        }))}
        onWidthChange={(width) => setDraft({ ...draft, width })}
        onColorChange={(color) => setDraft({ ...draft, color })}
        onSizeChange={(size) => setDraft({ ...draft, size })}
        onQuantityChange={(quantity) => setDraft({ ...draft, quantity })}
      />
    </ModalDialog>
  );
}

type CartLimitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** 구매 수량 제한 안내와 닫기 액션을 표시합니다. (Displays the cart purchase limit notice.) */
function CartLimitDialog({ open, onOpenChange }: CartLimitDialogProps) {
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title="장바구니"
      closeLabel="안내 닫기"
      actions={{ kind: 'single', onConfirm: () => onOpenChange(false) }}
    >
      <Stack gap="4">
        <Typography variant="body2">변경할 수 없습니다</Typography>
        <Typography variant="body4">구매 수량이 제한된 상품입니다</Typography>
      </Stack>
    </ModalDialog>
  );
}

type CartDialogsProps = {
  rows: { item: CartItem; product: Product }[];
  editingKey: string | null;
  limited: boolean;
  onEditClose: () => void;
  onLimitedChange: (open: boolean) => void;
  onSave: (item: CartItem, next: CartItem) => void;
};

function CartDialogs({
  rows,
  editingKey,
  limited,
  onEditClose,
  onLimitedChange,
  onSave,
}: CartDialogsProps) {
  return (
    <>
      {editingKey
        ? rows
            .filter(({ item }) => itemKey(item) === editingKey)
            .map(({ item, product }) => (
              <CartOptionsDialog
                key={editingKey}
                item={item}
                product={product}
                onClose={onEditClose}
                onSave={(next) => onSave(item, next)}
              />
            ))
        : null}
      <CartLimitDialog open={limited} onOpenChange={onLimitedChange} />
    </>
  );
}

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
}: CartItemRowProps) {
  const soldOut = isCartItemSoldOut(item, product);

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
        <IconButton size={18} aria-label={`${product.name} 삭제`} onClick={onRemove}>
          <Icon fontAwesomeIcon={faXmark} size={14} />
        </IconButton>
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

type CartProductListProps = {
  rows: { item: CartItem; product: Product }[];
  selectedKeys: string[];
  favorites: string[];
  onToggleItem: (key: string, checked: boolean) => void;
  onRemove: (item: CartItem) => void;
  onEdit: (item: CartItem, product: Product) => void;
  onToggleFavorite: (key: string) => void;
};

function CartProductList({
  rows,
  selectedKeys,
  favorites,
  onToggleItem,
  onRemove,
  onEdit,
  onToggleFavorite,
}: CartProductListProps) {
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

type CartProductSectionProps = ComponentProps<typeof CartProductList> &
  Omit<ComponentProps<typeof CartSelectionBar>, 'soldOutCount' | 'totalCount'> & { total: number };

/** 장바구니 선택 도구·상품 목록·금액과 보관 안내를 표시합니다. (Displays cart selection tools, products, total, and storage guidance.) */
function CartProductSection({
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

/** 빈 장바구니 안내와 쇼핑 링크를 표시합니다. (Displays an empty cart message and shopping link.) */
function CartEmptyState() {
  return (
    <Stack alignItems="center" gap="4" py="20" borderTop="1px solid var(--colors-black-20)">
      <Typography variant="body3">장바구니에 담은 상품이 없습니다.</Typography>
      <ButtonLink href="/products" variant="secondary">
        쇼핑 계속하기
      </ButtonLink>
    </Stack>
  );
}

const textAction = css({
  p: '0',
  border: '0',
  borderRadius: '0',
});

/** 고객센터 연락처와 문의 링크를 표시합니다. (Displays cart support contact details and the inquiry link.) */
function CartSupportContact() {
  return (
    <>
      <Typography variant="heading7">HOKA/HOKA 고객센터 내용 미정</Typography>
      <Typography variant="body4">TEL. 080-665-5552</Typography>
      <Typography variant="body5" tone="tertiary">
        *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
      </Typography>
      <Link href="/support/inquiries/new" className={textAction}>
        <Typography variant="textLink3">1:1 문의하기</Typography>
      </Link>
    </>
  );
}

/** 고객센터 운영시간과 휴무 안내를 표시합니다. (Displays support opening hours and closure information.) */
function CartSupportHours() {
  return (
    <>
      <ContentHeader titleAs="h3" title={<>운영시간</>} titleProps={{ variant: 'heading7' }} />
      <Typography variant="body5">평일 09:00 ~ 18:00</Typography>
      <Typography variant="body5" tone="tertiary">
        *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
      </Typography>
    </>
  );
}

/** 장바구니 고객센터 연락처와 운영시간을 안내합니다. (Displays cart customer support information.) */
function CartSupportInfo() {
  return (
    <ContentSection
      as="section"
      gap={{ base: '4' }}
      title="고객센터 안내"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading6' } }}
    >
      <Stack gap="6">
        <CartSupportContact />
        <CartSupportHours />
      </Stack>
    </ContentSection>
  );
}

type CartOrderActionsProps = {
  total: number;
  checkoutHref: string | null;
};

/** 결제예정금액과 주문 가능 상태에 따른 액션을 표시합니다. (Displays the cart total and available order action.) */
function CartOrderActions({ total, checkoutHref }: CartOrderActionsProps) {
  return (
    <OrderActionBar>
      <Stack gap="5">
        <AmountRow
          label="결제예정금액"
          amount={total}
          emphasis
          display={{ base: 'none', _mobile: 'flex' }}
        />
        {checkoutHref ? (
          <ButtonLink href={checkoutHref} variant="primary" fullWidth>
            주문하기
          </ButtonLink>
        ) : (
          <Button variant="primary" fullWidth disabled>
            주문하기
          </Button>
        )}
      </Stack>
    </OrderActionBar>
  );
}

type CartContentProps = {
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
function CartContent({
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
}: CartContentProps) {
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

/** 장바구니 선택·관심상품과 옵션 편집 상태를 관리합니다. (Manages cart selection and option editing.) */
export default function Page() {
  const {
    cart,
    updateQuantity: onQuantityChange,
    remove: onRemove,
    updateOptions: onOptionsChange,
  } = useShop();
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
