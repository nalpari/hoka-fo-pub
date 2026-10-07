import type { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const iconBrand = css({
  display: 'inline-block',
  flexShrink: '0',
  width: 'var(--icon-brand-size)',
  height: 'var(--icon-brand-size)',
  backgroundColor: 'currentColor',
  maskImage: 'var(--icon-brand-mask)',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskImage: 'var(--icon-brand-mask)',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

export const iconBrandVariants = [
  'all-terrain',
  'breathable',
  'carbon-fiber-plate',
  'circularity',
  'cold-weather-rated',
  'downfill',
  'ethically-sourced',
  'insulated-fill',
  'natural-materials',
  'odor-resistant',
  'organic',
  'pfc-free',
  'pockets',
  'propulsive-plate',
  'recycled-materials',
  'resoleable',
  'slip-resistant',
  'snow',
  'sun-protection',
  'suspension-plate',
  'track',
  'trail-traction',
  'vegan',
  'warming',
  'water-resistant',
  'waterproof',
  'wickable',
  'wind-proof',
  'wind-resistant',
] as const;

export type IconBrandVariant = (typeof iconBrandVariants)[number];

export type IconBrandProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  variant: IconBrandVariant;
  size?: CSSProperties['width'];
  color?: CSSProperties['color'];
  title?: string;
};

export function IconBrand({
  variant,
  size = '24px',
  color,
  title,
  className,
  style,
  ...props
}: IconBrandProps) {
  const label = title ?? variant.replaceAll('-', ' ');

  return (
    <span
      {...props}
      className={[iconBrand, className].filter(Boolean).join(' ')}
      role={title ? 'img' : undefined}
      aria-label={title ? label : undefined}
      aria-hidden={title ? undefined : true}
      style={
        {
          '--icon-brand-size': size,
          '--icon-brand-mask': `url(/images/icon/brand/${variant}.svg)`,
          color,
          ...style,
        } as CSSProperties
      }
    />
  );
}
