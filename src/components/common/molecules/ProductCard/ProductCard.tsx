'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 상품 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import Link from 'next/link';

import { useState } from 'react';
import { type Platform, usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Box, Grid, HStack, VStack } from 'styled-system/jsx';
import { token } from 'styled-system/tokens';

import { Badge, type Promotions } from '@/components/common/atoms/Badge';
import { Card } from '@/components/common/atoms/Card';
import { Divider } from '@/components/common/atoms/Divider';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
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

type ProductGenderOption = string;

export type ProductCardProduct = Pick<Product, 'id' | 'name' | 'price' | 'primaryImage'> &
  Partial<
    Pick<
      Product,
      | 'hoverImage'
      | 'originalPrice'
      | 'discountLabel'
      | 'colors'
      | 'colorOptions'
      | 'colorThumbnails'
      | 'promotion'
      | 'use'
      | 'width'
      | 'cushioning'
      | 'stability'
    >
  > & { gender?: string };

const genderLabel = cva({
  base: {
    color: 'text.primary',
    '&&': { fontSize: 'var(--layout-web-product-font-size, var(--font-sizes-16))' },
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          fontWeight: 'normal',
          '&&': { fontSize: '14' },
          lineHeight: 'body',
        },
      },
      history: { '&&': { fontSize: '14' } },
      showcase: {
        _mobile: {
          '&&': { fontSize: '14' },
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
  maxW: 'full',
  truncate: true,
  fontSize: { base: 'var(--layout-web-product-font-size, var(--font-sizes-16))', _mobile: '14' },
  '&[data-product-card-variant="history"]': { fontSize: '14', fontWeight: 'normal' },
  '&[data-product-card-variant="listing"]': { _mobile: { fontWeight: 'normal' } },
});

type ProductNameProps = {
  name: string;
  variant?: ProductCardVariant;
};
/** Product name styled for its card presentation context. */
function ProductName({ name, variant = 'listing' }: ProductNameProps) {
  const platform = usePlatform();
  return (
    <Typography
      as="p"
      className={productName}
      data-product-card-variant={variant}
      language={variant === 'history' && platform === 'web' ? 'ko' : 'auto'}
      variant={variant === 'history' ? 'body4' : 'bodyKr3'}
      mo={variant === 'history' ? 'body4' : 'bodyKr4'}
    >
      {name}
    </Typography>
  );
}

const won = (value: number) => value.toLocaleString('ko-KR');

type ProductPriceProps = {
  /** Prepared display label; preview fixtures can preserve an approved design value. */
  discountLabel?: string;
  /** Current selling price, including any discount. */
  price: number;
  /** Original price; discount details appear only when this exceeds price. */
  originalPrice?: number;
  variant?: ProductCardVariant | 'detail';
};
/** 판매가와 선택적 정상가·할인율을 표시합니다. (Displays the selling price with an optional original price and discount rate.) */
function ProductPrice({
  price,
  originalPrice,
  discountLabel,
  variant = 'listing',
}: ProductPriceProps) {
  const hasDiscount = originalPrice !== undefined && Boolean(discountLabel);
  const detailPrice = variant === 'detail';
  const detailPriceText = detailPrice
    ? css({ fontSize: '18px', lineHeight: '20.8px', _mobile: { fontSize: '16px' } })
    : undefined;

  return (
    <VStack
      data-product-price
      data-product-card-variant={variant}
      gap={detailPrice ? '14px' : '1'}
      alignItems="flex-start"
    >
      {hasDiscount ? (
        <Typography
          as="del"
          variant="body3"
          mo="body4"
          tone="tertiary"
          language="en"
          aria-label={`정상가 ${won(originalPrice ?? 0)}원`}
          className={[css({ textDecoration: 'line-through' }), detailPriceText]
            .filter(Boolean)
            .join(' ')}
        >
          {won(originalPrice ?? 0)}
          <Typography variant="body3" mo="body4">
            원
          </Typography>
        </Typography>
      ) : null}
      <HStack gap="2" alignItems="baseline">
        {hasDiscount ? (
          <Typography
            variant="body3"
            mo="body4"
            className={detailPriceText}
            tone={variant === 'listing' || detailPrice ? 'red80' : 'error'}
            aria-label={`${discountLabel} 할인`}
          >
            {discountLabel}
          </Typography>
        ) : null}
        <Typography
          language="en"
          variant={variant === 'history' ? 'body4' : 'body3'}
          mo="body4"
          weight={detailPrice ? 'medium' : undefined}
          className={detailPriceText}
        >
          {won(price)}
          <Typography variant={variant === 'history' ? 'body4' : 'body3'} weight="bold">
            원
          </Typography>
        </Typography>
      </HStack>
    </VStack>
  );
}

export type ProductIdentityProps = Omit<
  Pick<
    ProductDetailsProps,
    | 'promotion'
    | 'promotionTone'
    | 'gender'
    | 'name'
    | 'price'
    | 'originalPrice'
    | 'discountLabel'
    | 'variant'
  >,
  'variant'
> & {
  variant: ProductCardVariant | 'detail';
  activities?: readonly string[];
  orderDate?: string;
  optionText?: string;
  applicationDate?: string;
};

/** 상품 타일과 상세 화면의 배지·식별 정보·가격을 표시합니다. (Displays shared identity and price information for product tiles and detail pages.) */
export function ProductIdentity({
  promotion,
  promotionTone,
  gender,
  name,
  price,
  originalPrice,
  discountLabel,
  variant,
  activities,
  orderDate,
  optionText,
  applicationDate,
}: ProductIdentityProps) {
  const platform = usePlatform();
  if (variant === 'detail') {
    return (
      <VStack alignItems="start" gap="5" _mobile={{ gap: '4' }} minW="0" w="full">
        <VStack alignItems="start" gap="2">
          {promotion && (
            <Badge
              weight="medium"
              promotion={promotion}
              promotionTone={promotionTone === 'error' ? 'red80' : 'brand'}
            />
          )}
          <HStack gap="2" color="black.60" flexWrap="wrap">
            {gender && (
              <Typography variant="body4" weight="regular" tone="inherit">
                {gender}
              </Typography>
            )}
            {activities?.length ? (
              <>
                {gender && (
                  <Divider orientation="vertical" length="3" className={css({ bg: 'black.60' })} />
                )}
                <Typography variant="body4" weight="regular" tone="inherit">
                  {activities.join(', ')}
                </Typography>
              </>
            ) : null}
          </HStack>
        </VStack>
        <ContentHeader
          alignItems="start"
          gap="5"
          titleAs="h1"
          title={name}
          titleProps={{
            className: css({ m: '0' }),
            variant: 'headingKr6',
            mo: 'heading4',
            language: platform === 'web' ? 'ko' : 'en',
            weight: 'black',
          }}
        />
        <ProductPrice
          variant="detail"
          price={price}
          originalPrice={originalPrice}
          discountLabel={discountLabel}
        />
      </VStack>
    );
  }
  const identity = (
    <>
      {gender && <ProductGender gender={gender} variant={variant} />}
      <ProductName name={name} variant={variant} />
    </>
  );
  const priceContent = (
    <ProductPrice
      price={price}
      originalPrice={originalPrice}
      discountLabel={discountLabel}
      variant={variant}
    />
  );
  return (
    <VStack
      gap={variant === 'listing' ? '3' : variant === 'history' ? '1.5' : '1'}
      _mobile={variant === 'listing' ? { gap: '1.5' } : undefined}
      alignItems="flex-start"
      minW="0"
      w="full"
    >
      {promotion && (
        <Badge
          data-product-promotion
          promotion={promotion}
          promotionTone={promotionTone === 'error' || variant === 'listing' ? 'red80' : 'brand'}
        />
      )}
      {orderDate && (
        <HStack gap="0.5">
          <Typography variant="body4" language="en">
            {orderDate}
          </Typography>
          <Typography variant="body4">구매</Typography>
        </HStack>
      )}
      <VStack
        gap={variant === 'listing' ? '3' : variant === 'showcase' ? '4' : '1'}
        _mobile={variant !== 'history' ? { gap: '1' } : undefined}
        alignItems="flex-start"
        minW="0"
        w="full"
      >
        <VStack
          gap={variant === 'listing' ? '3' : variant === 'showcase' ? '2.5' : '0.5'}
          _mobile={variant !== 'history' ? { gap: '0.5' } : undefined}
          alignItems="flex-start"
          minW="0"
          w="full"
        >
          {identity}
        </VStack>
        {optionText && (
          <Typography variant="body4" tone="subtle">
            {optionText}
          </Typography>
        )}
        {priceContent}
        {applicationDate && (
          <HStack gap="1" color="black.50">
            <Typography variant="body4" tone="inherit">
              신청일 :
            </Typography>
            <Typography variant="body4" language="en" tone="inherit">
              {applicationDate}
            </Typography>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}

type ProductActivityProps = {
  activities: readonly string[];
  variant: ProductCardVariant;
};
/** 상품의 활동 목적을 쉼표로 구분해 표시합니다. (Displays a product's activity labels as a comma-separated list.) */
function ProductActivity({ activities, variant }: ProductActivityProps) {
  return (
    <Typography
      variant={variant === 'listing' ? 'body4' : 'body5'}
      mo="body5"
      className={
        variant === 'listing'
          ? css({
              '&&': { lineHeight: 'normal' },
              _mobile: { py: '0.5', '&&': { lineHeight: 'body' } },
            })
          : undefined
      }
    >
      {activities.join(', ')}
    </Typography>
  );
}

type ProductVariantSummaryDisplay = 'colors' | 'widths' | 'colors-widths';

type ProductVariantSummaryProps = {
  colorSelection?: Pick<
    NonNullable<ProductDetailsProps['colorPreview']>,
    'selectedId' | 'onSelect'
  >;
  colorCount: number;
  display?: ProductVariantSummaryDisplay;
  options: readonly ProductOptionThumbnail[];
  platform: Platform;
  history?: boolean;
  widthCount: number;
};
/** Product color and width option summary: text on web, swatches on mobile. */
function ProductVariantSummary({
  colorCount,
  colorSelection,
  display = 'colors-widths',
  history = false,
  options,
  platform,
  widthCount,
}: ProductVariantSummaryProps) {
  const summaryText = {
    colors: `${colorCount} colors`,
    widths: `${widthCount} widths`,
    'colors-widths': `${colorCount} colors, ${widthCount} widths`,
  }[display];
  if (platform === 'web' && !history) {
    return (
      <Typography variant="body4" tone="subtle">
        {summaryText}
      </Typography>
    );
  }
  return (
    <ProductOptionList
      layout={history ? 'preview' : 'scroll'}
      options={options}
      selectedId={colorSelection?.selectedId}
      onSelect={colorSelection?.onSelect}
    />
  );
}

type ProductDetailsOptionsProps = Pick<
  ProductDetailsProps,
  | 'activities'
  | 'colorCount'
  | 'optionThumbnails'
  | 'platform'
  | 'widthCount'
  | 'variant'
  | 'colorPreview'
>;

function ProductDetailsOptions({
  activities,
  colorCount,
  optionThumbnails,
  platform,
  widthCount,
  variant,
  colorPreview,
}: ProductDetailsOptionsProps) {
  const summary = (
    <>
      {activities && activities.length > 0 && (
        <ProductActivity activities={activities} variant={variant} />
      )}
      <ProductVariantSummary
        colorCount={colorCount}
        colorSelection={platform === 'mobile' ? colorPreview : undefined}
        history={variant === 'history'}
        options={optionThumbnails}
        platform={platform}
        widthCount={widthCount}
      />
    </>
  );

  if (platform === 'web' && colorPreview) {
    // 숨긴 캐러셀도 높이 계산에 참여해 OS별 스크롤바 높이가 호버 레이아웃을 바꾸지 않게 합니다.
    return (
      <Grid gap="0" gridTemplateColumns="minmax(0, 1fr)" alignItems="start" minW="0" w="full">
        <VStack
          gridArea="1 / 1"
          gap="3"
          alignItems="flex-start"
          visibility={colorPreview.open ? 'hidden' : 'visible'}
          aria-hidden={colorPreview.open}
        >
          {summary}
        </VStack>
        <Box
          gridArea="1 / 1"
          minW="0"
          visibility={colorPreview.open ? 'visible' : 'hidden'}
          aria-hidden={!colorPreview.open}
          inert={!colorPreview.open}
        >
          <ProductOptionList
            ariaLabel="상품 색상 옵션"
            layout="preview"
            options={optionThumbnails}
            selectedId={colorPreview.selectedId}
            onSelect={colorPreview.onSelect}
          />
        </Box>
      </Grid>
    );
  }

  return (
    <VStack
      gap={variant === 'history' ? '2' : '0'}
      _mobile={variant === 'listing' ? { gap: '1.5' } : undefined}
      alignItems="flex-start"
      minW="0"
      w="full"
    >
      {summary}
    </VStack>
  );
}

const ProductDetailsRoot = cva({
  base: {
    color: 'text.primary',
  },
  variants: {
    variant: {
      listing: {
        '& [data-product-promotion]': { gap: '2' },
        '& [data-product-promotion] > span': { fontWeight: 'medium' },
        '& [data-product-promotion] > [aria-hidden]': { w: '1.5px', h: '13px' },
        _mobile: {
          '& [data-product-promotion] > span': { fontWeight: 'normal' },
          px: '2.5',
        },
      },
      showcase: {},
      history: { w: 'full', minW: '0', _mobile: { px: '2.5' } },
    },
  },
});

type ProductDetailsProps = {
  colorPreview?: {
    open: boolean;
    selectedId?: string;
    onSelect: (id: string) => void;
  };
  promotionTone?: 'brand' | 'error';
  discountLabel?: string;
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
  colorPreview,
  promotionTone,
  discountLabel,
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
        gap={variant === 'history' ? '2.5' : '4'}
        _mobile={variant === 'listing' ? { gap: '1.5' } : undefined}
        alignItems="flex-start"
        minW="0"
        w="full"
      >
        <ProductIdentity
          promotionTone={promotionTone}
          discountLabel={discountLabel}
          promotion={promotion}
          gender={gender}
          name={name}
          price={price}
          originalPrice={originalPrice}
          variant={variant}
        />

        {showVariantSummary && (
          <ProductDetailsOptions
            colorPreview={colorPreview}
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
  product: ProductCardProduct;
  showSpecifications: boolean;
};

function ProductCardFooter({ product, showSpecifications }: ProductCardFooterProps) {
  if (!showSpecifications || !product.cushioning || !product.stability || !product.width)
    return null;
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
  platform: Platform;
  selectedImage?: string;
  product: ProductCardProduct;
  href?: string;
  soldOut?: boolean;
  variant: ProductThumbnailVariant;
};

function ProductCardHeader({
  product,
  href,
  platform,
  selectedImage,
  soldOut = false,
  variant,
}: ProductCardHeaderProps) {
  return (
    <Card.Header className={ProductCardHeaderRoot}>
      <Link href={href ?? `/products/${product.id}`} className={css({ pos: 'relative' })}>
        <ProductThumbnail
          alt={product.name}
          hover
          hoverImage={
            platform === 'web' ? (selectedImage ?? product.hoverImage) : product.hoverImage
          }
          lazy
          src={
            platform === 'mobile' ? (selectedImage ?? product.primaryImage) : product.primaryImage
          }
          variant={variant}
        />
        {soldOut && (
          <Grid
            as="span"
            pos="absolute"
            inset="0"
            placeItems="center"
            bg="black.100/50"
            pointerEvents="none"
          >
            <Typography as="span" variant="heading6" tone="inverse">
              Sold Out
            </Typography>
          </Grid>
        )}
      </Link>
    </Card.Header>
  );
}

const mobileTilePrice = css.raw({
  '& [data-product-price] span, & [data-product-price] del': {
    fontSize: '13',
    lineHeight: 'body',
  },
  '& [data-product-price] span > span': { fontWeight: 'normal' },
});

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
    _mobile: { gap: '2.5' },
  },
  variants: {
    variant: {
      listing: {
        _mobile: mobileTilePrice,
      },
      history: { gap: '2.5', _mobile: { gap: '2.5' } },
      showcase: {
        w: 'full',
        flex: '0 0 auto',
        _mobile: {
          ...mobileTilePrice,
          w: '150px',
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

const productWidthCount = (product: ProductCardProduct) => {
  const widths = product.colorOptions?.flatMap((colorOption) =>
    colorOption.widths.map((width) => width.label),
  );
  return new Set(widths?.length ? widths : product.width ? [product.width] : []).size;
};

const productOptionThumbnails = (product: ProductCardProduct): ProductOptionThumbnail[] =>
  product.colorThumbnails?.length
    ? product.colorThumbnails
    : (product.colors ?? []).map((color) => ({
        id: color,
        image: product.primaryImage,
        label: color,
      }));

const activityLabel = (use: Product['use']) => {
  if (use === 'Everyday Run') return '데일리 러닝';
  if (use === 'Trail Running') return '트레일 러닝';
  return '워킹';
};

export type ProductCardOption = 'promotion' | 'like' | 'colors' | 'specifications';

export type ProductCardProps = {
  promotionTone?: 'brand' | 'error';
  discountLabel?: string;
  soldOut?: boolean;
  activityLabels?: readonly string[];
  liked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  options?: readonly ProductCardOption[];
  product: ProductCardProduct;
  href?: string;
  variant?: ProductCardVariant;
};

/**
 * [ 개발팀 바인딩 ] 목록 소유자가 product의 상품 ID·colorThumbnails 옵션 ID/이미지를 제공합니다.
 * 추천 목록은 id/name/price/primaryImage와 선택적 gender/href만 전달할 수 있으며 미제공 활동·색상·스펙을 만들어 채우지 않습니다.
 * PC 목록의 호버/키보드 포커스에서 요약을 48px 색상 캐러셀로 교체하며, 선택 ID는 현재 옵션에서 찾아 이미지 미리보기에만 사용합니다.
 * 모바일 목록에서는 색상별 썸네일이 제공되면 선택한 이미지를 대표 이미지에 표시합니다.
 * 색상 선택은 요청·저장·재고 판정 없이 로컬로 처리합니다. 관심상품 연결과 상세 링크는 기존 소유자가 담당합니다.
 */
/** 상품 이미지와 요약을 표시하고 목록에서 색상 미리보기를 제공합니다. (Displays product imagery, details, and color previews in listings.) */
export function ProductCard({
  href,
  promotionTone,
  discountLabel,
  activityLabels,
  soldOut = false,
  liked,
  onLikedChange,
  options = [],
  product,
  variant = 'listing',
}: ProductCardProps) {
  const [internalLiked, setInternalLiked] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<string>();
  const platform = usePlatform();
  const isLiked = liked ?? internalLiked;
  const hasOption = (option: ProductCardOption) => options.includes(option);
  const colorOptions = productOptionThumbnails(product);
  const selectedColor = colorOptions.find((option) => option.id === selectedColorId);
  const canSelectColor =
    variant === 'listing' &&
    hasOption('colors') &&
    (platform === 'web' ? colorOptions.length > 0 : !!product.colorThumbnails?.length);
  const showColorPreview = platform === 'web' && canSelectColor && previewOpen;
  return (
    <Card
      className={root({ variant })}
      data-color-preview-open={showColorPreview ? '' : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setPreviewOpen(true);
      }}
      onPointerLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) setPreviewOpen(false);
      }}
      onFocusCapture={(event) => {
        if (event.target.matches(':focus-visible')) setPreviewOpen(true);
      }}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !event.currentTarget.matches(':hover')
        )
          setPreviewOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setPreviewOpen(false);
          event.stopPropagation();
        }
      }}
    >
      <ProductCardHeader
        href={href}
        platform={platform}
        selectedImage={
          canSelectColor && (platform === 'mobile' || showColorPreview)
            ? selectedColor?.image
            : undefined
        }
        product={product}
        soldOut={soldOut}
        variant={variant}
      />

      {hasOption('like') && (
        <Card.Action
          className={
            variant === 'history'
              ? css({ pos: 'absolute', right: '2.5', top: '2.5', zIndex: '4' })
              : action
          }
        >
          <Wishlist
            className={variant === 'history' || variant === 'listing' ? css({ p: '0' }) : undefined}
            size={
              variant === 'history'
                ? token.var('sizes.4.5')
                : variant === 'listing'
                  ? platform === 'mobile'
                    ? '18px'
                    : token.var('sizes.6')
                  : undefined
            }
            iconSize={
              variant === 'history'
                ? '18px'
                : variant === 'listing'
                  ? platform === 'mobile'
                    ? '18px'
                    : '24px'
                  : undefined
            }
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
        colorPreview={
          canSelectColor
            ? {
                open: showColorPreview,
                selectedId: selectedColor?.id,
                onSelect: setSelectedColorId,
              }
            : undefined
        }
        promotionTone={promotionTone}
        discountLabel={discountLabel ?? product.discountLabel}
        activities={activityLabels ?? (product.use ? [activityLabel(product.use)] : [])}
        colorCount={product.colors?.length ?? colorOptions.length}
        gender={product.gender}
        name={product.name}
        optionThumbnails={colorOptions}
        platform={platform}
        price={product.price}
        originalPrice={product.originalPrice}
        promotion={hasOption('promotion') ? product.promotion : undefined}
        showVariantSummary={hasOption('colors')}
        variant={variant}
        widthCount={productWidthCount(product)}
      />

      <ProductCardFooter product={product} showSpecifications={hasOption('specifications')} />
    </Card>
  );
}

export { ProductGender, ProductPrice };
