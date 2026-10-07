import { HeaderIconLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderIconLink';
import { NotificationIcon } from '@/shared/components/atoms/NotificationIcon/NotificationIcon';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';

const loginLink = css({ _mobile: { display: 'none' } });

export type HeaderAccountProps = {
  isLoggedIn: boolean;
  wishlistCount: number;
};

export function HeaderAccount({ isLoggedIn, wishlistCount }: HeaderAccountProps) {
  const platform = usePlatform();
  const iconSize = platform === 'mobile' ? '20px' : '22px';

  if (!isLoggedIn) {
    return (
      <HeaderIconLink
        to="/login"
        ariaLabel="로그인"
        className={loginLink}
        iconSlot={<NotificationIcon variant="user" size={iconSize} />}
      />
    );
  }

  return (
    <>
      <HeaderIconLink
        to="/mypage"
        ariaLabel="마이페이지"
        iconSlot={<NotificationIcon variant="user" size={iconSize} />}
      />
      <HeaderIconLink
        to="/mypage/wishlist"
        ariaLabel={`관심상품 ${wishlistCount}개`}
        iconSlot={<NotificationIcon variant="bag" count={wishlistCount} size={iconSize} />}
      />
    </>
  );
}
