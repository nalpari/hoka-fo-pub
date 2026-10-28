import { Box, Center } from 'styled-system/jsx';
import { EmptyState } from '@/components/common/atoms/EmptyState/EmptyState';
import { Typography } from '@/components/common/atoms/Typography/Typography';

export function RunClubEmptyState() {
  return (
    <Box role="status">
      <Box _mobile={{ display: 'none' }}>
        <EmptyState title="현재 운영중인 세션이 없습니다." />
      </Box>
      <Center display="none" _mobile={{ display: 'flex', h: '340px', px: '4' }}>
        <Typography as="h2" variant="body1" weight="black">
          현재 운영중인 세션이 없습니다.
        </Typography>
      </Center>
    </Box>
  );
}
