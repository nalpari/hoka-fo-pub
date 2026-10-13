import { css } from 'styled-system/css';
import { VStack, HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import type { RunClubSession } from './runClub.data';

const styles = {
  filter: css({
    minW: '120px',
    '& > span': { w: '100%' },
    _mobile: { minW: '0', flex: '1' },
  }),
};

export type RunClubFilter = 'all' | RunClubSession['category'];

type RunClubHeaderProps = {
  filter: RunClubFilter;
  onFilterChange: (filter: RunClubFilter) => void;
};

export function RunClubHeader({ filter, onFilterChange }: RunClubHeaderProps) {
  return (
    <VStack as="header" gap="10">
      <VStack gap="8">
        <Typography as="h1" variant="heading5">
          HOKA Run Club
        </Typography>
        <Typography as="p" variant="body3">
          경쾌한 도심의 로드 러닝부터 거친 트레일까지.
          <br />
          당신의 모든 러닝을{' '}
          <Typography as="span" variant="body3">
            HOKA Run Club
          </Typography>
          과 함께하세요.
        </Typography>
      </VStack>
      <HStack gap="4" role="group" aria-label="러닝 유형">
        {(
          [
            { value: 'all', label: '전체보기' },
            { value: 'Road', label: '로드 러닝' },
            { value: 'Trail', label: '트레일 러닝' },
          ] as const
        ).map(({ value, label }) => (
          <Button
            key={value}
            variant={filter === value ? 'primary' : 'secondary'}
            className={styles.filter}
            aria-pressed={filter === value}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
