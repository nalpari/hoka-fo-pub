'use client';

import Image from 'next/image';

import { useContext } from 'react';
import {
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HomeContentContext } from '@/context/HomeContentContext';
import { type Platform, usePlatform } from '@/context/platform';
import { useBindingQuery } from '@/hooks/useBindingQuery';

import { css } from 'styled-system/css';
import { Box, Flex, Grid, HStack, VStack } from 'styled-system/jsx';
import { contentFrame } from 'styled-system/patterns';

import { ButtonLink } from '@/components/common/atoms/Button';
import { type FilterTabOption, FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection';
import { MainContentCard } from '@/components/common/molecules/MainContentCard';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { MainSection } from '@/components/common/layouts/MainSection';

import { createHomeCarouselPreviewItems } from '@/app/homeCarouselPreview';
import {
  bestSellerTabs,
  homeCategories,
  homeExplores,
  type HomeShoeFinderCardVariant,
  shoeFinderItems,
} from '@/app/homeContent';
import { products } from '@/mocks/products';

/** 홈 콘텐츠의 공통 폭과 모바일 전용 타이포그래피 변수를 제공합니다. (Provides shared home content width and mobile type scale variables.) */
function HomeLayout({ platform, children }: { platform: Platform; children: ReactNode }) {
  return (
    <Box
      as="main"
      className={`home-page-${platform}`}
      overflow="hidden"
      color="var(--color-text-primary)"
      bg="var(--color-surface-default)"
      fontFamily="var(--font-family-base)"
      pb="24"
      _mobile={{ pb: '72px' }}
      css={{
        _mobile: {
          // Linear 375–768px interpolation; rem bounds preserve user font preferences.
          '--home-title-20': 'clamp(1.25rem, calc(0.65362595rem + 2.54452926vw), 1.875rem)',
          '--home-title-24': 'clamp(1.5rem, calc(0.78435115rem + 3.05343511vw), 2.25rem)',
          '--home-title-30': 'clamp(1.875rem, calc(0.98043893rem + 3.81679389vw), 2.8125rem)',
          '--home-title-40': 'clamp(2.5rem, calc(1.30725191rem + 5.08905852vw), 3.75rem)',
          '--home-body-12': 'clamp(0.75rem, calc(0.57108779rem + 0.76335878vw), 0.9375rem)',
          '--home-body-13': 'clamp(0.8125rem, calc(0.61867844rem + 0.82697201vw), 1.015625rem)',
          '--home-body-14': 'clamp(0.875rem, calc(0.66626908rem + 0.89058524vw), 1.09375rem)',
          '--home-body-16': 'clamp(1rem, calc(0.76145038rem + 1.0178117vw), 1.25rem)',
          '--home-body-30': 'clamp(1.875rem, calc(1.42771947rem + 1.90839695vw), 2.34375rem)',
          '--home-body-40': 'clamp(2.5rem, calc(1.90362595rem + 2.54452926vw), 3.125rem)',
          '--home-pagination-dot': 'clamp(0.375rem, calc(0.19608779rem + 0.76335878vw), 0.5625rem)',
          '--home-pagination-active': 'clamp(2rem, calc(1.04580153rem + 4.07124682vw), 3rem)',
          '--home-pagination-gap': 'clamp(0.5rem, calc(0.26145038rem + 1.0178117vw), 0.75rem)',
        },
      }}
    >
      <VStack alignItems="flex-start" gap={{ base: '112px', _mobile: '72px' }}>
        {children}
      </VStack>
    </Box>
  );
}

const thumbnailRatio = css.raw({
  '& .image': { h: 'auto!', aspectRatio: '3 / 4!' },
});

const desktopRail = css(thumbnailRatio);

const mobileRail = css(thumbnailRatio, {
  w: '100vw',
  pr: '16px !important',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '8px' },
});

const mobileSlide = css({
  // Scale the 375px design's 160px card and 5px side gutters together.
  w: 'calc(42.66666666666667vw + 1.3333333333333333vw + 1.3333333333333333vw)!',
  px: '1.3333333333333333vw!',
  '& > *': { w: '100%!' },
});

type BestSellerTab = (typeof bestSellerTabs)[number];

const bestSellerFilterTabs: readonly FilterTabOption<BestSellerTab>[] = bestSellerTabs.map(
  (tab) => ({
    label: tab,
    value: tab,
  }),
);

