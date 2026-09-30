import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Button } from '@/shared/components/atoms/Button/Button';
import { usePlatform } from '@/shared/context/platform';

export type HeaderSearchProps = {
  onSearch: () => void;
};

export function HeaderSearch({ onSearch }: HeaderSearchProps) {
  const platform = usePlatform();

  if (platform === 'web') {
    return (
      <Button
        aria-label="검색"
        icon={<Icon src="/images/header/search.svg" size="16px" />}
        onClick={onSearch}
        variant="headerSearch"
      >
        검색하기
      </Button>
    );
  }

  return (
    <IconButton size="32px" onClick={onSearch} aria-label="검색">
      <Icon src="/images/header/search.svg" size="19px" />
    </IconButton>
  );
}
