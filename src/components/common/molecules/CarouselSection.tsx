import { type CSSProperties, type ReactNode } from 'react';
import { type Platform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

import {
  Carousel,
  CarouselControls,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';

import { MainSection } from '@/components/common/layouts/MainSection';

import type { MainSectionProps } from '@/types/component-contracts/components-common-layouts-MainSection';
import type { CarouselSectionProps as ImportedCarouselSectionProps } from '@/types/component-contracts/components-common-molecules-CarouselSection-CarouselSection';

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
  ImportedCarouselSectionProps,
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
function CarouselSectionRail({
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

export type CarouselSectionProps = {
  className?: string;
  children: ReactNode;
  itemCount: number;
  platform: Platform;
  /** Mobile slide sizing; desktop sizing is derived from the central content grid. */
  slideClassName?: string;
  title: string;
  titleVariant?: MainSectionProps['titleVariant'];
  /** Optional filter row; controls align to its right when present. */
  tabs?: ReactNode;
  beforeViewport?: ReactNode;
  desktopCenteredItemCount: number;
  desktopItemGutter: number;
  mobileItemGutter: number;
  railClassName?: string;
  mobileRail?: 'default' | 'bleed';
  spacing?: MainSectionProps['spacing'];
  /** Remounts the viewport (and resets its position) when this changes. */
  viewportKey?: string;
};

/** 제목·오른쪽 컨트롤·반응형 레일을 공통으로 구성합니다. (Composes a shared title, right-aligned controls, and responsive carousel rail.) */
export function CarouselSection({
  className,
  children,
  itemCount,
  platform,
  slideClassName,
  title,
  titleVariant,
  beforeViewport,
  tabs,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  railClassName,
  mobileRail,
  spacing,
  viewportKey,
}: CarouselSectionProps) {
  return (
    <Carousel itemCount={itemCount}>
      <MainSection
        contentWidth={platform === 'web' ? 'extended' : 'contained'}
        className={[css({ overflowX: 'clip' }), className].filter(Boolean).join(' ')}
        actionSlot={
          !tabs ? (
            <Box _mobile={{ display: 'none' }}>
              <CarouselControls />
            </Box>
          ) : undefined
        }
        spacing={spacing}
        title={title}
        titleVariant={titleVariant}
      >
        {tabs ? (
          <HStack
            w={{ base: 'var(--section-content-width)', _mobile: '100%' }}
            minW="0"
            justifyContent="space-between"
            gap="4"
            pb={{ base: '10', _mobile: '4' }}
            px={{ base: '0', _mobile: '4' }}
          >
            <Box minW="0" flex="1">
              {tabs}
            </Box>
            <Box flexShrink="0" _mobile={{ display: 'none' }}>
              <CarouselControls />
            </Box>
          </HStack>
        ) : null}
        {beforeViewport}
        <CarouselSectionRail
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
        </CarouselSectionRail>
      </MainSection>
    </Carousel>
  );
}
