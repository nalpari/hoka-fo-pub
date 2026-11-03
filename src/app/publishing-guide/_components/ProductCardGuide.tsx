'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';
import { type Platform, PlatformProvider } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { token } from 'styled-system/tokens';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';
import {
  ProductCard,
  type ProductCardOption,
  type ProductCardProps,
} from '@/components/common/molecules/ProductCard/ProductCard';

import { OrderHistoryProduct } from '@/components/orders/OrderHistoryProduct';
import type { OrderLine } from '@/components/orders/orders.types';
import { faCopy } from '@/icons/fontAwesome';
import { type Product, products } from '@/mocks/products';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

type TileExample = {
  id: string;
  title: string;
  description: string;
  variant: NonNullable<ProductCardProps['variant']>;
  options: readonly ProductCardOption[];
  discounted?: boolean;
  liked?: boolean;
  soldOut?: boolean;
};

const listingOptions = ['promotion', 'like', 'colors'] as const;

const examples: readonly TileExample[] = [
  {
    id: 'tile-listing',
    title: '상품 목록',
    description: '배지 · 성별 · 상품명 · 가격 · 색상 옵션',
    variant: 'listing',
    options: listingOptions,
  },
  {
    id: 'tile-discount',
    title: '할인 상품',
    description: '정상가 취소선 · 준비된 할인율 · 판매가',
    variant: 'listing',
    options: listingOptions,
    discounted: true,
  },
  {
    id: 'tile-liked',
    title: '관심상품 선택',
    description: '선택된 하트 · 클릭하여 상태 비교',
    variant: 'listing',
    options: listingOptions,
    liked: true,
  },
  {
    id: 'tile-sold-out',
    title: '품절 상품',
    description: '품절 오버레이 · 상품 정보 유지',
    variant: 'listing',
    options: listingOptions,
    soldOut: true,
  },
  {
    id: 'tile-showcase',
    title: '메인 · 추천 상품',
    description: 'PC 약 4:5 · 모바일 3:4 이미지',
    variant: 'showcase',
    options: [],
  },
  {
    id: 'tile-history',
    title: '관심 · 최근 본 상품',
    description: 'history 정보 간격 · 색상 썸네일',
    variant: 'history',
    options: listingOptions,
  },
];

const previewColors = [
  { id: 'guide-brown', label: '브라운', image: '/images/mypage/speedgoat-7-gtx.png' },
  { id: 'guide-black', label: '블랙', image: '/images/products/clifton-11-gtx/gallery-1.png' },
  { id: 'guide-white', label: '화이트', image: '/images/products/bondi-9/bwht.png' },
  { id: 'guide-lilac', label: '라일락', image: '/images/products/bondi-9/lrmt.png' },
];

const colorThumbnails = Array.from({ length: 12 }, (_, index) => {
  const color = previewColors[index % previewColors.length];
  return { ...color, id: `guide-color-${index + 1}`, label: `${color.label} ${index + 1}` };
});

type VerticalExample = {
  id: string;
  title: string;
  description: string;
  kind: 'cart' | 'checkout' | 'history' | 'claim';
};

const verticalExamples: readonly VerticalExample[] = [
  {
    id: 'tile-vertical-cart',
    title: '장바구니',
    description: 'Vertical · 상품 이미지와 옵션·가격 요약',
    kind: 'cart',
  },
  {
    id: 'tile-vertical-checkout',
    title: '주문/결제',
    description: 'Vertical · 주문서의 상품 요약',
    kind: 'checkout',
  },
  {
    id: 'tile-vertical-orders',
    title: '주문/배송 내역',
    description: 'Vertical · 실제 주문 내역의 상품 행',
    kind: 'history',
  },
  {
    id: 'tile-vertical-claim',
    title: '취소/반품 상세',
    description: 'Vertical · claim 이미지 크기 · 표시 금액',
    kind: 'claim',
  },
];

const sections = [...examples, ...verticalExamples];

