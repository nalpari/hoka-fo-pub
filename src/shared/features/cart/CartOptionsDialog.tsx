'use client';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { useState } from 'react';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';
import { getCartImage } from '@/mocks/cartDisplay';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ConfirmDialog } from '@/shared/components/molecules/ConfirmDialog/ConfirmDialog';
import { SizeSelector } from '@/shared/components/molecules/SizeSelector/SizeSelector';
import type { CartItem } from '@/shared/types/cart';

export function CartOptionsDialog({
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
    <ConfirmDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="옵션 변경하기"
      closeLabel="옵션 변경 닫기"
      size="sm"
      mobilePresentation="fullscreen"
      confirmLabel="변경"
      confirmDisabled={!valid}
      onConfirm={() => onSave(draft)}
    >
      <Stack gap="8">
        <img
          src={getCartImage(
            draft,
            product.colorThumbnails?.find((option) => option.label === draft.color)?.image ??
              product.primaryImage,
          )}
          alt={product.name}
          className={css({
            w: 'calc(100% + 32px)',
            maxW: 'none',
            mx: '-4',
            aspectRatio: '1',
            objectFit: 'contain',
            bg: 'black.10',
          })}
        />
        <ContentSection
          gap="8"
          title={<>{product.name}</>}
          headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading5' } }}
        >
          <Radio
            ariaLabel="발볼"
            variant="custom"
            value={draft.width}
            onValueChange={(value) => setDraft({ ...draft, width: value })}
            options={(widths?.map((option) => option.label) ?? ['Regular', 'Wide', 'X-Wide']).map(
              (value) => ({ value, label: value }),
            )}
            className={css({
              display: 'flex!',
              gap: '0',
              bg: 'black.20',
              borderRadius: 'full',
              p: '0.5',
            })}
            optionClassName={css({
              flex: '1',
              textAlign: 'center',
              cursor: 'pointer',
              _focusVisible: { outline: '2px solid var(--colors-black-100)', outlineOffset: '2px' },
              borderRadius: 'full',
              py: '3',
              justifyContent: 'center',
            })}
            selectedOptionClassName={css({ bg: 'black.100', color: 'white' })}
          />
          <Stack gap="3">
            <Typography variant="body4" weight="semibold">
              컬러: {draft.color}
            </Typography>
            <HStack gap="2" overflowX="auto">
              {product.colors.map((value) => (
                <Box
                  as="button"
                  key={value}
                  aria-label={value}
                  aria-pressed={draft.color === value}
                  border="0"
                  bg="transparent"
                  cursor="pointer"
                  flexShrink="0"
                  w="72px"
                  borderBottom={draft.color === value ? '2px solid black' : '2px solid transparent'}
                  onClick={() => setDraft({ ...draft, color: value })}
                >
                  <img
                    src={
                      product.colorThumbnails?.find((option) => option.label === value)?.image ??
                      product.primaryImage
                    }
                    alt={value}
                    className={css({
                      w: '100%',
                      aspectRatio: '1',
                      objectFit: 'contain',
                      bg: 'black.10',
                    })}
                  />
                </Box>
              ))}
            </HStack>
          </Stack>
          <Stack gap="3">
            <Typography variant="body4" weight="semibold">
              사이즈
            </Typography>
            <SizeSelector
              mode="single"
              ariaLabel="사이즈"
              columns={4}
              value={draft.size}
              onValueChange={(value) => setDraft({ ...draft, size: value })}
              options={sizes.map((value) => ({
                value,
                state: soldOut.includes(value) ? 'soldOut' : 'available',
              }))}
            />
          </Stack>
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
        </ContentSection>
      </Stack>
    </ConfirmDialog>
  );
}
