import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import {
  Carousel,
  CarouselControls,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { MainSection } from '@/shared/components/molecules/MainSection/MainSection';
import type { Platform } from '@/shared/lib/device';

const desktopOnly = css({ _mobile: { display: 'none' } });

export type HomeCarouselSectionProps = {
  children: ReactNode;
  itemCount: number;
  platform: Platform;
  slideClassName: string;
  title: string;
  beforeViewport?: ReactNode;
  desktopCenteredItemCount: number;
  desktopItemGutter: number;
  mobileItemGutter: number;
  railClassName: string;
  spacing?: 'default' | 'compact';
};

/** Home content rail with a shared responsive carousel frame and controls. */
export function HomeCarouselSection({
  children,
  itemCount,
  platform,
  slideClassName,
  title,
  beforeViewport,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  railClassName,
  spacing,
}: HomeCarouselSectionProps) {
  return (
    <Carousel itemCount={itemCount}>
      <MainSection
        actionSlot={
          <div className={desktopOnly}>
            <CarouselControls />
          </div>
        }
        spacing={spacing}
        title={title}
      >
        {beforeViewport}
        <CarouselViewport
          className={railClassName}
          desktopCenteredItemCount={desktopCenteredItemCount}
          desktopItemGutter={desktopItemGutter}
          mobileItemGutter={mobileItemGutter}
          mode={platform}
          slideClassName={slideClassName}
        >
          {children}
        </CarouselViewport>
        <CarouselPagination />
      </MainSection>
    </Carousel>
  );
}