const product: Product = {
  ...products[0],
  id: 'shoe-1',
  name: 'Speedgoat 7 GTX',
  gender: 'All Gender',
  primaryImage: colorThumbnails[0].image,
  hoverImage: colorThumbnails[1].image,
  price: 240000,
  originalPrice: undefined,
  discountLabel: undefined,
  promotion: ['Best', 'Exclusive'],
  colors: colorThumbnails.map(({ label }) => label),
  colorThumbnails,
  colorOptions: [
    {
      color: '브라운',
      widths: (['Regular', 'Wide', 'X-Wide'] as const).map((label) => ({
        label,
        sizes: ['235'],
        soldOut: [],
      })),
    },
  ],
};

const orderLine: OrderLine = {
  key: 'guide-order-line',
  productId: product.id,
  name: product.name,
  image: product.primaryImage,
  width: 'Regular',
  color: '브라운',
  size: '235',
  quantity: 1,
  price: 240000,
  displayAmount: 240000,
};

const exampleCard = css({
  minW: '0',
  p: { base: '4', _mobile: '3' },
  border: '1px solid token(colors.black.20)',
  bg: 'surface.default',
});

const codeRow = css({
  p: '3',
  border: '1px solid token(colors.black.20)',
  bg: 'surface.subtle',
  fontSize: '12',
  lineHeight: 'normal',
});

const copyButton = css({
  flexShrink: '0',
  bg: 'black.10',
  border: '1px solid token(colors.black.40)',
  borderRadius: 'sm',
  _hover: { bg: 'black.20!' },
});

function exampleCode(example: TileExample, platform: Platform) {
  return `const [liked, setLiked] = useState(${Boolean(example.liked)});

<ProductCard
  product={${example.discounted ? `{ ...product, originalPrice: ${platform === 'mobile' ? 280000 : 290000}, price: 240000, discountLabel: "20%" }` : 'product'}}
  variant="${example.variant}"
  promotionTone="error"
  options={${JSON.stringify(example.options)}}
  activityLabels={["데일리 러닝", "워킹"]}
  liked={liked}
  onLikedChange={setLiked}${example.soldOut ? '\n  soldOut' : ''}
/>`;
}

function GuideExampleFrame({
  title,
  platform,
  width,
  code,
  onCopy,
  children,
}: {
  title: string;
  platform: Platform;
  width: string;
  code: string;
  onCopy: (code: string) => void;
  children: ReactNode;
}) {
  const mobile = platform === 'mobile';
  return (
    <Stack className={exampleCard} gap="4" _mobile={mobile ? undefined : { display: 'none' }}>
      <HStack justifyContent="space-between" alignItems="baseline" gap="2" flexWrap="wrap">
        <Typography variant="body4" weight="semibold">
          {mobile ? 'Mobile' : 'PC'}
        </Typography>
        <Typography variant="body5" tone="subtle">
          {width} 기준
        </Typography>
      </HStack>
      <Box minW="0" overflowX="auto" py="2" flex="1">
        <PlatformProvider platform={platform}>
          <Box
            className={mobile ? 'platform-mobile' : 'platform-web'}
            w={width}
            maxW="full"
            mx="auto"
            data-tile-preview={platform}
          >
            {children}
          </Box>
        </PlatformProvider>
      </Box>
      <HStack className={codeRow} alignItems="flex-start" gap="3" minW="0">
        <Box as="code" minW="0" flex="1" whiteSpace="pre-wrap" overflowWrap="anywhere">
          {renderGuideCode(code)}
        </Box>
        <Button
          aria-label={`${title} ${mobile ? '모바일' : 'PC'} 코드 복사`}
          title="코드 복사"
          type="button"
          variant="icon"
          size={32}
          className={copyButton}
          onClick={() => onCopy(code)}
        >
          <Icon fontAwesomeIcon={faCopy} size={token.var('sizes.4')} />
        </Button>
      </HStack>
    </Stack>
  );
}

