import { Box, Grid } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function InquiryCustomerInfo() {
  return (
    <Box p="4" bg="black.10">
      <Grid gridTemplateColumns="max-content 1fr" gap="2">
        <Typography variant="body4" tone="tertiary">
          이름
        </Typography>
        <Typography variant="body4">홍길동</Typography>
        <Typography variant="body4" tone="tertiary">
          휴대폰 번호
        </Typography>
        <Typography variant="body4">010-1234-1234</Typography>
        <Typography variant="body4" tone="tertiary">
          E-mail
        </Typography>
        <Typography variant="body4">hong123@naver.com</Typography>
      </Grid>
    </Box>
  );
}
