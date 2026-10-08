import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { config, type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { iconAssets, type IconAssetName } from '@/shared/icons/iconAssets';

config.autoAddCss = false;

const iconClass = css({
  display: 'block',
  flexShrink: 0,
  objectFit: 'contain',
});

const iconMask = css({
  display: 'block',
  flexShrink: 0,
  bg: 'currentColor',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

type IconSourceProps =
  | {
      /** Icon asset name. Ignored when `src` is supplied. */
      name: string;
      src?: string;
      fontAwesomeIcon?: never;
    }
  | {
      name?: never;
      src: string;
      fontAwesomeIcon?: never;
    };

type FontAwesomeSourceProps = {
  fontAwesomeIcon: IconDefinition;
  name?: never;
  src?: never;
};

export type IconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'size' | 'src'> &
  (IconSourceProps | FontAwesomeSourceProps) & {
    size?: string | number;
    color?: 'white' | 'currentColor' | 'black' | string;
    /** Direction for the reusable carousel arrow. */
    direction?: 'previous' | 'next';
  };

type CarouselArrowProps = Pick<IconProps, 'className' | 'size' | 'style' | 'direction'>;

function CarouselArrow({ className, size, style, direction = 'previous' }: CarouselArrowProps) {
  return (
    <svg
      aria-hidden="true"
      className={[iconClass, className].filter(Boolean).join(' ')}
      fill="none"
      height={size}
      style={
        {
          '--icon-carousel-rotation': direction === 'next' ? '180deg' : '0deg',
          ...style,
        } as CSSProperties
      }
      viewBox="0 0 48 48"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="24"
        cy="24"
        fill="var(--icon-carousel-circle-color, var(--color-black-10))"
        r="24"
      />
      <path
        d="M16.0701 23.0703C15.5561 23.5844 15.5561 24.4156 16.0701 24.9242L26.5701 35.4297C27.0842 35.9437 27.9154 35.9437 28.424 35.4297C28.9326 34.9156 28.9381 34.0844 28.424 33.5758L18.8537 24L28.4295 14.4297C28.9436 13.9156 28.9436 13.0844 28.4295 12.5758C27.9154 12.0672 27.0842 12.0617 26.5756 12.5758L16.0701 23.0703Z"
        fill="var(--icon-carousel-path-color, var(--color-black-40))"
        style={{ transform: 'rotate(var(--icon-carousel-rotation))', transformOrigin: 'center' }}
      />
    </svg>
  );
}

const resolveIconFilter = (color?: IconProps['color']) => {
  switch (color) {
    case 'white':
      return 'brightness(0) invert(1)';
    case 'black':
      return 'brightness(0)';
    case 'currentColor':
      return 'none';
    default:
      return color ? 'none' : 'none';
  }
};

const resolveIconColor = (color: IconProps['color']) => {
  if (color === 'white') return 'var(--color-white-000)';
  if (color === 'black') return 'var(--color-black-100)';
  return color;
};

export function Icon({
  name,
  fontAwesomeIcon,
  size = '16px',
  color = 'currentColor',
  className,
  alt = '',
  role = 'img',
  direction,
  ...props
}: IconProps) {
  if (fontAwesomeIcon) {
    return (
      <FontAwesomeIcon
        aria-hidden={alt ? undefined : true}
        aria-label={alt || undefined}
        className={[iconClass, className].filter(Boolean).join(' ')}
        icon={fontAwesomeIcon}
        role={role}
        style={{ width: size, height: size, color: resolveIconColor(color), ...props.style }}
      />
    );
  }

  if (name === 'carousel-arrow') {
    return (
      <CarouselArrow className={className} direction={direction} size={size} style={props.style} />
    );
  }

  if (name && !props.src) {
    const registeredIconSrc = iconAssets[name as IconAssetName];

    if (registeredIconSrc) {
      return (
        <img
          {...props}
          alt={alt}
          aria-hidden={alt ? undefined : true}
          className={[iconClass, className].filter(Boolean).join(' ')}
          role={role}
          src={registeredIconSrc}
          style={{
            width: size,
            height: size,
            filter: resolveIconFilter(color),
            ...props.style,
          }}
        />
      );
    }

    return (
      <span
        aria-hidden={alt ? undefined : true}
        aria-label={alt || undefined}
        className={[iconMask, className].filter(Boolean).join(' ')}
        role={role}
        style={{
          width: size,
          height: size,
          color: resolveIconColor(color),
          maskImage: `url(/images/icon/${name}.svg)`,
          WebkitMaskImage: `url(/images/icon/${name}.svg)`,
          ...props.style,
        }}
      />
    );
  }

  return (
    <img
      {...props}
      src={props.src}
      alt={alt}
      role={role}
      aria-hidden={alt ? undefined : true}
      className={[iconClass, className].filter(Boolean).join(' ')}
      style={{
        width: size,
        height: size,
        color,
        filter: resolveIconFilter(color),
        ...props.style,
      }}
    />
  );
}
