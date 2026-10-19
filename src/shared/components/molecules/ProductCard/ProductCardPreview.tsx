'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid, HStack, Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { RatingStars } from '@/shared/components/atoms/RatingStars/RatingStars';
import { ProductDetails } from '@/shared/components/molecules/ProductDetails/ProductDetails';
import { ProductOptionList } from '@/shared/components/molecules/ProductOptionList/ProductOptionList';

const styles = {
  link: css({
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    _focusVisible: { outline: '2px solid var(--color-text-primary)', outlineOffset: '2px' },
  }),
  image: css({ display: 'block', w: '100%', aspectRatio: '1', objectFit: 'contain' }),
  promotion: css({ minH: '20px' }),
};

export function ProductCardPreview({ product }: { product: Product }) {
  const colorOptions = product.colorThumbnails ?? [];
  const [selectedColorId, setSelectedColorId] = useState<string>();
  const selectedColor = colorOptions.find((option) => option.id === selectedColorId);
  const widths = new Set(
    product.colorOptions?.flatMap((option) => option.widths.map((width) => width.label)) ?? [
      product.width,
    ],
  );
  const activity =
    product.use === 'Everyday Run'
      ? '데일리 러닝'
      : product.use === 'Trail Running'
        ? '트레일 러닝'
        : '워킹';

  return (
    <Stack
      as="section"
      aria-label={`${product.name} 상품 요약`}
      position="absolute"
      top="-16px"
      left="-16px"
      right="-16px"
      zIndex="3"
      p="4"
      bg="var(--color-surface-subtle)"
      border="1px solid var(--color-border-tertiary)"
      gap="4"
    >
      <Link
        className={styles.link}
        href={`/products/${product.id}`}
        aria-label={`${product.name} 상세 보기`}
      >
        <img
          className={styles.image}
          src={selectedColor?.image ?? product.hoverImage}
          alt={selectedColor ? `${product.name} - ${selectedColor.label}` : product.name}
        />
      </Link>
      {colorOptions.length > 0 && (
        <ProductOptionList
          ariaLabel="상품 색상 옵션"
          layout="preview"
          options={colorOptions}
          selectedId={selectedColorId}
          onSelect={setSelectedColorId}
        />
      )}
      <div className={styles.promotion}>
        {product.promotion && (
          <Typography variant="body4" tone="red80">
            {product.promotion}
          </Typography>
        )}
      </div>
      <HStack alignItems="center" gap="2">
        <RatingStars value={product.rating} aria-label={`평점 ${product.rating}점`} />
        <Typography variant="body5" tone="subtle">
          ({product.reviewCount})
        </Typography>
      </HStack>
      <Link className={styles.link} href={`/products/${product.id}`}>
        <ProductDetails
          activities={[activity]}
          colorCount={colorOptions.length || product.colors.length}
          gender={product.gender}
          name={product.name}
          optionThumbnails={[]}
          platform="web"
          price={product.price}
          originalPrice={product.originalPrice}
          showVariantSummary
          variant="listing"
          widthCount={widths.size}
        />
      </Link>
      <Stack as="dl" gap="0">
        {[
          ['안정성', product.stability],
          ['쿠셔닝', product.cushioning],
          ['발볼', product.width],
        ].map(([label, value]) => (
          <Grid
            py="2"
            borderBottom="1px solid var(--color-border-tertiary)"
            gap="2"
            gridTemplateColumns="1fr 1fr"
            key={label}
          >
            <Typography as="dt" variant="body4" weight="medium">
              {label}
            </Typography>
            <Typography as="dd" variant="body4" tone="subtle">
              {value}
            </Typography>
          </Grid>
        ))}
      </Stack>
    </Stack>
  );
}
