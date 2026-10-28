'use client';

import Link from 'next/link';

import { useState } from 'react';
import { type Platform, usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Box, Grid, HStack, Stack, VStack } from 'styled-system/jsx';

import { Badge, type Promotions } from '@/components/common/atoms/Badge';
import { Card } from '@/components/common/atoms/Card';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { type ProductCardVariant } from '@/components/common/molecules/ProductCard/productCardTypography';
import {
  ProductOptionList,
  type ProductOptionThumbnail,
} from '@/components/common/molecules/ProductOptionList';
import {
  ProductThumbnail,
  type ProductThumbnailVariant,
} from '@/components/common/molecules/ProductThumbnail';

import { type Product } from '@/mocks/products';

type ProductGenderOption = "Men's" | "Women's" | 'All Gender';

const genderLabel = cva({
  base: {
    color: 'var(--color-text-primary)',
    '&&': { fontSize: 'var(--layout-web-product-font-size, 16px)' },
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          fontWeight: 'bold',
          '&&': { fontSize: '14' /* 기존 13px */ },
          lineHeight: 'body',
        },
      },
      showcase: {
        _mobile: {
          '&&': { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
        },
      },
    },
  },
  defaultVariants: { variant: 'listing' },
});

type ProductGenderProps = {
  gender: ProductGenderOption;
  variant?: ProductCardVariant;
};

/** 상품 성별 정보를 표시합니다. (Displays a product's gender label.) */
function ProductGender({ gender, variant = 'listing' }: ProductGenderProps) {
  return (
    <Typography className={genderLabel({ variant })} variant="body3">
      {gender}
    </Typography>
  );
}

const productName = css({
  minW: '0',
  maxW: '100%',
  truncate: true,
  '&[data-product-card-variant="listing"]': { _mobile: { fontWeight: 'bold' } },
});

type ProductNameProps = {
  name: string;
  variant?: ProductCardVariant;
};

/** Product name styled for its card presentation context. */
function ProductName({ name, variant = 'listing' }: ProductNameProps) {
  return (
    <Typography as="p" className={productName} data-product-card-variant={variant} variant="body">
      {name}
    </Typography>
  );
}

const won = (value: number) => value.toLocaleString('ko-KR');

type ProductPriceProps = {
  /** Current selling price, including any discount. */
  price: number;
  /** Original price; discount details appear only when this exceeds price. */
  originalPrice?: number;
  variant?: ProductCardVariant;
};

/** 판매가와 선택적 정상가·할인율을 표시합니다. (Displays the selling price with an optional original price and discount rate.) */
function ProductPrice({ price, originalPrice, variant = 'listing' }: ProductPriceProps) {
  const hasDiscount = originalPrice !== undefined && price >= 0 && originalPrice > price;
  const discountRate = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <VStack data-product-card-variant={variant} gap="1" alignItems="flex-start">
      {hasDiscount ? (
        <Typography
          as="del"
          variant="body3"
          mo="body4"
          tone="tertiary"
          aria-label={`정상가 ${won(originalPrice)}원`}
          className={css({ textDecoration: 'line-through' })}
        >
          {won(originalPrice)}원
        </Typography>
      ) : null}
      <HStack gap="2" alignItems="baseline">
        {hasDiscount ? (
          <Typography variant="body3" mo="body4" tone="error" aria-label={`${discountRate}% 할인`}>
            {discountRate}%
          </Typography>
        ) : null}
        <Typography variant="body3" mo="body4">
          {won(price)}
          <Typography variant="body3" weight="bold">
            원
          </Typography>
        </Typography>
      </HStack>
    </VStack>
  );
}

type Props = Pick<
  ProductDetailsProps,
  'promotion' | 'gender' | 'name' | 'price' | 'originalPrice' | 'variant'
>;

function ProductDetailsIdentity({ promotion, gender, name, price, originalPrice, variant }: Props) {
  return (
    <VStack
      gap="1"
      _mobile={variant === 'listing' ? { gap: '0' } : undefined}
      alignItems="flex-start"
      minW="0"
      w="100%"
    >
      {promotion && <Badge promotion={promotion} />}
      {gender && <ProductGender gender={gender} variant={variant} />}
      <ProductName name={name} variant={variant} />
      <ProductPrice price={price} originalPrice={originalPrice} variant={variant} />
    </VStack>
  );
}

type ProductActivityProps = {
  activities: readonly string[];
};

/** 상품의 활동 목적을 쉼표로 구분해 표시합니다. (Displays a product's activity labels as a comma-separated list.) */
function ProductActivity({ activities }: ProductActivityProps) {
  return <Typography variant="body5">{activities.join(', ')}</Typography>;
}

