'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Typography } from '@/components/common/atoms/Typography';

import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { MainContentCard } from '@/components/common/molecules/MainContentCard';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { createHomeCarouselPreviewItems } from '@/app/homeCarouselPreview';
import { bestSellerTabs, homeCategories } from '@/app/homeContent';
import { products } from '@/mocks/products';

import { renderGuideCode } from './GuideCode';
import { GuideTimeline } from './GuideTimeline';

const categoryItems = createHomeCarouselPreviewItems(homeCategories);

const productItems = createHomeCarouselPreviewItems(products.slice(0, 12));

const frame = css({
  '--layout-web-content-inline-space': '0px',
  '--layout-mobile-content-inline-space': '0px',
});

const productSlide = css({ w: 'calc(40vw + 10px)!', px: '5px!', '& > *': { w: '100%!' } });

const categorySlide = css({ w: 'calc(83.2vw + var(--spacing-4))!', '& > *': { w: '100%' } });

const categoryCard = css({
  '&&': { gap: '20px' },
  '& h3': { fontSize: '28px', lineHeight: '1' },
  '& .card__header': { gap: '0' },
  '& .card__action': { mt: '4px' },
  _mobile: { '&&': { gap: '16px' }, '& h3': { fontSize: '22px' } },
});

const basicCode = `import { usePlatform } from '@/context/platform';
import { css } from 'styled-system/css';
import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { MainContentCard } from '@/components/common/molecules/MainContentCard';
import { createHomeCarouselPreviewItems } from '@/app/homeCarouselPreview';
import { homeCategories } from '@/app/homeContent';

const platform = usePlatform();
const items = createHomeCarouselPreviewItems(homeCategories);
const categoryCard = css({
  '&&': { gap: '20px' },
  '& h3': { fontSize: '28px', lineHeight: '1' },
  '& .card__header': { gap: '0' },
  '& .card__action': { mt: '4px' },
  _mobile: { '&&': { gap: '16px' }, '& h3': { fontSize: '22px' } },
});

<CarouselSection
  title="Shop by category"
  titleVariant="heading4"
  platform={platform}
  itemCount={items.length}
  desktopCenteredItemCount={4}
  desktopItemGutter={8}
  mobileItemGutter={8}
  slideClassName={css({ w: 'calc(83.2vw + var(--spacing-4))!', '& > *': { w: '100%' } })}
  className={css({ '--layout-web-content-inline-space': '0px', '--layout-mobile-content-inline-space': '0px' })}
>
  {items.map((category, index) => (
    <MainContentCard key={index} {...category} className={categoryCard} />
  ))}
</CarouselSection>`;

const tabsCode = `import { useState } from 'react';
import { usePlatform } from '@/context/platform';
import { css } from 'styled-system/css';
import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';
import { createHomeCarouselPreviewItems } from '@/app/homeCarouselPreview';
import { bestSellerTabs } from '@/app/homeContent';
import { products } from '@/mocks/products';

const platform = usePlatform();
const [selectedTab, setSelectedTab] = useState('전체');
// 가이드용 고정 목록: 탭은 선택 상태만 변경합니다.
const items = createHomeCarouselPreviewItems(products.slice(0, 12));

<CarouselSection
  title="Best sellers"
  titleVariant="heading4"
  platform={platform}
  itemCount={items.length}
  desktopCenteredItemCount={5}
  desktopItemGutter={8}
  mobileItemGutter={5}
  slideClassName={css({ w: 'calc(40vw + 10px)!', px: '5px!', '& > *': { w: '100%!' } })}
  className={css({ '--layout-web-content-inline-space': '0px', '--layout-mobile-content-inline-space': '0px' })}
  spacing="tight"
  viewportKey={selectedTab}
  tabs={
    <FilterTabs
      ariaLabel="캐러셀 카테고리"
      options={bestSellerTabs.map(value => ({ value, label: value }))}
      value={selectedTab}
      onValueChange={setSelectedTab}
      variant="fill"
    />
  }
>
  {items.map((product, index) => (
    <ProductCard key={index} product={product} variant="showcase" />
  ))}
</CarouselSection>`;

