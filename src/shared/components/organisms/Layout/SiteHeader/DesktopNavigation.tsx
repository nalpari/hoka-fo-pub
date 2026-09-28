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
      pb: '4px !important',
      bg: 'transparent !important',
      color: 'var(--hoka-black)',
      _after: {
        position: 'absolute',
        left: '50%',
        bottom: 0,
        w: '65px',
        h: '4px',
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
    fontFamily: "'The Future HOKA', sans-serif",
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: '18.2px',
    whiteSpace: 'nowrap',
  }),
};

type DesktopNavigationProps = {
  activeMenu: MegaMenu['id'] | null;
  onMenuChange: (id: MegaMenu['id']) => void;
};

export function DesktopNavigation({ activeMenu, onMenuChange }: DesktopNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="주요 메뉴">
      {megaMenus.map((menu) => (
        <Button
          key={menu.id}
          variant="ghost"
          className={styles.item({ active: activeMenu === menu.id })}
          aria-expanded={activeMenu === menu.id}
          aria-controls={`mega-menu-${menu.id}`}
          onMouseEnter={() => onMenuChange(menu.id)}
          onFocus={() => onMenuChange(menu.id)}
          onClick={() => onMenuChange(menu.id)}
        >
          <span className={styles.itemLabel}>{menu.label}</span>
        </Button>
      ))}
    </nav>
  );
}
