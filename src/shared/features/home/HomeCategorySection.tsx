import type { Platform } from '@/shared/lib/device';
import { css } from 'styled-system/css';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { MainContentCard } from '@/shared/components/molecules/MainContentCard/MainContentCard';
import { homeCategories } from './homeContent';

const webRail = css({ w: '100%' });
const mobileRail = css({
  w: '100vw',
  pr: '16px !important',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '8px' },
});
const webSlide = css({
  w: 'calc((min(100vw - var(--layout-web-content-inline-space), var(--layout-web-content-max-width)) - var(--layout-web-category-four-card-gap)) / 4)!',
  '& > *': { w: '100%' },
});
// 312px at a 375px viewport. The slide adds 8px gutters on both sides,
// leaving a deliberate preview of the following card.
const mobileSlide = css({ w: 'calc(83.2vw + var(--spacing-4))!', '& > *': { w: '100%' } });

type HomeCategorySectionProps = { platform: Platform };

export function HomeCategorySection({ platform }: HomeCategorySectionProps) {
  const isWeb = platform === 'web';

  return (
    <HomeCarouselSection
      desktopCenteredItemCount={4}
      desktopItemGutter={5}
      itemCount={homeCategories.length}
      mobileItemGutter={8}
      platform={platform}
      railClassName={isWeb ? webRail : mobileRail}
      slideClassName={isWeb ? webSlide : mobileSlide}
      title="Shop by category"
    >
      {homeCategories.map((category) => (
        <MainContentCard key={category.title} {...category} />
      ))}
    </HomeCarouselSection>
  );
}
