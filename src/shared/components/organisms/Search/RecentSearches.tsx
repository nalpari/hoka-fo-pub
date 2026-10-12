import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { css } from 'styled-system/css';
import { RecentSearchItem } from './RecentSearchItem';

const recent = css({
  borderRight: '1px solid var(--color-black-20)',
  _mobile: { borderRight: '0', borderBottom: '1px solid var(--color-black-20)' },
});

type RecentSearchesProps = {
  recentSearches: readonly string[];
  onSearch: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};

export function RecentSearches({
  recentSearches,
  onSearch,
  onRemove,
  onClear,
}: RecentSearchesProps) {
  return (
    <section className={recent} aria-labelledby="recent-search-title">
      <header>
        <Typography as="h3" variant="body4" weight="bold" id="recent-search-title">
          최근 검색어
        </Typography>
        {recentSearches.length ? (
          <Button onClick={onClear} onMouseDown={(event) => event.preventDefault()}>
            <Typography variant="body5" weight="inherit">
              전체 기록 삭제
            </Typography>
          </Button>
        ) : null}
      </header>
      {recentSearches.length ? (
        <ul>
          {recentSearches.map((recent) => (
            <RecentSearchItem key={recent} query={recent} onSearch={onSearch} onRemove={onRemove} />
          ))}
        </ul>
      ) : (
        <Typography as="p" variant="body4">
          최근 검색어 내역이 없습니다.
        </Typography>
      )}
    </section>
  );
}
