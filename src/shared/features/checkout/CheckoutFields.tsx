'use client';

import Link from 'next/link';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const paymentMethods = [
  { value: 'kakao', label: '카카오페이' },
  { value: 'naver', label: '네이버페이' },
  { value: 'toss', label: '토스페이' },
  { value: 'card', label: '신용카드' },
  { value: 'samsung', label: '삼성페이' },
  { value: 'payco', label: '페이코' },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]['value'];

const field = css({
  w: '100%',
  border: '0',
  bg: 'transparent',
  color: 'black.100',
  fontSize: '14px',
  lineHeight: '1.3',
  _focusVisible: { outline: '1px solid var(--colors-black-100)' },
});

export function CheckoutShipping({
  errors,
}: {
  errors?: Partial<Record<'name' | 'phone' | 'address', string>>;
}) {
  return (
    <Stack as="section" gap="4">
      <Typography as="h2" web="heading9" mo="heading7">
        주문자 및 배송지 정보
      </Typography>
      <Box border="1px solid var(--colors-black-20)">
        <HStack justifyContent="space-between" alignItems="center" bg="black.10" px="4" h="56px">
          <HStack gap="2">
            <Typography web="body3" mo="body3" weight="medium">
              홍길동집
            </Typography>
            <Box border="1px solid var(--colors-black-20)" px="1" py="0.5" borderRadius="2px">
              <Typography web="body5" mo="body5">
                기본 배송지
              </Typography>
            </Box>
          </HStack>
          <Link
            href="/mypage/addresses"
            className={css({ fontSize: '12px', textDecoration: 'underline' })}
          >
            배송지변경
          </Link>
        </HStack>
        <Stack gap="3" px="4" py="5" borderTop="1px solid var(--colors-black-20)">
          <HStack gap="4" alignItems="flex-start">
            <Box minW="48px">
              <Typography web="body4" mo="body4" tone="subtle">
                주소
              </Typography>
            </Box>
            <Stack flex="1" gap="1">
              <input
                aria-label="주소"
                name="address"
                autoComplete="street-address"
                className={field}
                defaultValue="서울시 강남구 역삼동 234-1"
              />
              {errors?.address ? (
                <Typography web="body5" mo="body5" tone="subtle">
                  {errors.address}
                </Typography>
              ) : null}
            </Stack>
          </HStack>
          <HStack gap="4">
            <Box minW="48px">
              <Typography web="body4" mo="body4" tone="subtle">
                받는 분
              </Typography>
            </Box>
            <input
              aria-label="받는 분"
              name="name"
              autoComplete="name"
              className={field}
              defaultValue="홍길동"
            />
          </HStack>
          <HStack gap="4">
            <Box minW="48px">
              <Typography web="body4" mo="body4" tone="subtle">
                연락처
              </Typography>
            </Box>
            <input
              aria-label="연락처"
              name="phone"
              autoComplete="tel"
              className={field}
              defaultValue="010-1234-5678"
            />
          </HStack>
        </Stack>
      </Box>
      <Stack gap="2">
        <Typography as="label" htmlFor="delivery-request" web="body4" mo="body4">
          * 배송시 요청사항
        </Typography>
        <select
          id="delivery-request"
          name="deliveryRequest"
          className={css({
            border: '1px solid var(--colors-black-20)',
            w: '100%',
            h: '48px',
            px: '4',
            bg: 'white',
          })}
        >
          <option value="">요청사항을 선택해주세요</option>
          <option value="door">문 앞에 놓아주세요</option>
          <option value="call">배송 전 연락주세요</option>
          <option value="security">경비실에 맡겨주세요</option>
        </select>
      </Stack>
    </Stack>
  );
}

export function CheckoutPayment({
  payment,
  onPaymentChange,
}: {
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
}) {
  return (
    <Stack as="section" gap="4">
      <Typography as="h2" web="heading9" mo="heading7">
        결제 정보
      </Typography>
      <Grid
        as="div"
        role="radiogroup"
        aria-label="결제 수단"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        gap="1"
      >
        {paymentMethods.map((method) => (
          <Box
            as="label"
            key={method.value}
            minH="68px"
            border={
              payment === method.value
                ? '1px solid var(--colors-black-100)'
                : '1px solid var(--colors-black-20)'
            }
            cursor="pointer"
          >
            <Stack h="100%" alignItems="center" justifyContent="center" gap="1">
              {method.value === 'kakao' ? (
                <img
                  src="/images/checkout/kakaopay.png"
                  alt=""
                  className={css({ w: '28px', h: '16px', objectFit: 'contain' })}
                />
              ) : null}
              <Typography web="body5" mo="body5">
                {method.label}
              </Typography>
            </Stack>
            <input
              type="radio"
              name="paymentMethod"
              value={method.value}
              checked={payment === method.value}
              onChange={() => onPaymentChange(method.value)}
              className={css({ srOnly: true })}
            />
          </Box>
        ))}
      </Grid>
      <Stack gap="1" pt="2">
        {[1, 2, 3].map((index) => (
          <Typography key={index} web="body5" mo="body5" tone="subtle">
            - {paymentMethods.find((method) => method.value === payment)?.label} 안내사항 {index}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
