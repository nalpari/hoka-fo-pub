import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { faXmark } from '@/shared/icons/fontAwesome';
import { css } from 'styled-system/css';
import { SearchKeywordButton } from './SearchKeywordButton';

type RecentSearchItemProps = {
  query: string;
  onSearch: (query: string) => void;
  onRemove: (query: string) => void;
};

export function RecentSearchItem({ query, onSearch, onRemove }: RecentSearchItemProps) {
  return (
    <li className={css({ display: 'flex', alignItems: 'center', gap: '8px' })}>
      <Icon fontAwesomeIcon={faClockRotateLeft} size="16px" />
      <SearchKeywordButton query={query} onSearch={onSearch} />
      <IconButton
        aria-label={query + ' 삭제'}
        onClick={() => onRemove(query)}
        size="16px"
        className={css({ _mobile: { ml: 'auto' } })}
      >
        <Icon fontAwesomeIcon={faXmark} size="14px" />
      </IconButton>
    </li>
  );
}
