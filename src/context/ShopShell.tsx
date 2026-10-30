'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Dialog } from '@base-ui/react/dialog';
import { Drawer } from '@base-ui/react/drawer';
import {
  type AnchorHTMLAttributes,
  type ComponentPropsWithoutRef,
  type ComponentType,
  createContext,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
  type RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { type Platform, PlatformProvider, usePlatform } from '@/context/platform';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useScrollPin } from '@/lib/useScrollPin';

import { css, cva, cx } from 'styled-system/css';
import {
  Box,
  Circle,
  Divider,
  Flex,
  Grid,
  HStack,
  Square as ImportedSquare,
  type SquareProps,
  Stack,
  VStack,
  Wrap,
} from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';

import { Accordion, type AccordionEntry } from '@/components/common/atoms/Accordion';
import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import {
  Carousel,
  CarouselControls,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { useCarousel } from '@/components/common/molecules/Carousel/CarouselContext';

import { SearchHeader } from '@/components/common/organisms/Search/SearchHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { type FooterGroup, footerGroups, socials } from '@/data/footerData';
import { type HeaderPromotionItem, headerPromotionItems } from '@/data/headerPromotionData';
import { type MegaMenu, type MegaMenuPromo, megaMenus } from '@/data/megaMenu';
import { autocompleteSearches, popularSearches, suggestedSearches } from '@/data/searchOverlayData';
import {
  faBox,
  faChevronRight,
  faComments,
  faLocationDot,
  faUser,
  faUserSolid,
  faXmark,
} from '@/icons/fontAwesome';
import type { Product } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

const styles = {
  viewport: css({ position: 'fixed', inset: 0, zIndex: 100 }),
  backdrop: css({ position: 'fixed', inset: 0, zIndex: 100, bg: 'transparent' }),
  popup: css({
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    bg: 'var(--color-white-000)',
    color: 'var(--color-text-primary)',
  }),
};

type MenuDrawerFrameProps = {
  children: ReactNode;
  close: () => void;
  popupRef: RefObject<HTMLDivElement | null>;
  initialFocusRef: RefObject<HTMLButtonElement | null>;
};

function MenuDrawerFrame({ children, close, popupRef, initialFocusRef }: MenuDrawerFrameProps) {
  return (
    <Drawer.Root open onOpenChange={(open) => !open && close()} swipeDirection="left">
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.backdrop} />
        <Drawer.Viewport className={`${styles.viewport} platform-mobile`}>
          <Drawer.Popup
            ref={popupRef}
            initialFocus={initialFocusRef}
            aria-label="전체 메뉴"
            className={styles.popup}
          >
            {children}
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const authLink = css({
  whiteSpace: 'nowrap',
  '&&': {
    color: 'var(--hoka-black)',
  },
});

type HeaderAuthLinkProps = {
  onNavigate?: () => void;
};

function HeaderAuthLink({ onNavigate }: HeaderAuthLinkProps) {
  return (
    <HStack gap="1.5" alignItems="center">
      <Link href="/login" className={authLink} onClick={onNavigate}>
        <Typography variant="body3">로그인</Typography>
      </Link>
      <Divider aria-hidden="true" orientation="vertical" h="4" w="1px" bg="var(--hoka-black)" />
      <Link href="/signup" className={authLink} onClick={onNavigate}>
        <Typography variant="body3">회원가입</Typography>
      </Link>
    </HStack>
  );
}

const MenuDrawerHeaderStyles = {
  auth: hstack({ gap: '3', color: 'inherit', textDecoration: 'none' }),
  close: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid currentColor!', outlineOffset: '3px!' },
  }),
};

type MenuDrawerHeaderProps = {
  close: () => void;
  isLoggedIn: boolean;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

function MenuDrawerHeader({ close, isLoggedIn, closeButtonRef }: MenuDrawerHeaderProps) {
  return (
    <HStack
      gap="0"
      justifyContent="space-between"
      minH="58px"
      flexShrink={0}
      px="4"
      borderBottom="1px solid var(--color-black-10)"
    >
      {isLoggedIn ? (
        <Link className={MenuDrawerHeaderStyles.auth} href="/mypage" onClick={close}>
          <Icon fontAwesomeIcon={faUser} size="18px" aria-hidden="true" />
          <Typography variant="body3">마이페이지</Typography>
        </Link>
      ) : (
        <HStack gap="3">
          <Icon fontAwesomeIcon={faUser} size="18px" aria-hidden="true" />
          <HeaderAuthLink onNavigate={close} />
        </HStack>
      )}
      <Button
        variant="icon"
        ref={closeButtonRef}
        size={18}
        className={MenuDrawerHeaderStyles.close}
        aria-label="메뉴 닫기"
        onClick={close}
      >
        <Icon fontAwesomeIcon={faXmark} size="18px" aria-hidden="true" />
      </Button>
    </HStack>
  );
}

const MenuDrawerGroupsStyles = {
  accordion: css({ '& h3': { m: 0 } }),
  group: css({ minH: '50px' }),
  panel: css({ pt: '4', pb: '6' }),
  subLink: css({
    display: 'flex',
    alignItems: 'center',
    pl: '4',
    color: 'inherit',
    textDecoration: 'none',
  }),
  sale: css({ color: '#ff0000' }),
  indicator: css({
    position: 'relative',
    display: 'block',
    w: '16px',
    h: '16px',
    _before: {
      content: '""',
      position: 'absolute',
      left: '2px',
      top: '7px',
      w: '13px',
      h: '1.5px',
      bg: 'currentColor',
    },
    _after: {
      content: '""',
      position: 'absolute',
      left: '8px',
      top: '1px',
      w: '1.5px',
      h: '13px',
      bg: 'currentColor',
    },
    'button[aria-expanded="true"] &': { _after: { display: 'none' } },
  }),
};

type MenuDrawerGroupsProps = {
  columns: readonly MegaMenu['columns'][number][];
  onNavigate: () => void;
};

/** 모바일 메뉴의 카테고리 그룹과 하위 링크를 표시합니다. (Displays mobile menu category groups and their links.) */
function MenuDrawerGroups({ columns, onNavigate }: MenuDrawerGroupsProps) {
  const groups = columns.filter((column) => !column.to);

  return (
    <>
      <Accordion
        multiple={false}
        className={MenuDrawerGroupsStyles.accordion}
        triggerClassName={MenuDrawerGroupsStyles.group}
        panelClassName={MenuDrawerGroupsStyles.panel}
        defaultValue={groups[0] ? [groups[0].title] : []}
        indicator={<span className={MenuDrawerGroupsStyles.indicator} />}
        items={groups.map((column) => ({
          value: column.title,
          title: <Typography variant="heading8">{column.title}</Typography>,
          content: (
            <Stack as="ul" gap="7" listStyleType="none" p="0" m="0">
              {column.items.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    className={cx(
                      MenuDrawerGroupsStyles.subLink,
                      item.label === 'Sale' && MenuDrawerGroupsStyles.sale,
                    )}
                    href={item.to}
                    onClick={onNavigate}
                  >
                    <Typography
                      variant="body3"
                      weight={item.label === 'Sale' ? 'medium' : undefined}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </Stack>
          ),
        }))}
      />
      {columns
        .filter((column) => column.to)
        .map((column) => (
          <Link
            key={column.title}
            href={column.to!}
            onClick={onNavigate}
            className={css({
              display: 'flex',
              alignItems: 'center',
              minH: '50px',
              color: 'inherit',
              textDecoration: 'none',
            })}
          >
            <Typography variant="heading8">{column.title}</Typography>
          </Link>
        ))}
    </>
  );
}

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
function MenuDrawerShoppingLinks({
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

type MegaMenuADProps = MegaMenuPromo & {
  onClick?: () => void;
  presentation?: 'desktop' | 'mobile';
  className?: string;
};

/** 메가 메뉴의 프로모션 링크와 텍스트를 표시합니다. (Displays a promotional link and copy in the mega menu.) */
function MegaMenuAD({
  to,
  imageSrc,
  title,
  onClick,
  presentation = 'desktop',
  className,
}: MegaMenuADProps) {
  const isMobile = presentation === 'mobile';

  return (
    <Link
      href={to}
      onClick={onClick}
      className={cx(
        css({
          display: 'block',
          w: isMobile ? '100%' : '358px',
          aspectRatio: isMobile ? '1' : undefined,
          color: isMobile ? 'var(--color-white-000)' : undefined,
          textDecoration: isMobile ? 'none' : undefined,
          overflow: isMobile ? 'hidden' : undefined,
          _focusVisible: {
            '& > [data-mega-menu-ad-card]': {
              outline: '2px solid var(--hoka-black)',
              outlineOffset: '3px',
            },
          },
        }),
        className,
      )}
    >
      <ImportedSquare
        pos="relative"
        overflow="hidden"
        data-mega-menu-ad-card
        size={isMobile ? '100%' : '358px'}
      >
        <Image
          className={css({ display: 'block', w: '100%', h: '100%', objectFit: 'cover' })}
          src={imageSrc}
          alt=""
          fill
          sizes={isMobile ? '100vw' : '358px'}
        />
        <VStack
          alignItems="flex-start"
          justifyContent="flex-end"
          pos="absolute"
          w="100%"
          h="100%"
          left="0"
          bottom="0"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          css={{ '&&': { color: 'var(--hoka-white)' } }}
          gap={isMobile ? '8px' : '4'}
          p={isMobile ? '24px 22px' : '30px 24px'}
          bgImage={
            isMobile
              ? 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)'
              : 'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 32%, color-mix(in srgb, var(--color-black-100) 72%, transparent) 100%)'
          }
        >
          <Typography
            as={isMobile ? 'h2' : 'h3'}
            variant="body1"
            weight="black"
            className={css({ m: 0 })}
          >
            {title}
          </Typography>
          <Typography
            variant={isMobile ? 'textLink2' : 'textLink1'}
            className={css({
              textDecoration: 'underline',
              textDecorationStyle: 'solid',
              textUnderlineOffset: isMobile ? '3px' : '2px',
            })}
          >
            자세히 보기
          </Typography>
        </VStack>
      </ImportedSquare>
    </Link>
  );
}

type MenuDrawerBaseProps = {
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onNavigate: () => void;
};

function MenuDrawerBase({ menus, onSelectMenu, onNavigate }: MenuDrawerBaseProps) {
  return (
    <Stack gap="56px">
      <MenuDrawerShoppingLinks menus={menus} onSelectMenu={onSelectMenu} onNavigate={onNavigate} />
      <MegaMenuAD {...menus[0].promo} presentation="mobile" onClick={onNavigate} />
    </Stack>
  );
}

const MenuDrawerBackButtonStyles = {
  button: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    w: '100%!',
    mb: '1px',
    py: '4',
    px: 0,
    textDecoration: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid currentColor!', outlineOffset: '3px!' },
  }),
  backIcon: css({ transform: 'rotate(180deg)' }),
};

type MenuDrawerBackButtonProps = {
  label: string;
  onBack: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

function MenuDrawerBackButton({ label, onBack, buttonRef }: MenuDrawerBackButtonProps) {
  return (
    <Button
      variant="icon"
      ref={buttonRef}
      size="auto"
      className={MenuDrawerBackButtonStyles.button}
      onClick={onBack}
      aria-label={label + ', 전체 메뉴로 돌아가기'}
    >
      <Flex alignItems="center" justifyContent="flex-start" gap="12px">
        <Icon
          className={MenuDrawerBackButtonStyles.backIcon}
          fontAwesomeIcon={faChevronRight}
          size="14px"
          aria-hidden="true"
        />
        <Typography variant="heading5">{label}</Typography>
      </Flex>
    </Button>
  );
}

type MenuDrawerNavigationProps = {
  activeMenu: MegaMenu | null;
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onBack: () => void;
  onNavigate: () => void;
  backButtonRef: RefObject<HTMLButtonElement | null>;
};

function MenuDrawerNavigation({
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

const utilityItems = [
  { label: '마이페이지', to: '/mypage', icon: faUserSolid },
  { label: 'HOKA 멤버십', to: '/support/member-benefits', icon: null },
  { label: '주문/배송 조회', to: '/mypage/orders', icon: faBox },
  { label: '매장 찾기', to: '/support/store', icon: faLocationDot },
  { label: '고객센터', to: '/support', icon: faComments },
] as const;

function MenuDrawerUtilityLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Box
      as="nav"
      aria-label="고객 지원 메뉴"
      flexShrink="0"
      px="4"
      pt="8"
      pb="calc(32px + env(safe-area-inset-bottom))"
      bg="var(--color-black-100)"
      color="var(--color-text-inverse)"
    >
      <Stack as="ul" gap="1" listStyleType="none" p="0" m="0">
        {utilityItems.map((item) => (
          <li key={item.to}>
            <Link
              href={item.to}
              onClick={onNavigate}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                minH: '9',
                color: 'inherit',
                textDecoration: 'none',
              })}
            >
              <Flex
                as="span"
                w="24px"
                h="24px"
                flexShrink="0"
                alignItems="center"
                justifyContent="flex-start"
              >
                {item.icon ? (
                  <Icon fontAwesomeIcon={item.icon} size="16px" aria-hidden="true" />
                ) : (
                  <Icon name="navigation/membership" size="16px" alt="" />
                )}
              </Flex>
              <Typography variant="heading10">{item.label}</Typography>
            </Link>
          </li>
        ))}
      </Stack>
    </Box>
  );
}

