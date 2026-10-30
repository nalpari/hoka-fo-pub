import { Box } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

/** 장바구니 제목과 고정 예시 수량을 표시합니다. (Displays the cart heading and preview item count.) */
export function CartHeading({ itemCount }: { itemCount: number }) {
  return (
    <ContentHeader
      title="장바구니"
      titleAs="h1"
      titleProps={{ web: 'heading6', mo: 'heading5' }}
      orientation="horizontal"
      gap="1"
      alignItems="baseline"
      justifyContent="flex-start"
      action={
        <Box display={{ _mobile: 'none' }}>
          <Typography variant="body4">(총 {itemCount}개)</Typography>
        </Box>
      }
    />
  );
}
