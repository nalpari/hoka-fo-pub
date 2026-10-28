import { Center } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

/** 런클럽 세션 대표 이미지 영역을 표시합니다. (Displays the run club session hero image area.) */
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
      <Typography variant="heading7" mo="body2" weight="black">이미지 영역</Typography>
    </Center>
  );
}
