import { Center } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function RunClubSessionImage() {
  return (
    <Center
      w="min(calc(100% - 110px), 1776px)"
      mx="auto"
      my="72px"
      aspectRatio="2.77"
      bg="var(--color-black-40)"
      _mobile={{
        w: 'auto',
        mx: 'var(--layout-mobile-inline-gutter)',
        my: '10',
        aspectRatio: '1.5',
      }}
    >
      <Typography variant="sessionImagePlaceholder">이미지 영역</Typography>
    </Center>
  );
}
