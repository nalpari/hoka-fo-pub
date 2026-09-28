import { Button } from '@/shared/components/atoms/Button/Button';
import { MegaMenuAD } from '@/shared/components/organisms/Layout/SiteHeader/MegaMenuAD';
import { MegaMenuList } from '@/shared/components/organisms/Layout/SiteHeader/MegaMenuList';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { css } from 'styled-system/css';

const styles = {
  overlay: css({
    position: 'fixed',
    zIndex: -1,
    inset: '88px 0 0',
    w: '100%',
    h: 'calc(100dvh - 88px)',
    border: 0,
    p: 0,
    bg: 'rgb(0 0 0 / 52%)',
    _mobile: { display: 'none' },
  }),
  menu: css({
    position: 'absolute',
    zIndex: 1,
    top: '88px',
    right: 0,
    left: 0,
    borderBottom: '1px solid var(--hoka-black)',
    bg: 'var(--hoka-white)',
    _mobile: { display: 'none' },
  }),
  inner: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 358px',
    gap: '4',
    w: 'min(1384px, calc(100% - 56px))',
    mx: 'auto',
    pt: '34px',
    pb: '38px',
  }),
};

type MegaMenuPanelProps = { menu: MegaMenu; onClose: () => void };

export function MegaMenuPanel({ menu, onClose }: MegaMenuPanelProps) {
  return (
    <>
      <Button variant="ghost" className={styles.overlay} aria-label="메뉴 닫기" onClick={onClose} />
      <section
        className={styles.menu}
        id={`mega-menu-${menu.id}`}
        aria-label={`${menu.label} 메뉴`}
      >
        <div className={styles.inner}>
          <MegaMenuList columns={menu.columns} onClose={onClose} />
          <MegaMenuAD {...menu.promo} onClick={onClose} />
        </div>
      </section>
    </>
  );
}