type MenuDrawerProps = {
  close: () => void;
  isLoggedIn?: boolean;
};

/** 모바일 메뉴의 탐색과 닫기 동작을 구성합니다 (Displays the menu drawer composition). */
function MenuDrawer({ close, isLoggedIn = false }: MenuDrawerProps) {
  const [activeMenu, setActiveMenu] = useState<MegaMenu | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousMenuRef = useRef<MegaMenu['id'] | null>(null);

  useLayoutEffect(() => {
    if (!previousMenuRef.current) return;

    popupRef.current?.scrollTo({ top: 0 });
    if (activeMenu) {
      backRef.current?.focus();
    } else {
      popupRef.current
        ?.querySelector<HTMLButtonElement>('[data-mobile-menu="' + previousMenuRef.current + '"]')
        ?.focus();
    }
  }, [activeMenu]);

  const openMenu = (menu: MegaMenu) => {
    previousMenuRef.current = menu.id;
    setActiveMenu(menu);
  };

  return (
    <MenuDrawerFrame close={close} popupRef={popupRef} initialFocusRef={closeRef}>
      <MenuDrawerHeader close={close} isLoggedIn={isLoggedIn} closeButtonRef={closeRef} />
      <MenuDrawerNavigation
        activeMenu={activeMenu}
        menus={megaMenus}
        onSelectMenu={openMenu}
        onBack={() => setActiveMenu(null)}
        onNavigate={close}
        backButtonRef={backRef}
      />
      <MenuDrawerUtilityLinks onNavigate={close} />
    </MenuDrawerFrame>
  );
}

const FooterBrandLogoStyles = {
  logo: css({
    display: 'block',
    w: '104px',
    h: 'auto',
    objectFit: 'contain',
    _mobile: { w: '115px' },
  }),
};

function FooterBrandLogo() {
  return (
    <Image
      className={FooterBrandLogoStyles.logo}
      src="/images/footer/hoka-footer-brand-fly.svg"
      alt="HOKA — Fly Human Fly"
      width={124}
      height={24}
      sizes="(max-width: 1024px) 115px, 104px"
    />
  );
}

// Panda patterns keep div attributes in their generated types even when using as="a".
const Square = ImportedSquare as ComponentType<
  Omit<SquareProps, keyof AnchorHTMLAttributes<HTMLAnchorElement> | 'as'> &
    AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }
>;

const socialLink = css({
  color: 'var(--color-text-inverse)',
  flexShrink: '0',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  _hover: {
    borderColor: 'color-mix(in srgb, var(--color-white-000) 80%, transparent)',
    backgroundColor: 'color-mix(in srgb, var(--color-white-000) 12%, transparent)',
  },
  _focusVisible: {
    outline: '2px solid currentColor',
    outlineOffset: '2px',
  },
});

const socialIcon = css({
  display: 'block',
  width: '24px',
  height: '24px',
  objectFit: 'contain',
  flexShrink: '0',
  filter: 'brightness(0) invert(1)',
});

type SocialIconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  file: string;
  href?: string;
};

/** 소셜 채널 링크를 아이콘으로 표시합니다 (Displays the social icon link composition). */
function SocialIconLink({ label, file, href = '#', className, ...props }: SocialIconLinkProps) {
  return (
    <Square
      as="a"
      size="24px"
      {...props}
      href={href}
      className={[socialLink, className].filter(Boolean).join(' ')}
      aria-label={label}
      title={label}
    >
      <Image
        src={`/images/icon/social/${file}`}
        alt={label}
        className={socialIcon}
        width={24}
        height={24}
      />
    </Square>
  );
}

function FooterSocialLinks() {
  return (
    <Flex justifyContent="flex-start" alignItems="center" gap="4">
      {socials.map((social) => (
        <SocialIconLink key={social.label} {...social} />
      ))}
    </Flex>
  );
}

function FooterBrandSocial() {
  return (
    <Stack
      alignItems="flex-start"
      gap="22px"
      _mobile={{
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        w: '100%',
      }}
    >
      <FooterBrandLogo />
      <FooterSocialLinks />
    </Stack>
  );
}

const FooterLocaleSelectorsStyles = {
  link: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    _hover: { textDecoration: 'underline' },
  }),
  flag: css({
    display: 'block',
    w: '16px',
    h: '12px',
    flexShrink: 0,
  }),
  arrow: css({
    w: '12px',
    h: '12px',
    pos: 'relative',
    top: '1px',
  }),
};

function FooterLocaleSelectors() {
  return (
    <Link href="/locales" className={FooterLocaleSelectorsStyles.link}>
      <Image
        className={FooterLocaleSelectorsStyles.flag}
        src="/images/flag/kr.svg"
        alt="대한민국"
        width={16}
        height={12}
      />
      <HStack gap="0">
        <Typography variant="body5" tone="inverse">
          Visit our international sites
        </Typography>
        <Image
          className={FooterLocaleSelectorsStyles.arrow}
          src="/images/icon/chevron-right.svg"
          alt=""
          width={16}
          height={16}
        />
      </HStack>
    </Link>
  );
}

