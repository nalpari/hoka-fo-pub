import { Icon } from '@/components/common/atoms/Icon/Icon';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { faXmark } from '@/icons/fontAwesome';
import { HStack } from 'styled-system/jsx';
import { SearchKeywordButton } from './SearchKeywordButton';

type RecentSearchItemProps = {
  query: string;
  onNavigateSearch: (query: string) => void;
  onRemove: (query: string) => void;
};

export function RecentSearchItem({ query, onNavigateSearch, onRemove }: RecentSearchItemProps) {
  return (
    <HStack as="li" gap="2" _mobile={{ justifyContent: 'space-between' }}>
      <HStack gap="2">
        <Icon name="timer" size="18px" />
        <SearchKeywordButton query={query} onNavigateSearch={onNavigateSearch} />
      </HStack>
      <IconButton
        aria-label={query + ' 삭제'}
        onClick={() => onRemove(query)}
        size="18px"
        shape="square"
      >
        <Icon fontAwesomeIcon={faXmark} size="14px" />
      </IconButton>
    </HStack>
  );
}
