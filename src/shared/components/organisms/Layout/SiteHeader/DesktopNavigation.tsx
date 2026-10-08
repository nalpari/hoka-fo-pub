import { Button } from '@/shared/components/atoms/Button/Button';
import { megaMenus, type MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { cva, css } from 'styled-system/css';

const styles = {
  navigation: css({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minW: 0,
    h: '58px',
    gap: 0,
    _mobile: { display: 'none !important' },
  }),
  item: cva({
    base: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      h: '58px',
      minH: '0 !important',
      border: '0 !important',
      borderRadius: 0,
      px: '18px',
      pt: '0 !important',
      pb: '1 !important',
      bg: 'transparent !important',
      color: 'var(--hoka-black)',
      _after: {
        position: 'absolute',
        left: '50%',
        bottom: 0,
        w: '65px',
        h: '1',
        bgImage: "url('/images/header/nav-active-line.svg')",
        bgPosition: 'center',
        bgRepeat: 'no-repeat',
        bgSize: '100% 100%',
        content: '""',
        opacity: 0,
        transform: 'translateX(-50%)',
        transition: 'opacity 0.18s ease',
      },
      _hover: { _after: { opacity: 1 } },
      _focusVisible: { _after: { opacity: 1 } },
    },
    variants: { active: { true: { _after: { opacity: 1 } }, false: {} } },
  }),
  itemLabel: css({
    fontSize: '14',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 'body',
    whiteSpace: 'nowrap',
  }),
};

type DesktopNavigationProps = {
  activeMenu: MegaMenu['id'] | null;
  onEnterMenu: (id: MegaMenu['id']) => void;
  onEnterPreviousMenu: (id: MegaMenu['id']) => void;
  onMenuOpen: (id: MegaMenu['id']) => void;
  onMenuToggle: (id: MegaMenu['id']) => void;
};

export function DesktopNavigation({
  activeMenu,
  onEnterMenu,
  onEnterPreviousMenu,
  onMenuOpen,
  onMenuToggle,
}: DesktopNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="주요 메뉴">
      {megaMenus.map((menu, index) => (
        <Button
          key={menu.id}
          variant="ghost"
          className={styles.item({ active: activeMenu === menu.id })}
          aria-expanded={activeMenu === menu.id}
          aria-controls={`mega-menu-${menu.id}`}
          data-mega-menu-trigger={menu.id}
          onMouseEnter={() => onMenuOpen(menu.id)}
          onFocus={() => onMenuOpen(menu.id)}
          onClick={() => onMenuToggle(menu.id)}
          onKeyDown={(event) => {
            if (event.key !== 'Tab') return;

            if (event.shiftKey) {
              if (index === 0) return;

              event.preventDefault();
              onEnterPreviousMenu(menu.id);
              return;
            }

            event.preventDefault();
            onEnterMenu(menu.id);
          }}
        >
          <span className={styles.itemLabel}>{menu.label}</span>
        </Button>
      ))}
    </nav>
  );
}
