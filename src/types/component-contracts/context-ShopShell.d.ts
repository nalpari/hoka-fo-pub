// Type-only contracts for moved local components; never import these declarations as runtime values.
import {
  type AnchorHTMLAttributes,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react';

import { type FooterGroup } from '@/components/common/organisms/Layout/SiteFooter/footerData';
import { type HeaderPromotionItem } from '@/components/common/organisms/Layout/SiteHeader/headerPromotionData';
import {
  type MegaMenu,
  type MegaMenuPromo,
} from '@/components/common/organisms/Layout/SiteHeader/megaMenu';

import { type Platform } from '@/lib/device';
import { type CartItem } from '@/types/cart';
type MenuDrawerFrameProps = {
  children: ReactNode;
  close: () => void;
  popupRef: RefObject<HTMLDivElement | null>;
  initialFocusRef: RefObject<HTMLButtonElement | null>;
};
declare function MenuDrawerFrame({
  children,
  close,
  popupRef,
  initialFocusRef,
}: MenuDrawerFrameProps): import('react').JSX.Element;
type HeaderAuthLinkProps = {
  onNavigate?: () => void;
};
declare function HeaderAuthLink({ onNavigate }: HeaderAuthLinkProps): import('react').JSX.Element;
type MenuDrawerHeaderProps = {
  close: () => void;
  isLoggedIn: boolean;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};
declare function MenuDrawerHeader({
  close,
  isLoggedIn,
  closeButtonRef,
}: MenuDrawerHeaderProps): import('react').JSX.Element;
type MenuDrawerGroupsProps = {
  columns: readonly MegaMenu['columns'][number][];
  onNavigate: () => void;
};
/** 모바일 메뉴의 카테고리 그룹과 하위 링크를 표시합니다. (Displays mobile menu category groups and their links.) */
declare function MenuDrawerGroups({
  columns,
  onNavigate,
}: MenuDrawerGroupsProps): import('react').JSX.Element;
type MenuDrawerShoppingLinksProps = {
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onNavigate: () => void;
};
/** 모바일 메뉴의 쇼핑 관련 바로가기를 표시합니다. (Displays shopping shortcuts in the mobile menu.) */
declare function MenuDrawerShoppingLinks({
  menus,
  onSelectMenu,
  onNavigate,
}: MenuDrawerShoppingLinksProps): import('react').JSX.Element;
type MegaMenuADProps = MegaMenuPromo & {
  onClick?: () => void;
  presentation?: 'desktop' | 'mobile';
  className?: string;
};
/** 메가 메뉴의 프로모션 링크와 텍스트를 표시합니다. (Displays a promotional link and copy in the mega menu.) */
declare function MegaMenuAD({
  to,
  imageSrc,
  title,
  onClick,
  presentation,
  className,
}: MegaMenuADProps): import('react').JSX.Element;
type MenuDrawerBaseProps = {
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onNavigate: () => void;
};
declare function MenuDrawerBase({
  menus,
  onSelectMenu,
  onNavigate,
}: MenuDrawerBaseProps): import('react').JSX.Element;
type MenuDrawerBackButtonProps = {
  label: string;
  onBack: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};
declare function MenuDrawerBackButton({
  label,
  onBack,
  buttonRef,
}: MenuDrawerBackButtonProps): import('react').JSX.Element;
type MenuDrawerNavigationProps = {
  activeMenu: MegaMenu | null;
  menus: readonly MegaMenu[];
  onSelectMenu: (menu: MegaMenu) => void;
  onBack: () => void;
  onNavigate: () => void;
  backButtonRef: RefObject<HTMLButtonElement | null>;
};
declare function MenuDrawerNavigation({
  activeMenu,
  menus,
  onSelectMenu,
  onBack,
  onNavigate,
  backButtonRef,
}: MenuDrawerNavigationProps): import('react').JSX.Element;
declare function MenuDrawerUtilityLinks({
  onNavigate,
}: {
  onNavigate: () => void;
}): import('react').JSX.Element;
type MenuDrawerProps = {
  close: () => void;
  isLoggedIn?: boolean;
};
declare function MenuDrawer({ close, isLoggedIn }: MenuDrawerProps): import('react').JSX.Element;
declare function FooterBrandLogo(): import('react').JSX.Element;
type SocialIconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  file: string;
  href?: string;
};
declare function SocialIconLink({
  label,
  file,
  href,
  className,
  ...props
}: SocialIconLinkProps): import('react').JSX.Element;
declare function FooterSocialLinks(): import('react').JSX.Element;
declare function FooterBrandSocial(): import('react').JSX.Element;
declare function FooterLocaleSelectors(): import('react').JSX.Element;
declare function FooterBrand(): import('react').JSX.Element;
declare function FooterLegalLinks(): import('react').JSX.Element;
type FooterNavigationLinksProps = {
  links: FooterGroup['links'];
  platform: Platform;
};
declare function FooterNavigationLinks({
  links,
  platform,
}: FooterNavigationLinksProps): import('react').JSX.Element;
declare function FooterNavigationWeb(): import('react').JSX.Element;
/** 푸터 탐색을 열 배치 또는 아코디언으로 구성합니다. (Composes footer navigation as columns or an accordion.) */
declare function FooterNavigation(): import('react').JSX.Element;
declare function FooterContent(): import('react').JSX.Element;
declare function SiteFooter(): import('react').JSX.Element;
type SearchDialogProps = {
  children: ReactNode;
  onClose: () => void;
  compact?: boolean;
  hasRecentSearches: boolean;
};
declare function SearchDialog({
  children,
  onClose,
  compact,
  hasRecentSearches,
}: SearchDialogProps): import('react').JSX.Element;
type SearchFormProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  error?: string;
};
declare function SearchForm({
  query,
  onQueryChange,
  onSearch,
  error,
}: SearchFormProps): import('react').JSX.Element;
type SearchKeywordButtonProps = {
  query: string;
  onNavigateSearch: (query: string) => void;
};
declare function SearchKeywordButton({
  query,
  onNavigateSearch,
}: SearchKeywordButtonProps): import('react').JSX.Element;
type RecentSearchItemProps = {
  query: string;
  onNavigateSearch: (query: string) => void;
  onRemove: (query: string) => void;
};
declare function RecentSearchItem({
  query,
  onNavigateSearch,
  onRemove,
}: RecentSearchItemProps): import('react').JSX.Element;
type RecentSearchesProps = {
  recentSearches: readonly string[];
  onNavigateSearch: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};
