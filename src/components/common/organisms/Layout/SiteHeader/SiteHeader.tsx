import { useEffect, useState } from 'react';
import { SearchOverlay } from '@/components/common/organisms/Search/SearchOverlay';
import { HeaderPromotionBanner } from '@/components/common/organisms/Layout/SiteHeader/HeaderPromotionBanner';
import { MegaMenuPanel } from '@/components/common/organisms/Layout/SiteHeader/MegaMenuPanel';
import { SiteHeaderContainer } from '@/components/common/organisms/Layout/SiteHeader/SiteHeaderContainer';
import { megaMenus, type MegaMenu } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';
import { usePlatform } from '@/context/platform';
import { SiteHeaderFrame } from '@/components/common/organisms/Layout/SiteHeader/SiteHeaderFrame';

type SiteHeaderProps = {
  fixedOnScroll?: boolean;
  cart: number;
  onMenu: () => void;
  isLoggedIn?: boolean;
  wishlistCount?: number;
  recentCount?: number;
};

type MenuFocusPosition = 'first' | 'last';

export function SiteHeader({
  fixedOnScroll = false,
  cart,
  onMenu,
  isLoggedIn = false,
  wishlistCount = 0,
}: SiteHeaderProps) {
  const platform = usePlatform();
  const [search, setSearch] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [searchError, setSearchError] = useState('');

  const changeSearchQuery = (query: string) => {
    setSearchError('');
    setSearchQuery(query);
  };

  const closeSearch = () => {
    const panel = document.getElementById('site-search-panel');
    if (platform === 'web' && panel?.contains(document.activeElement)) {
      document.getElementById('header-search-input')?.focus();
    }
    setSearch(false);
  };

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

  const openMegaMenu = (menuId: MegaMenu['id']) => {
    setSearch(false);
    setActiveMenu(menuId);
  };

  const toggleMegaMenu = (menuId: MegaMenu['id']) => {
    setSearch(false);
    setActiveMenu((current) => (current === menuId ? null : menuId));
  };

  const focusMegaMenuItem = (menuId: MegaMenu['id'], position: MenuFocusPosition) => {
    setActiveMenu(menuId);

    requestAnimationFrame(() => {
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          `#mega-menu-${menuId} a[href], #mega-menu-${menuId} button:not([disabled])`,
        ),
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
      document
        .querySelector<HTMLElement>(
          '#site-header-tools input, #site-header-tools a[href], #site-header-tools button',
        )
        ?.focus();
    });
  };

  return (
    <>
      <HeaderPromotionBanner />

      <SiteHeaderFrame onLeave={closeMegaMenu} fixedOnScroll={fixedOnScroll}>
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
          searchQuery={searchQuery}
          onSearchQueryChange={changeSearchQuery}
          searchError={searchError}
          searchOpen={search}
          onSearch={() => {
            setActiveMenu(null);
            setSearch(true);
          }}
        />

        {platform === 'web' && activeMegaMenu ? (
          <MegaMenuPanel
            menu={activeMegaMenu}
            onClose={closeMegaMenu}
            onFocusBoundary={handleMegaMenuFocusBoundary}
          />
        ) : null}
        {search ? (
          <SearchOverlay
            query={searchQuery}
            onQueryChange={changeSearchQuery}
            error={searchError}
            onErrorChange={setSearchError}
            onClose={closeSearch}
          />
        ) : null}
      </SiteHeaderFrame>
    </>
  );
}
