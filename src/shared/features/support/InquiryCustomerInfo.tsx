import { Box, Grid } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function InquiryCustomerInfo() {
  return (
    <Box p="8" bg="black.10" _mobile={{ p: '4' }}>
      <Grid
        as="dl"
        gridTemplateColumns="150px minmax(0, 1fr)"
        columnGap="3"
        rowGap="4"
        _mobile={{ gridTemplateColumns: '100px minmax(0, 1fr)' }}
      >
        <Typography as="dt" variant="body4" tone="tertiary">
          이름
        </Typography>
        <Typography as="dd" variant="body4">
          홍길동
        </Typography>
        <Typography as="dt" variant="body4" tone="tertiary">
          휴대폰 번호
        </Typography>
        <Typography as="dd" variant="body4">
          010-1234-1234
        </Typography>
        <Typography as="dt" variant="body4" tone="tertiary">
          E-mail
        </Typography>
        <Typography as="dd" variant="body4">
          hong123@naver.com
        </Typography>
      </Grid>
    </Box>
  );
}
