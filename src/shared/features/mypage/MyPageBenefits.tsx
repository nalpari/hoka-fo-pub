import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const benefitLink = css({
  minW: '0',
  bg: 'black.10',
  p: '5',
  color: 'inherit',
  textDecoration: 'none',
});

export function MyPageBenefits() {
  return (
    <Grid columns={2} gap="2">
      <Link className={benefitLink} href="/mypage/coupons">
        <Stack h="14" justifyContent="space-between">
          <Typography variant="body4">내 쿠폰</Typography>
          <HStack gap="0.5" justifyContent="flex-end" alignItems="baseline">
            <Typography web="heading8" mo="heading5">
              3
            </Typography>
            <Typography variant="body3">개</Typography>
          </HStack>
        </Stack>
      </Link>
      <Link className={benefitLink} href="/mypage/wishlist">
        <Stack h="14" justifyContent="space-between">
          <Typography variant="body4">관심상품</Typography>
          <HStack gap="0.5" justifyContent="flex-end" alignItems="baseline">
            <Typography web="heading8" mo="heading5">
              6
            </Typography>
            <Typography variant="body3">건</Typography>
          </HStack>
        </Stack>
      </Link>
    </Grid>
  );
}
