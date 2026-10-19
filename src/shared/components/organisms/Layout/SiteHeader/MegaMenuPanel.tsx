import { Button } from '@/shared/components/atoms/Button/Button';
import { MegaMenuContent } from '@/shared/components/organisms/Layout/SiteHeader/MegaMenuContent';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

const styles = {
  overlay: css({
    position: 'fixed',
    zIndex: -1,
    inset: 'var(--layout-site-header-height) 0 0',
    w: '100%',
    h: 'calc(100dvh - var(--layout-site-header-height))',
    border: 0,
    p: 0,
    bg: 'color-mix(in srgb, var(--color-black-100) 52%, transparent)',
    _mobile: { display: 'none' },
  }),
};

type MegaMenuPanelProps = {
  menu: MegaMenu;
  onClose: () => void;
  onFocusBoundary: (menuId: MegaMenu['id'], boundary: 'first' | 'last') => void;
};

export function MegaMenuPanel({ menu, onClose, onFocusBoundary }: MegaMenuPanelProps) {
  return (
    <>
      <Button
        aria-label="메뉴 닫기"
        className={styles.overlay}
        onClick={onClose}
        tabIndex={-1}
        variant="ghost"
      />
      <Box
        as="section"
        pos="absolute"
        zIndex={1}
        top="var(--layout-site-header-height)"
        right={0}
        left={0}
        borderBottom="1px solid var(--hoka-black)"
        bg="var(--hoka-white)"
        _mobile={{ display: 'none' }}
        id={`mega-menu-${menu.id}`}
        aria-label={`${menu.label} 메뉴`}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;

          const focusable = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
          );

          const boundary = event.shiftKey ? focusable[0] : focusable.at(-1);

          if (event.target === boundary) {
            event.preventDefault();
            onFocusBoundary(menu.id, event.shiftKey ? 'first' : 'last');
          }
        }}
      >
        <MegaMenuContent menu={menu} onClose={onClose} />
      </Box>
    </>
  );
}