function FooterBrand() {
  return (
    <Stack
      gridArea="brand"
      _mobile={{ gap: '9' }}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <FooterBrandSocial />
      <FooterLocaleSelectors />
    </Stack>
  );
}

const FooterLegalLinksStyles = {
  meta: css({
    fontFamily: 'korean',
    fontSize: '14',
    lineHeight: '1.5',
    letterSpacing: 'korean',
    _mobile: { fontSize: '12' },
    '& span > span, & span > a, & p': { fontSize: 'inherit' },
    '& h3, & p, & span, & a, & div': { textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic' },
  }),
  row: css({
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: '4',
  }),
  privacy: css({ fontWeight: 'bold' }),
  businessLink: css({ textDecoration: 'underline', textUnderlineOffset: '4px' }),
};

function FooterLegalLinks() {
  const platform = usePlatform();

  return (
    <Stack
      as="section"
      gridArea="legal"
      aria-label="사업자 정보"
      gap={platform === 'mobile' ? '5' : '22px'}
    >
      <Typography as="h3" web="body3" mo="body4" tone="inverse">
        ㈜ 이랜드글로벌스포츠
      </Typography>
      <Stack gap={platform === 'mobile' ? '12px' : '18px'} className={FooterLegalLinksStyles.meta}>
        <Flex className={FooterLegalLinksStyles.row}>
          <Link href="/support/terms">서비스이용약관</Link>
          <Link href="/support/terms?tab=privacy" className={FooterLegalLinksStyles.privacy}>
            개인정보처리방침
          </Link>
        </Flex>
        <Flex className={FooterLegalLinksStyles.row}>
          <Typography as="span">
            고객센터 :{' '}
            <Typography variant="body5" tone="inverse">
              1234-0000
            </Typography>
          </Typography>
          <Typography as="span">
            통신판매 신고번호 :{' '}
            <Typography variant="body5" tone="inverse">
              0000-0000-0000
            </Typography>
          </Typography>
        </Flex>
        <div>주소 : 서울특별시 금천구 가산디지털1로 159</div>
        <Flex
          className={FooterLegalLinksStyles.row}
          _mobile={{
            w: '100%',
            maxW: '343px',
            gap: '0',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography as="span">대표이사 : 조동주</Typography>
          <Typography as="span">
            사업자 등록번호 :{' '}
            <Typography variant="body5" tone="inverse">
              156-88-01028
            </Typography>
          </Typography>
          <Link
            href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1568801028"
            target="_blank"
            rel="noreferrer"
            className={FooterLegalLinksStyles.businessLink}
          >
            사업자정보확인
          </Link>
        </Flex>
        <Flex className={FooterLegalLinksStyles.row}>
          <Typography as="span">개인정보보호책임자 : 김태위</Typography>
          <Typography as="span">
            대표이메일 :{' '}
            <Typography as="a" href="mailto:webmaster@hoka.com" variant="body5" tone="inverse">
              webmaster@hoka.com
            </Typography>
          </Typography>
        </Flex>
        <Typography as="p" variant="body5" tone="inverse">
          호스팅 서비스 제공자 : ㈜쓰리탑
        </Typography>
        <Typography as="p" variant="body5" tone="inverse">
          © 2027 Deckers Brands
        </Typography>
      </Stack>
    </Stack>
  );
}

const FooterNavigationLinksStyles = {
  link: css({ color: 'var(--color-black-10)' }),
};

type FooterNavigationLinksProps = {
  links: FooterGroup['links'];
  platform: Platform;
};

function FooterNavigationLinks({ links, platform }: FooterNavigationLinksProps) {
  return (
    <VStack
      as="ul"
      alignItems="flex-start"
      gap={platform === 'mobile' ? '2' : '10px'}
      m={0}
      p={0}
      listStyle="none"
    >
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.to} className={FooterNavigationLinksStyles.link}>
            <Typography variant="body4" tone="inverse">
              {link.label}
            </Typography>
          </Link>
        </li>
      ))}
    </VStack>
  );
}

const FooterNavigationWebStyles = {
  title: css({
    color: 'var(--color-black-10)',
    textBoxTrim: 'trim-both',
    textBoxEdge: 'cap alphabetic',
  }),
};

function FooterNavigationWeb() {
  return (
    <Box display="contents">
      {footerGroups.map((group) => (
        <Flex
          direction="column"
          gap="20px"
          gridRow={1}
          alignSelf="start"
          css={{
            '&:nth-child(1)': { gridColumn: 1 },
            '&:nth-child(2)': { gridColumn: 3 },
            '&:nth-child(3)': { gridColumn: 5 },
            '&:nth-child(4)': { gridColumn: 7 },
          }}
          key={group.title}
        >
          <Typography
            as="h3"
            variant="heading10"
            tone="inverse"
            className={FooterNavigationWebStyles.title}
          >
            {group.title}
          </Typography>
          <FooterNavigationLinks links={group.links} platform="web" />
        </Flex>
      ))}
    </Box>
  );
}

const footerAccordionStyles = {
  title: css({
    color: 'var(--color-black-10)',
    textBoxTrim: 'none',
    textBoxEdge: 'cap alphabetic',
  }),
  panel: css({ pt: '0', pl: '7', pb: '4' }),
};

function FooterAccordionNavigation() {
  const items: AccordionEntry[] = footerGroups.map((group) => ({
    value: group.title,
    title: (
      <HStack py="5">
        <Typography variant="heading10" tone="inverse" className={footerAccordionStyles.title}>
          {group.title}
        </Typography>
      </HStack>
    ),
    content: <FooterNavigationLinks links={group.links} platform="mobile" />,
  }));

  return (
    <Box
      borderTop="1px solid var(--color-border-tertiary)"
      borderBottom="1px solid var(--color-border-tertiary)"
    >
      <Accordion
        items={items}
        indicatorColor="var(--color-black-10)"
        panelClassName={footerAccordionStyles.panel}
        multiple
      />
    </Box>
  );
}

/** 푸터 탐색을 열 배치 또는 아코디언으로 구성합니다. (Composes footer navigation as columns or an accordion.) */
function FooterNavigation() {
  const platform = usePlatform();

  return (
    <Grid
      as="section"
      gridArea="navigation"
      gridTemplateColumns="subgrid"
      gap={0}
      _mobile={{ display: 'block', gridTemplateColumns: 'none' }}
      aria-label="Footer navigation"
    >
      {platform === 'web' ? <FooterNavigationWeb /> : <FooterAccordionNavigation />}
    </Grid>
  );
}

function FooterContent() {
  return (
    <Grid
      gridTemplateColumns="max-content repeat(5, minmax(0, 1fr) max-content)"
      gridTemplateAreas={
        '"brand . navigation navigation navigation navigation navigation navigation navigation . legal"'
      }
      gap={0}
      w="100%"
      maxW="var(--layout-web-content-max-width)"
      mx="auto"
      _mobile={{
        gridTemplateColumns: 'minmax(0, 1fr)',
        gridTemplateAreas: '"navigation" "legal" "brand"',
        gap: '9',
      }}
    >
      <FooterBrand />
      <FooterNavigation />
      <FooterLegalLinks />
    </Grid>
  );
}

/** 사이트 안내 링크와 사업자 정보를 표시합니다 (Displays the site footer composition). */
function SiteFooter() {
  return (
    <Wrap
      as="footer"
      minW="var(--layout-web-min-width)"
      py="96px"
      px="var(--layout-web-content-gutter)"
      _mobile={{ p: '36px 16px', minW: 0 }}
      bg="black.100"
      color="black.10"
    >
      <FooterContent />
    </Wrap>
  );
}

type SearchDialogProps = {
  children: ReactNode;
  onClose: () => void;
  compact?: boolean;
  hasRecentSearches: boolean;
};

