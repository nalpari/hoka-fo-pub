import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import type { RunClubSession } from './runClub.data';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type RunClubFilter = 'all' | RunClubSession['category'];

type RunClubFiltersProps = {
  filter: RunClubFilter;
  onFilterChange: (filter: RunClubFilter) => void;
};

const filters = [
  { value: 'all', label: '전체보기', mobileLabel: '전체' },
  { value: 'Road', label: '로드 러닝', mobileLabel: '로드 러닝' },
  { value: 'Trail', label: '트레일 러닝', mobileLabel: '트레일 러닝' },
] as const;

const filterButton = css({
  minW: '120px',
  '& > span': { w: '100%' },
  _mobile: {
    minW: '0',
    '--button-height': '32px!',
    '--button-padding-x': '16px!',
    '--button-label-size': '14px!',
  },
});

export function RunClubFilters({ filter, onFilterChange }: RunClubFiltersProps) {
  return (
    <HStack gap="4" role="group" aria-label="러닝 유형" _mobile={{ gap: '2' }}>
      {filters.map(({ value, label, mobileLabel }) => (
        <Button
          key={value}
          variant={filter === value ? 'primary' : 'secondary'}
          className={filterButton}
          aria-pressed={filter === value}
          onClick={() => onFilterChange(value)}
        >
          <Typography as="span" className={css({ _mobile: { display: 'none' } })}>
            {label}
          </Typography>
          <Typography
            as="span"
            className={css({ display: 'none', _mobile: { display: 'inline' } })}
          >
            {mobileLabel}
          </Typography>
        </Button>
      ))}
    </HStack>
  );
}
