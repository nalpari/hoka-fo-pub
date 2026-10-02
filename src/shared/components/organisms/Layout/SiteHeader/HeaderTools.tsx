import { HeaderAccount } from '@/shared/components/organisms/Layout/SiteHeader/HeaderAccount';
import { HeaderAuthLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderAuthLink';
import { HeaderCartLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderCartLink';
import { HeaderSearch } from '@/shared/components/organisms/Layout/SiteHeader/HeaderSearch';
import { usePlatform } from '@/shared/context/platform';
import { Flex, HStack } from 'styled-system/jsx';

type HeaderToolsProps = {
  cart: number;
  isLoggedIn: boolean;
  wishlistCount: number;
  onEnterPreviousMenu?: () => void;
  onSearch: () => void;
};

export function HeaderTools({
  cart,
  isLoggedIn,
  wishlistCount,
  onEnterPreviousMenu,
  onSearch,
}: HeaderToolsProps) {
  const platform = usePlatform();

  return (
    <Flex
      id="site-header-tools"
      gap={platform === 'mobile' ? '6px' : '16px'}
      alignItems="center"
      onKeyDown={(event) => {
        if (event.key !== 'Tab' || !event.shiftKey || !onEnterPreviousMenu) return;

        const firstFocusable = event.currentTarget.querySelector<HTMLElement>('a[href], button:not([disabled])');

        if (event.target !== firstFocusable) return;

        event.preventDefault();
        onEnterPreviousMenu();
      }}
    >
      <HeaderSearch onSearch={onSearch} />
      <HStack gap={platform === 'mobile' ? '6px' : '4px'}>
        <HeaderAccount isLoggedIn={isLoggedIn} wishlistCount={wishlistCount} />
        <HeaderCartLink cart={cart} />
      </HStack>
      {platform === 'web' && !isLoggedIn ? <HeaderAuthLink /> : null}
    </Flex>
  );
}
