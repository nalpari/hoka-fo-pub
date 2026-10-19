'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { StepIndicator } from '@/shared/components/molecules/StepIndicator/StepIndicator';
import { products } from '@/mocks/products';
import type { CartItem } from '@/shared/types/cart';
import { css, cva } from 'styled-system/css';
import { Box, Flex, Grid } from 'styled-system/jsx';

const art = css({
  display: 'grid',
  w: { base: '100px', _mobile: '72px' },
  h: { base: '100px', _mobile: '72px' },
  placeItems: 'center',
  bg: 'var(--color-black-10)',
  fontSize: { base: '50', _mobile: '36' },
  fontStyle: 'italic',
  fontWeight: 'var(--font-weights-black)',
});

const quantity = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: { base: '18px', _mobile: '2' },
});

const recommendArt = cva({
  base: {
    display: 'grid',
    w: '100%',
    aspectRatio: '1',
    placeItems: 'center',
    fontSize: '50',
    fontStyle: 'italic',
    fontWeight: 'var(--font-weights-black)',
  },
  variants: {
    tone: {
      0: { bg: 'var(--color-black-20)', color: 'var(--color-text-tertiary)' },
      1: { bg: 'var(--color-black-20)', color: 'var(--color-black-40)' },
      2: { bg: 'var(--color-black-20)', color: 'var(--color-text-subtle)' },
      3: { bg: 'var(--color-black-20)', color: 'var(--color-text-primary)' },
    },
  },
});

type Props = {
  cart: CartItem[];
  onQuantityChange: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
};

const suggestions = products.slice(0, 4);

