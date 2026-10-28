'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { megaMenus, type MegaMenu } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';
import { MenuDrawerFrame } from './MenuDrawerFrame';
import { MenuDrawerHeader } from './MenuDrawerHeader';
import { MenuDrawerNavigation } from './MenuDrawerNavigation';
import { MenuDrawerUtilityLinks } from './MenuDrawerUtilityLinks';

export type MenuDrawerProps = {
  close: () => void;
  isLoggedIn?: boolean;
};

export function MenuDrawer({ close, isLoggedIn = false }: MenuDrawerProps) {
  const [activeMenu, setActiveMenu] = useState<MegaMenu | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousMenuRef = useRef<MegaMenu['id'] | null>(null);

  useLayoutEffect(() => {
    if (!previousMenuRef.current) return;

    popupRef.current?.scrollTo({ top: 0 });
    if (activeMenu) {
      backRef.current?.focus();
    } else {
      popupRef.current
        ?.querySelector<HTMLButtonElement>('[data-mobile-menu="' + previousMenuRef.current + '"]')
        ?.focus();
    }
  }, [activeMenu]);

  const openMenu = (menu: MegaMenu) => {
    previousMenuRef.current = menu.id;
    setActiveMenu(menu);
  };

  return (
    <MenuDrawerFrame close={close} popupRef={popupRef} initialFocusRef={closeRef}>
      <MenuDrawerHeader close={close} isLoggedIn={isLoggedIn} closeButtonRef={closeRef} />
      <MenuDrawerNavigation
        activeMenu={activeMenu}
        menus={megaMenus}
        onSelectMenu={openMenu}
        onBack={() => setActiveMenu(null)}
        onNavigate={close}
        backButtonRef={backRef}
      />
      <MenuDrawerUtilityLinks onNavigate={close} />
    </MenuDrawerFrame>
  );
}
