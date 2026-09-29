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
import { shoeFinderItems, type HomeShoeFinderCardVariant } from './homeContent';

const desktopOnly = css({ _mobile: { display: 'none' } });
const webRail = css({ w: '100%' });
const mobileRail = css({
  w: '100vw',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '8px' },
});
const webSlide = css({
  w: 'calc((min(100vw - var(--layout-web-content-inline-space), var(--layout-web-content-max-width)) - 30px) / 4)!',
  '& > *': { w: '100%' },
});
// At the 375px mobile design width, each card is 253px wide (67.46666666666667vw).
// The existing 8px gutters stay inside the slide to retain the 16px card gap.
const mobileSlide = css({ w: '67.46666666666667vw!', '& > *': { w: '100%' } });

type HomeShoeFinderSectionProps = {
  platform: Platform;
  variant?: HomeShoeFinderCardVariant;
};

export function HomeShoeFinderSection({
  platform,
  variant = 'imagePill',
}: HomeShoeFinderSectionProps) {
  const isWeb = platform === 'web';

  return (
    <Carousel itemCount={shoeFinderItems.length}>
      <MainSection
        actionSlot={
          <div className={desktopOnly}>
            <CarouselControls />
          </div>
        }
        title="Find my HOKA"
      >
        <CarouselViewport
          className={isWeb ? webRail : mobileRail}
          desktopCenteredItemCount={4}
          desktopItemGutter={5}
          mobileItemGutter={8}
          mode={platform}
          slideClassName={isWeb ? webSlide : mobileSlide}
        >
          {shoeFinderItems.map(({ images, ...item }) => (
            <MainContentCard key={item.title} {...item} image={images[variant]} variant={variant} />
          ))}
        </CarouselViewport>
        <CarouselPagination />
      </MainSection>
    </Carousel>
  );
}
