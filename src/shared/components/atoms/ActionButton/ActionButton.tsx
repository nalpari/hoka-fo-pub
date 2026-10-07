import { Button as BaseButton } from '@base-ui/react/button';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { css, cva } from 'styled-system/css';
import { Circle } from 'styled-system/jsx';

const actionButton = cva({
  base: {
    border: '0',
    p: '0',
    bg: 'transparent',
    color: 'var(--color-black-100)',
    cursor: 'pointer',
    _focusVisible: { outline: '4px solid var(--button-focus-ring)', outlineOffset: '2px' },
  },
  variants: {
    state: {
      default: {},
      circled: {
        bg: '#000000',
        color: 'var(--color-white-000)',
      },
      disabled: { color: 'var(--color-black-40)', cursor: 'not-allowed' },
    },
  },
  defaultVariants: { state: 'default' },
});

const actionGlyph = css({
  display: 'block',
  width: 'var(--action-icon-size)',
  height: 'var(--action-icon-size)',
  backgroundColor: 'currentColor',
  maskImage: 'var(--action-icon-mask)',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskImage: 'var(--action-icon-mask)',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

const actionAssetByType = {
  close: 'fa-xmark.svg',
  minus: 'fa-minus.svg',
  plus: 'fa-plus.svg',
} as const;

export type ActionButtonType = keyof typeof actionAssetByType;

export type ActionButtonState = 'default' | 'circled' | 'disabled';

export type ActionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'size' | 'type'
> & {
  iconSize?: CSSProperties['width'];
  size?: CSSProperties['width'];
  state?: ActionButtonState;
  type: ActionButtonType;
};

/** Figma action-button icon controls with typed state variants. */
export function ActionButton({
  className,
  disabled,
  iconSize = '24px',
  size = '24px',
  state = 'default',
  style,
  type,
  ...props
}: ActionButtonProps) {
  const isDisabled = disabled || state === 'disabled';
  const resolvedState = isDisabled ? 'disabled' : state;
  const asset = actionAssetByType[type];

  return (
    <Circle
      as={BaseButton}
      {...props}
      aria-disabled={isDisabled || undefined}
      className={[actionButton({ state: resolvedState }), className].filter(Boolean).join(' ')}
      disabled={isDisabled}
      size={size}
      style={
        {
          '--action-icon-mask': `url(/images/icon/action/${asset})`,
          '--action-icon-size': iconSize,
          ...style,
        } as CSSProperties
      }
      type="button"
    >
      <span aria-hidden="true" className={actionGlyph} />
    </Circle>
  );
}