declare function RecentSearches({
  recentSearches,
  onNavigateSearch,
  onRemove,
  onClear,
}: RecentSearchesProps): import('react').JSX.Element | null;
type RecommendedSearchesProps = {
  queries: readonly string[];
  onSearch: (query: string) => void;
};
declare function RecommendedSearches({
  queries,
  onSearch,
}: RecommendedSearchesProps): import('react').JSX.Element;
type PopularSearchesProps = {
  queries: readonly string[];
  onNavigateSearch: (query: string) => void;
};
declare function PopularSearches({
  queries,
  onNavigateSearch,
}: PopularSearchesProps): import('react').JSX.Element;
type SearchSuggestionsProps = {
  recentSearches: readonly string[];
  suggestedSearches: readonly string[];
  onSearch: (query: string) => void;
  onNavigateSearch: (query: string) => void;
  onRemoveRecent: (query: string) => void;
  onClearRecent: () => void;
};
declare function SearchSuggestions({
  recentSearches,
  suggestedSearches,
  onSearch,
  onNavigateSearch,
  onRemoveRecent,
  onClearRecent,
}: SearchSuggestionsProps): import('react').JSX.Element;
type SearchOverlayProps = {
  onClose: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  error?: string;
  onErrorChange?: (error: string) => void;
};
/** Search suggestions use local preview data; submission preserves the search results route. */
declare function SearchOverlay({
  onClose,
  query: externalQuery,
  onQueryChange,
  error: externalError,
  onErrorChange,
}: SearchOverlayProps): import('react').JSX.Element;
type HeaderPromotionButtonType = 'details' | 'memberBenefits';
/** Own the member promotion message, link, and button-specific arrangement. */
declare function HeaderPromotionContent({
  buttonType,
  message,
  href,
  ref,
}: {
  buttonType?: HeaderPromotionButtonType;
  message?: string;
  href?: string;
  ref?: Ref<HTMLDivElement>;
}): import('react').JSX.Element;
/** Own the promotion slides, viewport styling, and carousel behavior. */
declare function HeaderPromotionCarousel({
  buttonType,
  items,
}: {
  buttonType?: HeaderPromotionButtonType;
  items?: HeaderPromotionItem[];
}): import('react').JSX.Element | null;
/** Member promotion shown above the sticky navigation on web and mobile. */
declare function HeaderPromotionBanner({
  buttonType,
}: {
  buttonType?: HeaderPromotionButtonType;
}): import('react').JSX.Element;
type MegaMenuListProps = {
  columns: MegaMenu['columns'];
  onClose: () => void;
};
declare function MegaMenuList({ columns, onClose }: MegaMenuListProps): import('react').JSX.Element;
type MegaMenuContentProps = {
  menu: MegaMenu;
  onClose: () => void;
};
declare function MegaMenuContent({
  menu,
  onClose,
}: MegaMenuContentProps): import('react').JSX.Element;
type MegaMenuPanelProps = {
  menu: MegaMenu;
  onClose: () => void;
  onFocusBoundary: (menuId: MegaMenu['id'], boundary: 'first' | 'last') => void;
};
declare function MegaMenuPanel({
  menu,
  onClose,
  onFocusBoundary,
}: MegaMenuPanelProps): import('react').JSX.Element;
type HeaderLogoProps = {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};
declare function HeaderLogo({ onClick }: HeaderLogoProps): import('react').JSX.Element;
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
} & (
  | {
      icon: HeaderIconProps;
      iconSlot?: never;
    }
  | {
      icon?: never;
      iconSlot: ReactNode;
    }
);
declare function HeaderIcon({
  desktopSrc,
  mobileSrc,
  alt,
}: HeaderIconProps): import('react').JSX.Element;
declare function HeaderIconLink({
  to,
  ariaLabel,
  className,
  icon,
  iconSlot,
  children,
}: HeaderIconLinkProps): import('react').JSX.Element;
type NotificationCountProps = ComponentPropsWithoutRef<'span'> & {
  count?: number;
  max?: number;
};
/** 알림 건수를 작은 원형 배지로 표시합니다. (Displays a notification count in a compact circular badge.) */
declare function NotificationCount({
  count,
  max,
  className,
  ...props
}: NotificationCountProps): import('react').JSX.Element | null;
type NotificationIconVariant = 'bag' | 'basket' | 'user';
type NotificationIconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  variant: NotificationIconVariant;
  count?: number;
  maxCount?: number;
  size?: CSSProperties['width'];
  color?: CSSProperties['color'];
  label?: string;
};
declare function NotificationIcon({
  variant,
  count,
  maxCount,
  size,
  color,
  label,
  className,
  style,
  ...props
}: NotificationIconProps): import('react').JSX.Element;
type HeaderAccountProps = {
  isLoggedIn: boolean;
  wishlistCount: number;
};
declare function HeaderAccount({
  isLoggedIn,
  wishlistCount,
}: HeaderAccountProps): import('react').JSX.Element;
type HeaderCartLinkProps = {
  cart: number;
};
declare function HeaderCartLink({ cart }: HeaderCartLinkProps): import('react').JSX.Element;
type HeaderSearchProps = {
  onSearch: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  open?: boolean;
  error?: string;
};
declare function HeaderSearch({
  onSearch,
  query,
  onQueryChange,
  open,
  error,
}: HeaderSearchProps): import('react').JSX.Element;
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
declare function HeaderTools({
  cart,
  isLoggedIn,
  wishlistCount,
  onEnterPreviousMenu,
  onSearch,
  searchQuery,
  onSearchQueryChange,
  searchOpen,
  searchError,
}: HeaderToolsProps): import('react').JSX.Element;
type Props = {
  primary: ReactNode;
  actions: ReactNode;
};
/** Own the central header frame and the primary/action groups. */
declare function SiteHeaderInner({ primary, actions }: Props): import('react').JSX.Element;
/** Own the header landmark and platform-specific outer spacing. */
declare function SiteHeaderContent({
  primary,
  actions,
}: {
  primary: ReactNode;
  actions: ReactNode;
}): import('react').JSX.Element;
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
declare function SiteHeaderContainer({
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
}: SiteHeaderContainerProps): import('react').JSX.Element;
/** Keep the header and its expanded menu in the same sticky hover region. */
declare function SiteHeaderFrame({
  children,
  onLeave,
  fixedOnScroll,
}: {
  children: ReactNode;
  onLeave: () => void;
  fixedOnScroll?: boolean;
}): import('react').JSX.Element;
type SiteHeaderProps = {
  fixedOnScroll?: boolean;
  cart: number;
  onMenu: () => void;
  isLoggedIn?: boolean;
  wishlistCount?: number;
  recentCount?: number;
};
declare function SiteHeader({
  fixedOnScroll,
  cart,
  onMenu,
  isLoggedIn,
  wishlistCount,
}: SiteHeaderProps): import('react').JSX.Element;
/** 경로와 플랫폼에 맞는 사이트 프레임을 구성합니다. (Composes the site frame for the current route and platform.) */
declare function AppLayout({
  cart,
  children,
  isLoggedIn,
  wishlistCount,
  recentCount,
}: {
  cart: number;
  children: ReactNode;
  isLoggedIn?: boolean;
  wishlistCount?: number;
  recentCount?: number;
}): import('react').JSX.Element;
export type ShopState = {
  readonly cart: CartItem[];
  readonly add: (item: CartItem) => void;
  readonly updateQuantity: (item: CartItem, quantity: number) => void;
  readonly updateOptions: (item: CartItem, next: CartItem) => void;
  readonly remove: (item: CartItem) => void;
  readonly login: () => void;
  readonly logout: () => void;
};
/** 쇼핑 상태를 외부 상태 소유자와 연결합니다. (Connects shopping state to an external state owner.) */
export declare function ShopStateProvider({
  value,
  children,
}: {
  value: ShopState;
  children: ReactNode;
}): import('react').JSX.Element;
export declare function useShop(): ShopState;
/** 쇼핑 상태와 플랫폼 컨텍스트를 제공하고 공통 레이아웃을 구성합니다. (Provides shopping state and platform context within the common layout.) */
export declare function ShopShell({
  platform,
  children,
}: {
  readonly platform?: Platform;
  readonly children: ReactNode;
}): import('react').JSX.Element;
export {
  MenuDrawerFrame,
  HeaderAuthLink,
  type HeaderAuthLinkProps,
  MenuDrawerHeader,
  MenuDrawerGroups,
  MenuDrawerShoppingLinks,
  MegaMenuAD,
  type MegaMenuADProps,
  MenuDrawerBase,
  MenuDrawerBackButton,
  MenuDrawerNavigation,
  MenuDrawerUtilityLinks,
  MenuDrawer,
  type MenuDrawerProps,
  FooterBrandLogo,
  SocialIconLink,
  type SocialIconLinkProps,
  FooterSocialLinks,
  FooterBrandSocial,
  FooterLocaleSelectors,
  FooterBrand,
  FooterLegalLinks,
  FooterNavigationLinks,
  FooterNavigationWeb,
  FooterNavigation,
  FooterContent,
  SiteFooter,
  SearchDialog,
  SearchForm,
  SearchKeywordButton,
  RecentSearchItem,
  RecentSearches,
  RecommendedSearches,
  PopularSearches,
  SearchSuggestions,
  SearchOverlay,
  HeaderPromotionContent,
  type HeaderPromotionButtonType,
  HeaderPromotionCarousel,
  HeaderPromotionBanner,
  MegaMenuList,
  MegaMenuContent,
  MegaMenuPanel,
  HeaderLogo,
  HeaderIcon,
  HeaderIconLink,
  type HeaderIconProps,
  type HeaderIconLinkProps,
  NotificationCount,
  type NotificationCountProps,
  NotificationIcon,
  type NotificationIconVariant,
  type NotificationIconProps,
  HeaderAccount,
  type HeaderAccountProps,
  HeaderCartLink,
  type HeaderCartLinkProps,
  HeaderSearch,
  type HeaderSearchProps,
  HeaderTools,
  SiteHeaderInner,
  SiteHeaderContent,
  SiteHeaderContainer,
  type SiteHeaderContainerProps,
  SiteHeaderFrame,
  SiteHeader,
  AppLayout,
};
