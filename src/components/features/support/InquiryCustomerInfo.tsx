import { Box, Grid } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

/** 문의 등록자의 이름과 연락처 정보를 표시합니다. (Displays the inquirer's name and contact information.) */
export function InquiryCustomerInfo() {
  return (
    <Box px="8" py="6" bg="black.10" _mobile={{ px: '4', py: '5' }}>
      <Grid
        as="dl"
        gridTemplateColumns="max-content minmax(0, 1fr)"
        columnGap="22"
        rowGap="3"
        _mobile={{ gridTemplateColumns: '82px minmax(0, 1fr)', columnGap: '2' }}
      >
        <Typography as="dt" variant="body3" tone="subtle">
          이름
        </Typography>
        <Typography as="dd" variant="body3" mo="body4" weight="medium">
          홍길동
        </Typography>
        <Typography as="dt" variant="body3" tone="subtle">
          휴대폰 번호
        </Typography>
        <Typography as="dd" variant="body3" mo="body4" weight="medium">
          010-1234-1234
        </Typography>
        <Typography as="dt" variant="body3" tone="subtle">
          E-mail
        </Typography>
        <Typography as="dd" variant="body3" mo="body4" weight="medium">
          hong123@naver.com
        </Typography>
      </Grid>
    </Box>
  );
}
