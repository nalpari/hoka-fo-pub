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
  px: '18',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'headerBorder',
  bg: 'var(--hoka-white)',
  _mobile: { gap: 0, pt: '0', pr: '9px', pb: '0', pl: 'var(--layout-mobile-inline-gutter)' },
});

export type SiteHeaderContainerProps = {
  cart: number;
  isLoggedIn: boolean;
  wishlistCount: number;
  activeMenu: MegaMenu['id'] | null;
  onEnterMenu: (menuId: MegaMenu['id']) => void;
  onEnterPreviousMenu: (menuId: MegaMenu['id']) => void;
  onHeaderToolsEnterPreviousMenu: () => void;
  onLogoClick: () => void;
  onMenu: () => void;
  onMenuOpen: (menuId: MegaMenu['id']) => void;
  onMenuToggle: (menuId: MegaMenu['id']) => void;
  onSearch: () => void;
};

export function SiteHeaderContainer({
  cart,
  isLoggedIn,
  wishlistCount,
  activeMenu,
  onEnterMenu,
  onEnterPreviousMenu,
  onHeaderToolsEnterPreviousMenu,
  onLogoClick,
  onMenu,
  onMenuOpen,
  onMenuToggle,
  onSearch,
}: SiteHeaderContainerProps) {
  const platform = usePlatform();

  return (
    <header className={header}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <HStack gap="6" alignItems="center">
          <HeaderLogo onClick={onLogoClick} />

          {platform === 'web' ? (
            <DesktopNavigation
              activeMenu={activeMenu}
              onEnterMenu={onEnterMenu}
              onEnterPreviousMenu={onEnterPreviousMenu}
              onMenuOpen={onMenuOpen}
              onMenuToggle={onMenuToggle}
            />
          ) : null}
        </HStack>

        <HStack gap="1.5" alignItems="center">
          <HeaderTools
            cart={cart}
            isLoggedIn={isLoggedIn}
            wishlistCount={wishlistCount}
            onEnterPreviousMenu={platform === 'web' ? onHeaderToolsEnterPreviousMenu : undefined}
            onSearch={onSearch}
          />
          <HeaderMobileMenuButton onClick={onMenu} />
        </HStack>
      </Flex>
    </header>
  );
}
