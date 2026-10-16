'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Box, Divider, Grid, HStack, Stack, styled } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Breadcrumb } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { MyPageLogoutDialog } from '@/shared/features/mypage/MyPageLogoutDialog';
import { ProductThumbnail } from '@/shared/components/molecules/ProductThumbnail/ProductThumbnail';
import { usePlatform } from '@/shared/context/platform';

const StyledLink = styled(Link);

const profileLink = css({ textDecoration: 'none!' });

type OrderItem = {
  name: string;
  gender: string;
  price: string;
  description: string;
  status: string;
  image: string;
  isNew?: boolean;
};

const orderItems: OrderItem[] = [
  {
    name: 'Speedgoat 7 GTX',
    gender: "Men's",
    price: '240,000원',
    description: '데일리 러닝, 워킹',
    status: '배송중',
    image: '/images/mypage/speedgoat-7-gtx.png',
    isNew: true,
  },
  {
    name: 'Clifton 11 GTX',
    gender: "Men's",
    price: '240,000원',
    description: '데일리 러닝, 워킹',
    status: '배송 완료',
    image: '/images/products/clifton-11-gtx/gallery-1.png',
  },
  {
    name: 'Bondi 9',
    gender: "Women's",
    price: '189,000원',
    description: '데일리 러닝',
    status: '배송 완료',
    image: '/images/products/bondi-9/lrmt.png',
  },
  {
    name: 'Clifton 11 GTX',
    gender: "Men's",
    price: '240,000원',
    description: '데일리 러닝, 워킹',
    status: '배송 완료',
    image: '/images/products/clifton-11-gtx/gallery-2.png',
  },
  {
    name: 'Bondi 9',
    gender: "Women's",
    price: '189,000원',
    description: '데일리 러닝',
    status: '배송 완료',
    image: '/images/products/bondi-9/bwht.png',
  },
];

const menuSections = [
  {
    title: '구매내역',
    items: [
      { label: '주문 / 배송조회', to: '/mypage/orders' },
      { label: '취소 / 반품내역', to: '/mypage/returns' },
      { label: '상품리뷰', to: '/mypage/reviews' },
    ],
  },
  {
    title: '상품내역',
    items: [
      { label: '관심상품', to: '/mypage/wishlist' },
      { label: '최근 본 상품', to: '/mypage/recent' },
      { label: '재입고 알림 상품', to: '/mypage/restock-alerts' },
    ],
  },
  {
    title: 'MY HOKA',
    items: [
      { label: '회원등급', to: '/mypage/rewards' },
      { label: '쿠폰', to: '/mypage/coupons' },
      { label: '러닝세션 신청내역', to: '/mypage/event-entries' },
    ],
  },
  {
    title: 'Q&A',
    items: [
      { label: 'FAQs', to: '/support/faq' },
      { label: '1:1 문의', to: '/support/inquiries' },
    ],
  },
  {
    title: '계정관리',
    items: [
      { label: '회원 정보 확인 및 수정', to: '/mypage/profile' },
      { label: '배송지 관리', to: '/mypage/addresses' },
    ],
  },
];

function OrderTile({ item }: { item: (typeof orderItems)[number] }) {
  return (
    <HStack position="relative" alignItems="flex-start" gap="4">
      <Box w="24" h="24" flexShrink="0">
        <ProductThumbnail alt={item.name} src={item.image} />
      </Box>
      <Stack minW="0" flex="1" gap="1.5" pr="17">
        <HStack minH="18px">
          {item.isNew ? (
            <Typography web="body4" mo="body4" tone="red80">
              New
            </Typography>
          ) : null}
        </HStack>
        <Stack gap="2.5">
          <Stack gap="1">
            <Stack gap="0.5">
              <Typography web="body4" mo="body4">
                {item.gender}
              </Typography>
              <Typography web="body4" mo="body4">
                {item.name}
              </Typography>
            </Stack>
            <Typography web="body4" mo="body4" weight="semibold">
              {item.price}
            </Typography>
          </Stack>
          <Typography web="body5" mo="body5">
            {item.description}
          </Typography>
        </Stack>
      </Stack>
      <Box
        position="absolute"
        top="0"
        right="0"
        border="1px solid var(--color-border-tertiary)"
        borderRadius="full"
        px="2"
        py="1.5"
        bg="white.0"
      >
        <Typography web="body5" mo="body5">
          {item.status}
        </Typography>
      </Box>
    </HStack>
  );
}

function MyPageMenuSection({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <Stack as="section" gap="4" aria-label={title}>
      <Typography as="h2" web="heading8" mo="heading5">
        {title}
      </Typography>
      <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.100" />
      <Stack gap="0">
        {items.map((item) => (
          <StyledLink
            display="block"
            borderBottom="1px solid var(--color-border-subtle)"
            key={item.to}
            href={item.to}
          >
            <HStack minH="14" justifyContent="space-between">
              <Typography web="body3" mo="body3">
                {item.label}
              </Typography>
              <Icon name="chevron-right" size="16px" />
            </HStack>
          </StyledLink>
        ))}
      </Stack>
    </Stack>
  );
}