function ProductExample({
  example,
  platform,
  onCopy,
}: {
  example: TileExample;
  platform: Platform;
  onCopy: (code: string) => void;
}) {
  const [liked, setLiked] = useState(example.liked ?? false);
  const mobile = platform === 'mobile';
  const width = mobile
    ? example.variant === 'showcase'
      ? '150px'
      : '183.5px'
    : example.variant === 'showcase'
      ? '293.6px'
      : example.variant === 'history'
        ? '260px'
        : '371px';
  const displayProduct = example.discounted
    ? { ...product, originalPrice: mobile ? 280000 : 290000, discountLabel: '20%' }
    : product;
  return (
    <GuideExampleFrame
      title={example.title}
      platform={platform}
      width={width}
      code={exampleCode(example, platform)}
      onCopy={onCopy}
    >
      <ProductCard
        product={displayProduct}
        variant={example.variant}
        promotionTone="error"
        options={example.options}
        activityLabels={['데일리 러닝', '워킹']}
        soldOut={example.soldOut}
        liked={liked}
        onLikedChange={setLiked}
      />
    </GuideExampleFrame>
  );
}

function VerticalProductExample({
  example,
  platform,
  onCopy,
}: {
  example: VerticalExample;
  platform: Platform;
  onCopy: (code: string) => void;
}) {
  const summary = example.kind === 'cart' || example.kind === 'checkout';
  const code = summary
    ? `<OrderProductSummary
  variant="${example.kind}"
  image={product.primaryImage}
  name={product.name}
  gender={product.gender}
  optionText="옵션 : Regular / 브라운 / 235 / 1개"
  amount={240000}
/>`
    : `<OrderHistoryProduct
  line={orderLine}
  showAmount${example.kind === 'claim' ? '\n  imageSize="claim"' : ''}
/>`;
  return (
    <GuideExampleFrame
      title={example.title}
      platform={platform}
      width={platform === 'web' ? '371px' : example.kind === 'cart' ? '311px' : '343px'}
      code={code}
      onCopy={onCopy}
    >
      {summary ? (
        <OrderProductSummary
          variant={example.kind === 'cart' ? 'cart' : 'checkout'}
          image={product.primaryImage}
          name={product.name}
          gender={product.gender}
          optionText="옵션 : Regular / 브라운 / 235 / 1개"
          amount={240000}
        />
      ) : (
        <OrderHistoryProduct
          line={orderLine}
          showAmount
          imageSize={example.kind === 'claim' ? 'claim' : 'standard'}
        />
      )}
    </GuideExampleFrame>
  );
}

/**
 * [ 개발팀 바인딩 ] 가이드 소유자가 product·colorThumbnails·orderLine의 고정 표시 예시와 상품/행/옵션 ID를 제공합니다.
 * PC/MO 가격 차이와 할인율은 승인된 디자인의 fixture이며 실제 가격·재고 계산이 아닙니다.
 * 관심상품은 각 예시의 로컬 liked/onLikedChange로, 색상 미리보기는 기존 ProductCard의 로컬 UI로 확인합니다.
 * 조회·저장 요청은 연결하지 않으며 실제 상품과 요청 상태 갱신은 목록 통합 소유자의 책임입니다.
 */
