import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { css } from 'styled-system/css';

const wishlist = css({
  w: '6',
  h: '6',
  _mobile: { w: '19px', h: '19px' },
});

const button = css({
  display: 'grid',
  w: '38px',
  h: '38px',
  placeItems: 'center',
  border: '0',
  bg: 'transparent',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid var(--color-focus-ring, var(--focus-ring))', outlineOffset: '2px' },
});

export type WishlistProps = {
  active: boolean;
  ariaLabel: string;
  className?: string;
  onActiveChange: (active: boolean) => void;
};

/** Accessible wishlist toggle with outline and filled icon states. */
export function Wishlist({ active, ariaLabel, className, onActiveChange }: WishlistProps) {
  return (
    <BaseToggle
      aria-label={ariaLabel}
      className={[button, className].filter(Boolean).join(' ')}
      onPressedChange={onActiveChange}
      pressed={active}
      type="button"
    >
      <img
        alt=""
        aria-hidden="true"
        className={wishlist}
        src={active ? '/images/icon/wishlist-filled.svg' : '/images/icon/wishlist.svg'}
      />
    </BaseToggle>
  );
}
