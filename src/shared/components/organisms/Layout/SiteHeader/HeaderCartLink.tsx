import { HeaderIconLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderIconLink';
import { css } from 'styled-system/css';
import { Circle } from 'styled-system/jsx';

const cartCount = css({
  position: 'absolute',
  top: '0.39px',
  left: '19.43px',
  bg: 'var(--hoka-brand)',
  color: 'var(--hoka-white)',
  fontSize: '8px',
  fontWeight: 400,
  lineHeight: 1,
  textAlign: 'center',
  _mobile: {
    top: '1px',
    left: '19px',
  },
});

export type HeaderCartLinkProps = {
  cart: number;
};

export function HeaderCartLink({ cart }: HeaderCartLinkProps) {
  return (
    <HeaderIconLink
      to="/cart"
      ariaLabel={`장바구니 ${cart}개`}
      icon={{ desktopSrc: '/images/header/cart.svg' }}
    >
      {cart > 0 ? (
        <Circle as="span" className={cartCount} size="12px">
          {cart}
        </Circle>
      ) : null}
    </HeaderIconLink>
  );
}
