import { HeaderIconLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderIconLink';
import { NotificationIcon } from '@/shared/components/atoms/NotificationIcon/NotificationIcon';
import { usePlatform } from '@/shared/context/platform';

export type HeaderCartLinkProps = {
  cart: number;
};

export function HeaderCartLink({ cart }: HeaderCartLinkProps) {
  const platform = usePlatform();

  return (
    <HeaderIconLink
      to="/cart"
      ariaLabel={`장바구니 ${cart}개`}
      iconSlot={
        <NotificationIcon
          variant="bag"
          count={cart}
          color="var(--color-black-100)"
          size={platform === 'mobile' ? '20px' : '22px'}
        />
      }
    />
  );
}
