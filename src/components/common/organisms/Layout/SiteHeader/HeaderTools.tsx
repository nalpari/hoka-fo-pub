import { HeaderAccount } from '@/components/common/organisms/Layout/SiteHeader/HeaderAccount';
import { HeaderAuthLink } from '@/components/common/organisms/Layout/SiteHeader/HeaderAuthLink';
import { HeaderCartLink } from '@/components/common/organisms/Layout/SiteHeader/HeaderCartLink';
import { HeaderSearch } from '@/components/common/organisms/Layout/SiteHeader/HeaderSearch';
import { usePlatform } from '@/context/platform';
import { Flex, HStack } from 'styled-system/jsx';

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

export function HeaderTools({
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
