import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Carousel, CarouselControls } from '@/shared/components/molecules/Carousel/Carousel';
import {
  MainSection,
  type MainSectionProps,
} from '@/shared/components/molecules/MainSection/MainSection';
import type { Platform } from '@/shared/lib/device';
import { HomeCarouselRail } from './HomeCarouselRail';

const desktopOnly = css({ _mobile: { display: 'none' } });

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
  spacing?: 'default' | 'compact';
  /** Remounts the viewport (and resets its position) when this changes. */
  viewportKey?: string;
};

/** Home content rail with a shared responsive carousel frame and controls. */
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
  spacing,
  viewportKey,
}: HomeCarouselSectionProps) {
  return (
    <Carousel itemCount={itemCount}>
      <MainSection
        contentWidth={platform === 'web' ? 'extended' : 'contained'}
        className={css({ overflowX: 'clip' })}
        actionSlot={
          <div className={desktopOnly}>
            <CarouselControls />
          </div>
        }
        spacing={spacing}
        title={title}
        titleVariant={titleVariant}
      >
        {beforeViewport}
        <HomeCarouselRail
          platform={platform}
          desktopCenteredItemCount={desktopCenteredItemCount}
          desktopItemGutter={desktopItemGutter}
          mobileItemGutter={mobileItemGutter}
          railClassName={railClassName}
          slideClassName={slideClassName}
          viewportKey={viewportKey}
        >
          {children}
        </HomeCarouselRail>
      </MainSection>
    </Carousel>
  );
}
