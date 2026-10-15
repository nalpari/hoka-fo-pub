import type { RefObject } from 'react';
import Link from 'next/link';
import { css, cva } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { MegaMenuAD } from '@/shared/components/organisms/Layout/SiteHeader/MegaMenuAD';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { faChevronRight } from '@/shared/icons/fontAwesome';
import { MenuDrawerGroups } from './MenuDrawerGroups';

const main = cva({
  base: { flex: '1 0 auto', px: '16px', pt: '16px' },
  variants: { detail: { true: { pb: '33px' }, false: { pb: '48px' } } },
});

const row = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    w: '100%',
    minH: '49px',
    color: 'inherit',
    textDecoration: 'none',
    textAlign: 'left',
  },
  variants: {
    button: {
      true: {
        p: 0,
        border: 0,
        bg: 'transparent',
        cursor: 'pointer',
        _focusVisible: { outline: '2px solid currentColor', outlineOffset: '3px' },
      },
    },
    back: { true: { justifyContent: 'flex-start', gap: '12px', mb: '1px' } },
  },
});

const styles = {
  list: css({ listStyle: 'none', p: 0, m: 0 }),
  backIcon: css({ transform: 'rotate(180deg)' }),
  promo: css({ mt: '56px' }),
};

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
    <div className={main({ detail: activeMenu !== null })}>
      {activeMenu ? (
        <nav aria-label={activeMenu.label + ' 상세 메뉴'}>
          <button
            ref={backButtonRef}
            type="button"
            className={row({ button: true, back: true })}
            onClick={onBack}
            aria-label={activeMenu.label + ', 전체 메뉴로 돌아가기'}
          >
            <Icon
              className={styles.backIcon}
              fontAwesomeIcon={faChevronRight}
              size="14px"
              aria-hidden="true"
            />
            <Typography variant="navigationHeading">{activeMenu.label}</Typography>
          </button>
          <MenuDrawerGroups
            key={activeMenu.id}
            columns={activeMenu.columns}
            onNavigate={onNavigate}
          />
        </nav>
      ) : (
        <>
          <nav aria-label="쇼핑 메뉴">
            <ul className={styles.list}>
              <li>
                <Link className={row()} href="/products?sort=popular" onClick={onNavigate}>
                  <Typography variant="navigationHeading">Best</Typography>
                </Link>
              </li>
              {menus.map((menu) => (
                <li key={menu.id}>
                  <button
                    type="button"
                    data-mobile-menu={menu.id}
                    className={row({ button: true })}
                    onClick={() => onSelectMenu(menu)}
                  >
                    <Typography variant="navigationHeading">{menu.label}</Typography>
                    <Icon fontAwesomeIcon={faChevronRight} size="14px" aria-hidden="true" />
                  </button>
                </li>
              ))}
              <li>
                <Link className={row()} href="/launch-calendar" onClick={onNavigate}>
                  <Typography variant="navigationHeading">런칭캘린더</Typography>
                  <Icon fontAwesomeIcon={faChevronRight} size="14px" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>
          <MegaMenuAD
            {...menus[0].promo}
            presentation="mobile"
            className={styles.promo}
            onClick={onNavigate}
          />
        </>
      )}
    </div>
  );
}
