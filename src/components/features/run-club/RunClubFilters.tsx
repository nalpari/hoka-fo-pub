import { css } from 'styled-system/css';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl/SegmentedControl';
import { Button } from '@/components/common/atoms/Button/Button';
import type { RunClubSession } from './runClub.data';
import { Typography } from '@/components/common/atoms/Typography/Typography';

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

const options = filters.map(({ value, label, mobileLabel }) => ({
  value,
  label: (
    <>
      <Typography as="span" className={css({ _mobile: { display: 'none' } })}>
        {label}
      </Typography>
      <Typography as="span" className={css({ display: 'none', _mobile: { display: 'inline' } })}>
        {mobileLabel}
      </Typography>
    </>
  ),
}));

export function RunClubFilters({ filter, onFilterChange }: RunClubFiltersProps) {
  return (
    <SegmentedControl
      unstyled
      ariaLabel="러닝 유형"
      options={options}
      value={filter}
      onValueChange={onFilterChange}
      className={css({ display: 'flex', alignItems: 'center', gap: '4', _mobile: { gap: '2' } })}
      itemClassName={() => filterButton}
      itemRender={(option) => (
        <Button size="short" variant={filter === option.value ? 'primary' : 'secondary'} />
      )}
    />
  );
}