/** Horizontal·Vertical 상품 타일을 PC·모바일 예시와 복사 가능한 코드로 보여줍니다. (Shows horizontal and vertical product tiles with desktop/mobile examples and copyable snippets.) */
export function ProductCardGuide() {
  const [notice, setNotice] = useState<GuideCopyNotice | null>(null);
  const nextNoticeId = useRef(0);
  const dismissNotice = useCallback(
    (id: number) => setNotice((current) => (current?.id === id ? null : current)),
    [],
  );

  async function copyCode(code: string) {
    let text = '상품 타일 사용 코드를 복사했습니다.';
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      text = '복사하지 못했습니다. 표시된 코드를 직접 선택해 복사해 주세요.';
    }
    nextNoticeId.current += 1;
    setNotice({ id: nextNoticeId.current, text });
  }

  return (
    <Grid
      gridTemplateColumns={{ base: 'minmax(0, 1fr) token(sizes.60)', _mobile: 'minmax(0, 1fr)' }}
      alignItems="start"
      gap="4"
      pt="6"
    >
      <Stack minW="0" gap="8">
        <Stack gap="3">
          <Typography as="h2" variant="heading8">
            Product Tiles
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            Figma 기준의 상품 타일을 비교하고 사용 코드를 복사합니다. PC에서는 두 플랫폼을 나란히,
            모바일에서는 모바일 예시를 표시합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            색상 옵션 12개로 캐러셀을 확인합니다. PC 목록은 마우스 또는 Tab으로 열고 좌우 버튼을,
            모바일과 history는 가로 스크롤을 사용합니다. 색상을 선택하고 Escape로 닫아 보세요.
            하트는 예시 안에서만 변경됩니다.
          </Typography>
          <HStack gap="4" flexWrap="wrap">
            {[
              ['PC 시안', '1722-8232'],
              ['모바일 시안', '1679-763'],
              ['컴포넌트 기준', '497-864'],
            ].map(([label, node]) => (
              <a
                key={node}
                href={`https://www.figma.com/design/0dCBZJvU7aacxImQTV843M/HOKA-design-system-v1.0?node-id=${node}`}
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="textLink3">{label}</Typography>
              </a>
            ))}
          </HStack>
          <Typography as="p" variant="body5" tone="subtle">
            상품명·이미지·색상·가격은 준비된 표시 예시입니다. 프로모션 배지는 확정된 빨강을
            사용합니다.
          </Typography>
        </Stack>
        <Stack gap="2">
          <Typography as="h2" variant="heading8">
            Horizontal
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            이미지 아래에 상품 정보를 표시하는 목록·메인·관심상품 타일입니다.
          </Typography>
        </Stack>
        {examples.map((example) => (
          <Stack
            as="section"
            key={example.id}
            id={example.id}
            aria-labelledby={`${example.id}-title`}
            gap="3"
            scrollMarginTop="calc(var(--layout-site-header-height) + token(spacing.6))"
          >
            <Typography as="h3" id={`${example.id}-title`} variant="heading8">
              {example.title}
            </Typography>
            <Typography as="p" variant="body5" tone="subtle">
              {example.description}
            </Typography>
            <Grid columns={{ base: 2, _mobile: 1 }} gap="3" alignItems="stretch">
              <ProductExample example={example} platform="web" onCopy={copyCode} />
              <ProductExample example={example} platform="mobile" onCopy={copyCode} />
            </Grid>
          </Stack>
        ))}
        <Stack gap="2">
          <Typography as="h2" variant="heading8">
            Vertical
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            Figma의 Vertical 분류처럼 이미지 옆에 상품 정보를 표시합니다. 장바구니·주문/배송 화면의
            실제 요약 컴포넌트를 재사용합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            선택·삭제·수량·옵션변경·배송조회 액션은 각 화면에서 별도로 조합합니다.
          </Typography>
        </Stack>
        {verticalExamples.map((example) => (
          <Stack
            as="section"
            key={example.id}
            id={example.id}
            aria-labelledby={`${example.id}-title`}
            gap="3"
            scrollMarginTop="calc(var(--layout-site-header-height) + token(spacing.6))"
          >
            <Typography as="h3" id={`${example.id}-title`} variant="heading8">
              {example.title}
            </Typography>
            <Typography as="p" variant="body5" tone="subtle">
              {example.description}
            </Typography>
            <Grid columns={{ base: 2, _mobile: 1 }} gap="3" alignItems="stretch">
              <VerticalProductExample example={example} platform="web" onCopy={copyCode} />
              <VerticalProductExample example={example} platform="mobile" onCopy={copyCode} />
            </Grid>
          </Stack>
        ))}
      </Stack>
      <GuideTimeline title="상품 타일" entries={sections} />
      <GuideCopyToast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
