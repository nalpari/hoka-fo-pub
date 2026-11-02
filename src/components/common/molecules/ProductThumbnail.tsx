import Image from 'next/image';
import type { ImageProps } from 'next/image';

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
    _mobile: { fontSize: '12', '& [data-product-thumbnail-hover-image]': { display: 'none' } },
  },
  variants: {
    variant: {
      listing: {},
      summary: { h: '100%', bg: '#F7F7F9', _mobile: { fontSize: 'inherit' } },
      showcase: {
        _mobile: { h: '160px', aspectRatio: 'auto' },
      },
    },
  },
  defaultVariants: { variant: 'listing' },
});

const image = css.raw({
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
  sizes?: string;
  imageProps?: Pick<ImageProps, 'width' | 'height' | 'loading'>;
};

export type ProductThumbnailVariant = 'listing' | 'showcase' | 'summary';

/** 상품 이미지의 반응형 로딩·호버 이미지와 오버레이를 제공합니다. (Provides responsive product image loading, hover images, and overlays.) */
export function ProductThumbnail({
  alt,
  children,
  className,
  hover = false,
  hoverImage: hoverImageSource,
  lazy = false,
  src,
  variant = 'listing',
  sizes: explicitSizes,
  imageProps,
}: ProductThumbnailProps) {
  const sizes =
    explicitSizes ??
    (variant === 'showcase'
      ? '(max-width: 1023px) 160px, 20vw'
      : '(max-width: 1023px) 50vw, (min-width: 2560px) 20vw, (min-width: 2240px) 25vw, 33vw');

  const loading = imageProps?.loading ?? (lazy ? 'lazy' : 'eager');
  const imageClassName = css(
    image,
    variant === 'summary' && {
      position: 'static',
      top: 'auto',
      left: 'auto',
      h: '100%',
      transform: 'none',
      objectFit: 'cover',
      bg: '#F7F7F9',
    },
  );

  return (
    <div className={['image', root({ variant }), className].filter(Boolean).join(' ')}>
      <Image
        alt={alt}
        className={imageClassName}
        loading={loading}
        src={src}
        width={imageProps?.width ?? 800}
        height={imageProps?.height ?? 800}
        sizes={sizes}
      />
      {hover && hoverImageSource && (
        <Image
          width={imageProps?.width ?? 800}
          height={imageProps?.height ?? 800}
          sizes={sizes}
          alt=""
          aria-hidden="true"
          className={[imageClassName, hoverImage].join(' ')}
          data-product-thumbnail-hover-image
          loading={loading}
          src={hoverImageSource}
        />
      )}
      {children}
    </div>
  );
}
