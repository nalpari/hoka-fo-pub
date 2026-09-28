import { HeaderAccount } from '@/shared/components/organisms/Layout/SiteHeader/HeaderAccount';
import { HeaderAuthLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderAuthLink';
import { HeaderCartLink } from '@/shared/components/organisms/Layout/SiteHeader/HeaderCartLink';
import { HeaderSearch } from '@/shared/components/organisms/Layout/SiteHeader/HeaderSearch';
import { usePlatform } from '@/shared/context/platform';
import { Flex, HStack } from 'styled-system/jsx';

type HeaderToolsProps = {
  cart: number;
  isLoggedIn: boolean;
  wishlistCount: number;
  onSearch: () => void;
};

export function HeaderTools({ cart, isLoggedIn, wishlistCount, onSearch }: HeaderToolsProps) {
  const platform = usePlatform();

  return (
    <Flex gap={platform === 'mobile' ? '6px' : '16px'} alignItems="center">
      <HeaderSearch onSearch={onSearch} />
      <HStack gap={platform === 'mobile' ? '6px' : '4px'}>
        <HeaderAccount isLoggedIn={isLoggedIn} wishlistCount={wishlistCount} />
        <HeaderCartLink cart={cart} />
      </HStack>
      {platform === 'web' && !isLoggedIn ? <HeaderAuthLink /> : null}
    </Flex>
  );
}
