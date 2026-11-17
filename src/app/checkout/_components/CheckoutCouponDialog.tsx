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

import { checkoutCouponGroups } from '@/app/checkout/checkout-coupons';

/** 상품별 쿠폰 초안과 고정 할인 내역을 표시합니다. (Displays per-product coupon drafts and prepared discount totals.) */
export function CheckoutCouponDialog({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string[]>(['coupon-product-1', 'cart']);
  const [selections, setSelections] = useState<Record<string, string>>({
    'coupon-product-1': 'family-shoes',
  });
  const toggle = (id: string) =>
    setExpanded((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  // [ 개발팀 바인딩 ] 상품별 사용 가능 개수·옵션·할인금액은 고정 fixture입니다. 펼침·라디오 초안만 변경합니다. 실제 주문 연결 소유자가 상품/쿠폰 ID별 선택 payload, 적용 요청의 pending·실패 초안 유지·재시도·성공 후 견적 갱신과 닫기를 담당하며 현재 적용 버튼은 요청하지 않습니다.
  return (
    <ModalDialog
      variant="couponLookup"
      open
      onOpenChange={(open) => !open && onClose()}
      title="보유 쿠폰 조회"
      closeLabel="보유 쿠폰 조회 닫기"
      mobilePresentation="bottomSheet"
      blurBackdrop={false}
      footer={
        <Button variant="primary" size="tall">
          쿠폰 적용하기
        </Button>
      }
    >
      <Stack gap="0">
        <Typography as="h2" variant="heading9" className={css({ pb: '20px' })}>
          상품 쿠폰
        </Typography>
        {checkoutCouponGroups.map((group) => (
          <Stack key={group.id} gap="0" borderTop="1px solid black">
            <Box py="20px">
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
              className={css({
                w: '100%',
                display: 'flex',
                alignItems: 'center',
                border: '0',
                bg: 'transparent',
                cursor: 'pointer',
                textDecoration: 'none',
                justifyContent: 'space-between',
                pb: '20px',
              })}
            >
              <Typography variant="body4">
                사용 가능 쿠폰{' '}
                <Typography as="span" variant="body4" tone="red80">
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
              <Box py="20px" borderTop="1px solid var(--colors-black-20)">
                <Radio
                  ariaLabel={`${group.id} 쿠폰 선택`}
                  name={group.id}
                  value={selections[group.id] ?? 'none'}
                  onValueChange={(value) =>
                    setSelections((previous) => ({ ...previous, [group.id]: value }))
                  }
                  className={css({
                    gap: '24px',
                    '& label': { alignItems: 'flex-start' },
                    '& label > :last-child': { flex: '1', minW: '0' },
                    '& label[data-disabled]': { opacity: '0.3' },
                  })}
                  options={group.options.map((option) => ({
                    value: option.id,
                    disabled: option.disabled,
                    label: (
                      <HStack
                        as="span"
                        flex="1"
                        w="100%"
                        justifyContent="space-between"
                        alignItems="center"
                        gap="16px"
                      >
                        <Typography variant="body4" className={css({ whiteSpace: 'pre-line' })}>
                          {option.label}
                        </Typography>
                        <Typography variant="body4Medium" className={css({ whiteSpace: 'nowrap' })}>
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
        <Button
          variant="unstyled"
          onClick={() => toggle('cart')}
          aria-expanded={expanded.includes('cart')}
          className={css({
            w: '100%',
            display: 'flex',
            alignItems: 'center',
            border: '0',
            bg: 'transparent',
            cursor: 'pointer',
            justifyContent: 'space-between',
            textDecoration: 'none',
            py: '20px',
            borderY: '1px solid black',
          })}
        >
          <Typography variant="heading9">장바구니 쿠폰</Typography>
          <Icon
            name={
              expanded.includes('cart') ? 'hoka-action-minus-regular' : 'hoka-action-plus-regular'
            }
            size={20}
          />
        </Button>
        {expanded.includes('cart') ? (
          <Stack gap="0" mt="24px" border="1px solid var(--colors-black-20)">
            <Stack p="20px" gap="12px">
              <AmountRow label="주문금액 (상품2개)" amount={3350000} />
              <AmountRow label="할인금액" amount={15000} discount />
              <AmountRow label="상품할인" amount={0} />
              <AmountRow label="장바구니 (남은 한도 11,000원)" amount={0} />
            </Stack>
            <AmountRow
              label="총 결제 금액"
              amount={3200000}
              emphasis
              bg="black.10"
              p="20px"
              borderTop="1px solid var(--colors-black-20)"
            />
          </Stack>
        ) : null}
      </Stack>
    </ModalDialog>
  );
}