/** 공통 캐러셀의 제목·컨트롤·레일과 사용 코드를 보여줍니다. (Shows the shared carousel heading, controls, rail, and usage code.) */
export function CarouselGuide() {
  const platform = usePlatform();
  const [selectedTab, setSelectedTab] = useState('전체');
  const [copyNotice, setCopyNotice] = useState('');

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopyNotice('사용 코드를 복사했습니다.');
    } catch {
      setCopyNotice('복사하지 못했습니다. 코드를 직접 선택해 주세요.');
    }
  }

  return (
    <Grid
      gridTemplateColumns={{ base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' }}
      gap="4"
      pt="6"
      alignItems="start"
    >
      <Stack minW="0" gap="6">
        <Stack gap="2">
          <Typography as="h2" variant="heading8">
            캐러셀
          </Typography>
          <Typography as="p" variant="body4">
            제목·오른쪽 컨트롤·레일을 하나의 CarouselSection으로 사용합니다. 홈과 장바구니는 같은
            컴포넌트에 제목과 카드를 전달합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            데스크탑: 오른쪽 48px 이전·다음 버튼, 버튼 간격 10px. 모바일: 컨트롤을 숨기고 레일을
            터치로 넘깁니다. 홈과 같은 MainContentCard·ProductCard를 각각 12개 배치했습니다.
            카테고리 카드 간격은 16px, 상품 카드는 데스크탑 16px·모바일 10px입니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            사용 파일: HomeContent.tsx / OrderRecommendations.tsx / ProductDetailContent.tsx /
            RunningSessionSessionContent.tsx
          </Typography>
        </Stack>
        <Box
          id="carousel-preview"
          minW="0"
          p={{ base: '6', _mobile: '4' }}
          border="1px solid token(colors.black.20)"
          scrollMarginTop="100px"
        >
          <CarouselSection
            title="Shop by category"
            titleVariant="heading4"
            platform={platform}
            itemCount={categoryItems.length}
            desktopCenteredItemCount={4}
            desktopItemGutter={8}
            mobileItemGutter={8}
            slideClassName={categorySlide}
            className={frame}
            spacing="default"
          >
            {categoryItems.map((category, index) => (
              <MainContentCard
                key={`${category.title}-${index}`}
                {...category}
                className={categoryCard}
              />
            ))}
          </CarouselSection>
        </Box>
        <Stack id="carousel-basic-code" gap="3" minW="0" scrollMarginTop="100px">
          <HStack justifyContent="space-between">
            <Typography as="h3" variant="body3" weight="semibold">
              기본형 사용 코드
            </Typography>
            <Button
              size="short"
              variant="secondary"
              onClick={() => copyCode(basicCode)}
              aria-label="기본형 사용 코드 복사"
            >
              코드 복사
            </Button>
          </HStack>
          <Typography as="p" variant="body5" tone="subtle">
            탭 없이 제목 오른쪽에 컨트롤을 표시합니다. 카테고리 표시 데이터를 MainContentCard에
            전달합니다.
          </Typography>
          <Box as="pre" m="0" p="4" bg="black.10" overflowX="auto" fontSize="12px">
            <code>{renderGuideCode(basicCode)}</code>
          </Box>
        </Stack>
        <Box
          id="carousel-tabs"
          minW="0"
          p={{ base: '6', _mobile: '4' }}
          border="1px solid token(colors.black.20)"
          scrollMarginTop="100px"
        >
          <CarouselSection
            title="Best sellers"
            tabs={
              <FilterTabs
                ariaLabel="캐러셀 카테고리"
                options={bestSellerTabs.map((value) => ({ value, label: value }))}
                value={selectedTab}
                onValueChange={setSelectedTab}
                variant="fill"
              />
            }
            viewportKey={selectedTab}
            titleVariant="heading4"
            platform={platform}
            itemCount={productItems.length}
            desktopCenteredItemCount={5}
            desktopItemGutter={8}
            mobileItemGutter={5}
            slideClassName={productSlide}
            className={frame}
            spacing="tight"
          >
            {productItems.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} variant="showcase" />
            ))}
          </CarouselSection>
        </Box>
        <Stack id="carousel-tabs-code" gap="3" minW="0" scrollMarginTop="100px">
          <HStack justifyContent="space-between">
            <Typography as="h3" variant="body3" weight="semibold">
              탭 포함형 사용 코드
            </Typography>
            <Button
              size="short"
              variant="secondary"
              onClick={() => copyCode(tabsCode)}
              aria-label="탭 포함형 사용 코드 복사"
            >
              코드 복사
            </Button>
          </HStack>
          <Typography as="p" variant="body5" tone="subtle">
            tabs에 FilterTabs를 전달합니다. 탭 예시는 선택 상태만 변경하며 상품 목록은 부모에서
            전달합니다.
          </Typography>
          <Box as="pre" m="0" p="4" bg="black.10" overflowX="auto" fontSize="12px">
            <code>{renderGuideCode(tabsCode)}</code>
          </Box>
        </Stack>
        <Typography as="p" variant="body5" role="status">
          {copyNotice}
        </Typography>
      </Stack>
      <GuideTimeline
        title="캐러셀"
        entries={[
          {
            id: 'carousel-preview',
            title: '제목 · 컨트롤 · 레일',
            description: '공통 캐러셀 실동작',
          },
          { id: 'carousel-basic-code', title: '기본형 코드', description: '탭 없는 캐러셀' },
          { id: 'carousel-tabs', title: '탭 있는 캐러셀', description: '탭 오른쪽 컨트롤' },
          { id: 'carousel-tabs-code', title: '탭 포함형 코드', description: '필터 탭 있는 캐러셀' },
        ]}
      />
    </Grid>
  );
}
