import { DesktopNavigation } from '@/shared/components/organisms/Layout/SiteHeader/DesktopNavigation';
import { HeaderLogo } from '@/shared/components/organisms/Layout/SiteHeader/HeaderLogo';
import { HeaderMobileMenuButton } from '@/shared/components/organisms/Layout/SiteHeader/HeaderMobileMenuButton';
import { HeaderTools } from '@/shared/components/organisms/Layout/SiteHeader/HeaderTools';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';
import { Flex, HStack } from 'styled-system/jsx';

const header = css({
  display: 'flex',
  alignItems: 'center',
  h: 'var(--layout-site-header-height)',
  px: '72px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'headerBorder',
  bg: 'var(--hoka-white)',
  _mobile: { gap: 0, p: '0 9px 0 var(--layout-mobile-inline-gutter)' },
});

export type SiteHeaderContainerProps = {
  cart: number;
  isLoggedIn: boolean;
  wishlistCount: number;
  activeMenu: MegaMenu['id'] | null;
  onLogoClick: () => void;
  onMenu: () => void;
  onMenuChange: (menuId: MegaMenu['id']) => void;
  onSearch: () => void;
};

export function SiteHeaderContainer({
  cart,
  isLoggedIn,
  wishlistCount,
  activeMenu,
  onLogoClick,
  onMenu,
  onMenuChange,
  onSearch,
}: SiteHeaderContainerProps) {
  const platform = usePlatform();

  return (
    <header className={header}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <HStack gap="24px" alignItems="center">
          <HeaderLogo onClick={onLogoClick} />

          {platform === 'web' ? (
            <DesktopNavigation activeMenu={activeMenu} onMenuChange={onMenuChange} />
          ) : null}
        </HStack>

        <HStack gap="6px" alignItems="center">
          <HeaderTools
            cart={cart}
            isLoggedIn={isLoggedIn}
            wishlistCount={wishlistCount}
            onSearch={onSearch}
          />
          <HeaderMobileMenuButton onClick={onMenu} />
        </HStack>
      </Flex>
    </header>
  );
}
