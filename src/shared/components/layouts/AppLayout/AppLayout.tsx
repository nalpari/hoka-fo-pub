import { useState, type ReactNode } from 'react';
import { MenuDrawer } from '@/shared/components/organisms/Navigation/MenuDrawer/MenuDrawer';
import { SiteFooter } from '@/shared/components/organisms/Layout/SiteFooter/SiteFooter';
import { SiteHeader } from '@/shared/components/organisms/Layout/SiteHeader/SiteHeader';

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
  return (
    <>
      <SiteHeader
        cart={cart}
        onMenu={() => setMenuOpen(true)}
        isLoggedIn={isLoggedIn}
        wishlistCount={wishlistCount}
        recentCount={recentCount}
      />
      {menuOpen && <MenuDrawer close={() => setMenuOpen(false)} />}
      {children}
      <SiteFooter />
    </>
  );
}
