import { DesktopNavigation } from '@/shared/components/organisms/Layout/SiteHeader/DesktopNavigation';
import { HeaderLogo } from '@/shared/components/organisms/Layout/SiteHeader/HeaderLogo';
import { HeaderMobileMenuButton } from '@/shared/components/organisms/Layout/SiteHeader/HeaderMobileMenuButton';
import { HeaderTools } from '@/shared/components/organisms/Layout/SiteHeader/HeaderTools';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { usePlatform } from '@/shared/context/platform';
import { SiteHeaderContent } from '@/shared/components/organisms/Layout/SiteHeader/SiteHeaderContent';

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
    <SiteHeaderContent
      primary={
        <>
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
        </>
      }
      actions={
        <>
          <HeaderTools
            cart={cart}
            isLoggedIn={isLoggedIn}
            wishlistCount={wishlistCount}
            onEnterPreviousMenu={platform === 'web' ? onHeaderToolsEnterPreviousMenu : undefined}
            onSearch={onSearch}
          />
          <HeaderMobileMenuButton onClick={onMenu} />
        </>
      }
    />
  );
}
