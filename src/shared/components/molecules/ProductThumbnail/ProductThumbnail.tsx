import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const root = css({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  bg: '#F7F7F9',
  h: '280px',
  _hover: { '& [data-product-thumbnail-hover-image]': { opacity: '1' } },
  _mobile: {
    h: '190px',
    fontSize: '12px',
    '& [data-product-thumbnail-hover-image]': { display: 'none' },
  },
});

const image = css({
  gridArea: '1 / 1',
  w: '100%',
  h: '100%',
  objectFit: 'contain',
  bg: '#F7F7F9',
});

const hoverImage = css({ opacity: '0', transition: 'opacity 180ms ease' });

export type ProductThumbnailProps = {
  alt: string;
  children?: ReactNode;
  className?: string;
  hover?: boolean;
  hoverImage?: string;
  lazy?: boolean;
  src: string;
};

/** Product image with optional lazy loading, hover image, and overlay slot. */
export function ProductThumbnail({
  alt,
  children,
  className,
  hover = false,
  hoverImage: hoverImageSource,
  lazy = false,
  src,
}: ProductThumbnailProps) {
  const loading = lazy ? 'lazy' : 'eager';

  return (
    <div className={['image', root, className].filter(Boolean).join(' ')}>
      <img alt={alt} className={image} loading={loading} src={src} />
      {hover && hoverImageSource && (
        <img
          alt=""
          aria-hidden="true"
          className={[image, hoverImage].join(' ')}
          data-product-thumbnail-hover-image
          loading={loading}
          src={hoverImageSource}
        />
      )}
      {children}
    </div>
  );
}
