import { ButtonLink } from '@/shared/components/atoms/Button/Button';

type SearchKeywordButtonProps = { query: string; onNavigateSearch: (query: string) => void };

export function SearchKeywordButton({ query, onNavigateSearch }: SearchKeywordButtonProps) {
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
