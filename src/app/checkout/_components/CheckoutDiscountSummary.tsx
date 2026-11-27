'use client';

import { useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { checkoutEmployeeDiscountNotice } from '@/app/checkout/checkout-summary';

import { CheckoutCouponDialog } from './CheckoutCouponDialog';

const styles = {
  limitLabel: css({ flexShrink: 0 }),
  limitNotice: css({
    flex: '1',
    minW: '0',
    textAlign: 'left',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  }),
  limitAmount: css({ pl: '2px' }),
  limitAmountWithEnd: css({ px: '2px' }),
  couponChangeFooter: css.raw({ '& button': { _mobile: { flex: '1', minW: '0' } } }),
};

export type CheckoutCouponPreview = 'lookup' | 'change';

function renderLimitAmount(amount: string, padEnd = false) {
  return (
    <Typography variant="b8B" className={padEnd ? styles.limitAmountWithEnd : styles.limitAmount}>
      <Typography variant="b8B" language="en">
        {amount}
      </Typography>
      원
    </Typography>
  );
}

/** 주문 금액과 보유 쿠폰 조회 UI를 표시합니다. (Displays prepared order totals and the coupon lookup interface.) */
export function CheckoutDiscountSummary({
  initialCouponDialog,
}: {
  initialCouponDialog?: CheckoutCouponPreview;
}) {
  const [couponDialog, setCouponDialog] = useState(initialCouponDialog);
  const couponLookupRef = useRef<HTMLButtonElement>(null);
  const mobile = usePlatform() === 'mobile';
  const closeCouponDialog = () => setCouponDialog(undefined);
  // [ 개발팀 바인딩 ] 주문금액·할인·합계와 임직원 할인한도는 고정 표시 데이터입니다. 주문 연결 소유자가 견적 응답에서 금액과 계정별 한도 표시값을 전달하고 쿠폰 적용 성공 후 갱신합니다.
  return (
    <Stack gap={{ base: '28px', _mobile: '12px' }}>
      {!mobile ? (
        <Typography as="h2" web="h10" mo="h8">
          주문내역
        </Typography>
      ) : null}
      <Stack gap={{ base: '28px', _mobile: '0px' }}>
        <Stack
          gap={{ base: '10px', _mobile: '12px' }}
          _mobile={{ px: '16px', py: '20px', border: '1px solid var(--colors-black-20)' }}
        >
          <AmountRow label="상품 금액" amount={350000} web="b5" mo="b6" amountWeb="b4" />
          <Stack gap={{ base: '16px', _mobile: '12px' }}>
            <AmountRow label="쿠폰 할인" amount={15000} web="b5" mo="b6" amountWeb="b4" discount />
            <Button
              ref={couponLookupRef}
              variant="secondary"
              size="short"
              fullWidth
              onClick={() => setCouponDialog('lookup')}
            >
              쿠폰 조회하기
            </Button>
          </Stack>
          <HStack
            alignItems="flex-start"
            gap="16px"
            mt={{ base: '14px', _mobile: '0' }}
            pt={{ _mobile: '8px' }}
          >
            <Typography web="b6M" mo="b7M" tone="#000000" className={styles.limitLabel}>
              임직원
            </Typography>
            <Typography variant="b8" tone="#333333" language="ko" className={styles.limitNotice}>
              <Typography>할인한도</Typography>{' '}
              {renderLimitAmount(checkoutEmployeeDiscountNotice.limit, true)}{' '}
              <Typography>중</Typography> {renderLimitAmount(checkoutEmployeeDiscountNotice.used)}
              <Typography>을</Typography> <Typography>사용 하셨습니다. (잔여한도</Typography>{' '}
              {renderLimitAmount(checkoutEmployeeDiscountNotice.remaining)}
              <Typography>)</Typography>
            </Typography>
          </HStack>
        </Stack>
        <AmountRow
          label="총 결제금액"
          labelWeight="700-500"
          amount={mobile ? 3200000 : 334550}
          web="b4"
          mo="b6"
          amountWeb="b3"
          amountMo="b4"
          borderTop={{ base: '2px solid var(--color-black-20)', _mobile: '0px' }}
          pt="20px"
          _mobile={{
            bg: 'black.10',
            border: '1px solid var(--colors-black-20)',
            borderTop: '0',
            px: '16px',
            pb: '20px',
          }}
        />
      </Stack>
      <Stack gap="0px">
        {[
          '쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.',
          '정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.',
        ].map((text) => (
          <Typography key={text} web="b6" mo="b7" tone="tertiary">
            * {text}
          </Typography>
        ))}
      </Stack>
      {couponDialog === 'lookup' ? <CheckoutCouponDialog onClose={closeCouponDialog} /> : null}
      {/* [ 개발팀 바인딩 ] 쿠폰 변경 확인은 고정 미리보기입니다. 실제 주문 연결 소유자가 적용 중인 쿠폰과 선택한 상품별·장바구니 쿠폰 ID로 충돌을 판정하고 확인 시 교체를 요청합니다. 요청 중 중복을 막고 실패 시 선택을 유지해 오류·재시도를 제공하며, 성공 후 견적을 갱신하고 닫습니다. */}
      {initialCouponDialog === 'change' && (
        <ModalDialog
          variant="confirm"
          open={couponDialog === 'change'}
          onOpenChange={(open) => !open && closeCouponDialog()}
          finalFocus={couponLookupRef}
          footerProps={{ css: styles.couponChangeFooter }}
          title="주문하기"
          closeLabel="쿠폰 변경 안내 닫기"
          message="선택하신 쿠폰으로 변경하시겠습니까?"
          description={
            <>
              상품 쿠폰과 장바구니 쿠폰은 함께 사용할 수 없습니다.
              <br />
              선택하신 쿠폰으로 변경하시겠습니까?
            </>
          }
          footer={
            <>
              <Button variant="primary" size="tall" fullWidth onClick={closeCouponDialog}>
                변경하기
              </Button>
              <Button variant="secondary" size="tall" fullWidth onClick={closeCouponDialog}>
                취소
              </Button>
            </>
          }
        />
      )}
    </Stack>
  );
}
