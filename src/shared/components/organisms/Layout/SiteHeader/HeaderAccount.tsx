import { HeaderIconLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderIconLink';
import { css } from 'styled-system/css';

const loginLink = css({ _mobile: { display: 'none' } });

export type HeaderAccountProps = {
  isLoggedIn: boolean;
  wishlistCount: number;
};

export function HeaderAccount({ isLoggedIn, wishlistCount }: HeaderAccountProps) {
  if (!isLoggedIn) {
    return (
      <HeaderIconLink
        to="/login"
        ariaLabel="로그인"
        className={loginLink}
        icon={{ desktopSrc: '/images/header/user.svg', alt: '로그인' }}
      />
    );
  }

  return (
    <>
      <HeaderIconLink
        to="/mypage"
        ariaLabel="마이페이지"
        icon={{ desktopSrc: '/images/header/user.svg', alt: '마이페이지' }}
      />
      <HeaderIconLink
        to="/mypage/wishlist"
        ariaLabel={`관심상품 ${wishlistCount}개`}
        icon={{ desktopSrc: '/images/header/cart.svg', alt: '관심상품' }}
      />
    </>
  );
}
