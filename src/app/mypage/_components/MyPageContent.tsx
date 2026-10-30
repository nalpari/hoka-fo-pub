'use client';

import Link from 'next/link';

import { useContext } from 'react';
import { useState } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { usePlatform } from '@/context/platform';
import { useShop } from '@/context/ShopShell';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { menuSections, type MyPageOrderItem, orderItems } from '@/app/mypage/mypage-home-data';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';

type LogoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function LogoutDialog({ open, onOpenChange, onConfirm }: LogoutDialogProps) {
  return (
    <ModalDialog
      closeLabel="로그아웃 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="로그아웃"
      actions={{ kind: 'confirm', onConfirm: onConfirm }}
    >
      <Typography as="p" variant="body3">
        로그아웃 하시겠습니까??
      </Typography>
    </ModalDialog>
  );
}

const membershipLink = css({
  color: 'inherit',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});

function MyPageMembership() {
  const binding = useContext(MyPageDataContext).overview;
  const summary = binding?.item;
  return (
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
              <Typography variant="heading6" language="en" weight="black">
                {binding ? summary?.tierInitial : 'R'}
              </Typography>
            </HStack>
            <Typography web="heading8" mo="heading5" language="en">
              {binding ? summary?.tier : 'RUNNER'}
            </Typography>
          </HStack>
          <Link className={membershipLink} href="/mypage/rewards">
            <Typography variant="body5">등급안내</Typography>
          </Link>
        </HStack>
        <Box w="full" pl="10" boxSizing="border-box">
          <Typography variant="body5">
            {binding ? summary?.nextTierText : '다음 등급까지 300,000원 구매시 등급 업 혜택 제공'}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

type MyPageBenefitItemProps = {
  href: string;
  label: string;
  count: number;
  unit: string;
};

const benefitLink = css({
  minW: '0',
  bg: 'black.10',
  p: '5',
  color: 'inherit',
  textDecoration: 'none',
});

function MyPageBenefitItem({ href, label, count, unit }: MyPageBenefitItemProps) {
  return (
    <Link className={benefitLink} href={href}>
      <Stack h="14" justifyContent="space-between">
        <Typography variant="body4">{label}</Typography>
        <HStack gap="0.5" justifyContent="flex-end" alignItems="baseline">
          <Typography web="heading8" mo="heading5">
            {count}
          </Typography>
          <Typography variant="body3">{unit}</Typography>
        </HStack>
      </Stack>
    </Link>
  );
}

function MyPageBenefits() {
  const binding = useContext(MyPageDataContext).overview;
  const summary = binding?.item;
  return (
    <Grid columns={2} gap="2">
      <MyPageBenefitItem
        href="/mypage/coupons"
        label="내 쿠폰"
        count={binding ? (summary?.couponCount ?? 0) : 3}
        unit="개"
      />
      <MyPageBenefitItem
        href="/mypage/wishlist"
        label="관심상품"
        count={binding ? (summary?.wishlistCount ?? 0) : 6}
        unit="건"
      />
    </Grid>
  );
}

const profileLink = css({ textDecoration: 'none!' });

function MyPageOverviewProfile() {
  const binding = useContext(MyPageDataContext).overview;
  const summary = binding?.item;
  return (
    <ContentSection
      gap="4"
      title={
        <>
          <ButtonLink className={profileLink} href="/mypage/profile" size="lg" variant="link">
            <HStack as="span" gap="1">
              <HStack as="span" gap="0.5">
                <Typography as="span" variant="heading4">
                  {binding ? summary?.name : '박연진'}
                </Typography>
                <Typography as="span" variant="heading4">
                  님
                </Typography>
              </HStack>
              <Icon name="chevron-right" size="16px" />
            </HStack>
          </ButtonLink>
        </>
      }
      headerProps={{ titleAs: 'h1', titleProps: { variant: 'heading4' } }}
    >
      <Stack gap="2">
        <MyPageMembership />
        <MyPageBenefits />
      </Stack>
    </ContentSection>
  );
}

function MyPageOrderTile({ item }: { item: MyPageOrderItem }) {
  return (
    <HStack position="relative" alignItems="flex-start" gap="4">
      <Box w="24" h="24" flexShrink="0">
        <ProductThumbnail alt={item.name} src={item.image} />
      </Box>
      <Stack minW="0" flex="1" gap="1.5" pr="17">
        <HStack minH="18px">
          {item.isNew ? (
            <Typography variant="body4" tone="red80">
              New
            </Typography>
          ) : null}
        </HStack>
        <Stack gap="2.5">
          <Stack gap="1">
            <Stack gap="0.5">
              <Typography variant="body4">{item.gender}</Typography>
              <Typography variant="body4">{item.name}</Typography>
            </Stack>
            <Typography variant="body4" weight="semibold">
              {item.price}
            </Typography>
          </Stack>
          <Typography variant="body5">{item.description}</Typography>
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
        <Typography variant="body5">{item.status}</Typography>
      </Box>
    </HStack>
  );
}

function MyPageRecentOrders({ empty = false }: { empty?: boolean }) {
  const binding = useContext(MyPageDataContext).overview;
  const summary = binding?.item;
  const platform = usePlatform();
  const items = empty ? [] : binding ? (summary?.orders ?? []) : orderItems;

  return (
    <ContentSection
      as="section"
      gap="6"
      aria-label="주문 배송 내역"
      title="주문 배송 내역"
      headerProps={{
        orientation: 'horizontal',
        gap: '2',
        titleProps: { web: 'heading8', mo: 'heading5' },
        action: (
          <ButtonLink href="/mypage/orders" size="md" variant="link">
            전체 보기
          </ButtonLink>
        ),
      }}
    >
      {items.length === 0 ? (
        <Typography variant="body3" className={css({ textAlign: 'center', py: '16' })}>
          주문한 상품이 없습니다.
        </Typography>
      ) : platform !== 'mobile' ? (
        <Stack gap="0">
          <Grid
            gridTemplateColumns="minmax(0, 1fr) 60px 100px 100px"
            borderY="1px solid var(--colors-black-100)"
            py="4"
          >
            <Typography variant="body4">상품정보</Typography>
            <Typography variant="body4">수량</Typography>
            <Typography variant="body4">가격</Typography>
            <Typography variant="body4">주문상태</Typography>
          </Grid>
          {items.map((item, index) => (
            <Grid
              key={index}
              gridTemplateColumns="minmax(0, 1fr) 60px 100px 100px"
              alignItems="center"
              gap="4"
              py="6"
              borderBottom="1px solid var(--colors-black-20)"
            >
              <HStack gap="4">
                <Box w="24" h="24">
                  <ProductThumbnail src={item.image} alt={item.name} />
                </Box>
                <Stack gap="2">
                  <Typography variant="body4">{item.gender}</Typography>
                  <Typography variant="body3">{item.name}</Typography>
                  <Typography variant="body5">{item.description}</Typography>
                </Stack>
              </HStack>
              <Typography variant="body4">{item.quantity ?? '-'}</Typography>
              <Typography variant="body4">{item.price}</Typography>
              <Typography variant="body4">{item.status}</Typography>
            </Grid>
          ))}
        </Stack>
      ) : (
        <Carousel itemCount={items.length}>
          <CarouselViewport freeMode={false} mode={platform} showScrollbar={false}>
            {(binding ? (summary?.orders ?? []) : orderItems).map((item, index) => (
              <MyPageOrderTile item={item} key={`${item.name}-${index}`} />
            ))}
          </CarouselViewport>
          <Box mt="6">
            <CarouselPagination label="주문 상품 선택" />
          </Box>
        </Carousel>
      )}
    </ContentSection>
  );
}

type MyPageMenuItemProps = {
  label: string;
  to: string;
};

const menuLink = css({ display: 'block', borderBottom: '1px solid var(--color-border-subtle)' });

function MyPageMenuItem({ label, to }: MyPageMenuItemProps) {
  return (
    <Link className={menuLink} href={to}>
      <HStack minH="14" justifyContent="space-between">
        <Typography variant="body3">{label}</Typography>
        <Icon name="chevron-right" size="16px" />
      </HStack>
    </Link>
  );
}

function MyPageMenuSection({ title, items }: { title: string; items: MyPageMenuItemProps[] }) {
  return (
    <ContentSection
      as="section"
      gap="4"
      aria-label={title}
      title={<>{title}</>}
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading5' } }}
    >
      <Divider variant="strong" />
      <Stack gap="0">
        {items.map((item) => (
          <MyPageMenuItem key={item.to} label={item.label} to={item.to} />
        ))}
      </Stack>
    </ContentSection>
  );
}

/** 마이페이지 요약과 메뉴를 구성하고 로그아웃을 연결합니다. (Composes the account overview and menus and connects logout.) */
export function RouteContent({ previewNoOrders = false }: { previewNoOrders?: boolean }) {
  const binding = useContext(MyPageDataContext).overview;
  const { logout: onLogout } = useShop();
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <MyPageFrame activePath="/mypage" layout="centered">
        <BindingFeedback {...binding} />
        <Stack pt="6" gap="10">
          <MyPageOverviewProfile />
          <MyPageRecentOrders empty={previewNoOrders} />

          <Divider />

          <Stack gap="10">
            {menuSections.map((section) => (
              <MyPageMenuSection items={section.items} key={section.title} title={section.title} />
            ))}
          </Stack>

          <Button fullWidth size="tall" variant="secondary" onClick={() => setLogoutOpen(true)}>
            로그아웃
          </Button>
        </Stack>
      </MyPageFrame>
      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => {
          setLogoutOpen(false);
          if (!previewNoOrders) onLogout();
        }}
      />
    </>
  );
}

export const routePreviewComponents = { LogoutDialog } satisfies Pick<
  typeof import('@/types/component-contracts/app-mypage-page'),
  'LogoutDialog'
>;
