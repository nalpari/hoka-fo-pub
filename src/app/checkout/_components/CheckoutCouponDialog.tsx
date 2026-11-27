'use client';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { modalProductSelectionContentRecipe } from '@/components/common/layouts/ModalDialog.recipe';

import { checkoutCouponGroups } from '@/app/checkout/checkout-coupons';

const classes = modalProductSelectionContentRecipe({ content: 'coupon' });

const contentStyles = modalProductSelectionContentRecipe.raw({ content: 'coupon' });

const styles = {
  couponCount: css({ py: '16px' }),
  footer: css({ '--modal-product-button-width': '238px' }),
};

/** 상품별 쿠폰 초안과 고정 할인 내역을 표시합니다. (Displays per-product coupon drafts and prepared discount totals.) */
export function CheckoutCouponDialog({ onClose }: { onClose: () => void }) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  // [ 개발팀 바인딩 ] 상품별 개수·쿠폰 ID/옵션·할인금액은 고정 표시 데이터입니다. Dropdown은 상품 ID별 쿠폰 선택 초안만 변경합니다. 주문 연결 소유자가 적용 시 전체 선택 payload를 요청하고 pending·중복 방지·실패 시 초안 유지와 재시도·성공 후 견적 갱신과 닫기를 담당합니다. 현재 적용 버튼은 요청하지 않습니다.
  return (
    <ModalDialog
      variant="productSelection"
      open
      onOpenChange={(open) => !open && onClose()}
      title="보유 쿠폰 조회"
      closeLabel="보유 쿠폰 조회 닫기"
      mobilePresentation="bottomSheet"
      footerProps={{ className: styles.footer }}
      footer={
        <Button variant="primary" size="tall">
          쿠폰 적용하기
        </Button>
      }
    >
      <Stack css={contentStyles.root}>
        <Typography
          as="h2"
          web="h10"
          mo="h8"
          className={`${classes.sectionTitle} ${classes.sectionHeading}`}
        >
          상품 쿠폰
        </Typography>
        {checkoutCouponGroups.map((group, index) => {
          const couponCount = (
            <HStack gap="8px">
              <Typography variant="b6">
                사용 가능 쿠폰{' '}
                <Typography variant="b6M" language="en" tone="accent">
                  {group.available}
                </Typography>
                개
              </Typography>
              <Typography variant="b6" tone="tertiary">
                (전체 {group.total}개)
              </Typography>
            </HStack>
          );

          return (
            <Stack key={group.id} css={contentStyles.product}>
              <Box css={contentStyles.productInfo}>
                <OrderProductSummary
                  variant="coupon"
                  image={group.image}
                  name={group.name}
                  optionText={group.optionText}
                  amount={group.amount}
                  imageSize={{ web: 96, mobile: 80 }}
                />
              </Box>
              <Box className={styles.couponCount}>{couponCount}</Box>
              <Dropdown
                variant="detailed"
                layer="modal"
                ariaLabel={group.name + ' ' + (index + 1) + ' 상품 쿠폰'}
                mobileSheetHeading={{ title: '상품 쿠폰', intro: couponCount }}
                value={selections[group.id] ?? group.initialCouponId}
                onValueChange={(value) =>
                  setSelections((previous) => ({ ...previous, [group.id]: value }))
                }
                options={group.options.map((option) => ({
                  value: option.id,
                  label: option.label,
                  detail: (
                    <>
                      <Typography variant="b7M" language="en">
                        {option.amount}
                      </Typography>
                      <Typography variant="b7B">원</Typography>
                    </>
                  ),
                  disabled: option.disabled,
                }))}
              />
            </Stack>
          );
        })}
        <Box className={css(contentStyles.toggle, contentStyles.cartToggle)}>
          <Typography web="h10" mo="h8" className={classes.sectionTitle}>
            장바구니 쿠폰
          </Typography>
        </Box>
        <Stack css={contentStyles.summary}>
          <Stack css={contentStyles.summaryBody}>
            <AmountRow label="주문금액" amount={3350000} />
            <AmountRow label="할인금액" amount={15000} discount />
            <AmountRow label="상품할인" amount={0} />
            <AmountRow label="장바구니" amount={0} />
          </Stack>
          <AmountRow
            label="총 결제금액"
            amount={3200000}
            emphasis
            css={contentStyles.summaryTotal}
          />
        </Stack>
      </Stack>
    </ModalDialog>
  );
}
