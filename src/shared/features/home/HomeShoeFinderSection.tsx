import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';
import {
  Carousel,
  CarouselControls,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { MainSection } from '@/shared/components/molecules/MainSection/MainSection';
import { HomeShoeFinderCard } from './HomeShoeFinderCard';
import { shoeFinderItems } from './homeContent';

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
// The 137px card remains unchanged; 8px slide gutters create its 16px gap.
const mobileSlide = css({ w: '153px!', '& > *': { w: '100%' } });

export function HomeShoeFinderSection() {
  const platform = usePlatform();
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
          {shoeFinderItems.map((item) => (
            <HomeShoeFinderCard key={item.title} {...item} />
          ))}
        </CarouselViewport>
      </MainSection>
    </Carousel>
  );
}
