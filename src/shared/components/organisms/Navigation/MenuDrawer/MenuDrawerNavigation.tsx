import type { RefObject } from 'react';
import { Box } from 'styled-system/jsx';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { MenuDrawerGroups } from './MenuDrawerGroups';
import { MenuDrawerBase } from './MenuDrawerBase';
import { MenuDrawerBackButton } from './MenuDrawerBackButton';

type MenuDrawerNavigationProps = {
  activeMenu: MegaMenu | null;
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onBack: () => void;
  onNavigate: () => void;
  backButtonRef: RefObject<HTMLButtonElement | null>;
};

export function MenuDrawerNavigation({
  activeMenu,
  menus,
  onSelectMenu,
  onBack,
  onNavigate,
  backButtonRef,
}: MenuDrawerNavigationProps) {
  return (
    <Box flex="1 0 auto" px="4" pt="16px" pb={activeMenu ? '33px' : '48px'}>
      {activeMenu ? (
        <nav aria-label={activeMenu.label + ' 상세 메뉴'}>
          <MenuDrawerBackButton
            label={activeMenu.label}
            onBack={onBack}
            buttonRef={backButtonRef}
          />
          <MenuDrawerGroups
            key={activeMenu.id}
            columns={activeMenu.columns}
            onNavigate={onNavigate}
          />
        </nav>
      ) : (
        <MenuDrawerBase menus={menus} onSelectMenu={onSelectMenu} onNavigate={onNavigate} />
      )}
    </Box>
  );
}
