import type { Platform } from '@/lib/device';
import { css } from 'styled-system/css';
import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection/HomeCarouselSection';
import { MainContentCard } from '@/components/common/molecules/MainContentCard/MainContentCard';
import { shoeFinderItems, type HomeShoeFinderCardVariant } from './homeContent';
import { createHomeCarouselPreviewItems } from './homeCarouselPreview';

const previewItems = createHomeCarouselPreviewItems(shoeFinderItems);

// Keep the 375px design width without enlarging slides on wider mobile screens.
// The existing 8px gutters stay inside the slide to retain the 16px card gap.
const mobileSlide = css({ w: 'min(67.46666666666667vw, 253px)!', '& > *': { w: '100%' } });

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
    <HomeCarouselSection
      desktopCenteredItemCount={4}
      desktopItemGutter={5}
      itemCount={previewItems.length}
      mobileItemGutter={8}
      platform={platform}
      mobileRail="bleed"
      slideClassName={isWeb ? undefined : mobileSlide}
      title="Find my HOKA"
    >
      {previewItems.map(({ images, ...item }, index) => (
        <MainContentCard
          key={`${item.title}-${index}`}
          {...item}
          image={images[variant]}
          variant={variant}
        />
      ))}
    </HomeCarouselSection>
  );
}
