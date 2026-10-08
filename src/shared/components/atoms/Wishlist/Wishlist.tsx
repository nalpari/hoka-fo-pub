import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import type { CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { usePlatform } from '@/shared/context/platform';
import { faHeartRegular, faHeartSolid } from '@/shared/icons/fontAwesome';

const wishlist = css({
  display: 'block',
  flexShrink: '0',
});

const button = css({
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
  onActiveChange: (active: boolean) => void;
};

/** Accessible wishlist toggle with outline and filled icon states. */
export function Wishlist({ active, ariaLabel, className, size, onActiveChange }: WishlistProps) {
  const platform = usePlatform();

  return (
    <BaseToggle
      aria-label={ariaLabel}
      className={[button, className].filter(Boolean).join(' ')}
      onPressedChange={onActiveChange}
      pressed={active}
      style={size ? ({ '--wishlist-button-size': size } as CSSProperties) : undefined}
      type="button"
    >
      <Icon
        alt=""
        className={wishlist}
        fontAwesomeIcon={active ? faHeartSolid : faHeartRegular}
        size={platform === 'mobile' ? '19px' : '24px'}
      />
    </BaseToggle>
  );
}
