import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function CheckoutDiscountSummary({
  total,
  discount,
  onCoupons,
}: {
  total: number;
  discount: number;
  onCoupons: () => void;
}) {
  return (
    <Stack gap="3" p="4" border="1px solid var(--colors-black-20)">
      <HStack justifyContent="space-between">
        <Typography variant="body4">총 상품금액</Typography>
        <Typography variant="body4">{total.toLocaleString()}원</Typography>
      </HStack>
      <HStack justifyContent="space-between">
        <Typography variant="body4">상품 할인금액</Typography>
        <Typography variant="body4">0원</Typography>
      </HStack>
      <HStack justifyContent="space-between">
        <Typography variant="body4">쿠폰</Typography>
        <Button variant="link" size="sm" onClick={onCoupons}>
          조회하기
        </Button>
        <Typography variant="body4" className={css({ color: 'red.100' })}>
          - {discount.toLocaleString()}원
        </Typography>
      </HStack>
      <HStack justifyContent="space-between" py="4" borderTop="1px solid var(--colors-black-20)">
        <Typography variant="body4" weight="semibold">
          총 결제 금액
        </Typography>
        <Typography variant="body3" weight="semibold">
          {(total - discount).toLocaleString()}원
        </Typography>
      </HStack>
      <Box bg="black.10" p="4">
        <Stack gap="1">
          <Typography variant="body5" tone="subtle">
            - 보유 쿠폰 조회에서 사용할 쿠폰을 선택할 수 있습니다.
          </Typography>
          <Typography variant="body5" tone="subtle">
            - 정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.
          </Typography>
          <Typography variant="body5" tone="subtle">
            - 할인 및 쿠폰 적용 후 실 결제금액의 최대 30%까지 마일리지 사용 가능합니다.
          </Typography>
          <Typography variant="body5" tone="subtle">
            - 마일리지는 5,000점 이상 보유 시 100점 단위로 사용 가능합니다.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
