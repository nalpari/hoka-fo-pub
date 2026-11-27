'use client';
import Image from 'next/image';

import {
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type Platform, usePlatform } from '@/context/platform';

import { Box, Flex, Grid, HStack, VStack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { type FilterTabOption, FilterTabs } from '@/components/common/atoms/FilterTabs';

import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { MainContentCard } from '@/components/common/molecules/MainContentCard';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { MainSection } from '@/components/common/layouts/MainSection';

import { createHomeCarouselPreviewItems } from '@/app/homeCarouselPreview';
import {
  bestSellerTabs,
  getHomeTrailPreviewProducts,
  homeCategories,
  homeExplores,
  type HomeShoeFinderCardVariant,
  shoeFinderItems,
} from '@/app/homeContent';
import { products } from '@/mocks/products';

import { homeStyles } from './home.recipe';
import { HomePromotionDialog, type HomePromotionDialogProps } from './HomePromotionDialog';

type HomeContentProps = {
  promotion?: HomePromotionDialogProps;
  previewPromotion?: boolean;
};

const previewPromotionSlides: HomePromotionDialogProps['slides'] = [
  {
    id: 'preview-home-promotion',
    image: '/images/temp/home-promotion.webp',
    alt: '바위 위에서 뛰어오르는 두 러너',
  },
  {
    id: 'preview-trail-running',
    image: '/images/temp/home-hero-trail-mobile.png',
    alt: '트레일 러닝 캠페인',
  },
  {
    id: 'preview-city-running',
    image: '/images/temp/home-hero-city-mobile.png',
    alt: '시티 러닝 캠페인',
  },
];

/** 홈 콘텐츠의 공통 폭과 모바일 전용 타이포그래피 변수를 제공합니다. (Provides shared home content width and mobile type scale variables.) */
function HomeLayout({ platform, children }: { platform: Platform; children: ReactNode }) {
  return (
    <Box
      as="main"
      id="home-content"
      tabIndex={-1}
      className={`home-page-${platform} ${homeStyles.layout}`}
      overflow="hidden"
      color="var(--color-text-primary)"
      bg="var(--color-surface-default)"
      fontFamily="var(--font-family-base)"
      pb="24"
      _mobile={{ pb: '72px' }}
    >
      <VStack alignItems="flex-start" gap={{ base: '96px', _mobile: '72px' }}>
        {children}
      </VStack>
    </Box>
  );
}

type BestSellerTab = (typeof bestSellerTabs)[number];

const bestSellerFilterTabs: readonly FilterTabOption<BestSellerTab>[] = bestSellerTabs.map(
  (tab) => ({
    label: tab,
    value: tab,
  }),
);

const mobileBestSellerFilterTabs = bestSellerFilterTabs.map((tab) =>
  tab.value === '로드 러닝' ? { ...tab, label: '로드러닝' } : tab,
);

const getBestSellerProducts = (tab: Exclude<BestSellerTab, '트레일 러닝'>) => {
  if (tab === '전체') return products.slice(0, 12);
  if (tab === '로드 러닝')
    return products.filter((product) => product.category === '러닝').slice(0, 12);
  if (tab === '라이프스타일') {
    return products.filter((product) => product.category === '라이프스타일').slice(0, 12);
  }
  if (tab === '하이킹') return products.filter((product) => product.width === 'Wide').slice(0, 12);
  if (tab === '워킹') return products.filter((product) => product.use === 'Walking').slice(0, 12);
  return products.filter((product) => product.category === '리커버리').slice(0, 12);
};
function HomeBestSellerSection() {
  const platform = usePlatform();
  const isWeb = platform === 'web';
  const [selectedTab, setSelectedTab] = useState<BestSellerTab>('트레일 러닝');
  const isTrailPreview = selectedTab === '트레일 러닝';
  const bestSellerProducts = createHomeCarouselPreviewItems(
    isTrailPreview ? getHomeTrailPreviewProducts(platform) : getBestSellerProducts(selectedTab),
  );
  return (
    <CarouselSection
      className={homeStyles.bestSellerSection}
      tabs={
        <FilterTabs
          ariaLabel="베스트셀러 카테고리 필터"
          itemClassName={() => homeStyles.bestSellerTab}
          onValueChange={setSelectedTab}
          options={isWeb ? bestSellerFilterTabs : mobileBestSellerFilterTabs}
          railClassName={homeStyles.bestSellerTabRail}
          value={selectedTab}
          variant="fill"
        />
      }
      desktopCenteredItemCount={5}
      desktopItemGutter={8}
      itemCount={bestSellerProducts.length}
      mobileItemGutter={5}
      platform={platform}
      railClassName={isWeb ? undefined : homeStyles.bestSellerMobileRail}
      slideClassName={isWeb ? undefined : homeStyles.bestSellerMobileSlide}
      spacing="tight"
      title="Best sellers"
      titleVariant="h1B"
      mobileTitleVariant="h4B"
      viewportKey={selectedTab}
    >
      {bestSellerProducts.map((product, index) => (
        <ProductCard
          href={isTrailPreview ? '/products?activity=trail-running' : undefined}
          key={`${product.id}-${index}`}
          product={product}
          textWeights={{ identity: 'medium' }}
          thumbnailVariant="listing"
          variant="showcase"
        />
      ))}
    </CarouselSection>
  );
}

type HomeCategorySectionProps = {
  platform: Platform;
};

function HomeCategorySection({ platform }: HomeCategorySectionProps) {
  const isWeb = platform === 'web';
  return (
    <CarouselSection
      className={homeStyles.categorySection}
      desktopCenteredItemCount={4}
      desktopItemGutter={8}
      itemCount={homeCategories.length}
      mobileItemGutter={8}
      platform={platform}
      mobileRail="bleed"
      slideClassName={isWeb ? undefined : homeStyles.categoryMobileSlide}
      title="Shop by category"
      titleVariant="h1B"
      mobileTitleVariant="h4B"
    >
      {homeCategories.map((category) => (
        <MainContentCard className={homeStyles.categoryCard} key={category.title} {...category} />
      ))}
    </CarouselSection>
  );
}

function HomeExploreSection() {
  const platform = usePlatform();
  const isMobile = platform === 'mobile';
  return (
    <MainSection
      className={homeStyles.exploreSection}
      title="Explore"
      titleVariant="h1B"
      mobileTitleVariant="h4B"
    >
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        gap="4"
        _mobile={{ gap: '2', gridTemplateColumns: 'repeat(1, 1fr)' }}
      >
        {homeExplores.map(({ mobileImage, mobileDescription, ...explore }) => (
          <MainContentCard
            className={homeStyles.exploreCard}
            key={explore.title}
            {...explore}
            image={isMobile ? mobileImage : explore.image}
            description={
              isMobile && mobileDescription ? (
                <span className={homeStyles.exploreMobileCopy}>{mobileDescription}</span>
              ) : (
                explore.description
              )
            }
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
  platform: Platform;
};

/** 홈 Hero의 제목·설명·행동 링크를 배치합니다. (Arranges the home hero title, description, and action links.) */
function HeroCopy({ content, actions, platform }: HeroCopyProps) {
  return (
    <VStack
      alignItems="flex-start"
      position="absolute"
      zIndex="1"
      top="calc(50% - 2px)"
      left="50%"
      className={homeStyles.heroCopyFrame}
      transform="translate(-50%, -50%)"
      _mobile={{
        top: 'auto',
        bottom: '50px',
        left: 'var(--layout-mobile-inline-gutter)',
        transform: 'none',
      }}
      gap={{ base: '24px', _mobile: '20px' }}
    >
      <ContentHeader
        title={content.title}
        titleAs="h1"
        alignItems="flex-start"
        maxW="100%"
        gap={{ base: '14px', _mobile: '10px' }}
        titleProps={{
          className: homeStyles.heroTitle,
          tone: 'inverse',
          web: 'd1',
          mo: 'd4',
        }}
        description={content.description}
        descriptionAs="div"
        descriptionProps={{
          className: homeStyles.heroDescription,
          tone: 'inverse',
          web: 'b1',
          mo: 'b4M',
        }}
      />
      <HStack alignItems="flex-start" flexWrap="wrap" maxW="100%" gap="8px">
        {actions.map((action) => (
          <ButtonLink
            className={homeStyles.heroAction}
            key={`${action.to}-${action.label}`}
            size={platform === 'mobile' ? 'short' : 'tall'}
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
      bottom="40px"
      left="0"
      justifyContent="center"
      gap="2"
      _mobile={{ bottom: '18px', gap: 'var(--home-pagination-gap, 7px)' }}
      role="group"
    >
      {slides.map((slide, index) => (
        <Button
          variant="unstyled"
          aria-label={`${slide.title} 슬라이드`}
          aria-pressed={activeSlide === index}
          className={homeStyles.heroPaginationButton}
          key={slide.id}
          onClick={() => onSlideChange(index)}
          type="button"
        >
          {activeSlide === index ? (
            <span
              aria-hidden="true"
              className={homeStyles.heroProgressBar}
              style={{
                transitionDuration: `${progressDuration}ms`,
                transitionProperty: isProgressPaused ? 'none' : 'width',
                width: getProgressWidth(progress),
              }}
            />
          ) : null}
        </Button>
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

/** 홈 배너 이미지를 화면 크기와 첫 슬라이드의 로딩 우선순위에 맞춰 표시합니다. (Displays a responsive hero image with loading priority for the first slide.) */
function HeroSlide({ desktopImage, mobileImage, platform = 'web', first = false }: HeroSlideProps) {
  const imageSource = platform === 'mobile' ? mobileImage : desktopImage;
  return (
    <Box pos="relative" flex="0 0 100%" w="100%" h="100%">
      <Image
        className={homeStyles.heroImage}
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
  mobileImageHasGradient?: boolean;
};
type HeroProps = {
  slides: readonly HeroContentSlide[];
  ariaLabel?: string;
  platform?: Platform;
};
const AUTO_PLAY_DELAY = 5000;
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
function Hero({ ariaLabel, platform = 'web', slides }: HeroProps) {
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
      h="min(37.5vw, 720px)"
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
      {platform === 'mobile' && !currentSlide.mobileImageHasGradient && (
        <Box
          pos="absolute"
          inset="0"
          pointerEvents="none"
          className={homeStyles.heroMobileGradient}
          aria-hidden="true"
        />
      )}
      <HeroCopy content={currentSlide.content} actions={currentSlide.actions} platform={platform} />
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
type HomeHeroSectionProps = {
  platform: Platform;
};
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
                새롭게 선보이는 초고속 <span className={homeStyles.heroTechnology}>ProFly X</span>{' '}
                기술로
                <br />
                당신의 최고 기록에 도전하세요.
              </>
            ),
          },
          desktopImage: '/images/home/hero/pc-tecton-x-4.webp',
          mobileImage: '/images/home/hero/mo-tecton-x-4.webp',
          mobileImageHasGradient: true,
          actions: [
            { label: '남성 보러가기', to: '/products' },
            { label: '여성 보러가기', to: '/products' },
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

type HomeShoeFinderSectionProps = {
  platform: Platform;
  variant?: HomeShoeFinderCardVariant;
};

function HomeShoeFinderSection({ platform, variant = 'imagePill' }: HomeShoeFinderSectionProps) {
  const isWeb = platform === 'web';
  return (
    <CarouselSection
      desktopCenteredItemCount={4}
      desktopItemGutter={8}
      itemCount={previewItems.length}
      mobileItemGutter={8}
      platform={platform}
      mobileRail="bleed"
      slideClassName={isWeb ? undefined : homeStyles.shoeFinderMobileSlide}
      title="Find my HOKA"
      titleVariant="d4"
      mobileTitleVariant="h5B"
    >
      {previewItems.map(({ images, description, mobileDescription, ...item }, index) => (
        <MainContentCard
          className={variant === 'imagePill' ? homeStyles.shoeFinderCard : undefined}
          description={isWeb ? description : (mobileDescription ?? description)}
          key={`${item.title}-${index}`}
          {...item}
          image={images[variant]}
          variant={variant}
        />
      ))}
    </CarouselSection>
  );
}
/**
 * 홈의 주요 프로모션과 상품 영역을 구성합니다. (Composes the home promotions and product sections.)
 *
 * [ 개발팀 바인딩 ]
 * 메인 통합 소유자는 노출 조건이 확정되면 promotion.open과 현재 배너 id, image, alt를 전달합니다.
 * promotion.onDismiss는 일반 닫기와 오늘 하루 숨김을 구분합니다. 통합 소유자가 노출 상태와 당일 숨김 저장을 처리합니다.
 * previewPromotion은 IA 확인용 고정 배너이며 두 닫기 동작 모두 현재 화면에서만 닫습니다.
 */
export function RouteContent({ promotion, previewPromotion = false }: HomeContentProps) {
  const platform = usePlatform();
  const [previewDismissed, setPreviewDismissed] = useState(false);
  const currentPromotion = previewPromotion
    ? {
        open: !previewDismissed,
        slides: previewPromotionSlides,
        onDismiss: () => setPreviewDismissed(true),
      }
    : promotion;
  const category = <HomeCategorySection key="category" platform={platform} />;
  const explore = <HomeExploreSection key="explore" />;
  const bestSellers = <HomeBestSellerSection key="best-sellers" />;
  const shoeFinder = <HomeShoeFinderSection key="shoe-finder" platform={platform} />;

  return (
    <HomeLayout platform={platform}>
      <HomeHeroSection platform={platform} />
      {platform === 'web'
        ? [category, shoeFinder, explore, bestSellers]
        : [category, bestSellers, explore, shoeFinder]}
      {currentPromotion && <HomePromotionDialog {...currentPromotion} />}
    </HomeLayout>
  );
}
