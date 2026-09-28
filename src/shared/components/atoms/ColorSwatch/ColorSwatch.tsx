import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const swatch = cva({
  base: {
    display: 'inline-grid',
    placeItems: 'center',
    w: '18px',
    h: '18px',
    border: '1px solid #bbb',
    borderRadius: 'full',
    bg: 'var(--swatch-color)',
    _focusVisible: { outline: '2px solid #111', outlineOffset: '2px' },
  },
  variants: {
    selected: { true: { outline: '2px solid #111', outlineOffset: '2px' }, false: {} },
    size: { sm: { w: '14px', h: '14px' }, md: {}, lg: { w: '24px', h: '24px' } },
  },
  defaultVariants: { size: 'md', selected: false },
});

export type ColorSwatchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  color: string;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

/** Accessible color selection control. Use `selected` with `aria-pressed` or a group selection state. */
export function ColorSwatch({
  color,
  selected,
  size,
  className,
  style,
  type = 'button',
  ...props
}: ColorSwatchProps) {
  return (
    <Button
      {...props}
      type={type}
      style={{ '--swatch-color': color, ...style } as CSSProperties}
      className={[swatch({ selected, size }), className].filter(Boolean).join(' ')}
    />
  );
}
