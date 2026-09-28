import { css } from 'styled-system/css';
import type { Platform } from '@/shared/lib/device';

export type HeroSlideProps = {
  desktopImage: string;
  mobileImage: string;
  platform?: Platform;
};

const slide = css({ flex: '0 0 100%', w: '100%', h: '100%' });
const image = css({ w: '100%', h: '100%', objectFit: 'cover' });

/** One responsive, decorative background image in a Hero carousel track. */
export function HeroSlide({ desktopImage, mobileImage, platform = 'web' }: HeroSlideProps) {
  const imageSource = platform === 'mobile' ? mobileImage : desktopImage;

  return (
    <div className={slide}>
      <img className={image} src={imageSource} alt="" aria-hidden="true" draggable={false} />
    </div>
  );
}
