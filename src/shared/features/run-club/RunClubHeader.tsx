import { VStack, HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { RunClubHistoryLink } from './RunClubHistoryLink';
import { RunClubFilters, type RunClubFilter } from './RunClubFilters';

type RunClubHeaderProps = {
  filter: RunClubFilter;
  onFilterChange: (filter: RunClubFilter) => void;
};

export function RunClubHeader({ filter, onFilterChange }: RunClubHeaderProps) {
  return (
    <VStack as="header" gap="10" _mobile={{ alignItems: 'stretch', gap: '10', px: '4', pb: '4' }}>
      <VStack gap="8" _mobile={{ alignItems: 'flex-start', gap: '4' }}>
        <Typography as="h1" variant="heading5" mo="heading4">
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
      <HStack gap="4" _mobile={{ gap: '2', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <RunClubFilters filter={filter} onFilterChange={onFilterChange} />
        <HStack display="none" _mobile={{ display: 'flex' }}>
          <RunClubHistoryLink compact />
        </HStack>
      </HStack>
    </VStack>
  );
}
