import { type CSSProperties, type ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

import {
  Carousel,
  CarouselControls,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { MainSection } from '@/components/common/molecules/MainSection/MainSection';

import { type Platform } from '@/lib/device';
import type { HomeCarouselSectionProps as ImportedHomeCarouselSectionProps } from '@/types/component-contracts/components-common-molecules-HomeCarouselSection-HomeCarouselSection';
import type { MainSectionProps } from '@/types/component-contracts/components-common-molecules-MainSection-MainSection';

// Size cards against the central grid, independently of the extended rail.
const desktopSlide = css({
  w: 'calc(var(--carousel-card-width) + var(--carousel-card-gap))!',
  pr: 'var(--carousel-card-gap)',
  '&:last-child:not(:first-child)': {
    w: 'calc(var(--carousel-card-width) + var(--section-content-offset))!',
    pr: 'var(--section-content-offset)',
  },
  '&:only-child': { w: 'var(--carousel-card-width)!', px: '0' },
  '& > *': { w: '100%' },
});

const bleedRail = css({
  w: '100vw',
  pr: '16px !important',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '2' },
});

type Props = Pick<
  ImportedHomeCarouselSectionProps,
  | 'children'
  | 'itemCount'
  | 'platform'
  | 'desktopCenteredItemCount'
  | 'desktopItemGutter'
  | 'mobileItemGutter'
  | 'slideClassName'
  | 'railClassName'
  | 'mobileRail'
  | 'viewportKey'
>;

/** Own card sizing, terminal spacing, and the responsive carousel viewport. */
function HomeCarouselRail({
  children,
  itemCount,
  platform,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  slideClassName,
  railClassName,
  mobileRail,
  viewportKey,
}: Props) {
  return (
    <Box
      w="100%"
      minW="0"
      css={
        platform === 'web'
          ? {
              '--carousel-visible-count': 'var(--carousel-default-count)',
              _wideDesktop: { '--carousel-visible-count': 'var(--carousel-wide-count)' },
              _ultraWideDesktop: { '--carousel-visible-count': 'var(--carousel-ultra-wide-count)' },
            }
          : undefined
      }
      style={
        {
          '--carousel-default-count': desktopCenteredItemCount,
          '--carousel-wide-count': Math.max(
            desktopCenteredItemCount,
            Math.min(itemCount, desktopCenteredItemCount + 1),
          ),
          '--carousel-ultra-wide-count': Math.max(
            desktopCenteredItemCount,
            Math.min(itemCount, desktopCenteredItemCount + 2),
          ),
          '--carousel-card-width':
            'calc((var(--section-content-width) - (var(--carousel-visible-count) - 1) * var(--carousel-card-gap)) / var(--carousel-visible-count))',
          '--carousel-card-gap': `${desktopItemGutter * 2}px`,
        } as CSSProperties
      }
    >
      <CarouselViewport
        key={viewportKey}
        className={[platform !== 'web' && mobileRail === 'bleed' ? bleedRail : '', railClassName]
          .filter(Boolean)
          .join(' ')}
        desktopCenteredItemCount={desktopCenteredItemCount}
        mobileItemGutter={mobileItemGutter}
        mode={platform}
        showScrollbar={false}
        slideClassName={platform === 'web' ? desktopSlide : slideClassName}
      >
        {children}
      </CarouselViewport>
    </Box>
  );
}

export type HomeCarouselSectionProps = {
  children: ReactNode;
  itemCount: number;
  platform: Platform;
  /** Mobile slide sizing; desktop sizing is derived from the central content grid. */
  slideClassName?: string;
  title: string;
  titleVariant?: MainSectionProps['titleVariant'];
  beforeViewport?: ReactNode;
  desktopCenteredItemCount: number;
  desktopItemGutter: number;
  mobileItemGutter: number;
  railClassName?: string;
  mobileRail?: 'default' | 'bleed';
  spacing?: 'default' | 'compact';
  /** Remounts the viewport (and resets its position) when this changes. */
  viewportKey?: string;
};

/** 홈 콘텐츠 목록과 캐러셀 이동 조작을 구성합니다 (Home content rail with a shared responsive carousel frame and controls). */
export function HomeCarouselSection({
  children,
  itemCount,
  platform,
  slideClassName,
  title,
  titleVariant,
  beforeViewport,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  railClassName,
  mobileRail,
  spacing,
  viewportKey,
}: HomeCarouselSectionProps) {
  return (
    <Carousel itemCount={itemCount}>
      <MainSection
        contentWidth={platform === 'web' ? 'extended' : 'contained'}
        className={css({ overflowX: 'clip' })}
        actionSlot={
          <Box _mobile={{ display: 'none' }}>
            <CarouselControls />
          </Box>
        }
        spacing={spacing}
        title={title}
        titleVariant={titleVariant}
      >
        {beforeViewport}
        <HomeCarouselRail
          itemCount={itemCount}
          platform={platform}
          desktopCenteredItemCount={desktopCenteredItemCount}
          desktopItemGutter={desktopItemGutter}
          mobileItemGutter={mobileItemGutter}
          railClassName={railClassName}
          mobileRail={mobileRail}
          slideClassName={slideClassName}
          viewportKey={viewportKey}
        >
          {children}
        </HomeCarouselRail>
      </MainSection>
    </Carousel>
  );
}
