import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import type { ProductOptionThumbnail } from '@/components/common/molecules/ProductOptionList/ProductOptionList';
import { ProductWidthSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductWidthSelector';
import { ProductColorSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductColorSelector';
import { ProductSizeSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductSizeSelector';
import { CartOptionQuantity } from './CartOptionQuantity';
import type { CartItem } from '@/types/cart';

type Props = {
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
export function CartOptionsContent({
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
}: Props) {
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
