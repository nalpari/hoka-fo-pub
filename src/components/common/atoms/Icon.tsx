import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes } from 'react';

import { css } from 'styled-system/css';
import { token } from 'styled-system/tokens';

import { type IconAssetName, iconAssets } from './Icon.assets';

export type { IconAssetName } from './Icon.assets';

const iconClass = css({ display: 'block', flexShrink: 0, objectFit: 'contain' });

const iconMask = css({
  display: 'inline-block',
  verticalAlign: 'middle',
  flexShrink: 0,
  bg: 'currentColor',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

export type IconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'size' | 'src'> & {
  name: IconAssetName;
  size?: string | number;
  /** CSS color or Panda token. Monochrome assets follow currentColor by default. */
  color?: string;
  direction?: 'previous' | 'next';
};

const resolveIconColor = (color: string) =>
  color === 'currentColor'
    ? color
    : token.var(`colors.${color}` as Parameters<typeof token.var>[0], color);

/** 등록된 SVG를 이름으로 표시하며 단색·원본색 렌더링을 관리합니다. (Renders registered SVGs by name with monochrome or original colors.) */
export function Icon({
  name,
  size = '16px',
  color = 'currentColor',
  className,
  alt = '',
  role = 'img',
  direction = 'previous',
  style,
  ...props
}: IconProps) {
  const asset = iconAssets[name];
  const label = alt || props['aria-label'];
  const hidden = props['aria-hidden'] ?? (label ? undefined : true);
  const classes = [iconClass, className].filter(Boolean).join(' ');

  if (name === 'carousel-arrow') {
    return (
      <span
        {...(props as HTMLAttributes<HTMLSpanElement>)}
        aria-hidden={hidden}
        aria-label={label}
        role={role}
        className={classes}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'var(--icon-carousel-circle-color, var(--color-black-10))',
          ...style,
        }}
      >
        <span
          className={iconMask}
          style={{
            width: '100%',
            height: '100%',
            color: 'var(--icon-carousel-path-color, var(--color-black-40))',
            maskImage: `url(${asset.src})`,
            WebkitMaskImage: `url(${asset.src})`,
            transform: direction === 'next' ? 'rotate(180deg)' : undefined,
          }}
        />
      </span>
    );
  }

  if ('foreground' in asset && color !== 'currentColor') {
    return (
      <span
        {...(props as HTMLAttributes<HTMLSpanElement>)}
        aria-hidden={hidden}
        aria-label={label}
        role={role}
        className={classes}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'white',
          filter: asset.filter,
          ...style,
        }}
      >
        <span
          className={iconMask}
          style={{
            width: '100%',
            height: '100%',
            color: resolveIconColor(color),
            maskImage: `url(${asset.foreground})`,
            WebkitMaskImage: `url(${asset.foreground})`,
          }}
        />
      </span>
    );
  }

  if (asset.mode === 'mask') {
    return (
      <span
        {...(props as HTMLAttributes<HTMLSpanElement>)}
        aria-hidden={hidden}
        aria-label={label}
        role={role}
        className={[iconMask, className].filter(Boolean).join(' ')}
        style={
          {
            width: size,
            height: size,
            color: resolveIconColor(color),
            maskImage: `url(${asset.src})`,
            WebkitMaskImage: `url(${asset.src})`,
            ...style,
          } as CSSProperties
        }
      />
    );
  }

  return (
    <img
      {...props}
      src={asset.src}
      alt={alt}
      aria-hidden={hidden}
      role={role}
      className={classes}
      style={{
        width: size,
        height: size,
        filter: 'filter' in asset ? asset.filter : undefined,
        ...style,
      }}
    />
  );
}
