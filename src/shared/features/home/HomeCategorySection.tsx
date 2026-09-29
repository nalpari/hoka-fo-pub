import type { Platform } from '@/shared/lib/device';
import { css } from 'styled-system/css';
import {
  Carousel,
  CarouselControls,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { MainContentCard } from '@/shared/components/molecules/MainContentCard/MainContentCard';
import { MainSection } from '@/shared/components/molecules/MainSection/MainSection';
import { homeCategories } from './homeContent';

const desktopOnly = css({ _mobile: { display: 'none' } });
const webRail = css({ w: '100%' });
const mobileRail = css({
  w: '100vw',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '8px' },
});
const webSlide = css({
  w: 'calc((min(100vw - var(--layout-web-content-inline-space), var(--layout-web-content-max-width)) - var(--layout-web-category-four-card-gap)) / 4)!',
  '& > *': { w: '100%' },
});
// 312px at a 375px viewport. The slide adds 8px gutters on both sides,
// leaving a deliberate preview of the following card.
const mobileSlide = css({ w: 'calc(83.2vw + 16px)!', '& > *': { w: '100%' } });

type HomeCategorySectionProps = { platform: Platform };

export function HomeCategorySection({ platform }: HomeCategorySectionProps) {
  const isWeb = platform === 'web';

  return (
    <Carousel itemCount={homeCategories.length}>
      <MainSection
        actionSlot={
          <div className={desktopOnly}>
            <CarouselControls />
          </div>
        }
        title="Shop by category"
      >
        <CarouselViewport
          className={isWeb ? webRail : mobileRail}
          desktopCenteredItemCount={4}
          desktopItemGutter={5}
          mobileItemGutter={8}
          mode={platform}
          slideClassName={isWeb ? webSlide : mobileSlide}
        >
          {homeCategories.map((category) => (
            <MainContentCard key={category.title} {...category} />
          ))}
        </CarouselViewport>
        <CarouselPagination />
      </MainSection>
    </Carousel>
  );
}
