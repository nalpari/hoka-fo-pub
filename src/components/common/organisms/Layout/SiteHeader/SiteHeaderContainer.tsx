import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Button } from '@/components/common/atoms/Button/Button';
import { megaMenus, type MegaMenu } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';
import { cva, css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { HeaderLogo } from '@/components/common/organisms/Layout/SiteHeader/HeaderLogo';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { usePlatform } from '@/context/platform';
import { HeaderTools } from '@/components/common/organisms/Layout/SiteHeader/HeaderTools';
import { SiteHeaderContent } from '@/components/common/organisms/Layout/SiteHeader/SiteHeaderContent';

const megaNavigationStyles = {
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
      _hover: {
        _after: {
          opacity: 1,
        },
      },
      _focusVisible: {
        _after: {
          opacity: 1,
        },
      },
      '&&': {
        '--button-padding-x': '0px',
        color: 'var(--hoka-black)',
      },
    },
    variants: {
      active: {
        true: {
          _after: {
            opacity: 1,
          },
        },
        false: {},
      },
    },
  }),
  itemLabel: css({
    whiteSpace: 'nowrap',
  }),
};

type HeaderMegaMenuNavigationProps = {
  activeMenu: MegaMenu['id'] | null;
  onEnterMenu: (id: MegaMenu['id']) => void;
  onEnterPreviousMenu: (id: MegaMenu['id']) => void;
  onMenuOpen: (id: MegaMenu['id']) => void;
  onMenuToggle: (id: MegaMenu['id']) => void;
};

function HeaderMegaMenuNavigation({
  activeMenu,
  onEnterMenu,
  onEnterPreviousMenu,
  onMenuOpen,
  onMenuToggle,
}: HeaderMegaMenuNavigationProps) {
  return (
    <HStack
      as="nav"
      flex={1}
      minW={0}
      h="58px"
      gap={0}
      _mobile={{
        display: 'none !important',
      }}
      aria-label="주요 메뉴"
    >
      {megaMenus.map((menu, index) => (
        <Button
          key={menu.id}
          variant="ghost"
          className={megaNavigationStyles.item({ active: activeMenu === menu.id })}
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
          <Typography variant="body4" className={megaNavigationStyles.itemLabel}>
            {menu.label}
          </Typography>
        </Button>
      ))}
    </HStack>
  );
}

const menuButtonStyles = css({
  order: 2,
  p: 0,
  border: 0,
  bg: 'transparent',
  color: 'var(--hoka-black)',
  lineHeight: 'hoka',
});

type HeaderMenuButtonProps = {
  onClick: () => void;
};

function HeaderMenuButton({ onClick }: HeaderMenuButtonProps) {
  const platform = usePlatform();

  if (platform !== 'mobile') return null;

  return (
    <IconButton className={menuButtonStyles} size="32px" onClick={onClick} aria-label="전체 메뉴">
      <Icon src="/images/header/m-menu.svg" size="20px" alt="" />
    </IconButton>
  );
}

export type SiteHeaderContainerProps = {
  cart: number;
  isLoggedIn: boolean;
  wishlistCount: number;
  activeMenu: MegaMenu['id'] | null;
  onEnterMenu: (menuId: MegaMenu['id']) => void;
  onEnterPreviousMenu: (menuId: MegaMenu['id']) => void;
  onHeaderToolsEnterPreviousMenu: () => void;
  onLogoClick: () => void;
  onMenu: () => void;
  onMenuOpen: (menuId: MegaMenu['id']) => void;
  onMenuToggle: (menuId: MegaMenu['id']) => void;
  onSearch: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  searchOpen?: boolean;
  searchError?: string;
};

/** 헤더 로고와 메뉴 및 도구 영역을 구성합니다. (Composes the header logo, navigation, and tools.) */
export function SiteHeaderContainer({
  cart,
  isLoggedIn,
  wishlistCount,
  activeMenu,
  onEnterMenu,
  onEnterPreviousMenu,
  onHeaderToolsEnterPreviousMenu,
  onLogoClick,
  onMenu,
  onMenuOpen,
  onMenuToggle,
  onSearch,
  searchQuery,
  onSearchQueryChange,
  searchOpen,
  searchError,
}: SiteHeaderContainerProps) {
  const platform = usePlatform();

  return (
    <SiteHeaderContent
      primary={
        <>
          <HeaderLogo onClick={onLogoClick} />

          {platform === 'web' ? (
            <HeaderMegaMenuNavigation
              activeMenu={activeMenu}
              onEnterMenu={onEnterMenu}
              onEnterPreviousMenu={onEnterPreviousMenu}
              onMenuOpen={onMenuOpen}
              onMenuToggle={onMenuToggle}
            />
          ) : null}
        </>
      }
      actions={
        <>
          <HeaderTools
            cart={cart}
            isLoggedIn={isLoggedIn}
            wishlistCount={wishlistCount}
            onEnterPreviousMenu={platform === 'web' ? onHeaderToolsEnterPreviousMenu : undefined}
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            searchOpen={searchOpen}
            searchError={searchError}
            onSearch={onSearch}
          />
          <HeaderMenuButton onClick={onMenu} />
        </>
      }
    />
  );
}
