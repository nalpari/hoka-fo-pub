import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type SearchKeywordButtonProps = { query: string; onNavigateSearch: (query: string) => void };

export function SearchKeywordButton({ query, onNavigateSearch }: SearchKeywordButtonProps) {
  return (
    <ButtonLink
      href={`/search?q=${encodeURIComponent(query)}&scope=${encodeURIComponent('전체')}`}
      variant="link"
      size="lg"
      onMouseDown={(event) => event.preventDefault()}
      onNavigate={() => onNavigateSearch(query)}
    >
      <Typography variant="body4" weight="regular" tone="subtle">
        {query}
      </Typography>
    </ButtonLink>
  );
}
