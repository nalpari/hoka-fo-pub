import type { CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { CarouselViewport } from '@/shared/components/molecules/Carousel/Carousel';
import type { HomeCarouselSectionProps } from './HomeCarouselSection';

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

type Props = Pick<
  HomeCarouselSectionProps,
  | 'children'
  | 'platform'
  | 'desktopCenteredItemCount'
  | 'desktopItemGutter'
  | 'mobileItemGutter'
  | 'slideClassName'
  | 'railClassName'
  | 'viewportKey'
>;

/** Own card sizing, terminal spacing, and the responsive carousel viewport. */
export function HomeCarouselRail({
  children,
  platform,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  slideClassName,
  railClassName,
  viewportKey,
}: Props) {
  return (
    <Box
      w="100%"
      minW="0"
      style={
        {
          '--carousel-card-width': `calc((var(--section-content-width) - ${(desktopCenteredItemCount - 1) * desktopItemGutter * 2}px) / ${desktopCenteredItemCount})`,
          '--carousel-card-gap': `${desktopItemGutter * 2}px`,
        } as CSSProperties
      }
    >
      <CarouselViewport
        key={viewportKey}
        className={railClassName}
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