export function MyPage({ onLogout }: { onLogout: () => void }) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const platform = usePlatform();

  return (
    <>
      <Box as="main" boxSizing="border-box" w="100vw" maxW="640px" mx="auto" px="4" pb="16">
        <Box boxSizing="border-box" h="14" pt="6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '마이페이지' }]} />
        </Box>
        <Stack pt="6" gap="10">
          <Stack gap="4">
            <Typography as="h1" web="heading4" mo="heading4">
              <ButtonLink className={profileLink} href="/mypage/profile" size="lg" variant="link">
                <HStack as="span" gap="1">
                  <HStack as="span" gap="0.5">
                    <Typography as="span" web="heading4" mo="heading4">
                      박연진
                    </Typography>
                    <Typography as="span" web="heading4" mo="heading4">
                      님
                    </Typography>
                  </HStack>
                  <Icon name="chevron-right" size="16px" />
                </HStack>
              </ButtonLink>
            </Typography>
            <Stack gap="2">
              <Box bg="black.10" px="4" py="5">
                <Stack gap="1">
                  <HStack justifyContent="space-between">
                    <HStack gap="2">
                      <HStack
                        as="span"
                        justifyContent="center"
                        gap="0"
                        w="8"
                        h="8"
                        borderRadius="full"
                        bg="black.100"
                        color="offWhite.100"
                      >
                        <Typography web="heading6" mo="heading6" language="en" weight="black">
                          R
                        </Typography>
                      </HStack>
                      <Typography web="heading8" mo="heading5" language="en">
                        RUNNER
                      </Typography>
                    </HStack>
                    <StyledLink
                      color="inherit"
                      textDecoration="underline"
                      textUnderlineOffset="2px"
                      href="/mypage/rewards"
                    >
                      <Typography web="body5" mo="body5">
                        등급안내
                      </Typography>
                    </StyledLink>
                  </HStack>
                  <Box w="full" pl="10" boxSizing="border-box">
                    <Typography web="body5" mo="body5">
                      다음 등급까지 300,000원 구매시 등급 업 혜택 제공
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Grid columns={2} gap="2">
                <StyledLink
                  minW="0"
                  bg="black.10"
                  p="5"
                  color="inherit"
                  textDecoration="none"
                  href="/mypage/coupons"
                >
                  <Stack h="14" justifyContent="space-between">
                    <Typography web="body4" mo="body4">
                      내 쿠폰
                    </Typography>
                    <HStack gap="0.5" justifyContent="flex-end" alignItems="baseline">
                      <Typography web="heading8" mo="heading5">
                        3
                      </Typography>
                      <Typography web="body3" mo="body3">
                        개
                      </Typography>
                    </HStack>
                  </Stack>
                </StyledLink>
                <StyledLink
                  minW="0"
                  bg="black.10"
                  p="5"
                  color="inherit"
                  textDecoration="none"
                  href="/mypage/wishlist"
                >
                  <Stack h="14" justifyContent="space-between">
                    <Typography web="body4" mo="body4">
                      관심상품
                    </Typography>
                    <HStack gap="0.5" justifyContent="flex-end" alignItems="baseline">
                      <Typography web="heading8" mo="heading5">
                        6
                      </Typography>
                      <Typography web="body3" mo="body3">
                        건
                      </Typography>
                    </HStack>
                  </Stack>
                </StyledLink>
              </Grid>
            </Stack>
          </Stack>

          <Stack as="section" gap="6" aria-label="주문 배송 내역">
            <HStack justifyContent="space-between">
              <Typography as="h2" web="heading8" mo="heading5">
                주문 배송 내역
              </Typography>
              <ButtonLink href="/mypage/orders" size="md" variant="link">
                전체 보기
              </ButtonLink>
            </HStack>
            <Carousel itemCount={orderItems.length}>
              <CarouselViewport freeMode={false} mode={platform} showScrollbar={false}>
                {orderItems.map((item, index) => (
                  <OrderTile item={item} key={`${item.name}-${index}`} />
                ))}
              </CarouselViewport>
              <Box mt="6">
                <CarouselPagination label="주문 상품 선택" />
              </Box>
            </Carousel>
          </Stack>

          <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />

          <Stack gap="10">
            {menuSections.map((section) => (
              <MyPageMenuSection items={section.items} key={section.title} title={section.title} />
            ))}
          </Stack>

          <Button fullWidth size="tall" variant="secondary" onClick={() => setLogoutOpen(true)}>
            로그아웃
          </Button>
        </Stack>
      </Box>
      <MyPageLogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => {
          setLogoutOpen(false);
          onLogout();
        }}
      />
    </>
  );
}
