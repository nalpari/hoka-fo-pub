import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SizeSelector } from '@/shared/components/molecules/SizeSelector/SizeSelector';
import {
  ProductOptionList,
  type ProductOptionThumbnail,
} from '@/shared/components/molecules/ProductOptionList/ProductOptionList';
import type { CartItem } from '@/shared/types/cart';

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
    <Stack gap="8">
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
        gap="8"
        title={<>{name}</>}
        headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading5' } }}
      >
        <Radio
          ariaLabel="발볼"
          variant="custom"
          value={draft.width}
          onValueChange={onWidthChange}
          options={widths.map((value) => ({ value, label: value }))}
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
          <ProductOptionList
            ariaLabel="컬러"
            layout="cart"
            selectedId={draft.color}
            options={colorOptions}
            onSelect={onColorChange}
          />
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
            onValueChange={onSizeChange}
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
          <NumberStepper min={1} value={draft.quantity} onChange={onQuantityChange} />
        </Stack>
      </ContentSection>
    </Stack>
  );
}