export function CartPage({ cart, onQuantityChange, onRemove }: Props) {
  const rows = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
  const total = rows.reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);
  return (
    <Box
      as="main"
      maxW="1100px"
      mx="auto"
      pt={{ base: '62px', _mobile: '38px' }}
      px={{ base: '0', _mobile: '4' }}
      pb={{ base: '110px', _mobile: '62px' }}
    >
      <Flex as="header" alignItems="center" justifyContent="space-between">
        <Typography as="h1" className={css({ m: '0', fontSize: '32' })}>
          장바구니
        </Typography>
        <StepIndicator
          ariaLabel="주문 진행 단계"
          current={1}
          items={[{ label: '장바구니' }, { label: '주문/결제' }, { label: '주문완료' }]}
          mobileHidden
        />
      </Flex>
      <Typography as="p" className={css({ m: 'var(--spacing-10) 0 14px' })}>
        총{' '}
        <b className={css({ color: 'var(--color-red-80)' })}>
          {rows.reduce((sum, { item }) => sum + item.quantity, 0)}
        </b>
        개
      </Typography>
      <Box as="section" borderTop="1px solid var(--color-black-100)">
        <Grid
          gridTemplateColumns={{ base: '48px 1fr 130px 160px', _mobile: '28px 1fr 66px 0' }}
          alignItems="center"
          h="49px"
          borderBottom="1px solid var(--color-black-20)"
          fontSize="12"
          textAlign="center"
        >
          <Typography as="span">✓</Typography>
          <Typography as="span">상품/옵션 정보</Typography>
          <Typography as="span">수량</Typography>
          <Typography as="span">주문금액</Typography>
        </Grid>
        {rows.length ? (
          <>
            <Box>
              {rows.map(({ item, product }) => (
                <Grid
                  as="article"
                  gap="normal"
                  gridTemplateColumns={{ base: '48px 1fr 130px 160px', _mobile: '28px 1fr 68px' }}
                  alignItems="center"
                  minH="155px"
                  borderBottom="1px solid var(--color-black-20)"
                  key={`${item.id}-${item.color}-${item.width}-${item.size}`}
                >
                  <Checkbox aria-label={`${product.name} 선택`} defaultChecked label={null} />
                  <Flex alignItems="center" gap={{ base: '18px', _mobile: '2.5' }}>
                    <Typography as="span" className={art}>
                      N
                    </Typography>
                    <Box>
                      <strong>{product.name}</strong>
                      <Typography
                        as="p"
                        variant="body4"
                        tone="tertiary"
                        className={css({
                          m: '2 0',
                        })}
                      >
                        {item.color} / {item.width} / {item.size}
                      </Typography>
                      <Button
                        className={css({
                          p: '0',
                          border: '0',
                          color: 'var(--color-text-tertiary)',
                          fontSize: '12',
                          textDecoration: 'underline',
                        })}
                        onClick={() => onRemove(item)}
                      >
                        삭제
                      </Button>
                    </Box>
                  </Flex>
                  <NumberStepper
                    className={quantity}
                    min={1}
                    onChange={(quantity) => onQuantityChange(item, quantity)}
                    value={item.quantity}
                  />
                  <strong className={css({ textAlign: 'center', display: { _mobile: 'none' } })}>
                    {(product.price * item.quantity).toLocaleString()}원
                  </strong>
                </Grid>
              ))}
            </Box>
            <Flex
              alignItems="center"
              justifyContent={{ base: 'flex-end', _mobile: 'center' }}
              flexWrap={{ base: 'nowrap', _mobile: 'wrap' }}
              gap={{ base: '7', _mobile: '3' }}
              p="26px"
              bg="var(--color-black-10)"
              fontSize="14"
            >
              <Typography as="span">
                상품 금액 <b>{total.toLocaleString()}원</b>
              </Typography>
              <Typography as="span">
                배송비 <b>0원</b>
              </Typography>
              <strong>
                총 결제예정 금액{' '}
                <b className={css({ color: 'var(--color-red-80)' })}>{total.toLocaleString()}원</b>
              </strong>
              <ButtonLink
                className={css({
                  w: { _mobile: '100%' },
                  p: '14px 38px',
                  bg: 'var(--color-black-100)',
                  color: 'var(--color-text-inverse)',
                })}
                href="/checkout"
              >
                주문하기
              </ButtonLink>
            </Flex>
          </>
        ) : (
          <Grid
            minH="285px"
            placeItems="center"
            alignContent="center"
            gap="3.5"
            borderBottom="1px solid var(--color-black-20)"
          >
            <b className={css({ fontSize: '50' })}>!</b>
            <Typography as="p" className={css({ m: '0' })}>
              장바구니에 담은 상품이 없습니다.
            </Typography>
            <Link
              className={css({
                p: '2.5 18px',
                borderBottom: '1px solid var(--color-black-100)',
                fontSize: '14' /* 기존 13px */,
              })}
              href="/products"
            >
              쇼핑 계속하기
            </Link>
          </Grid>
        )}
      </Box>
      <Box as="section" mt="20">
        <Typography
          as="h2"
          variant="body1"
          weight="bold"
          className={css({
            m: '0 0 38px',
            textAlign: 'center',
          })}
        >
          함께 구매하면 좋은 상품
        </Typography>
        <Grid
          gridTemplateColumns={{ base: 'repeat(4, 1fr)', _mobile: 'repeat(2, 1fr)' }}
          gap={{ base: '30px', _mobile: '25px 10px' }}
        >
          {suggestions.map((product, index) => (
            <Link
              className={css({ display: 'grid', gap: '2.5' })}
              href={`/products/${product.id}`}
              key={product.id}
            >
              <Typography as="span" className={recommendArt({ tone: index as 0 | 1 | 2 | 3 })}>
                N
              </Typography>
              <small className={css({ color: 'var(--color-text-tertiary)' })}>
                {product.id.toUpperCase()}
              </small>
              <Typography as="strong" variant="heading9">
                {product.name}
              </Typography>
              <Typography as="b" variant="body4" weight="bold">
                {product.price.toLocaleString()}원
              </Typography>
            </Link>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
