import { useEffect, useState } from 'react';
import { SearchOverlay } from '@/shared/components/organisms/Search/SearchOverlay';
import { MegaMenuPanel } from '@/shared/components/organisms/Layout/SiteHeader/MegaMenuPanel';
import { SiteHeaderContainer } from '@/shared/components/organisms/Layout/SiteHeader/SiteHeaderContainer';
import { megaMenus, type MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';

const styles = {
  headerArea: css({ position: 'sticky', top: 0, zIndex: 20 }),
};

type SiteHeaderProps = {
  cart: number;
  onMenu: () => void;
  isLoggedIn?: boolean;
  wishlistCount?: number;
  recentCount?: number;
};

type MenuFocusPosition = 'first' | 'last';

export function SiteHeader({
  cart,
  onMenu,
  isLoggedIn = false,
  wishlistCount = 0,
}: SiteHeaderProps) {
  const platform = usePlatform();
  const [search, setSearch] = useState(false);

  const [activeMenu, setActiveMenu] = useState<MegaMenu['id'] | null>(null);

  const activeMegaMenu = megaMenus.find((menu) => menu.id === activeMenu);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !activeMenu) return;

      const menuToRestore = activeMenu;
      setActiveMenu(null);

      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[data-mega-menu-trigger="${menuToRestore}"]`)?.focus();
      });
    };

    addEventListener('keydown', closeOnEscape);

    return () => removeEventListener('keydown', closeOnEscape);
  }, [activeMenu]);

  const closeMegaMenu = () => setActiveMenu(null);

  const openMegaMenu = (menuId: MegaMenu['id']) => setActiveMenu(menuId);

  const toggleMegaMenu = (menuId: MegaMenu['id']) => {
    setActiveMenu((current) => (current === menuId ? null : menuId));
  };

  const focusMegaMenuItem = (menuId: MegaMenu['id'], position: MenuFocusPosition) => {
    setActiveMenu(menuId);

    requestAnimationFrame(() => {
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(`#mega-menu-${menuId} a[href], #mega-menu-${menuId} button:not([disabled])`),
      );

      (position === 'first' ? focusable[0] : focusable.at(-1))?.focus();
    });
  };

  const focusMegaMenuTrigger = (menuId: MegaMenu['id']) => {
    setActiveMenu(menuId);

    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-mega-menu-trigger="${menuId}"]`)?.focus();
    });
  };

  const enterMegaMenu = (menuId: MegaMenu['id']) => focusMegaMenuItem(menuId, 'first');

  const enterPreviousMegaMenu = (menuId: MegaMenu['id']) => {
    const menuIndex = megaMenus.findIndex((menu) => menu.id === menuId);
    const previousMenu = megaMenus[menuIndex - 1];

    if (previousMenu) focusMegaMenuItem(previousMenu.id, 'last');
  };

  const enterLastMegaMenu = () => {
    const lastMenu = megaMenus.at(-1);

    if (lastMenu) focusMegaMenuItem(lastMenu.id, 'last');
  };

  const handleMegaMenuFocusBoundary = (menuId: MegaMenu['id'], boundary: 'first' | 'last') => {
    if (boundary === 'first') {
      focusMegaMenuTrigger(menuId);
      return;
    }

    const menuIndex = megaMenus.findIndex((menu) => menu.id === menuId);
    const nextMenu = megaMenus[menuIndex + 1];

    if (nextMenu) {
      focusMegaMenuTrigger(nextMenu.id);
      return;
    }

    setActiveMenu(null);

    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('#site-header-tools a[href], #site-header-tools button')?.focus();
    });
  };

  return (
    <>
      <div className={styles.headerArea} onMouseLeave={closeMegaMenu}>
        <SiteHeaderContainer
          cart={cart}
          isLoggedIn={isLoggedIn}
          wishlistCount={wishlistCount}
          activeMenu={activeMenu}
          onEnterMenu={enterMegaMenu}
          onEnterPreviousMenu={enterPreviousMegaMenu}
          onHeaderToolsEnterPreviousMenu={enterLastMegaMenu}
          onLogoClick={closeMegaMenu}
          onMenu={onMenu}
          onMenuOpen={openMegaMenu}
          onMenuToggle={toggleMegaMenu}
          onSearch={() => setSearch(true)}
        />

        {platform === 'web' && activeMegaMenu ? (
          <MegaMenuPanel
            menu={activeMegaMenu}
            onClose={closeMegaMenu}
            onFocusBoundary={handleMegaMenuFocusBoundary}
          />
        ) : null}
      </div>

      {search ? <SearchOverlay onClose={() => setSearch(false)} /> : null}
    </>
  );
}
