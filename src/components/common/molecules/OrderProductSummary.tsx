'use client';

import Image from 'next/image';

import { type ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { token } from 'styled-system/tokens';

import { Typography } from '@/components/common/atoms/Typography';

type SummaryImageSize = 64 | 76 | 80 | 88 | 96;

type SummaryImageProps = {
  image: string;
  name: string;
  variant?: 'cart' | 'checkout' | 'coupon' | 'history';
  imageSize?: { web: SummaryImageSize; mobile: SummaryImageSize };
};

const summaryImageSizes = {
  64: token.var('sizes.16'),
  76: '76px',
  80: token.var('sizes.20'),
  88: '88px',
  96: token.var('sizes.24'),
} as const;

function OrderProductSummaryImage({
  image,
  name,
  variant = 'checkout',
  imageSize,
}: SummaryImageProps) {
  const platform = usePlatform();
  const web = imageSize?.web ?? (variant === 'coupon' ? 88 : 96);
  const mobile = imageSize?.mobile ?? (variant === 'cart' || variant === 'history' ? 96 : 80);
  const size = summaryImageSizes[platform === 'mobile' ? mobile : web];
  return (
    <Image
      src={image}
      alt={name}
      width={web}
      height={web}
      sizes={`${platform === 'mobile' ? mobile : web}px`}
      style={{ width: size, height: size }}
      className={css({ flexShrink: '0', display: 'block', objectFit: 'contain', bg: 'black.10' })}
    />
  );
}

type OrderProductSummaryContentProps = {
  name: string;
  optionText?: string;
  optionAction?: ReactNode;
  amount?: number | string;
  amountLanguage?: 'en';
  gender?: string;
  variant?: 'cart' | 'checkout' | 'coupon' | 'history';
  children?: ReactNode;
  hideAmount?: boolean;
  optionTone?: 'primary' | 'subtle';
};

/** 주문 상품의 텍스트 정보와 추가 콘텐츠를 표시합니다. (Displays order product text information and additional content.) */
function OrderProductSummaryContent({
  name,
  optionText,
  optionAction,
  amount,
  amountLanguage,
  gender,
  variant = 'checkout',
  children,
  hideAmount = false,
  optionTone,
}: OrderProductSummaryContentProps) {
  return (
    <Stack
      minW="0"
      flex="1"
      gap={{ base: '32px', _mobile: '12px' }}
      minH={variant === 'history' ? '96px' : undefined}
    >
      <Stack gap="4px">
        <Stack gap="0.5">
          {gender ? (
            <Typography web="body5" mo={variant === 'cart' ? 'body4' : 'body5'} weight="medium">
              {gender}
            </Typography>
          ) : null}
          <Typography
            web={variant === 'history' ? 'body3' : 'body4'}
            mo="body4"
            weight="medium"
            className={variant === 'cart' ? css({ lineClamp: 2 }) : undefined}
          >
            {name}
          </Typography>
        </Stack>
        {optionText !== undefined ? (
          <HStack gap="2" alignItems="baseline" flexWrap="wrap">
            <Typography
              web={variant === 'history' ? 'body3' : 'body4'}
              mo="body4"
              weight={variant === 'history' ? 'medium' : undefined}
              tone={optionTone ?? (variant === 'coupon' ? 'primary' : 'subtle')}
            >
              {optionText}
            </Typography>
            {optionAction}
          </HStack>
        ) : null}
        {!hideAmount && amount !== undefined ? (
          <Typography variant="body4" weight={variant === 'coupon' ? undefined : 'medium'}>
            {typeof amount === 'number' && amountLanguage === 'en' ? (
<Typography as="span" variant="body4Medium" language="en">
                {amount.toLocaleString()}
              </Typography>
            ) : typeof amount === 'number' ? (
              amount.toLocaleString()
            ) : (
              amount
            )}
            {typeof amount === 'number' ? '원' : null}
          </Typography>
        ) : null}
      </Stack>
      {children}
    </Stack>
  );
}

export type OrderProductSummaryProps = SummaryImageProps &
  (
    | (OrderProductSummaryContentProps & { content?: never })
    | {
        content: ReactNode;
        optionText?: never;
        optionAction?: never;
        amount?: never;
        amountLanguage?: never;
        gender?: never;
        children?: never;
        hideAmount?: never;
        optionTone?: never;
      }
  );

/** [ 개발팀 바인딩 ] 호출자가 준비한 상품명·이미지·옵션·표시 금액을 렌더링합니다. content는 리뷰/신청일 등 화면 전용 메타데이터를 위한 대체 텍스트 슬롯이며 기본 정보 props와 함께 사용할 수 없습니다. 식별자·선택·수량·요청과 실패/성공 후 갱신은 각 화면 소유자에 남습니다. */
/** 주문 상품 정보를 표시하고 선택과 금액 계산은 호출자가 담당합니다. (Displays prepared order product information.) */
export function OrderProductSummary({
  image,
  imageSize,
  content,
  name,
  optionText,
  optionAction,
  amount,
  amountLanguage,
  gender,
  variant = 'checkout',
  children,
  hideAmount,
  optionTone,
}: OrderProductSummaryProps) {
  return (
    <HStack
      minW="0"
      w="full"
      gap={variant === 'cart' ? { base: '4', _mobile: '4' } : '4'}
      alignItems={variant === 'cart' ? { base: 'flex-start', _mobile: 'center' } : 'flex-start'}
      py={variant === 'checkout' ? '6' : '0'}
    >
      <OrderProductSummaryImage image={image} name={name} variant={variant} imageSize={imageSize} />
      {content !== undefined ? (
        content
      ) : (
        <OrderProductSummaryContent
          name={name}
          optionText={optionText}
          optionAction={optionAction}
          amount={amount}
          amountLanguage={amountLanguage}
          gender={gender}
          variant={variant}
          hideAmount={hideAmount}
          optionTone={optionTone}
        >
          {children}
        </OrderProductSummaryContent>
      )}
    </HStack>
  );
}

export { OrderProductSummaryContent };
