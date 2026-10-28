import { Grid } from 'styled-system/jsx';
import { MyPageBenefitItem } from './MyPageBenefitItem';

export function MyPageBenefits() {
  return (
    <Grid columns={2} gap="2">
      <MyPageBenefitItem href="/mypage/coupons" label="내 쿠폰" count={3} unit="개" />
      <MyPageBenefitItem href="/mypage/wishlist" label="관심상품" count={6} unit="건" />
    </Grid>
  );
}