const getBestSellerProducts = (tab: BestSellerTab) => {
  if (tab === '전체') return products.slice(0, 12);
  if (tab === '로드 러닝')
    return products.filter((product) => product.category === '러닝').slice(0, 12);
  if (tab === '트레일 러닝')
    return products.filter((product) => product.category === '트레일').slice(0, 12);
  if (tab === '라이프스타일') {
    return products.filter((product) => product.category === '라이프스타일').slice(0, 12);
  }
  if (tab === '하이킹') return products.filter((product) => product.width === 'Wide').slice(0, 12);
  if (tab === '워킹') return products.filter((product) => product.use === 'Walking').slice(0, 12);
  return products.filter((product) => product.category === '리커버리').slice(0, 12);
};

function HomeBestSellerSection() {
  const binding = useContext(HomeContentContext);
  const platform = usePlatform();
  const isWeb = platform === 'web';
  const [selectedTab, setSelectedTab] = useState<BestSellerTab>('전체');
  const categoryChanged = binding?.onCategoryChange;
  const notifyCategory = useCallback(
    (query: { category: string }) => categoryChanged?.(query.category),
    [categoryChanged],
  );
  useBindingQuery(categoryChanged ? notifyCategory : undefined, { category: selectedTab });
  const bestSellerProducts = binding
    ? binding.bestSellers
    : createHomeCarouselPreviewItems(getBestSellerProducts(selectedTab));

  return (
    <HomeCarouselSection
      beforeViewport={
        <Box pl="0" pb="10" _mobile={{ pl: '4', pb: '4' }}>
          <FilterTabs
            ariaLabel="베스트셀러 카테고리 필터"
            onValueChange={setSelectedTab}
            options={bestSellerFilterTabs}
            value={selectedTab}
            variant="fill"
          />
        </Box>
      }
      desktopCenteredItemCount={5}
      desktopItemGutter={8}
      itemCount={bestSellerProducts.length}
      mobileItemGutter={5}
      platform={platform}
      railClassName={isWeb ? desktopRail : mobileRail}
      slideClassName={isWeb ? undefined : mobileSlide}
      spacing="compact"
      title="Best sellers"
      viewportKey={selectedTab}
    >
      {bestSellerProducts.map((product, index) => (
        <ProductCard key={`${product.id}-${index}`} product={product} variant="showcase" />
      ))}
    </HomeCarouselSection>
  );
}

// 312px at a 375px viewport. The slide adds 8px gutters on both sides,
// leaving a deliberate preview of the following card.
const HomeCategorySectionMobileSlide = css({
  w: 'calc(83.2vw + var(--spacing-4))!',
  '& > *': { w: '100%' },
});

type HomeCategorySectionProps = { platform: Platform };

function HomeCategorySection({ platform }: HomeCategorySectionProps) {
  const isWeb = platform === 'web';

  return (
    <HomeCarouselSection
      desktopCenteredItemCount={4}
      desktopItemGutter={5}
      itemCount={homeCategories.length}
      mobileItemGutter={8}
      platform={platform}
      mobileRail="bleed"
      slideClassName={isWeb ? undefined : HomeCategorySectionMobileSlide}
      title="Shop by category"
    >
      {homeCategories.map((category) => (
        <MainContentCard key={category.title} {...category} />
      ))}
    </HomeCarouselSection>
  );
}

function HomeExploreSection() {
  const platform = usePlatform();
  const isMobile = platform === 'mobile';

  return (
    <MainSection title="Explore">
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        gap="4"
        _mobile={{ gap: '2', gridTemplateColumns: 'repeat(1, 1fr)' }}
      >
        {homeExplores.map((explore) => (
          <MainContentCard
            key={explore.title}
            {...explore}
            actions={explore.actions.map((action) => ({
              ...action,
              variant: isMobile ? 'primary' : action.variant,
            }))}
            variant={isMobile ? 'overlay' : 'descriptionLink'}
          />
        ))}
      </Grid>
    </MainSection>
  );
}

type HeroCopyContent = {
  title: string;
  description: ReactNode;
};

type HeroCopyAction = {
  label: string;
  to: string;
};

type HeroCopyProps = {
  content: HeroCopyContent;
  actions: readonly HeroCopyAction[];
};

const title = css({ m: '0' });

const description = css({
  m: '0',
  w: '377px',
  _mobile: { w: '100%', maxW: '100%', overflowWrap: 'anywhere' },
});

