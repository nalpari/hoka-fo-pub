'use client';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { modalProductSelectionContentRecipe } from '@/components/common/layouts/ModalDialog.recipe';

import { checkoutCouponGroups } from '@/app/checkout/checkout-coupons';

const classes = modalProductSelectionContentRecipe({ content: 'coupon' });

const contentStyles = modalProductSelectionContentRecipe.raw({ content: 'coupon' });

const styles = {
  footer: css({ '--modal-product-button-width': '238px' }),
};

/** 상품별 쿠폰 초안과 고정 할인 내역을 표시합니다. (Displays per-product coupon drafts and prepared discount totals.) */
export function CheckoutCouponDialog({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string[]>(['coupon-product-1']);
  const [selections, setSelections] = useState<Record<string, string>>({
    'coupon-product-1': 'family-shoes',
  });
  const toggle = (id: string) =>
    setExpanded((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  // [ 개발팀 바인딩 ] 상품별 사용 가능 개수·옵션·할인금액은 고정 fixture입니다. 상품 쿠폰 펼침·라디오 초안만 변경하며 장바구니 금액 요약은 항상 표시합니다. 실제 주문 연결 소유자가 상품/쿠폰 ID별 선택 payload, 적용 요청의 pending·실패 초안 유지·재시도·성공 후 견적 갱신과 닫기를 담당하며 현재 적용 버튼은 요청하지 않습니다.
  return (
    <ModalDialog
      variant="productSelection"
      open
      onOpenChange={(open) => !open && onClose()}
      title="보유 쿠폰 조회"
      closeLabel="보유 쿠폰 조회 닫기"
      mobilePresentation="bottomSheet"
      blurBackdrop={false}
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
        {checkoutCouponGroups.map((group) => (
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
            <Button
              variant="unstyled"
              onClick={() => toggle(group.id)}
              aria-expanded={expanded.includes(group.id)}
              className={classes.toggle}
            >
              <Typography variant="b6">
                사용 가능 쿠폰{' '}
                <Typography as="span" variant="b6" tone="red80">
                  {group.available}
                </Typography>
                개 (전체 {group.total}개)
              </Typography>
              <Icon
                name={
                  expanded.includes(group.id)
                    ? 'hoka-action-minus-regular'
                    : 'hoka-action-plus-regular'
                }
                size={20}
              />
            </Button>
            {expanded.includes(group.id) ? (
              <Box css={contentStyles.coupons}>
                <Radio
                  ariaLabel={`${group.id} 쿠폰 선택`}
                  name={group.id}
                  value={selections[group.id] ?? 'none'}
                  onValueChange={(value) =>
                    setSelections((previous) => ({ ...previous, [group.id]: value }))
                  }
                  className={classes.radio}
                  options={group.options.map((option) => ({
                    value: option.id,
                    disabled: option.disabled,
                    label: (
                      <HStack as="span" css={contentStyles.option}>
                        <Typography variant="b6" className={classes.optionLabel}>
                          {option.label}
                        </Typography>
                        <Typography variant="b6M" className={classes.optionAmount}>
                          {option.amount}
                        </Typography>
                      </HStack>
                    ),
                  }))}
                />
              </Box>
            ) : null}
          </Stack>
        ))}
        <Box className={css(contentStyles.toggle, contentStyles.cartToggle)}>
          <Typography web="h10" mo="h8" className={classes.sectionTitle}>
            장바구니 쿠폰
          </Typography>
        </Box>
        <Stack css={contentStyles.summary}>
          <Stack css={contentStyles.summaryBody}>
            <AmountRow label="주문금액 (상품2개)" amount={3350000} />
            <AmountRow label="할인금액" amount={15000} discount />
            <AmountRow label="상품할인" amount={0} />
            <AmountRow label="장바구니 (남은 한도 11,000원)" amount={0} />
          </Stack>
          <AmountRow
            label="총 결제 금액"
            amount={3200000}
            emphasis
            css={contentStyles.summaryTotal}
          />
        </Stack>
      </Stack>
    </ModalDialog>
  );
}
