import type { ReactNode } from 'react';
import { css, cva } from 'styled-system/css';

const root = cva({
  base: {
    position: 'relative',
    overflow: 'hidden',
    bg: 'var(--color-surface-subtle)',
    aspectRatio: '1',
    w: '100%',
    h: 'auto',
    _hover: { '& [data-product-thumbnail-hover-image]': { opacity: '1' } },
    _mobile: { fontSize: '12px', '& [data-product-thumbnail-hover-image]': { display: 'none' } },
  },
  variants: {
    variant: {
      listing: {},
      showcase: {
        _mobile: { h: '160px', aspectRatio: 'auto' },
      },
    },
  },
  defaultVariants: { variant: 'listing' },
});

const image = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  w: '100%',
  h: 'auto',
  transform: 'translate(-50%, -50%)',
  bg: 'var(--color-surface-subtle)',
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
  variant?: ProductThumbnailVariant;
};

export type ProductThumbnailVariant = 'listing' | 'showcase';

/** Product image with optional lazy loading, hover image, and overlay slot. */
export function ProductThumbnail({
  alt,
  children,
  className,
  hover = false,
  hoverImage: hoverImageSource,
  lazy = false,
  src,
  variant = 'listing',
}: ProductThumbnailProps) {
  const loading = lazy ? 'lazy' : 'eager';

  return (
    <div className={['image', root({ variant }), className].filter(Boolean).join(' ')}>
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
