import { Grid } from 'styled-system/jsx';
import { MegaMenuAD } from '@/components/common/organisms/Layout/SiteHeader/MegaMenuAD';
import { MegaMenuList } from '@/components/common/organisms/Layout/SiteHeader/MegaMenuList';
import type { MegaMenu } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';

type MegaMenuContentProps = {
  menu: MegaMenu;
  onClose: () => void;
};

export function MegaMenuContent({ menu, onClose }: MegaMenuContentProps) {
  return (
    <Grid
      gridTemplateColumns="minmax(0, 1fr) 358px"
      gap="4"
      w="min(1384px, calc(100% - 56px))"
      mx="auto"
      pt="34px"
      pb="38px"
    >
      <MegaMenuList columns={menu.columns} onClose={onClose} />
      <MegaMenuAD {...menu.promo} onClick={onClose} />
    </Grid>
  );
}