type ProductVariantSummaryDisplay = 'colors' | 'widths' | 'colors-widths';

type ProductVariantSummaryProps = {
  colorCount: number;
  display?: ProductVariantSummaryDisplay;
  options: readonly ProductOptionThumbnail[];
  platform: Platform;
  widthCount: number;
};

/** Product color and width option summary: text on web, swatches on mobile. */
function ProductVariantSummary({
  colorCount,
  display = 'colors-widths',
  options,
  platform,
  widthCount,
}: ProductVariantSummaryProps) {
  const summaryText = {
    colors: `${colorCount} colors`,
    widths: `${widthCount} widths`,
    'colors-widths': `${colorCount} colors, ${widthCount} widths`,
  }[display];

  if (platform === 'web') {
    return (
      <Typography variant="body4" tone="subtle">
        {summaryText}
      </Typography>
    );
  }

  return <ProductOptionList layout="scroll" options={options} />;
}

type ProductDetailsOptionsProps = Pick<
  ProductDetailsProps,
  'activities' | 'colorCount' | 'optionThumbnails' | 'platform' | 'widthCount' | 'variant'
>;

function ProductDetailsOptions({
  activities,
  colorCount,
  optionThumbnails,
  platform,
  widthCount,
  variant,
}: ProductDetailsOptionsProps) {
  return (
    <VStack
      gap="0"
      _mobile={variant === 'listing' ? { gap: '1.5' } : undefined}
      alignItems="flex-start"
      minW="0"
      w="100%"
    >
      {activities && activities.length > 0 && <ProductActivity activities={activities} />}
      <ProductVariantSummary
        colorCount={colorCount}
        options={optionThumbnails}
        platform={platform}
        widthCount={widthCount}
      />
    </VStack>
  );
}

const ProductDetailsRoot = cva({
  base: {
    color: 'var(--color-text-primary)',
    '--type-body-font-size': 'var(--layout-web-product-font-size, 16px)',
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          px: '10px',
        },
      },
      showcase: {},
    },
  },
});

type ProductDetailsProps = {
  activities?: readonly string[];
  colorCount: number;
  gender?: ProductGenderOption;
  name: string;
  optionThumbnails: readonly ProductOptionThumbnail[];
  platform: Platform;
  price: number;
  originalPrice?: number;
  promotion?: Promotions;
  showVariantSummary?: boolean;
  variant: ProductCardVariant;
  widthCount: number;
};

/** 상품 카드의 이름·성별·가격 요약을 구성합니다. (Composes product name, gender, and price details for a product card.) */
function ProductDetails({
  activities,
  colorCount,
  gender,
  name,
  optionThumbnails,
  platform,
  price,
  originalPrice,
  promotion,
  showVariantSummary = false,
  variant,
  widthCount,
}: ProductDetailsProps) {
  return (
    <Card.Content className={ProductDetailsRoot({ variant })}>
      <VStack
        gap="4"
        _mobile={variant === 'listing' ? { gap: '2' } : undefined}
        alignItems="flex-start"
        minW="0"
        w="100%"
      >
        <ProductDetailsIdentity
          promotion={promotion}
          gender={gender}
          name={name}
          price={price}
          originalPrice={originalPrice}
          variant={variant}
        />

        {showVariantSummary && (
          <ProductDetailsOptions
            variant={variant}
            activities={activities}
            colorCount={colorCount}
            optionThumbnails={optionThumbnails}
            platform={platform}
            widthCount={widthCount}
          />
        )}
      </VStack>
    </Card.Content>
  );
}

const styles = {
  link: css({
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    _focusVisible: { outline: '2px solid var(--color-text-primary)', outlineOffset: '2px' },
  }),
  image: css({ display: 'block', w: '100%', aspectRatio: '1', objectFit: 'contain' }),
};

