'use client';

import Image from 'next/image';

import { type ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css, cx } from 'styled-system/css';
import { Box, Flex, HStack, Stack } from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';
import { token } from 'styled-system/tokens';

import { Button } from '@/components/common/atoms/Button';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { Typography } from '@/components/common/atoms/Typography';

type SummaryVariant = 'cart' | 'checkout' | 'coupon' | 'history' | 'review';

type SummaryImageSize = 64 | 76 | 80 | 88 | 96 | 144;

type SummaryImageProps = {
  image: string;
  name: string;
  variant?: SummaryVariant;
  imageSize?: { web: SummaryImageSize; mobile: SummaryImageSize };
};

const defaultImageSizes = {
  cart: { web: 96, mobile: 96 },
  checkout: { web: 96, mobile: 80 },
  coupon: { web: 88, mobile: 80 },
  history: { web: 96, mobile: 96 },
  review: { web: 64, mobile: 64 },
} as const satisfies Record<SummaryVariant, { web: SummaryImageSize; mobile: SummaryImageSize }>;

const summaryImageSizes = {
  64: token.var('sizes.16'),
  76: '76px',
  80: token.var('sizes.20'),
  88: '88px',
  96: token.var('sizes.24'),
  144: '144px',
} as const;

type OrderProductSummaryContentProps = {
  name: string;
  optionText?: string;
  optionAction?: ReactNode;
  amount?: number | string;
  amountLanguage?: 'en';
  gender?: string;
  variant?: SummaryVariant;
  orderDate?: string;
  statusText?: string;
  cartAction?: boolean;
  children?: ReactNode;
  hideAmount?: boolean;
  optionTone?: 'primary' | 'subtle';
  rating?: number;
  review?: string;
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
  orderDate,
  statusText,
  cartAction,
  rating,
  review,
}: OrderProductSummaryContentProps) {
  const platform = usePlatform();
  const isReview = variant === 'review';
  const isHistory = variant === 'history';
  const columns = isReview && platform === 'web' && (rating !== undefined || Boolean(review));
  const numericAmount = typeof amount === 'number';
  const formattedAmount = numericAmount ? amount.toLocaleString() : amount;
  return (
    <Flex
      minW="0"
      flex="1"
      direction={columns ? 'row' : 'column'}
      align={columns ? 'center' : 'stretch'}
      gap={columns ? '0' : '8px'}
    >
      <Stack
        minW="0"
        flex={columns ? '260 1 0px' : undefined}
        gap={{ base: '32px', _mobile: '12px' }}
        minH={isHistory ? '96px' : undefined}
      >
        <Stack gap={isReview ? '6px' : '4px'}>
          {orderDate && (
            <HStack gap="2px">
              <Typography web="body3" mo="body4-2" language="en" weight="medium">
                {orderDate}
              </Typography>
              <Typography web="body3" mo="body4-2">
                구매
              </Typography>
            </HStack>
          )}
          <Stack gap="4px">
            <Stack gap="0.5">
              {gender ? (
                <Typography web="body5" mo={variant === 'cart' ? 'body4' : 'body5'} weight="medium">
                  {gender}
                </Typography>
              ) : null}
              <Typography
                web="body3"
                mo="body4-2"
                weight="medium"
                className={variant === 'cart' ? css({ lineClamp: 2 }) : undefined}
              >
                {name}
              </Typography>
            </Stack>
            {optionText !== undefined ? (
              <HStack gap="2" alignItems="baseline" flexWrap="wrap">
                <Typography
                  web={isHistory ? 'body3' : 'body4'}
                  mo="body4"
                  weight={isHistory ? 'medium' : undefined}
                  tone={optionTone ?? (variant === 'coupon' ? 'primary' : 'subtle')}
                >
                  {optionText}
                </Typography>
                {optionAction}
              </HStack>
            ) : null}
            {!hideAmount && amount !== undefined ? (
              <Typography variant="body4" weight={variant === 'coupon' ? undefined : 'medium'}>
                {numericAmount && amountLanguage === 'en' ? (
                  <Typography as="span" variant="body4Medium" language="en">
                    {formattedAmount}
                  </Typography>
                ) : (
                  formattedAmount
                )}
                {numericAmount ? '원' : null}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
        {statusText ? (
          <Typography
            variant="body4Medium"
            tone="tertiary"
            className={css({ mt: 'auto', textAlign: 'right' })}
          >
            {statusText}
          </Typography>
        ) : null}
        {cartAction ? (
          <Box>
            <Button
              variant="plain"
              type="button"
              iconLeft="hoka-bag-shopping-regular"
              iconSize={platform === 'mobile' ? '14px' : '18px'}
            >
              <Typography web="body4" mo="body5" weight="medium">
                장바구니 담기
              </Typography>
            </Button>
          </Box>
        ) : null}
        {children}
      </Stack>
      {rating !== undefined && (
        <Box
          flex={columns ? '120 1 0px' : undefined}
          minW={columns ? '96px' : undefined}
          lineHeight="0"
          textAlign={columns ? 'center' : undefined}
          pt={columns ? '0' : '4px'}
        >
          <RatingStars value={rating} size="16px" className={css({ '&&': { gap: '4px' } })} />
        </Box>
      )}
      {review && (
        <Box flex={columns ? '300 1 0px' : undefined} minW="0">
          <Typography
            variant="body5"
            className={columns ? css({ lineClamp: 1, mx: '16px' }) : undefined}
          >
            {review}
          </Typography>
        </Box>
      )}
    </Flex>
  );
}

export type OrderProductSummaryProps = SummaryImageProps & {
  alignStart?: boolean;
} & (
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
        orderDate?: never;
        statusText?: never;
        cartAction?: never;
        rating?: never;
        review?: never;
      }
  ) &
  (
    | {
        onClick: () => void;
        cartAction?: never;
        children?: never;
        optionAction?: never;
        content?: never;
      }
    | { onClick?: undefined }
  );

/** [ 개발팀 바인딩 ] 호출자가 준비한 상품명·이미지·옵션·표시 금액과 선택적 별점·리뷰를 렌더링합니다. content는 화면 전용 메타데이터를 위한 대체 텍스트 슬롯이며 기본 정보 props와 함께 사용할 수 없습니다. 상태 문구와 cartAction은 표시 옵션이며 장바구니 버튼은 미연결입니다. onClick은 호출자 소유의 상세 열기 콜백이며 내부 액션·커스텀 슬롯과 함께 사용하지 않습니다. 식별자·선택·수량·PC/MO 표시값·요청과 실패/성공 후 갱신은 각 화면 소유자에 남습니다. */
/** 주문 상품 정보를 표시하고 선택과 금액 계산은 호출자가 담당합니다. (Displays prepared order product information.) */
export function OrderProductSummary({
  image,
  imageSize,
  alignStart = false,
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
  orderDate,
  rating,
  review,
  statusText,
  cartAction,
  onClick,
}: OrderProductSummaryProps) {
  const platform = usePlatform();
  const { web: webSize, mobile: mobileSize } = imageSize ?? defaultImageSizes[variant];
  const currentSize = platform === 'mobile' ? mobileSize : webSize;
  const size = summaryImageSizes[currentSize];
  const Root = onClick ? 'button' : 'div';
  return (
    <Root
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cx(
        hstack({
          minW: '0',
          w: 'full',
          gap: '4',
          alignItems:
            variant === 'cart' && !alignStart
              ? { base: 'flex-start', _mobile: 'center' }
              : 'flex-start',
          py: onClick ? undefined : variant === 'checkout' ? '6' : '0',
        }),
        onClick &&
          css({
            p: '0',
            border: '0',
            bg: 'transparent',
            textAlign: 'left',
            cursor: 'pointer',
            _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
          }),
      )}
    >
      <Image
        src={image}
        alt={name}
        width={webSize}
        height={webSize}
        sizes={`${currentSize}px`}
        style={{ width: size, height: size }}
        className={css({ flexShrink: '0', display: 'block', objectFit: 'contain', bg: 'black.10' })}
      />
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
          orderDate={orderDate}
          statusText={statusText}
          cartAction={cartAction}
          rating={rating}
          review={review}
        >
          {children}
        </OrderProductSummaryContent>
      )}
    </Root>
  );
}

export { OrderProductSummaryContent };
