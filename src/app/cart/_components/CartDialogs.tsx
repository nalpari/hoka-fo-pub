'use client';

import Image from 'next/image';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Typography } from '@/components/common/atoms/Typography';

import { ProductColorSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductColorSelector';
import { ProductSizeSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductSizeSelector';
import { ProductWidthSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductWidthSelector';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { getCartImage } from '@/mocks/cartDisplay';
import { type Product } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

/** 상품 옵션의 선택과 닫기를 확인합니다. (Previews product option selection and dismissal.) */
function CartOptionsDialog({
  item,
  product,
  onClose,
}: {
  item: CartItem;
  product: Product;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(item);
  const color = product.colorOptions?.find((option) => option.color === draft.color);
  const widths = color?.widths;
  const width = widths?.find((option) => option.label === draft.width);
  const sizes = width?.sizes ?? product.sizes;
  const soldOut = width?.soldOut ?? product.soldOut;

  return (
    <ModalDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="옵션 변경하기"
      closeLabel="옵션 변경 닫기"
      size="lg"
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
        onConfirm: onClose,
      }}
    >
      <Grid gridTemplateColumns={{ base: '1fr 1fr', _mobile: '1fr' }} gap="6" alignItems="start">
        <Image
          src={getCartImage(
            draft,
            product.colorThumbnails?.find((option) => option.label === draft.color)?.image ??
              product.primaryImage,
          )}
          alt={product.name}
          width={600}
          height={600}
          sizes="(max-width: 1024px) calc(100vw - 32px), 500px"
          className={css({
            w: '100%',
            maxW: 'none',
            aspectRatio: '1',
            objectFit: 'contain',
            bg: 'black.10',
            _mobile: { w: 'calc(100% + 32px)', mx: '-4', mt: '-6' },
          })}
        />
        <ContentSection
          gap="6"
          title={<>{product.name}</>}
          headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading5' } }}
        >
          <Stack gap="10">
            <ProductWidthSelector
              appearance="cart"
              value={draft.width}
              options={widths?.map((option) => option.label) ?? ['Regular', 'Wide', 'X-Wide']}
              onValueChange={(width) => setDraft({ ...draft, width })}
            />

            <ProductColorSelector
              appearance="cart"
              value={draft.color}
              options={product.colors.map((value) => ({
                id: value,
                label: value,
                image:
                  product.colorThumbnails?.find((option) => option.label === value)?.image ??
                  product.primaryImage,
              }))}
              onValueChange={(color) => setDraft({ ...draft, color })}
            />
            <ProductSizeSelector
              appearance="cart"
              value={draft.size}
              options={sizes.map((value) => ({
                value,
                state: soldOut.includes(value) ? 'soldOut' : 'available',
              }))}
              onValueChange={(size) => setDraft({ ...draft, size })}
            />
            <Box display={{ base: 'none', _mobile: 'block' }}>
              <Stack gap="3" alignItems="flex-start">
                <Typography variant="body4" weight="semibold">
                  수량
                </Typography>
                <NumberStepper
                  min={1}
                  value={draft.quantity}
                  onChange={(quantity) => setDraft({ ...draft, quantity })}
                />
              </Stack>
            </Box>
          </Stack>
        </ContentSection>
      </Grid>
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
  editingRow: { item: CartItem; product: Product } | null;
  limited: boolean;
  onEditClose: () => void;
  onLimitedChange: (open: boolean) => void;
};

/** 장바구니 옵션 편집과 수량 제한 안내를 표시합니다. (Displays cart option editing and purchase limit dialogs.) */
export function CartDialogs({
  editingRow,
  limited,
  onEditClose,
  onLimitedChange,
}: CartDialogsProps) {
  return (
    <>
      {editingRow ? (
        <CartOptionsDialog
          item={editingRow.item}
          product={editingRow.product}
          onClose={onEditClose}
        />
      ) : null}
      <CartLimitDialog open={limited} onOpenChange={onLimitedChange} />
    </>
  );
}