/** 홈 Hero의 제목·설명·행동 링크를 배치합니다. (Arranges the home hero title, description, and action links.) */
function HeroCopy({ content, actions }: HeroCopyProps) {
  return (
    <VStack
      alignItems="flex-start"
      position="absolute"
      zIndex="1"
      top="50%"
      left="50%"
      className={contentFrame({
        mobileWidth: 'calc(100% - var(--layout-mobile-content-inline-space))',
      })}
      transform="translate(-50%, -50%)"
      _mobile={{
        top: 'auto',
        bottom: '32.33px',
        left: 'var(--layout-mobile-inline-gutter)',
        transform: 'none',
      }}
      gap={{ base: '36px', _mobile: '24px' }}
    >
      <VStack alignItems="flex-start" maxW="100%" gap={{ base: '36px', _mobile: '24px' }}>
        <Typography as="h1" className={title} tone="inverse" variant="heading1">
          {content.title}
        </Typography>
        <Typography as="div" className={description} tone="inverse" web="bodyKr3" mo="bodyKr4">
          {content.description}
        </Typography>
      </VStack>
      <HStack alignItems="flex-start" flexWrap="wrap" maxW="100%" gap="8px">
        {actions.map((action) => (
          <ButtonLink
            size="short"
            key={`${action.to}-${action.label}`}
            variant="primary"
            colorway="white"
            href={action.to}
          >
            {action.label}
          </ButtonLink>
        ))}
      </HStack>
    </VStack>
  );
}

type HeroPaginationSlide = {
  id: string;
  title: string;
};

type HeroPaginationProps = {
  activeSlide: number;
  isProgressPaused: boolean;
  onSlideChange: (index: number) => void;
  progress: number;
  progressDuration: number;
  slides: readonly HeroPaginationSlide[];
};

const paginationButton = css({
  '--hero-pagination-dot': '8px',
  w: 'var(--hero-pagination-dot)',
  h: 'var(--hero-pagination-dot)',
  p: '0',
  border: '0',
  borderRadius: '50px',
  position: 'relative',
  overflow: 'hidden',
  bg: 'color-mix(in srgb, var(--color-white-000) 70%, transparent)',
  cursor: 'pointer',
  transition: 'width 200ms ease',
  '&[aria-pressed="true"]': {
    w: '42px',
    bg: 'color-mix(in srgb, var(--color-white-000) 50%, transparent)',
  },
  _mobile: {
    '--hero-pagination-dot': 'var(--home-pagination-dot, 6px)',
    '&[aria-pressed="true"]': { w: 'var(--home-pagination-active, 32px)' },
  },
  _focusVisible: { outline: '2px solid var(--color-text-inverse)', outlineOffset: '3px' },
});

const progressBar = css({
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  borderRadius: 'inherit',
  bg: 'var(--color-white-000)',
  transitionProperty: 'width',
  transitionTimingFunction: 'linear',
});

function getProgressWidth(progress: number) {
  return `calc(var(--hero-pagination-dot) * ${1 - progress} + ${progress * 100}%)`;
}

function HeroPagination({
  activeSlide,
  isProgressPaused,
  onSlideChange,
  progress,
  progressDuration,
  slides,
}: HeroPaginationProps) {
  if (slides.length < 2) return null;

  return (
    <Flex
      aria-label="히어로 슬라이드 선택"
      pos="absolute"
      zIndex="1"
      right="0"
      bottom="32px"
      left="0"
      justifyContent="center"
      gap="2"
      _mobile={{ bottom: '12px', gap: 'var(--home-pagination-gap, var(--spacing-2))' }}
      role="group"
    >
      {slides.map((slide, index) => (
        <button
          aria-label={`${slide.title} 슬라이드`}
          aria-pressed={activeSlide === index}
          className={paginationButton}
          key={slide.id}
          onClick={() => onSlideChange(index)}
          type="button"
        >
          {activeSlide === index ? (
            <span
              aria-hidden="true"
              className={progressBar}
              style={{
                transitionDuration: `${progressDuration}ms`,
                transitionProperty: isProgressPaused ? 'none' : 'width',
                width: getProgressWidth(progress),
              }}
            />
          ) : null}
        </button>
      ))}
    </Flex>
  );
}

type HeroSlideProps = {
  first?: boolean;
  desktopImage: string;
  mobileImage: string;
  platform?: Platform;
};

const image = css({ w: '100%', h: '100%', objectFit: 'cover' });

/** 홈 배너 이미지를 화면 크기와 첫 슬라이드의 로딩 우선순위에 맞춰 표시합니다. (Displays a responsive hero image with loading priority for the first slide.) */
function HeroSlide({ desktopImage, mobileImage, platform = 'web', first = false }: HeroSlideProps) {
  const imageSource = platform === 'mobile' ? mobileImage : desktopImage;

  return (
    <Box pos="relative" flex="0 0 100%" w="100%" h="100%">
      <Image
        className={image}
        src={imageSource}
        alt=""
        aria-hidden="true"
        draggable={false}
        fill
        sizes="100vw"
        loading={first ? 'eager' : 'lazy'}
        fetchPriority={first ? 'high' : 'auto'}
      />
    </Box>
  );
}

