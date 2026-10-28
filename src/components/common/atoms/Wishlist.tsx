import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import type { CSSProperties } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { faHeartRegular, faHeartSolid } from '@/icons/fontAwesome';

const wishlist = css({
  display: 'block',
  flexShrink: '0',
});

const button = css.raw({
  display: 'grid',
  w: 'var(--wishlist-button-size, 38px)',
  h: 'var(--wishlist-button-size, 38px)',
  placeItems: 'center',
  border: '0',
  bg: 'transparent',
  cursor: 'pointer',
  _focusVisible: {
    outline: '2px solid var(--color-focus-ring, var(--focus-ring))',
    outlineOffset: '2px',
  },
});

export type WishlistProps = {
  active: boolean;
  ariaLabel: string;
  className?: string;
  size?: string;
  label?: string;
  iconSize?: string;
  onActiveChange: (active: boolean) => void;
};

/** Accessible wishlist toggle with outline and filled icon states. */
export function Wishlist({
  active,
  ariaLabel,
  className,
  size,
  label,
  iconSize,
  onActiveChange,
}: WishlistProps) {
  const platform = usePlatform();

  return (
    <BaseToggle
      aria-label={ariaLabel}
      className={[
        css(
          button,
          Boolean(label) && { display: 'inline-flex', gap: '1', w: 'auto', h: '4', p: '0' },
        ),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onPressedChange={onActiveChange}
      pressed={active}
      style={size ? ({ '--wishlist-button-size': size } as CSSProperties) : undefined}
      type="button"
    >
      <Icon
        alt=""
        className={wishlist}
        fontAwesomeIcon={active ? faHeartSolid : faHeartRegular}
        size={iconSize ?? (platform === 'mobile' ? '19px' : '24px')}
      />
      {label ? (
        <Typography as="span" variant="body5">
          {label}
        </Typography>
      ) : null}
    </BaseToggle>
  );
}
