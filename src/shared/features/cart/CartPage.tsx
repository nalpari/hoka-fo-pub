'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { products } from '@/mocks/products';
import { getCartImage, recommendationImages } from '@/mocks/cartDisplay';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { OrderPageLayout } from '@/shared/components/layouts/OrderPageLayout/OrderPageLayout';
import type { CartItem } from '@/shared/types/cart';

const image = css({ w: '96px', h: '96px', objectFit: 'cover', bg: 'black.10' });

const textAction = css({
  p: '0',
  border: '0',
  borderRadius: '0',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});

const stickyOrder = css({
  position: { base: 'static', _mobile: 'fixed' },
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '2',
  bg: 'white',
  borderTop: { base: '0', _mobile: '1px solid var(--colors-black-20)' },
  px: { base: '0', _mobile: '4' },
  pt: { base: '0', _mobile: '4' },
  pb: { base: '0', _mobile: '8' },
});

type Props = {
  cart: CartItem[];
  onQuantityChange: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
};

const suggestions = products.slice(0, 4);

function itemKey(item: CartItem) {
  return `${item.id}-${item.color}-${item.width}-${item.size}`;
}

export function CartPage({ cart, onQuantityChange, onRemove }: Props) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[] | null>(() =>
    cart.length === 4 &&
    cart.every((item) => ['브라운', '레드', '화이트', '옐로우골드'].includes(item.color))
      ? cart.slice(0, 2).map(itemKey)
      : null,
  );
  const rows = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
  const allKeys = rows.map(({ item }) => itemKey(item));
  const selectedKeys =
    selected === null ? allKeys : selected.filter((key) => allKeys.includes(key));
  const selectedRows = rows.filter(({ item }) => selectedKeys.includes(itemKey(item)));
  const total = selectedRows.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0,
  );
  const selectedCount = selectedRows.length;
  const itemCount = rows.reduce((sum, { item }) => sum + item.quantity, 0);

  return (
    <OrderPageLayout
      step={1}
      title={
        <HStack gap="1" alignItems="baseline">
          <Typography as="h1" web="heading6" mo="heading5">
            장바구니
          </Typography>
          <Typography web="body4" mo="body4">
            (총 {itemCount}개)
          </Typography>
        </HStack>
      }
    >
      {rows.length ? (
        <Stack gap={{ base: '10', _mobile: '6' }}>
          <Stack gap="4">
            <HStack justifyContent="space-between" alignItems="center">
              <Checkbox
                aria-label="전체 상품 선택"
                checked={selectedKeys.length === allKeys.length}
                onCheckedChange={(checked) => setSelected(checked ? allKeys : [])}
                label={
                  <Typography web="body4" mo="body4">
                    선택상품 {selectedCount}개
                  </Typography>
                }
              />
              <HStack gap="3">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => selectedRows.forEach(({ item }) => onRemove(item))}
                >
                  선택상품 삭제
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() =>
                    rows
                      .filter(({ item, product }) => product.soldOut.includes(item.size))
                      .forEach(({ item }) => onRemove(item))
                  }
                >
                  품절상품 삭제
                </Button>
              </HStack>
            </HStack>
            <Stack as="ul" gap="4" listStyleType="none">
              {rows.map(({ item, product }) => {
                const key = itemKey(item);
                return (
                  <HStack as="li" key={key} alignItems="center" gap="0" bg="black.10" minH="185px">
                    <Box px="4">
                      <Checkbox
                        aria-label={`${product.name} 선택`}
                        checked={selectedKeys.includes(key)}
                        onCheckedChange={(checked) =>
                          setSelected(
                            checked
                              ? [...selectedKeys, key]
                              : selectedKeys.filter((value) => value !== key),
                          )
                        }
                        label={null}
                      />
                    </Box>
                    <Stack flex="1" minW="0" pr="4" py="4" gap="3">
                      <HStack justifyContent="flex-end">
                        <Button
                          variant="ghost"
                          className={css({ fontSize: '18px', p: '0', minW: '18px' })}
                          aria-label={`${product.name} 삭제`}
                          onClick={() => onRemove(item)}
                        >
                          ×
                        </Button>
                      </HStack>
                      <HStack gap="4" alignItems="flex-start">
                        <img
                          className={image}
                          src={getCartImage(item, product.primaryImage)}
                          alt={product.name}
                        />
                        <Stack minW="0" flex="1" gap="1">
                          <Typography web="body5" mo="body5">
                            {product.gender ?? 'All Gender'}
                          </Typography>
                          <Typography web="body4" mo="body4" weight="semibold">
                            {product.name}
                          </Typography>
                          <Typography web="body5" mo="body5" tone="subtle">
                            옵션 : {item.width} / {item.color} / {item.size} {item.quantity}개
                          </Typography>
                          <Typography web="body4" mo="body4" weight="semibold">
                            {(product.price * item.quantity).toLocaleString()}원
                          </Typography>
                          <HStack justifyContent="space-between" mt="1">
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => setEditingKey(editingKey === key ? null : key)}
                            >
                              옵션변경
                            </Button>
                            <Link href="/mypage/wishlist" className={textAction}>
                              ♡ 관심상품
                            </Link>
                          </HStack>
                          {editingKey === key ? (
                            <NumberStepper
                              min={1}
                              value={item.quantity}
                              onChange={(quantity) => onQuantityChange(item, quantity)}
                            />
                          ) : null}
                        </Stack>
                      </HStack>
                    </Stack>
                  </HStack>
                );
              })}
            </Stack>
            <HStack justifyContent="space-between" px="4" py="5" bg="black.10">
              <Typography web="body4" mo="body4">
                결제예정금액
              </Typography>
              <Typography web="body3" mo="body3" weight="semibold">
                {total.toLocaleString()}원
              </Typography>
            </HStack>
            <Typography web="body5" mo="body5" tone="subtle">
              * 장바구니에 담긴 상품은 30일 동안 보관됩니다. 더 오래 상품을 보관하시려면 관심 상품에
              담아주시기 바랍니다.
            </Typography>
          </Stack>
          <Stack as="section" gap="4" overflow="hidden">
            <Typography as="h2" web="heading8" mo="heading7">
              함께 구매하면 좋은 상품
            </Typography>
            <HStack gap="1" overflowX="auto" alignItems="flex-start">
              {suggestions.map((product, index) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className={css({ flex: '0 0 140px', color: 'black.100' })}
                >
                  <Stack gap="1">
                    <img
                      src={recommendationImages[index] ?? product.primaryImage}
                      alt=""
                      className={css({ w: '140px', h: '140px', objectFit: 'cover' })}
                    />
                    <Typography web="body5" mo="body5">
                      {product.gender ?? 'All Gender'}
                    </Typography>
                    <Typography web="body5" mo="body5" weight="semibold">
                      {product.name}
                    </Typography>
                    <Typography web="body5" mo="body5">
                      {product.price.toLocaleString()}원
                    </Typography>
                  </Stack>
                </Link>
              ))}
            </HStack>
          </Stack>
          <Stack as="section" gap="2" pt="4" borderTop="1px solid var(--colors-black-20)">
            <Typography as="h2" web="heading8" mo="heading7">
              고객센터 안내
            </Typography>
            <Typography web="body4" mo="body4">
              HOKA/HOKA 고객센터 내용 미정
            </Typography>
            <Typography web="body4" mo="body4">
              TEL. 080-665-5552
            </Typography>
            <Typography web="body5" mo="body5" tone="subtle">
              *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
            </Typography>
            <Link href="/support/inquiries/new" className={textAction}>
              1:1 문의하기 &gt;
            </Link>
            <Typography as="h3" web="body4" mo="body4" weight="semibold">
              운영시간
            </Typography>
            <Typography web="body5" mo="body5">
              평일 09:00 ~ 18:00
            </Typography>
            <Typography web="body5" mo="body5" tone="subtle">
              *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
            </Typography>
          </Stack>
          <Box className={stickyOrder}>
            {selectedRows.length ? (
              <ButtonLink
                href={`/checkout?selected=${encodeURIComponent(selectedKeys.join('|'))}`}
                variant="primary"
                fullWidth
              >
                주문하기
              </ButtonLink>
            ) : (
              <Button variant="primary" fullWidth disabled>
                주문하기
              </Button>
            )}
          </Box>
        </Stack>
      ) : (
        <Stack alignItems="center" gap="4" py="20" borderTop="1px solid var(--colors-black-20)">
          <Typography web="body3" mo="body3">
            장바구니에 담은 상품이 없습니다.
          </Typography>
          <ButtonLink href="/products" variant="secondary">
            쇼핑 계속하기
          </ButtonLink>
        </Stack>
      )}
    </OrderPageLayout>
  );
}
