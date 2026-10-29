import Image from 'next/image';

import { css } from 'styled-system/css';

import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import {
  ProductOptionList,
  type ProductOptionThumbnail,
} from '@/components/common/molecules/ProductOptionList';

import { ProductOptionSection } from './ProductOptionSection';

const styles = {
  colors: css({
    '&[role="radiogroup"]': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 80px)',
      gap: '8px',
      _mobile: { display: 'flex' },
    },
    pb: '8px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--color-black-40) transparent',
    '&::-webkit-scrollbar': { h: '4px' },
    '&::-webkit-scrollbar-thumb': { bg: 'var(--color-black-40)' },
    _mobile: {
      overflowX: 'auto',
      w: 'calc(100% + 16px)',
      mr: '-16px',
    },
    '& [role="radio"]': {
      position: 'relative',
      flex: '0 0 80px',
      w: '80px',
      h: '53px',
      overflow: 'hidden',
      bg: 'var(--color-black-10)',
      cursor: 'pointer',
      _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-2px' },
      _after: {
        content: '""',
        position: 'absolute',
        bottom: '0',
        insetInline: '0',
        h: '4px',
        borderRadius: '50px',
        bg: 'transparent',
      },
    },
    '& [role="radio"][data-checked]::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      h: '4px',
      bg: 'var(--color-black-100)',
      borderRadius: '999px',
      pointerEvents: 'none',
    },
  }),
};

export type ProductColorSelectorProps = {
  options: readonly ProductOptionThumbnail[];
  value: string;
  onValueChange: (color: string) => void;
  appearance?: 'detail' | 'cart';
};

/** 상품 상세와 장바구니의 컬러 이름과 선택 이미지를 표시합니다. (Displays color names and selection images for product details and cart options.) */
export function ProductColorSelector({
  options,
  value,
  onValueChange,
  appearance = 'detail',
}: ProductColorSelectorProps) {
  return (
    <ProductOptionSection
      appearance={appearance}
      title={
        appearance === 'cart' ? (
          <>컬러: {value}</>
        ) : (
          <>
            컬러: <Typography variant="body4">{value}</Typography>
          </>
        )
      }
    >
      {appearance === 'cart' ? (
        <ProductOptionList
          ariaLabel="컬러"
          layout="cart"
          selectedId={value}
          options={options}
          onSelect={onValueChange}
        />
      ) : (
        <Radio
          ariaLabel="컬러 선택"
          className={styles.colors}
          onValueChange={onValueChange}
          options={options.map((option) => ({
            value: option.id,
            label: (
              <Image
                className={css({ w: '100%', h: '100%', objectFit: 'contain' })}
                alt={option.label}
                src={option.image}
                width={80}
                height={53}
                sizes="80px"
              />
            ),
          }))}
          value={value}
          variant="custom"
        />
      )}
    </ProductOptionSection>
  );
}