function SearchDialog({
  children,
  onClose,
  compact = false,
  hasRecentSearches,
}: SearchDialogProps) {
  const platform = usePlatform();
  const panelRef = useRef<HTMLDivElement>(null);
  const [desktopHost, setDesktopHost] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (platform !== 'web') return;
    const panel = panelRef.current;
    const frame = panel?.offsetParent;
    const anchor = frame?.querySelector<HTMLElement>('[data-search-panel-anchor]');
    if (!panel || !frame || !anchor) return;

    const alignToCart = () => {
      const right = frame.getBoundingClientRect().right - anchor.getBoundingClientRect().right;
      panel.style.setProperty('--search-panel-right', `${right}px`);
    };

    alignToCart();
    const observer = new ResizeObserver(alignToCart);
    observer.observe(frame);
    observer.observe(anchor);
    const tools = anchor.parentElement;
    if (tools) observer.observe(tools);
    window.addEventListener('resize', alignToCart);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', alignToCart);
    };
  }, [platform, desktopHost]);

  if (platform === 'web') {
    return (
      <Dialog.Root
        open
        modal={false}
        onOpenChange={(open, details) => {
          if (open) return;
          const target =
            details.reason === 'focus-out' && details.event instanceof FocusEvent
              ? details.event.relatedTarget
              : details.event.target;
          if (
            (details.reason === 'outside-press' || details.reason === 'focus-out') &&
            target instanceof Element &&
            target.closest('#header-search-control')
          ) {
            details.cancel();
            return;
          }
          onClose();
        }}
      >
        <Box
          pos="fixed"
          inset="var(--layout-site-header-height) 0 0"
          zIndex="-1"
          bg="rgba(0, 0, 0, 0.2)"
          onClick={onClose}
        />
        <div ref={setDesktopHost}>
          {desktopHost ? (
            <Dialog.Portal container={desktopHost}>
              <Dialog.Popup
                ref={panelRef}
                id="site-search-panel"
                aria-label="검색"
                initialFocus={false}
                finalFocus={false}
                render={
                  <Box
                    pos="absolute"
                    top="100%"
                    right="var(--search-panel-right, max(var(--layout-web-content-gutter), calc((100% - var(--layout-web-content-max-width)) / 2)))"
                    w={compact ? '540px' : hasRecentSearches ? '1024px' : '544px'}
                    maxW="min(calc(100vw - 48px), calc(100% - var(--search-panel-right, 24px) - 24px))"
                    maxH="calc(100dvh - var(--layout-site-header-height))"
                    overflowY="auto"
                    bg="white.0"
                    zIndex="1"
                  />
                }
              >
                {children}
              </Dialog.Popup>
            </Dialog.Portal>
          ) : null}
        </div>
      </Dialog.Root>
    );
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={css({ pos: 'fixed', inset: '0', zIndex: '100', bg: 'rgba(0, 0, 0, 0.2)' })}
        />
        <Dialog.Popup
          id="site-search-panel"
          aria-label="검색"
          className={css({
            pos: 'fixed',
            inset: '0',
            zIndex: '100',
            bg: 'white.0',
            overflowY: 'auto',
          })}
        >
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type SearchFormProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  error?: string;
};