type HeroAction = HeroCopyAction;

type HeroContentSlide = HeroSlideProps & {
  actions: readonly HeroAction[];
  content: HeroCopyContent;
};

type HeroProps = {
  slides: readonly HeroContentSlide[];
  ariaLabel?: string;
  platform?: Platform;
};

const AUTO_PLAY_DELAY = 5_000;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function Hero({ ariaLabel, platform, slides }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplayCycle, setAutoplayCycle] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressDuration, setProgressDuration] = useState(AUTO_PLAY_DELAY);
  const swipeStartX = useRef<number | null>(null);
  const cycleStartedAt = useRef<number | null>(null);
  const remainingDuration = useRef(AUTO_PLAY_DELAY);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isPaused = isFocused || isHovering || isPointerActive;
  const currentSlide = slides[activeSlide] ?? slides[0];

  const resetAutoplayCycle = useCallback(() => {
    remainingDuration.current = AUTO_PLAY_DELAY;
    setProgress(0);
    setProgressDuration(AUTO_PLAY_DELAY);
    setAutoplayCycle((current) => current + 1);
  }, []);

  const freezeProgress = useCallback(() => {
    if (cycleStartedAt.current === null) return;

    const elapsed = performance.now() - cycleStartedAt.current;
    const nextRemainingDuration = Math.max(0, remainingDuration.current - elapsed);

    remainingDuration.current = nextRemainingDuration;
    cycleStartedAt.current = null;
    setProgress(1 - nextRemainingDuration / AUTO_PLAY_DELAY);
  }, []);

  const moveSlide = useCallback(
    (direction: -1 | 1) => {
      if (slides.length < 2) return;

      resetAutoplayCycle();
      setActiveSlide((current) => (current + direction + slides.length) % slides.length);
    },
    [resetAutoplayCycle, slides.length],
  );

  const selectSlide = useCallback(
    (index: number) => {
      resetAutoplayCycle();
      setActiveSlide(index);
    },
    [resetAutoplayCycle],
  );

  useEffect(() => {
    if (prefersReducedMotion) freezeProgress();
  }, [freezeProgress, prefersReducedMotion]);

  useEffect(() => {
    if (slides.length < 2 || isPaused || prefersReducedMotion !== false) return;

    const duration = remainingDuration.current;
    const animationFrame = window.requestAnimationFrame(() => setProgress(1));

    cycleStartedAt.current = performance.now();
    setProgressDuration(duration);

    const timeout = window.setTimeout(() => {
      resetAutoplayCycle();
      setActiveSlide((current) => (current + 1) % slides.length);
    }, duration);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeout);
    };
  }, [
    activeSlide,
    autoplayCycle,
    isPaused,
    prefersReducedMotion,
    resetAutoplayCycle,
    slides.length,
  ]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    freezeProgress();
    setIsPointerActive(true);
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    setIsPointerActive(false);

    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;

    swipeStartX.current = null;

    if (Math.abs(distance) < 40) return;

    moveSlide(distance < 0 ? 1 : -1);
  };

  const handlePointerCancel = () => {
    swipeStartX.current = null;
    setIsPointerActive(false);
  };

  const handleMouseEnter = () => {
    freezeProgress();
    setIsHovering(true);
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (!event.target.matches(':focus-visible')) return;

    freezeProgress();
    setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
  };

  return (
    <Box
      aria-label={ariaLabel ?? currentSlide.content.title}
      as="section"
      pos="relative"
      w="100%"
      maxW="none!"
      m="0!"
      p="0!"
      minH="500px"
      h="min(42.5vw, 816px)"
      overflow="hidden"
      color="var(--color-text-inverse)"
      _mobile={{ minH: '0', h: 'auto', aspectRatio: '375 / 500' }}
      onBlurCapture={handleBlur}
      onFocusCapture={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        pos="absolute"
        inset="0"
        overflow="hidden"
        touchAction="pan-y"
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <Flex
          w="100%"
          h="100%"
          transition="transform 400ms ease"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <HeroSlide
              {...slide}
              key={`${slide.desktopImage}-${index}`}
              platform={platform}
              first={index === 0}
            />
          ))}
        </Flex>
      </Box>
      <Box
        pos="absolute"
        inset="0"
        pointerEvents="none"
        _mobile={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 41.11%, color-mix(in srgb, var(--color-black-100) 30%, transparent) 76.91%)',
        }}
        aria-hidden="true"
      />
      <HeroCopy content={currentSlide.content} actions={currentSlide.actions} />
      <HeroPagination
        activeSlide={activeSlide}
        isProgressPaused={isPaused || prefersReducedMotion !== false}
        onSlideChange={selectSlide}
        progress={progress}
        progressDuration={progressDuration}
        slides={slides.map(({ content, desktopImage }) => ({
          id: desktopImage,
          title: content.title,
        }))}
      />
    </Box>
  );
}

