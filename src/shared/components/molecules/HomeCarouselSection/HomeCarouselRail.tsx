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

const bleedRail = css({
  w: '100vw',
  pr: '16px !important',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '2' },
});

type Props = Pick<
  HomeCarouselSectionProps,
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
export function HomeCarouselRail({
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
