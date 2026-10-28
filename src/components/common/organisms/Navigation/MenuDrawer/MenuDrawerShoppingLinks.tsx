import Link from 'next/link';
import { cva } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { MegaMenu } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';
import { faChevronRight } from '@/icons/fontAwesome';

const row = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    w: '100%',
    py: '4',
    color: 'inherit',
    textDecoration: 'none',
    textAlign: 'left',
  },
  variants: {
    button: {
      true: {
        px: 0,
        border: 0,
        bg: 'transparent',
        cursor: 'pointer',
        _focusVisible: { outline: '2px solid currentColor', outlineOffset: '3px' },
      },
    },
  },
});

type ShoppingMenuItem =
  | { type: 'link'; id: string; label: string; href: string; showChevron: boolean }
  | { type: 'category'; id: string; label: string; menu: MegaMenu };

type MenuDrawerShoppingLinksProps = {
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onNavigate: () => void;
};

/** 모바일 메뉴의 쇼핑 관련 바로가기를 표시합니다. (Displays shopping shortcuts in the mobile menu.) */
export function MenuDrawerShoppingLinks({
  menus,
  onSelectMenu,
  onNavigate,
}: MenuDrawerShoppingLinksProps) {
  const items: ShoppingMenuItem[] = [
    { type: 'link', id: 'best', label: 'Best', href: '/products?sort=popular', showChevron: false },
    ...menus.map((menu): ShoppingMenuItem => ({
      type: 'category',
      id: menu.id,
      label: menu.label,
      menu,
    })),
    {
      type: 'link',
      id: 'launch-calendar',
      label: '런칭캘린더',
      href: '/launch-calendar',
      showChevron: true,
    },
  ];

  return (
    <nav aria-label="쇼핑 메뉴">
      <Stack as="ul" gap="0" listStyleType="none" p="0" m="0">
        {items.map((item) => {
          const content = (
            <>
              <Typography variant="heading8">{item.label}</Typography>
              {item.type === 'category' || item.showChevron ? (
                <Icon fontAwesomeIcon={faChevronRight} size="14px" aria-hidden="true" />
              ) : null}
            </>
          );

          return (
            <li key={`${item.type}:${item.id}`}>
              {item.type === 'link' ? (
                <Link className={row()} href={item.href} onClick={onNavigate}>
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  data-mobile-menu={item.id}
                  className={row({ button: true })}
                  onClick={() => onSelectMenu(item.menu)}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </Stack>
    </nav>
  );
}