function SearchForm({ query, onQueryChange, onSearch, error = '' }: SearchFormProps) {
  const mobile = usePlatform() === 'mobile';

  return (
    <Box
      as="form"
      id="site-search-form"
      role="search"
      _mobile={{ px: '16px', pt: '32px', pb: '16px' }}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <HStack
        h="56px"
        px="12px"
        gap="8px"
        border="2px solid"
        borderColor={error ? 'red.100' : 'black.100'}
        display={mobile ? 'flex' : 'none'}
      >
        <Button variant="icon" type="submit" aria-label="검색 실행" size="16px">
          <Icon src="/images/header/search.svg" size="16px" mask />
        </Button>
        <TextInput
          autoFocus
          aria-label="검색어"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'site-search-error' : undefined}
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="검색어를 입력해주세요"
          className={css({
            '&&': {
              minH: '0',
              h: '100%',
              border: '0',
              p: '0',
              outline: 'none!',
              fontSize: '16',
              bg: 'transparent',
              '&::-webkit-search-cancel-button': { display: 'none' },
            },
          })}
        />
      </HStack>
      <button type="submit" hidden aria-label="검색 실행" />
      {error ? (
        <Box p={{ base: '32px 32px 0', _mobile: '8px 0 0' }}>
          <Typography as="p" variant="body5" tone="error" id="site-search-error" role="alert">
            {error}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}

type SearchKeywordButtonProps = { query: string; onNavigateSearch: (query: string) => void };

function SearchKeywordButton({ query, onNavigateSearch }: SearchKeywordButtonProps) {
  return (
    <ButtonLink
      href={`/search?q=${encodeURIComponent(query)}&scope=${encodeURIComponent('전체')}`}
      variant="plain"
      size="lg"
      onMouseDown={(event) => event.preventDefault()}
      onNavigate={() => onNavigateSearch(query)}
    >
      {query}
    </ButtonLink>
  );
}

type RecentSearchItemProps = {
  query: string;
  onNavigateSearch: (query: string) => void;
  onRemove: (query: string) => void;
};

function RecentSearchItem({ query, onNavigateSearch, onRemove }: RecentSearchItemProps) {
  return (
    <HStack as="li" gap="2" _mobile={{ justifyContent: 'space-between' }}>
      <HStack gap="2">
        <Icon name="timer" size="18px" />
        <SearchKeywordButton query={query} onNavigateSearch={onNavigateSearch} />
      </HStack>
      <Button
        variant="icon"
        aria-label={query + ' 삭제'}
        onClick={() => onRemove(query)}
        size="18px"
        shape="square"
      >
        <Icon fontAwesomeIcon={faXmark} size="14px" />
      </Button>
    </HStack>
  );
}

type RecentSearchesProps = {
  recentSearches: readonly string[];
  onNavigateSearch: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};

function RecentSearches({
  recentSearches,
  onNavigateSearch,
  onRemove,
  onClear,
}: RecentSearchesProps) {
  if (recentSearches.length === 0) return null;

  return (
    <ContentSection
      as="section"
      flex="1"
      aria-labelledby="recent-search-title"
      gap={{ base: '6', _mobile: '4' }}
      title="최근 검색어"
      headerProps={{
        orientation: 'horizontal',
        gap: '16px',
        css: css.raw({
          justifyContent: 'flex-start',
          _mobile: { justifyContent: 'space-between' },
        }),
        titleAs: 'h3',
        titleProps: { web: 'heading8', mo: 'heading5', id: 'recent-search-title' },
        action: (
          <Button variant="link" size="md" onClick={onClear}>
            전체 삭제
          </Button>
        ),
      }}
    >
      <Stack as="ul" gap="12px" m="0" p="0" listStyleType="none">
        {recentSearches.map((recent) => (
          <RecentSearchItem
            key={recent}
            query={recent}
            onNavigateSearch={onNavigateSearch}
            onRemove={onRemove}
          />
        ))}
      </Stack>
    </ContentSection>
  );
}

type RecommendedSearchesProps = { queries: readonly string[]; onSearch: (query: string) => void };

function RecommendedSearches({ queries, onSearch }: RecommendedSearchesProps) {
  return (
    <ContentSection
      as="section"
      aria-labelledby="recommended-search-title"
      gap={{ base: '6', _mobile: '4' }}
      title="추천 검색어"
      headerProps={{
        titleAs: 'h3',
        titleProps: { web: 'heading8', mo: 'heading5', id: 'recommended-search-title' },
      }}
    >
      <Flex as="ul" flexWrap="wrap" gap="8px 4px" pb="2" listStyleType="none">
        {queries.map((query) => (
          <li key={query}>
            <Button variant="chip" onClick={() => onSearch(query)}>
              {query}
            </Button>
          </li>
        ))}
      </Flex>
    </ContentSection>
  );
}

type PopularSearchesProps = {
  queries: readonly string[];
  onNavigateSearch: (query: string) => void;
};

function PopularSearches({ queries, onNavigateSearch }: PopularSearchesProps) {
  return (
    <ContentSection
      as="section"
      aria-labelledby="popular-search-title"
      gap={{ base: '6', _mobile: '4' }}
      title="인기 검색어"
      headerProps={{
        titleAs: 'h3',
        titleProps: { web: 'heading8', mo: 'heading5', id: 'popular-search-title' },
      }}
    >
      <Grid
        as="ol"
        gridAutoFlow="column"
        gridTemplateRows="repeat(5, auto)"
        gridTemplateColumns="1fr 1fr"
        listStyleType="none"
        gap="12px 16px"
        _mobile={{ gap: '16px', py: '8px' }}
      >
        {queries.map((query, index) => (
          <HStack as="li" key={query} alignItems="center" gap="1">
            <Typography variant="body3" weight="medium" className={css({ minW: '20px' })}>
              {index + 1}
            </Typography>
            <SearchKeywordButton query={query} onNavigateSearch={onNavigateSearch} />
          </HStack>
        ))}
      </Grid>
    </ContentSection>
  );
}

type SearchSuggestionsProps = {
  recentSearches: readonly string[];
  suggestedSearches: readonly string[];
  onSearch: (query: string) => void;
  onNavigateSearch: (query: string) => void;
  onRemoveRecent: (query: string) => void;
  onClearRecent: () => void;
};

/** 검색 추천어와 최근 검색 영역을 표시합니다 (Displays the search suggestions composition). */
function SearchSuggestions({
  recentSearches,
  suggestedSearches,
  onSearch,
  onNavigateSearch,
  onRemoveRecent,
  onClearRecent,
}: SearchSuggestionsProps) {
  const hasRecentSearches = recentSearches.length > 0;

  return (
    <Flex
      gap="0"
      p="32px"
      _mobile={{ flexDirection: 'column', gap: '32px', px: '16px', py: '16px' }}
    >
      {hasRecentSearches && (
        <RecentSearches
          recentSearches={recentSearches}
          onNavigateSearch={onNavigateSearch}
          onRemove={onRemoveRecent}
          onClear={onClearRecent}
        />
      )}
      <Stack flex="1" gap="32px">
        <RecommendedSearches queries={suggestedSearches} onSearch={onSearch} />
        <PopularSearches queries={popularSearches} onNavigateSearch={onNavigateSearch} />
      </Stack>
    </Flex>
  );
}

type SearchOverlayProps = {
  onClose: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  error?: string;
  onErrorChange?: (error: string) => void;
};

/** 검색어 입력과 추천·결과 이동을 구성합니다 (Search suggestions use local preview data; submission preserves the search results route). */
function SearchOverlay({
  onClose,
  query: externalQuery,
  onQueryChange,
  error: externalError,
  onErrorChange,
}: SearchOverlayProps) {
  const [localQuery, setLocalQuery] = useState('');
  const [localError, setLocalError] = useState('');
  const error = externalError ?? localError;
  const setError = (value: string) => {
    setLocalError(value);
    onErrorChange?.(value);
  };
  const query = externalQuery ?? localQuery;
  const normalized = query.trim();
  const platform = usePlatform();
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } =
    useRecentSearches();
  const hasRecentSearches = recentSearches.length > 0;
  const router = useRouter();
  const matches = [...new Set(autocompleteSearches)]
    .filter((item) => item.toLowerCase().includes(normalized.toLowerCase()))
    .slice(0, platform === 'mobile' ? 3 : 9);
  const showMatches = normalized.length > 0 && matches.length > 0 && !error;
  const changeQuery = (value: string) => {
    setError('');
    setLocalQuery(value);
    onQueryChange?.(value);
  };
  const search = (nextQuery = query) => {
    const value = nextQuery.trim();
    if (!value) {
      setError('검색어를 입력해주세요.');
      return;
    }
    addRecentSearch(value);
    router.push('/search?q=' + encodeURIComponent(value) + '&scope=' + encodeURIComponent('전체'));
    onClose();
  };
  const rememberSearchAndClose = (nextQuery: string) => {
    const value = nextQuery.trim();
    if (!value) return;
    addRecentSearch(value);
    onClose();
  };

  return (
    <SearchDialog onClose={onClose} compact={showMatches} hasRecentSearches={hasRecentSearches}>
      <SearchHeader onClose={onClose} />
      <SearchForm query={query} onQueryChange={changeQuery} onSearch={search} error={error} />
      {showMatches ? (
        <Stack
          as="ul"
          aria-label="자동완성 검색어"
          gap="16px"
          p="32px 48px"
          listStyleType="none"
          _mobile={{ px: '16px', pt: '0', pb: '32px' }}
        >
          {matches.map((match) => {
            const index = match.toLowerCase().indexOf(normalized.toLowerCase());
            return (
              <HStack as="li" key={match}>
                <Button variant="plain" onClick={() => search(match)}>
                  <Typography variant="body3" weight="medium">
                    {match.slice(0, index)}
                    <Box as="mark" bg="transparent" color="blue.100">
                      {match.slice(index, index + normalized.length)}
                    </Box>
                    {match.slice(index + normalized.length)}
                  </Typography>
                </Button>
              </HStack>
            );
          })}
        </Stack>
      ) : null}
      {!showMatches || platform === 'mobile' ? (
        <SearchSuggestions
          recentSearches={recentSearches}
          suggestedSearches={suggestedSearches}
          onSearch={search}
          onNavigateSearch={rememberSearchAndClose}
          onRemoveRecent={removeRecentSearch}
          onClearRecent={clearRecentSearches}
        />
      ) : null}
    </SearchDialog>
  );
}

type HeaderPromotionButtonType = 'details' | 'memberBenefits';

const promotionLink = css({
  '&&': {
    '& span': {
      color: 'var(--hoka-white)',
    },
  },
});

/** Own the member promotion message, link, and button-specific arrangement. */
function HeaderPromotionContent({
  buttonType = 'details',
  message = '회원님께만 드리는 무료 배송 및 반품 기간 연장',
  href = '/products',
  ref,
}: {
  buttonType?: HeaderPromotionButtonType;
  message?: string;
  href?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const isMemberBenefits = buttonType === 'memberBenefits';

  const PromotionStack = isMemberBenefits ? VStack : HStack;

  return (
    <PromotionStack
      ref={ref}
      gap={isMemberBenefits ? '0' : '4'}
      w="max-content"
      maxW="calc(100cqw - var(--promotion-frame-space, 150px))"
      textAlign="center"
      justifyContent={isMemberBenefits ? 'center' : undefined}
    >
      <Typography tone="inverse" web="body3" mo="body5" weight="medium">
        {message}
      </Typography>
      <ButtonLink className={promotionLink} href={href} variant="link" size="sm">
        <Typography web="textLink2" mo="textLink3">
          <Typography as="span">
            {isMemberBenefits ? '회원 혜택 자세히 보기' : '자세히 보기'}
          </Typography>
        </Typography>
      </ButtonLink>
    </PromotionStack>
  );
}

const promotionViewport = css({ minW: '0', h: '100%', gridColumn: '2', gridRow: '1' });

const promotionControls = css({
  display: 'contents',
  '& button': {
    w: '32px',
    h: '32px',
    gridRow: '1',
    '--icon-carousel-circle-color': 'transparent',
    '--icon-carousel-path-color': 'var(--hoka-white)',
  },
  '& button:first-child': { gridColumn: '1' },
  '& button:last-child': { gridColumn: '3' },
  '& svg': { w: '24px', h: '24px' },
});

const promotionSlide = css({
  w: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/** Own the promotion slides, viewport styling, and carousel behavior. */
function HeaderPromotionCarousel({
  buttonType,
  items = headerPromotionItems,
}: {
  buttonType?: HeaderPromotionButtonType;
  items?: HeaderPromotionItem[];
}) {
  if (items.length === 0) return null;

  if (items.length === 1) {
    const item = items[0];

    return (
      <HStack
        gap="normal"
        justifyContent="center"
        w="100%"
        h="100%"
        px="2"
        css={{ '--promotion-frame-space': '16px' }}
      >
        <HeaderPromotionContent
          message={item.message}
          href={item.href}
          buttonType={buttonType ?? item.buttonType}
        />
      </HStack>
    );
  }

  return (
    <Carousel itemCount={items.length} loop>
      <PromotionCarouselFrame buttonType={buttonType} items={items} />
    </Carousel>
  );
}

function PromotionCarouselFrame({
  buttonType,
  items,
}: {
  buttonType?: HeaderPromotionButtonType;
  items: HeaderPromotionItem[];
}) {
  const { activeIndex } = useCarousel();
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentWidth, setContentWidth] = useState<number>();

  useLayoutEffect(() => {
    const content = contentRefs.current[activeIndex];
    if (!content) return;

    const measure = () => setContentWidth(content.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [activeIndex, items, buttonType]);

  return (
    <Grid
      gridTemplateColumns="32px minmax(0, 1fr) 32px"
      alignItems="center"
      gap="35px"
      w="calc(var(--promotion-content-width, 280px) + 150px)"
      maxW="100%"
      minW="0"
      h="100%"
      px="2"
      style={
        {
          '--promotion-content-width': contentWidth === undefined ? undefined : `${contentWidth}px`,
        } as CSSProperties
      }
    >
      <CarouselViewport
        effect="fade"
        className={promotionViewport}
        slideClassName={promotionSlide}
        freeMode={false}
        showScrollbar={false}
      >
        {items.map((item, index) => (
          <HeaderPromotionContent
            ref={(element) => {
              contentRefs.current[index] = element;
            }}
            key={item.id}
            message={item.message}
            href={item.href}
            buttonType={buttonType ?? item.buttonType}
          />
        ))}
      </CarouselViewport>
      <CarouselControls className={promotionControls} />
    </Grid>
  );
}

/** Member promotion shown above the sticky navigation on web and mobile. */
function HeaderPromotionBanner({ buttonType }: { buttonType?: HeaderPromotionButtonType }) {
  return (
    <HStack
      as="aside"
      aria-label="홍보 배너"
      justifyContent="center"
      containerType="inline-size"
      h="50px"
      gap="10px"
      bg="var(--hoka-black)"
      css={{ '&&': { color: 'var(--hoka-white)' } }}
    >
      <HeaderPromotionCarousel buttonType={buttonType} />
    </HStack>
  );
}

const MegaMenuListStyles = {
  title: css({
    m: 0,
    '&&': {
      color: 'black',
      textTransform: 'capitalize',
    },
  }),
  activeItemLabel: css({
    '&&': {
      fontWeight: 'bold',
    },
  }),
};

type MegaMenuListProps = {
  columns: MegaMenu['columns'];
  onClose: () => void;
};

function MegaMenuList({ columns, onClose }: MegaMenuListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const currentPath = `${pathname}${query ? `?${query}` : ''}`;

  return (
    <Grid gridTemplateColumns="repeat(5, minmax(110px, 1fr))" gap="4">
      {columns.map((column) => (
        <Flex
          minW={0}
          css={{
            '&&': {
              '& a:hover [data-sale], & a:focus-visible [data-sale]': {
                color: 'sale',
              },
            },
          }}
          direction="column"
          gap="30px"
          key={column.title}
        >
          <Typography as="h2" variant="heading8" className={MegaMenuListStyles.title}>
            {column.to ? (
              <Link href={column.to} onClick={onClose}>
                {column.title}
              </Link>
            ) : (
              column.title
            )}
          </Typography>
          {column.items.length > 0 && (
            <Grid as="ul" m={0} p={0} listStyle="none" gap="30px">
              {column.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.to}
                    onClick={onClose}
                    className={css({
                      display: 'inline-flex',
                      gap: '5px',
                      _hover: { textDecoration: 'underline', textUnderlineOffset: '3px' },
                      _focusVisible: { textDecoration: 'underline', textUnderlineOffset: '3px' },
                    })}
                  >
                    <Typography
                      variant="body3"
                      tone={item.label === 'Sale' ? 'red80' : 'primary'}
                      className={
                        currentPath === item.to ? MegaMenuListStyles.activeItemLabel : undefined
                      }
                      data-sale={item.label === 'Sale' || undefined}
                    >
                      {item.label}
                    </Typography>
                    {item.badge ? (
                      <Typography as="small" variant="body5">
                        {item.badge}
                      </Typography>
                    ) : null}
                  </Link>
                </li>
              ))}
            </Grid>
          )}
        </Flex>
      ))}
    </Grid>
  );
}

type MegaMenuContentProps = {
  menu: MegaMenu;
  onClose: () => void;
};

function MegaMenuContent({ menu, onClose }: MegaMenuContentProps) {
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

const MegaMenuPanelStyles = {
  overlay: css({
    appearance: 'none',
    position: 'fixed',
    display: 'block',
    zIndex: -1,
    inset: 'var(--layout-site-header-height) 0 0',
    w: '100%',
    h: 'calc(100dvh - var(--layout-site-header-height))',
    border: 0,
    p: 0,
    cursor: 'pointer',
    bg: 'color-mix(in srgb, var(--color-black-100) 52%, transparent)',
    _mobile: { display: 'none' },
  }),
};

type MegaMenuPanelProps = {
  menu: MegaMenu;
  onClose: () => void;
  onFocusBoundary: (menuId: MegaMenu['id'], boundary: 'first' | 'last') => void;
};

function MegaMenuPanel({ menu, onClose, onFocusBoundary }: MegaMenuPanelProps) {
  return (
    <>
      <button
        type="button"
        aria-label="메뉴 닫기"
        className={MegaMenuPanelStyles.overlay}
        onClick={onClose}
        tabIndex={-1}
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

const logo = css({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  w: '85px',
  h: '23px',

  _mobile: { order: 0, w: '74px', h: '5' },
});

type HeaderLogoProps = {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function HeaderLogo({ onClick }: HeaderLogoProps) {
  return (
    <Link className={logo} href="/" onClick={onClick} aria-label="HOKA 홈으로">
      <Image
        src="/images/header/logo-primary.svg"
        alt="HOKA"
        className={css({ display: 'block', w: '100%', h: '100%', objectFit: 'contain' })}
        width={88}
        height={24}
        sizes="(max-width: 1024px) 74px, 85px"
      />
    </Link>
  );
}

const iconLink = css({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '34px',
  h: '9',
  '& img': { display: 'block' },
  _mobile: { w: '8', h: '8' },
});

type HeaderIconProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt?: string;
};

type HeaderIconLinkProps = {
  to: string;
  ariaLabel: string;
  className?: string;
  children?: ReactNode;
} & ({ icon: HeaderIconProps; iconSlot?: never } | { icon?: never; iconSlot: ReactNode });

function HeaderIcon({ desktopSrc, mobileSrc = desktopSrc, alt = '' }: HeaderIconProps) {
  const platform = usePlatform();

  return (
    <Icon
      src={platform === 'mobile' ? mobileSrc : desktopSrc}
      alt={alt}
      size={platform === 'mobile' ? '20px' : '22px'}
    />
  );
}

function HeaderIconLink({
  to,
  ariaLabel,
  className,
  icon,
  iconSlot,
  children,
}: HeaderIconLinkProps) {
  return (
    <Link
      href={to}
      aria-label={ariaLabel}
      className={[iconLink, className].filter(Boolean).join(' ')}
    >
      {iconSlot ?? (icon ? <HeaderIcon {...icon} /> : null)}
      {children}
    </Link>
  );
}

type NotificationCountProps = ComponentPropsWithoutRef<'span'> & {
  count?: number;
  max?: number;
};

/** 알림 건수를 작은 원형 배지로 표시합니다. (Displays a notification count in a compact circular badge.) */
function NotificationCount({ count = 0, max = 99, className, ...props }: NotificationCountProps) {
  if (!Number.isFinite(count) || count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <Circle
      as="span"
      pos="absolute"
      top="-.3rem"
      right="-4px"
      display="inline-flex"
      size="12px"
      px="2px"
      boxSizing="border-box"
      bg="blue.100"
      textAlign="center"
    >
      <Typography
        variant="body5"
        weight="medium"
        tone="inverse"
        {...props}
        aria-hidden="true"
        className={[css({ fontSize: '8px', lineHeight: '16px' }), className]
          .filter(Boolean)
          .join(' ')}
      >
        {displayCount}
      </Typography>
    </Circle>
  );
}

const notificationIcon = css({
  position: 'relative',
  display: 'inline-flex',
  flexShrink: '0',
  width: 'var(--notification-icon-size)',
  height: 'var(--notification-icon-size)',
  color: 'icon.default',
});

const notificationGlyph = css({
  display: 'block',
  width: '100%',
  height: '100%',
  backgroundColor: 'currentColor',
  maskImage: 'var(--notification-icon-mask)',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskImage: 'var(--notification-icon-mask)',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

const notificationAssetByVariant = {
  bag: 'notification-bag.svg',
  basket: 'notification-basket.svg',
} as const;

type NotificationIconVariant = keyof typeof notificationAssetByVariant | 'user';

type NotificationIconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  variant: NotificationIconVariant;
  count?: number;
  maxCount?: number;
  size?: CSSProperties['width'];
  color?: CSSProperties['color'];
  label?: string;
};

/** 알림 아이콘과 알림 건수를 표시합니다 (Displays the notification icon composition). */
function NotificationIcon({
  variant,
  count,
  maxCount,
  size = '22px',
  color,
  label,
  className,
  style,
  ...props
}: NotificationIconProps) {
  const hasNotification = Number.isFinite(count) && (count ?? 0) > 0;
  const asset = variant === 'user' ? undefined : notificationAssetByVariant[variant];

  return (
    <span
      {...props}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={[notificationIcon, className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      style={
        {
          '--notification-icon-size': size,
          '--notification-icon-mask': asset ? `url(/images/icon/notification/${asset})` : undefined,
          color: color ?? (hasNotification ? 'var(--color-blue-100)' : undefined),
          ...style,
        } as CSSProperties
      }
    >
      {variant === 'user' ? (
        <Icon aria-hidden="true" fontAwesomeIcon={faUser} size={size} />
      ) : (
        <span aria-hidden="true" className={notificationGlyph} />
      )}
      <NotificationCount count={count} max={maxCount} />
    </span>
  );
}

const loginLink = css({ _mobile: { display: 'none' } });

type HeaderAccountProps = {
  isLoggedIn: boolean;
  wishlistCount: number;
};

function HeaderAccount({ isLoggedIn, wishlistCount }: HeaderAccountProps) {
  const platform = usePlatform();
  const iconSize = platform === 'mobile' ? '20px' : '22px';

  if (!isLoggedIn) {
    return (
      <HeaderIconLink
        to="/login"
        ariaLabel="로그인"
        className={loginLink}
        iconSlot={<NotificationIcon variant="user" size={iconSize} />}
      />
    );
  }

  return (
    <>
      <HeaderIconLink
        to="/mypage"
        ariaLabel="마이페이지"
        iconSlot={<NotificationIcon variant="user" size={iconSize} />}
      />
      <HeaderIconLink
        to="/mypage/wishlist"
        ariaLabel={`관심상품 ${wishlistCount}개`}
        iconSlot={<NotificationIcon variant="bag" count={wishlistCount} size={iconSize} />}
      />
    </>
  );
}

type HeaderCartLinkProps = {
  cart: number;
};

function HeaderCartLink({ cart }: HeaderCartLinkProps) {
  const platform = usePlatform();

  return (
    <HeaderIconLink
      to="/cart"
      ariaLabel={`장바구니 ${cart}개`}
      iconSlot={
        <NotificationIcon
          variant="bag"
          count={cart}
          color="var(--color-black-100)"
          size={platform === 'mobile' ? '20px' : '22px'}
        />
      }
    />
  );
}

type HeaderSearchProps = {
  onSearch: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  open?: boolean;
  error?: string;
};

/** 헤더 검색 입력과 검색 실행을 구성합니다 (Displays the header search composition). */
function HeaderSearch({
  onSearch,
  query = '',
  onQueryChange,
  open = false,
  error,
}: HeaderSearchProps) {
  const platform = usePlatform();

  if (platform === 'web') {
    return (
      <HStack
        id="header-search-control"
        w="178px"
        h="36px"
        flexShrink="0"
        gap="8px"
        px="12px"
        border="1px solid"
        borderColor={error ? 'red.100' : 'black.100'}
        borderRadius="999px"
        bg="white.0"
        _focusWithin={{ borderWidth: '2px' }}
      >
        <TextInput
          id="header-search-input"
          aria-label="검색"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'site-search-error' : undefined}
          aria-expanded={open}
          aria-controls={open ? 'site-search-panel' : undefined}
          aria-haspopup="dialog"
          form="site-search-form"
          type="search"
          autoComplete="off"
          placeholder="검색하기"
          value={query}
          onChange={(event) => onQueryChange?.(event.target.value)}
          onFocus={onSearch}
          onClick={onSearch}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !open && !event.nativeEvent.isComposing) {
              event.preventDefault();
              onSearch();
              requestAnimationFrame(() =>
                document.querySelector<HTMLFormElement>('#site-search-form')?.requestSubmit(),
              );
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              onSearch();
              requestAnimationFrame(() =>
                document.querySelector<HTMLElement>('#site-search-panel ul button')?.focus(),
              );
            }
          }}
          className={css({
            '&&': {
              minW: '0',
              minH: '0',
              h: '100%',
              p: '0',
              border: '0',
              borderRadius: '0',
              bg: 'transparent',
              fontSize: '14',
              outline: 'none!',
              '&::-webkit-search-cancel-button': { display: 'none' },
            },
          })}
        />
        <Button
          variant="icon"
          size="20px"
          aria-label="검색 실행"
          type="submit"
          form="site-search-form"
          onClick={onSearch}
        >
          <Icon src="/images/header/search.svg" size="16px" mask />
        </Button>
      </HStack>
    );
  }

  return (
    <Button variant="icon" size="32px" onClick={onSearch} aria-label="검색">
      <Icon src="/images/header/search.svg" size="19px" mask />
    </Button>
  );
}

type HeaderToolsProps = {
  cart: number;
  isLoggedIn: boolean;
  wishlistCount: number;
  onEnterPreviousMenu?: () => void;
  onSearch: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  searchOpen?: boolean;
  searchError?: string;
};

function HeaderTools({
  cart,
  isLoggedIn,
  wishlistCount,
  onEnterPreviousMenu,
  onSearch,
  searchQuery,
  onSearchQueryChange,
  searchOpen,
  searchError,
}: HeaderToolsProps) {
  const platform = usePlatform();

  return (
    <Flex
      id="site-header-tools"
      gap={platform === 'mobile' ? '6px' : '16px'}
      alignItems="center"
      onKeyDown={(event) => {
        if (event.key !== 'Tab' || !event.shiftKey || !onEnterPreviousMenu) return;

        const firstFocusable = event.currentTarget.querySelector<HTMLElement>(
          'a[href], input:not([disabled]), button:not([disabled])',
        );

        if (event.target !== firstFocusable) return;

        event.preventDefault();
        onEnterPreviousMenu();
      }}
    >
      <HeaderSearch
        onSearch={onSearch}
        query={searchQuery}
        onQueryChange={onSearchQueryChange}
        error={searchError}
        open={searchOpen}
      />
      <HStack data-search-panel-anchor gap={platform === 'mobile' ? '6px' : '4px'}>
        <HeaderAccount isLoggedIn={isLoggedIn} wishlistCount={wishlistCount} />
        <HeaderCartLink cart={cart} />
      </HStack>
      {platform === 'web' && !isLoggedIn ? <HeaderAuthLink /> : null}
    </Flex>
  );
}

type Props = { primary: ReactNode; actions: ReactNode };

/** Own the central header frame and the primary/action groups. */
function SiteHeaderInner({ primary, actions }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      maxW="var(--layout-web-content-max-width)"
      mx="auto"
      _mobile={{ maxW: 'none' }}
    >
      <HStack gap="6" alignItems="center">
        {primary}
      </HStack>
      <HStack gap="1.5" alignItems="center">
        {actions}
      </HStack>
    </Flex>
  );
}

/** Own the header landmark and platform-specific outer spacing. */
function SiteHeaderContent({ primary, actions }: { primary: ReactNode; actions: ReactNode }) {
  return (
    <Flex
      as="header"
      alignItems="center"
      h="var(--layout-site-header-height)"
      px="var(--layout-web-content-gutter)"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="headerBorder"
      bg="var(--hoka-white)"
      _mobile={{ gap: 0, pt: '0', pr: '9px', pb: '0', pl: 'var(--layout-mobile-inline-gutter)' }}
    >
      <SiteHeaderInner primary={primary} actions={actions} />
    </Flex>
  );
}

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
          variant="plain"
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
    <Button
      variant="icon"
      className={menuButtonStyles}
      size="32px"
      onClick={onClick}
      aria-label="전체 메뉴"
    >
      <Icon src="/images/header/m-menu.svg" size="20px" alt="" />
    </Button>
  );
}

type SiteHeaderContainerProps = {
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
function SiteHeaderContainer({
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

/** Keep the header and its expanded menu in the same sticky hover region. */
function SiteHeaderFrame({
  children,
  onLeave,
  fixedOnScroll = false,
}: {
  children: ReactNode;
  onLeave: () => void;
  fixedOnScroll?: boolean;
}) {
  const { markerRef, pinned } = useScrollPin(fixedOnScroll);

  if (!fixedOnScroll) {
    return (
      <Box pos="sticky" top={0} zIndex={20} onMouseLeave={onLeave}>
        {children}
      </Box>
    );
  }

  return (
    <Box pos="relative" top={0} zIndex={20} h="var(--layout-site-header-height)">
      <Box ref={markerRef} h="1px" mb="-1px" />
      <Box
        pos={pinned ? 'fixed' : undefined}
        top={pinned ? '0' : undefined}
        insetInline={pinned ? '0' : undefined}
        onMouseLeave={onLeave}
      >
        {children}
      </Box>
    </Box>
  );
}

type SiteHeaderProps = {
  fixedOnScroll?: boolean;
  cart: number;
  onMenu: () => void;
  isLoggedIn?: boolean;
  wishlistCount?: number;
  recentCount?: number;
};

type MenuFocusPosition = 'first' | 'last';

/** 사이트 탐색·검색과 사용자 액션을 배치합니다 (Displays the site header composition). */
function SiteHeader({
  fixedOnScroll = false,
  cart,
  onMenu,
  isLoggedIn = false,
  wishlistCount = 0,
}: SiteHeaderProps) {
  const platform = usePlatform();
  const [search, setSearch] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [searchError, setSearchError] = useState('');

  const changeSearchQuery = (query: string) => {
    setSearchError('');
    setSearchQuery(query);
  };

  const closeSearch = () => {
    const panel = document.getElementById('site-search-panel');
    if (platform === 'web' && panel?.contains(document.activeElement)) {
      document.getElementById('header-search-input')?.focus();
    }
    setSearch(false);
  };

  const [activeMenu, setActiveMenu] = useState<MegaMenu['id'] | null>(null);

  const activeMegaMenu = megaMenus.find((menu) => menu.id === activeMenu);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !activeMenu) return;

      const menuToRestore = activeMenu;
      setActiveMenu(null);

      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[data-mega-menu-trigger="${menuToRestore}"]`)?.focus();
      });
    };

    addEventListener('keydown', closeOnEscape);

    return () => removeEventListener('keydown', closeOnEscape);
  }, [activeMenu]);

  const closeMegaMenu = () => setActiveMenu(null);

  const openMegaMenu = (menuId: MegaMenu['id']) => {
    setSearch(false);
    setActiveMenu(menuId);
  };

  const toggleMegaMenu = (menuId: MegaMenu['id']) => {
    setSearch(false);
    setActiveMenu((current) => (current === menuId ? null : menuId));
  };

  const focusMegaMenuItem = (menuId: MegaMenu['id'], position: MenuFocusPosition) => {
    setActiveMenu(menuId);

    requestAnimationFrame(() => {
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          `#mega-menu-${menuId} a[href], #mega-menu-${menuId} button:not([disabled])`,
        ),
      );

      (position === 'first' ? focusable[0] : focusable.at(-1))?.focus();
    });
  };

  const focusMegaMenuTrigger = (menuId: MegaMenu['id']) => {
    setActiveMenu(menuId);

    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-mega-menu-trigger="${menuId}"]`)?.focus();
    });
  };

  const enterMegaMenu = (menuId: MegaMenu['id']) => focusMegaMenuItem(menuId, 'first');

  const enterPreviousMegaMenu = (menuId: MegaMenu['id']) => {
    const menuIndex = megaMenus.findIndex((menu) => menu.id === menuId);
    const previousMenu = megaMenus[menuIndex - 1];

    if (previousMenu) focusMegaMenuItem(previousMenu.id, 'last');
  };

  const enterLastMegaMenu = () => {
    const lastMenu = megaMenus.at(-1);

    if (lastMenu) focusMegaMenuItem(lastMenu.id, 'last');
  };

  const handleMegaMenuFocusBoundary = (menuId: MegaMenu['id'], boundary: 'first' | 'last') => {
    if (boundary === 'first') {
      focusMegaMenuTrigger(menuId);
      return;
    }

    const menuIndex = megaMenus.findIndex((menu) => menu.id === menuId);
    const nextMenu = megaMenus[menuIndex + 1];

    if (nextMenu) {
      focusMegaMenuTrigger(nextMenu.id);
      return;
    }

    setActiveMenu(null);

    requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(
          '#site-header-tools input, #site-header-tools a[href], #site-header-tools button',
        )
        ?.focus();
    });
  };

  return (
    <>
      <HeaderPromotionBanner />

      <SiteHeaderFrame onLeave={closeMegaMenu} fixedOnScroll={fixedOnScroll}>
        <SiteHeaderContainer
          cart={cart}
          isLoggedIn={isLoggedIn}
          wishlistCount={wishlistCount}
          activeMenu={activeMenu}
          onEnterMenu={enterMegaMenu}
          onEnterPreviousMenu={enterPreviousMegaMenu}
          onHeaderToolsEnterPreviousMenu={enterLastMegaMenu}
          onLogoClick={closeMegaMenu}
          onMenu={onMenu}
          onMenuOpen={openMegaMenu}
          onMenuToggle={toggleMegaMenu}
          searchQuery={searchQuery}
          onSearchQueryChange={changeSearchQuery}
          searchError={searchError}
          searchOpen={search}
          onSearch={() => {
            setActiveMenu(null);
            setSearch(true);
          }}
        />

        {platform === 'web' && activeMegaMenu ? (
          <MegaMenuPanel
            menu={activeMegaMenu}
            onClose={closeMegaMenu}
            onFocusBoundary={handleMegaMenuFocusBoundary}
          />
        ) : null}
        {search ? (
          <SearchOverlay
            query={searchQuery}
            onQueryChange={changeSearchQuery}
            error={searchError}
            onErrorChange={setSearchError}
            onClose={closeSearch}
          />
        ) : null}
      </SiteHeaderFrame>
    </>
  );
}

/** 경로와 플랫폼에 맞는 사이트 프레임을 구성합니다. (Composes the site frame for the current route and platform.) */
function AppLayout({
  cart,
  children,
  isLoggedIn = false,
  wishlistCount = 0,
  recentCount = 0,
}: {
  cart: number;
  children: ReactNode;
  isLoggedIn?: boolean;
  wishlistCount?: number;
  recentCount?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const platform = usePlatform();
  const pathname = usePathname();
  const searchPage = platform === 'mobile' && pathname === '/search';

  if (platform === 'web' && menuOpen) {
    setMenuOpen(false);
  }

  if (pathname === '/screen-index') return <>{children}</>;

  return (
    <>
      {!searchPage && (
        <SiteHeader
          fixedOnScroll={platform === 'mobile' && pathname === '/products'}
          cart={cart}
          onMenu={() => setMenuOpen(true)}
          isLoggedIn={isLoggedIn}
          wishlistCount={wishlistCount}
          recentCount={recentCount}
        />
      )}
      {platform === 'mobile' && menuOpen && (
        <MenuDrawer close={() => setMenuOpen(false)} isLoggedIn={isLoggedIn} />
      )}
      {children}
      {!searchPage && <SiteFooter />}
    </>
  );
}

export type LoginCredentials = { id: string; password: string; rememberId: boolean };

/**
 * [개발팀 바인딩]
 * 앱 Client 연결 소유자에서 <ShopShell state={...}> 또는 <ShopStateProvider value={...}>로 실제 상태를 공급합니다.
 * 운영 모드에서는 authenticationMode: service, products, isLoggedIn을 지정합니다. products에는 장바구니/상세에 필요한 실제 ID의 상품도 포함합니다.
 * cart 행은 상품 id + color/width/size 조합과 수량을 가집니다. add/updateQuantity/updateOptions/remove 이후 새 cart 상태를 공급합니다.
 * 현재 장바구니 변경 콜백은 동기 알림 계약입니다. 비동기 저장/낙관적 갱신을 쓸 경우 실패 복원과 오류 표시는 연결 소유자가 맡습니다.
 * login은 자격증명/기억하기 선택을 받고 인증 완료 후 resolve, 실패는 reject합니다. 실제 세션 보관/로그아웃/인증 만료도 이 소유자에서 처리합니다.
 * wishlistCount/recentCount는 실제 요약 수치를 전달합니다. 본 파일의 localStorage/initialCart는 Provider가 없는 시안 데모용입니다.
 */
export type ShopState = {
  readonly authenticationMode?: 'demo' | 'service';
  readonly products?: readonly Product[];
  readonly isLoggedIn?: boolean;
  readonly wishlistCount?: number;
  readonly recentCount?: number;
  readonly cart: CartItem[];
  readonly add: (item: CartItem) => void;
  readonly updateQuantity: (item: CartItem, quantity: number) => void;
  readonly updateOptions: (item: CartItem, next: CartItem) => void;
  readonly remove: (item: CartItem) => void;
  readonly login: (credentials: LoginCredentials) => void | Promise<void>;
  readonly logout: () => void;
};

const ShopContext = createContext<ShopState | null>(null);

/** 쇼핑 상태를 외부 상태 소유자와 연결합니다. (Connects shopping state to an external state owner.) */
export function ShopStateProvider({ value, children }: { value: ShopState; children: ReactNode }) {
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

const subscribeHydration = () => () => {};

const clientSnapshot = () => true;

const serverSnapshot = () => false;

const initialCart: CartItem[] = [
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: 'shoe-1',
    color: '브라운',
    width: 'Regular',
    size: '235',
    quantity: 1,
  },
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: 'shoe-2',
    color: '레드',
    width: 'X-Wide',
    size: '225',
    quantity: 2,
  },
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: 'shoe-3',
    color: '화이트',
    width: 'Wide',
    size: '270',
    quantity: 5,
  },
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: 'shoe-4',
    color: '옐로우골드',
    width: 'X-Wide',
    size: '250',
    quantity: 4,
  },
];

export function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) throw new Error('useShop requires ShopShell');
  return shop;
}

/** 쇼핑 상태와 플랫폼 컨텍스트를 제공하고 공통 레이아웃을 구성합니다. (Provides shopping state and platform context within the common layout.) */
export function ShopShell({
  platform,
  children,
  state,
}: {
  readonly state?: ShopState & { products: readonly Product[]; isLoggedIn: boolean };
  readonly platform?: Platform;
  readonly children: ReactNode;
}) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('hoka-is-logged-in') === 'true';
    } catch {
      return false;
    }
  });
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = 3;
  const recentCount = 7;
  const handleLogin = () => {
    setIsLoggedIn(true);
    try {
      localStorage.setItem('hoka-is-logged-in', 'true');
    } catch {
      // ignore storage failures in demo mode
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('hoka-is-logged-in');
    } catch {
      // ignore storage failures in demo mode
    }
    router.push('/login');
  };
  const add = (item: CartItem) =>
    setCart((previous) => {
      const found = previous.find(
        (current) =>
          current.id === item.id &&
          current.color === item.color &&
          current.width === item.width &&
          current.size === item.size,
      );
      return found
        ? previous.map((current) =>
            current === found
              ? { ...current, quantity: current.quantity + item.quantity }
              : current,
          )
        : [...previous, item];
    });
  const updateQuantity = (item: CartItem, quantity: number) =>
    quantity < 1
      ? setCart((previous) => previous.filter((current) => current !== item))
      : setCart((previous) =>
          previous.map((current) => (current === item ? { ...current, quantity } : current)),
        );
  const updateOptions = (item: CartItem, next: CartItem) =>
    setCart((previous) => {
      const remaining = previous.filter((current) => current !== item);
      const existing = remaining.find(
        (current) =>
          current.id === next.id &&
          current.color === next.color &&
          current.width === next.width &&
          current.size === next.size,
      );
      return existing
        ? remaining.map((current) =>
            current === existing
              ? { ...current, quantity: current.quantity + next.quantity }
              : current,
          )
        : previous.map((current) => (current === item ? next : current));
    });
  const remove = (item: CartItem) =>
    setCart((previous) => previous.filter((current) => current !== item));

  return (
    <ShopStateProvider
      value={
        state ?? {
          authenticationMode: 'demo',
          cart,
          add,
          updateQuantity,
          updateOptions,
          remove,
          login: handleLogin,
          logout: handleLogout,
        }
      }
    >
      <PlatformProvider platform={platform}>
        <ShopFrame>
          <AppLayout
            cart={state ? state.cart.reduce((total, item) => total + item.quantity, 0) : count}
            isLoggedIn={state ? state.isLoggedIn : hydrated && isLoggedIn}
            wishlistCount={state ? (state.wishlistCount ?? 0) : wishlistCount}
            recentCount={state ? (state.recentCount ?? 0) : recentCount}
          >
            {children}
          </AppLayout>
        </ShopFrame>
      </PlatformProvider>
    </ShopStateProvider>
  );
}

function ShopFrame({ children }: { children: ReactNode }) {
  const platform = usePlatform();

  return <div className={`app platform-${platform}`}>{children}</div>;
}

export {
  MegaMenuAD,
  MenuDrawer,
  SocialIconLink,
  SiteFooter,
  SearchSuggestions,
  SearchOverlay,
  NotificationIcon,
  HeaderSearch,
  SiteHeader,
  AppLayout,
};
