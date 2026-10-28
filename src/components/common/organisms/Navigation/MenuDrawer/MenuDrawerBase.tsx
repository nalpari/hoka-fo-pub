import { Stack } from 'styled-system/jsx';
import { MenuDrawerShoppingLinks } from './MenuDrawerShoppingLinks';
import { MegaMenuAD } from '@/components/common/organisms/Layout/SiteHeader/MegaMenuAD';
import type { MegaMenu } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';

type MenuDrawerBaseProps = {
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onNavigate: () => void;
};

export function MenuDrawerBase({ menus, onSelectMenu, onNavigate }: MenuDrawerBaseProps) {
  return (
    <Stack gap="56px">
      <MenuDrawerShoppingLinks menus={menus} onSelectMenu={onSelectMenu} onNavigate={onNavigate} />
      <MegaMenuAD {...menus[0].promo} presentation="mobile" onClick={onNavigate} />
    </Stack>
  );
}
