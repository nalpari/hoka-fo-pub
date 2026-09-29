import { css } from 'styled-system/css';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';

const wishlist = css({
  w: '24px',
  h: '24px',
  _mobile: { w: '19px', h: '19px' },
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
    <IconButton
      aria-label={ariaLabel}
      aria-pressed={active}
      className={className}
      onClick={() => onActiveChange(!active)}
      size="38px"
    >
      <img
        alt=""
        aria-hidden="true"
        className={wishlist}
        src={active ? '/images/icon/wishlist-filled.svg' : '/images/icon/wishlist.svg'}
      />
    </IconButton>
  );
}
