'use client';

import Image from 'next/image';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
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
      mobileFixedFooter
      headerProps={{
        css: css.raw({
          bg: 'white',
          flexShrink: '0',
          borderBottom: '1px solid var(--colors-black-20)',
        }),
      }}
      footerProps={{
        desktopContentOffset: 300 + 32,
        css: css.raw({
          pt: '6',
          _mobile: {
            borderTop: '1px solid var(--colors-black-20)',
            pt: '4',
            pb: 'max(32px, env(safe-area-inset-bottom))',
          },
        }),
      }}
      actions={{
        kind: 'confirm',
        onConfirm: onClose,
        onCancel: onClose,
        buttonProps: {
          size: 'tall',
          className: css({ maxW: { base: '180px', _mobile: 'none' } }),
        },
      }}
    >
      <Grid
        gridTemplateColumns={{ base: '300px minmax(0, 1fr)', _mobile: 'minmax(0, 1fr)' }}
        gap={{ base: '8', _mobile: '6' }}
        alignItems="start"
      >
        <Image
          src={getCartImage(
            draft,
            product.colorThumbnails?.find((option) => option.label === draft.color)?.image ??
              product.primaryImage,
          )}
          alt={product.name}
          width={600}
          height={600}
          sizes="(max-width: 1024px) 100vw, 300px"
          className={css({
            w: '100%',
            maxW: 'none',
            h: { base: '300px', _mobile: '100vw' },
            aspectRatio: '1',
            objectFit: 'contain',
            bg: 'black.10',
            _mobile: { w: 'calc(100% + 32px)', mx: '-4', mt: '-6' },
          })}
        />
        <ContentSection
          gap="10"
          _mobile={{ gap: '6' }}
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

type CartDialogsProps = {
  editingRow: { item: CartItem; product: Product } | null;
  onEditClose: () => void;
};

/** 구매 수량 제한 안내를 표시합니다. (Displays the purchase quantity limit notice.) */
export function CartLimitDialog({ onClose }: { onClose: () => void }) {
  return (
    <ModalDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="장바구니"
      closeLabel="구매 수량 제한 안내 닫기"
      size="sm"
      headerProps={{
        css: css.raw({ bg: 'white', borderBottom: '1px solid var(--colors-black-20)' }),
      }}
    >
      <Stack gap="4" pb="2">
        <Typography variant="body2" weight="medium">
          변경할 수 없습니다
        </Typography>
        <Typography variant="body4">구매 수량이 제한된 상품입니다.</Typography>
        <HStack justifyContent="center" mt="2" w="100%">
          <Button
            variant="primary"
            size="tall"
            fullWidth
            className={css({ w: { base: '160px', _mobile: '100%' } })}
            onClick={onClose}
          >
            <Typography variant="cta2">확인</Typography>
          </Button>
        </HStack>
      </Stack>
    </ModalDialog>
  );
}

/** 장바구니 옵션 편집 화면을 표시합니다. (Displays the cart option editing dialog.) */
export function CartDialogs({ editingRow, onEditClose }: CartDialogsProps) {
  return editingRow ? (
    <CartOptionsDialog item={editingRow.item} product={editingRow.product} onClose={onEditClose} />
  ) : null;
}
