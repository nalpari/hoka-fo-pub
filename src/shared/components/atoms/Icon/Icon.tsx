import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const iconClass = css({
  display: 'block',
  flexShrink: 0,
  objectFit: 'contain',
});

type IconSourceProps =
  | {
      /** Icon asset name. Ignored when `src` is supplied. */
      name: string;
      src?: string;
    }
  | {
      name?: never;
      src: string;
    };

export type IconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'size' | 'src'> &
  IconSourceProps & {
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
      <circle cx="24" cy="24" fill="var(--icon-carousel-circle-color, #F7F7F9)" r="24" />
      <path
        d="M16.0701 23.0703C15.5561 23.5844 15.5561 24.4156 16.0701 24.9242L26.5701 35.4297C27.0842 35.9437 27.9154 35.9437 28.424 35.4297C28.9326 34.9156 28.9381 34.0844 28.424 33.5758L18.8537 24L28.4295 14.4297C28.9436 13.9156 28.9436 13.0844 28.4295 12.5758C27.9154 12.0672 27.0842 12.0617 26.5756 12.5758L16.0701 23.0703Z"
        fill="var(--icon-carousel-path-color, #B3B3B3)"
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

export function Icon({
  name,
  size = '16px',
  color = 'currentColor',
  className,
  alt = '',
  role = 'img',
  direction,
  ...props
}: IconProps) {
  if (name === 'carousel-arrow') {
    return (
      <CarouselArrow className={className} direction={direction} size={size} style={props.style} />
    );
  }

  return (
    <img
      {...props}
      src={props.src ?? `/images/icon/${name}.svg`}
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