type HomeHeroSectionProps = { platform: Platform };

function HomeHeroSection({ platform }: HomeHeroSectionProps) {
  return (
    <Hero
      ariaLabel="TECTON X 4 캠페인"
      platform={platform}
      slides={[
        {
          content: {
            title: 'TECTON X 4',
            description: (
              <>
                <span>새롭게 선보이는 초고속 ProFly X 기술로</span>
                <br />
                당신의 최고 기록에 도전하세요.
              </>
            ),
          },
          desktopImage: '/images/temp/MainBannerWeb.png',
          mobileImage: '/images/temp/MainBannerMobile.png',
          actions: [
            { label: '남성 바로가기', to: '/products' },
            { label: '여성 바로가기', to: '/products' },
          ],
        },
        {
          content: {
            title: 'TRAIL READY',
            description: (
              <>
                거친 지형에서도 흔들림 없이,
                <br />
                다음 모험을 향해 달려보세요.
              </>
            ),
          },
          desktopImage: '/images/temp/home-hero-trail-desktop.png',
          mobileImage: '/images/temp/home-hero-trail-mobile.png',
          actions: [{ label: '트레일 러닝 보러가기', to: '/products?activity=trail-running' }],
        },
        {
          content: {
            title: 'RUN THE CITY',
            description: (
              <>
                도시의 모든 리듬을 따라,
                <br />
                가볍고 빠르게 달려보세요.
              </>
            ),
          },
          desktopImage: '/images/temp/home-hero-city-desktop.png',
          mobileImage: '/images/temp/home-hero-city-mobile.png',
          actions: [{ label: '로드 러닝 보러가기', to: '/products?activity=road-running' }],
        },
      ]}
    />
  );
}

const previewItems = createHomeCarouselPreviewItems(shoeFinderItems);

// Keep the 375px design width without enlarging slides on wider mobile screens.
// The existing 8px gutters stay inside the slide to retain the 16px card gap.
const HomeShoeFinderSectionMobileSlide = css({
  w: 'min(67.46666666666667vw, 253px)!',
  '& > *': { w: '100%' },
});

type HomeShoeFinderSectionProps = {
  platform: Platform;
  variant?: HomeShoeFinderCardVariant;
};

function HomeShoeFinderSection({ platform, variant = 'imagePill' }: HomeShoeFinderSectionProps) {
  const isWeb = platform === 'web';

  return (
    <HomeCarouselSection
      desktopCenteredItemCount={4}
      desktopItemGutter={5}
      itemCount={previewItems.length}
      mobileItemGutter={8}
      platform={platform}
      mobileRail="bleed"
      slideClassName={isWeb ? undefined : HomeShoeFinderSectionMobileSlide}
      title="Find my HOKA"
    >
      {previewItems.map(({ images, ...item }, index) => (
        <MainContentCard
          key={`${item.title}-${index}`}
          {...item}
          image={images[variant]}
          variant={variant}
        />
      ))}
    </HomeCarouselSection>
  );
}

/** 홈의 주요 프로모션과 상품 영역을 구성합니다. (Composes the home promotions and product sections.) */
export function RouteContent() {
  const binding = useContext(HomeContentContext);
  const platform = usePlatform();
  return (
    <HomeLayout platform={platform}>
      <BindingFeedback {...binding} />
      {binding ? binding.hero : <HomeHeroSection platform={platform} />}
      {binding ? binding.categories : <HomeCategorySection platform={platform} />}
      <HomeBestSellerSection />
      {binding ? binding.explore : <HomeExploreSection />}
      {binding ? binding.shoeFinder : <HomeShoeFinderSection platform={platform} />}
    </HomeLayout>
  );
}

export const routePreviewComponents = { Hero, HeroCopy, HeroSlide } satisfies Pick<
  typeof import('@/types/component-contracts/app-page'),
  'Hero' | 'HeroCopy' | 'HeroSlide'
>;
