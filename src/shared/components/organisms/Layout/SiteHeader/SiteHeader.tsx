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
      if (event.key === 'Escape') setActiveMenu(null);
    };

    addEventListener('keydown', closeOnEscape);

    return () => removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMegaMenu = () => setActiveMenu(null);

  const toggleMegaMenu = (menuId: MegaMenu['id']) => {
    setActiveMenu((current) => (current === menuId ? null : menuId));
  };

  return (
    <>
      <div className={styles.headerArea} onMouseLeave={closeMegaMenu}>
        <SiteHeaderContainer
          cart={cart}
          isLoggedIn={isLoggedIn}
          wishlistCount={wishlistCount}
          activeMenu={activeMenu}
          onLogoClick={closeMegaMenu}
          onMenu={onMenu}
          onMenuChange={toggleMegaMenu}
          onSearch={() => setSearch(true)}
        />

        {platform === 'web' && activeMegaMenu ? (
          <MegaMenuPanel menu={activeMegaMenu} onClose={closeMegaMenu} />
        ) : null}
      </div>

      {search ? <SearchOverlay onClose={() => setSearch(false)} /> : null}
    </>
  );
}
