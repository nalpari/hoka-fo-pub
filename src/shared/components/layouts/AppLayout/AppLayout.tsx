import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { usePlatform } from '@/shared/context/platform';
import { MenuDrawer } from '@/shared/components/organisms/Navigation/MenuDrawer/MenuDrawer';
import { SiteFooter } from '@/shared/components/organisms/Layout/SiteFooter/SiteFooter';
import { SiteHeader } from '@/shared/components/organisms/Layout/SiteHeader/SiteHeader';

/** 경로와 플랫폼에 맞는 사이트 프레임을 구성합니다. (Composes the site frame for the current route and platform.) */
export function AppLayout({
  cart,
  children,
  isLoggedIn = false,
  wishlistCount = 0,
  recentCount = 0,
}: {
  cart: number;
  children: ReactNode;
  isLoggedIn?: boolean;
  wishlistCount?: number;
  recentCount?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const platform = usePlatform();
  const pathname = usePathname();
  const searchPage = platform === 'mobile' && pathname === '/search';

  return (
    <>
      {!searchPage && (
        <SiteHeader
          fixedOnScroll={platform === 'mobile' && pathname === '/products'}
          cart={cart}
          onMenu={() => setMenuOpen(true)}
          isLoggedIn={isLoggedIn}
          wishlistCount={wishlistCount}
          recentCount={recentCount}
        />
      )}
      {menuOpen && <MenuDrawer close={() => setMenuOpen(false)} isLoggedIn={isLoggedIn} />}
      {children}
      {!searchPage && <SiteFooter />}
    </>
  );
}