/** 상품 카드의 이미지 전환 영역을 표시합니다 (Displays the product card preview composition). */
function ProductCardPreview({ product }: { product: Product }) {
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
      <Box minH="20px">{product.promotion && <Badge promotion={product.promotion} />}</Box>
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

type ProductSpecProps = {
  cushioning: string;
  stability: string;
  width: string;
};

/** 상품의 쿠셔닝·안정성·발볼 정보를 요약합니다. (Summarizes a product's cushioning, stability, and width.) */
function ProductSpec({ cushioning, stability, width }: ProductSpecProps) {
  return (
    <Typography tone="subtle" variant="body5">
      {cushioning} · {stability} · {width}
    </Typography>
  );
}

const ProductCardFooterRoot = css({ display: 'flex', flexDirection: 'column', gap: '2' });

type ProductCardFooterProps = {
  product: Product;
  showSpecifications: boolean;
};

function ProductCardFooter({ product, showSpecifications }: ProductCardFooterProps) {
  if (!showSpecifications) return null;

  return (
    <Card.Footer className={ProductCardFooterRoot}>
      {showSpecifications && (
        <ProductSpec
          cushioning={product.cushioning}
          stability={product.stability}
          width={product.width}
        />
      )}
    </Card.Footer>
  );
}

const ProductCardHeaderRoot = css({
  '& > a': { display: 'block' },
});

type ProductCardHeaderProps = {
  product: Product;
  variant: ProductThumbnailVariant;
};

function ProductCardHeader({ product, variant }: ProductCardHeaderProps) {
  return (
    <Card.Header className={ProductCardHeaderRoot}>
      <Link href={`/products/${product.id}`}>
        <ProductThumbnail
          alt={product.name}
          hover
          hoverImage={product.hoverImage}
          lazy
          src={product.primaryImage}
          variant={variant}
        />
      </Link>
    </Card.Header>
  );
}

const root = cva({
  base: {
    minW: '0',
    position: 'relative',
    gap: '4',
    _hover: {
      '& [data-product-thumbnail-hover-image]': { opacity: '1' },
    },
    _focusWithin: {
      '& [data-product-thumbnail-hover-image]': { opacity: '1' },
    },
    '&[data-preview-open]': { zIndex: '5' },
    _mobile: { gap: '2.5' },
  },
  variants: {
    variant: {
      listing: {},
      showcase: {
        w: '100%',
        flex: '0 0 auto',
        _mobile: {
          w: '160px',
        },
      },
    },
  },
  defaultVariants: { variant: 'listing' },
});

const action = css({
  position: 'absolute',
  right: '4',
  top: '4',
  zIndex: '4',
  _mobile: {
    right: '2.5',
    top: '2.5',
  },
});

const productWidthCount = (product: Product) => {
  const widths = product.colorOptions?.flatMap((colorOption) =>
    colorOption.widths.map((width) => width.label),
  );

  return new Set(widths?.length ? widths : [product.width]).size;
};

const productOptionThumbnails = (product: Product): ProductOptionThumbnail[] =>
  product.colorThumbnails?.length
    ? product.colorThumbnails
    : product.colors.map((color) => ({ id: color, image: product.primaryImage, label: color }));

const activityLabel = (use: Product['use']) => {
  if (use === 'Everyday Run') return '데일리 러닝';
  if (use === 'Trail Running') return '트레일 러닝';
  return '워킹';
};

export type ProductCardOption = 'promotion' | 'like' | 'colors' | 'specifications';

export type ProductCardProps = {
  liked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  options?: readonly ProductCardOption[];
  product: Product;
  variant?: ProductCardVariant;
};

/** 상품 이미지와 요약 정보를 카드로 표시합니다 (Displays the product card composition). */
export function ProductCard({
  liked,
  onLikedChange,
  options = [],
  product,
  variant = 'listing',
}: ProductCardProps) {
  const [internalLiked, setInternalLiked] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const platform = usePlatform();
  const isLiked = liked ?? internalLiked;
  const showPreview = platform === 'web' && variant === 'listing' && previewOpen;
  const hasOption = (option: ProductCardOption) => options.includes(option);

  return (
    <Card
      className={root({ variant })}
      data-preview-open={showPreview ? '' : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setPreviewOpen(true);
      }}
      onPointerLeave={() => setPreviewOpen(false)}
      onFocusCapture={(event) => {
        if (event.target.matches(':focus-visible')) setPreviewOpen(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPreviewOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setPreviewOpen(false);
          event.stopPropagation();
        }
      }}
    >
      <ProductCardHeader product={product} variant={variant} />

      {hasOption('like') && (
        <Card.Action className={action}>
          <Wishlist
            active={isLiked}
            ariaLabel={`${product.name} 관심상품`}
            onActiveChange={(active) => {
              if (liked === undefined) setInternalLiked(active);
              onLikedChange?.(active);
            }}
          />
        </Card.Action>
      )}

      <ProductDetails
        activities={[activityLabel(product.use)]}
        colorCount={product.colors.length}
        gender={product.gender}
        name={product.name}
        optionThumbnails={productOptionThumbnails(product)}
        platform={platform}
        price={product.price}
        originalPrice={product.originalPrice}
        promotion={hasOption('promotion') ? product.promotion : undefined}
        showVariantSummary={hasOption('colors')}
        variant={variant}
        widthCount={productWidthCount(product)}
      />

      {showPreview && <ProductCardPreview product={product} />}

      <ProductCardFooter product={product} showSpecifications={hasOption('specifications')} />
    </Card>
  );
}

export { ProductGender, ProductPrice, ProductCardPreview };
