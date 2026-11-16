'use client';
import Link from 'next/link';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

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
      popupClassName={css({ maxW: '640px' })}
      contentClassName={css({ '&&': { p: '24px 32px 40px', _mobile: { p: '24px 16px 16px' } } })}
      title="로그아웃"
      actions={{ kind: 'single', onConfirm, buttonProps: { size: 'tall' } }}
      footerProps={{
        css: css.raw({
          pb: '40px',
          _mobile: { pb: '24px' },
          '& > button': {
            w: '180px',
            '--button-height': '48px',
            _mobile: { w: '100%', '--button-height': '44px' },
          },
        }),
      }}
    >
      <Typography as="p" web="heading7" mo="body3">
        로그아웃 하시겠습니까?
      </Typography>
    </ModalDialog>
  );
}

function MyPageMembership() {
  return (
    <Box bg="black.10" p="32px" minW="0" _mobile={{ px: '16px', py: '20px' }}>
      <Stack gap="12px">
        <HStack justifyContent="space-between" alignItems="flex-start">
          <HStack gap="12px" _mobile={{ gap: '8px' }}>
            <HStack
              as="span"
              justifyContent="center"
              gap="0"
              w="48px"
              h="48px"
              _mobile={{ w: '32px', h: '32px' }}
              borderRadius="full"
              bg="black.100"
              color="offWhite.100"
            >
              <Typography web="heading8" mo="heading6" language="en" weight="black">
                {'R'}
              </Typography>
            </HStack>
            <Typography web="heading7" mo="heading5" language="en">
              {'RUNNER'}
            </Typography>
          </HStack>
          <ButtonLink href="/mypage/rewards" size="sm" variant="link">
            등급안내
          </ButtonLink>
        </HStack>
        <Box w="full" pl="60px" boxSizing="border-box" _mobile={{ pl: '40px' }}>
          <Typography as="p" web="body3" mo="body5">
            {'다음 등급까지 300,000원 구매시 등급 업 혜택 제공'}
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
  p: '32px',
  color: 'inherit',
  textDecoration: 'none',
  _mobile: { px: '16px', py: '20px' },
});
function MyPageBenefitItem({ href, label, count, unit }: MyPageBenefitItemProps) {
  return (
    <Link className={benefitLink} href={href}>
      <Stack h="full" minH="81px" justifyContent="space-between" _mobile={{ minH: '57px' }}>
        <Typography web="body2" mo="body4">
          {label}
        </Typography>
        <HStack gap="2px" justifyContent="flex-end" alignItems="center">
          <Typography web="heading7" mo="heading5" language="en">
            {count}
          </Typography>
          <Typography web="body2" mo="body3">
            {unit}
          </Typography>
        </HStack>
      </Stack>
    </Link>
  );
}

function MyPageBenefits() {
  return (
    <Grid columns={2} gap="8px" h="full">
      <MyPageBenefitItem href="/mypage/coupons" label="내 쿠폰" count={3} unit="개" />
      <MyPageBenefitItem href="/mypage/wishlist" label="관심상품" count={6} unit="건" />
    </Grid>
  );
}

const profileLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
});
function MyPageOverviewProfile({ onLogout }: { onLogout: () => void }) {
  const platform = usePlatform();

  return (
    <ContentSection
      gap="32px"
      _mobile={{ gap: '16px' }}
      title={
        <Link className={profileLink} href="/mypage/profile">
          <HStack as="span" gap="2px" alignItems="center">
            <Typography as="span" web="heading6" mo="heading4">
              {'박연진'}
            </Typography>
            <Typography as="span" variant="body1">
              님
            </Typography>
          </HStack>
          <Icon name="hoka-nav-chevron-right-regular" size={24} />
        </Link>
      }
      headerProps={{
        orientation: 'horizontal',
        alignItems: 'flex-end',
        action: (
          <Button
            className={css({ _mobile: { '& > span': { '--button-label-weight': '400' } } })}
            {...(platform === 'mobile'
              ? { variant: 'link', size: 'md' }
              : { variant: 'secondary', size: 'short' })}
            onClick={onLogout}
          >
            로그아웃
          </Button>
        ),
        titleAs: 'h1',
        titleProps: {
          web: 'heading6',
          mo: 'heading4',
          className: css({ lineHeight: '1', _mobile: { lineHeight: '1.2' } }),
        },
      }}
    >
      <Grid
        gridTemplateColumns="minmax(0, 1fr) 488px"
        gap="8px"
        _mobile={{ gridTemplateColumns: '1fr' }}
      >
        <MyPageMembership />
        <MyPageBenefits />
      </Grid>
    </ContentSection>
  );
}

function MyPageOrderTile({ item }: { item: MyPageOrderItem }) {
  return (
    <HStack position="relative" alignItems="flex-start" gap="16px">
      <OrderProductSummary
        alignStart
        variant="cart"
        image={item.image}
        name={item.name}
        content={
          <Stack minW="0" flex="1" gap="6px" pr="0">
            <HStack minH="18px">
              {item.isNew ? (
                <Typography variant="body4" tone="red80">
                  New
                </Typography>
              ) : null}
            </HStack>
            <Stack gap="10px">
              <Stack gap="4px">
                <Stack gap="2px">
                  <Typography variant="body4">{item.gender}</Typography>
                  <Typography variant="body4">{item.name}</Typography>
                </Stack>
                <Stack gap="4px" pt="2px">
                  {item.originalPrice && (
                    <Typography
                      variant="body5"
                      tone="tertiary"
                      className={css({ fontSize: '13px', textDecoration: 'line-through' })}
                    >
                      {item.originalPrice}
                    </Typography>
                  )}
                  <HStack gap="8px">
                    {item.discountLabel && (
                      <Typography
                        variant="body5"
                        tone="red80"
                        className={css({ fontSize: '13px' })}
                      >
                        {item.discountLabel}
                      </Typography>
                    )}
                    <Typography
                      variant="body5"
                      weight="medium"
                      className={css({ fontSize: '13px' })}
                    >
                      {item.price}
                    </Typography>
                  </HStack>
                </Stack>
              </Stack>
              <Typography variant="body5">{item.description}</Typography>
            </Stack>
          </Stack>
        }
      />
      <Box
        position="absolute"
        top="0"
        right="0"
        border="1px solid var(--color-border-tertiary)"
        borderRadius="full"
        px="8px"
        py="6px"
        bg="white.0"
      >
        <Typography variant="body5">{item.status}</Typography>
      </Box>
    </HStack>
  );
}

function MyPageRecentOrders({ empty = true }: { empty?: boolean }) {
  const platform = usePlatform();
  const items = empty ? [] : orderItems;
  const emptyState = (
    <EmptyState
      variant="content"
      description="주문 배송 내역이 없습니다."
      descriptionProps={{ web: 'body3', mo: 'body4' }}
      layoutProps={{
        borderBottom: '1px solid var(--colors-black-20)',
      }}
    />
  );

  return (
    <ContentSection
      as="section"
      gap="24px"
      aria-label="주문 배송 내역"
      title="주문 배송 내역"
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        titleProps: { web: 'heading7', mo: 'heading5' },
        action:
          items.length > 0 ? (
            <ButtonLink href="/mypage/orders" size="md" variant="link">
              전체 보기
            </ButtonLink>
          ) : undefined,
      }}
    >
      {platform !== 'mobile' ? (
        <Stack gap="0">
          <Grid
            gridTemplateColumns="minmax(0, 1fr) 158px 200px 170px"
            borderTop="2px solid var(--colors-black-100)"
            borderBottom="1px solid var(--colors-black-100)"
            py="20px"
            textAlign="center"
            gap="0"
          >
            <Typography variant="heading9">상품정보</Typography>
            <Typography variant="heading9">수량</Typography>
            <Typography variant="heading9">가격</Typography>
            <Typography variant="heading9">주문상태</Typography>
          </Grid>
          {items.length === 0
            ? emptyState
            : items.map((item, index) => (
                <Grid
                  key={index}
                  gridTemplateColumns="minmax(0, 1fr) 158px 200px 170px"
                  alignItems="center"
                  gap="0"
                  py="32px"
                  borderBottom="1px solid var(--colors-black-20)"
                >
                  <Box px="24px" minW="0">
                    <OrderProductSummary
                      variant="cart"
                      image={item.image}
                      name={item.name}
                      gender={item.gender}
                      hideAmount
                    />
                  </Box>
                  <Typography variant="body3" className={css({ textAlign: 'center' })}>
                    {item.quantity ?? '-'}
                  </Typography>
                  <Stack gap="0" alignItems="flex-end" px="24px">
                    {item.originalPrice && (
                      <Typography
                        variant="body4"
                        tone="tertiary"
                        className={css({ textDecoration: 'line-through' })}
                      >
                        {item.originalPrice}
                      </Typography>
                    )}
                    <Typography variant="body3" weight="medium">
                      {item.price}
                    </Typography>
                  </Stack>
                  <Typography variant="body3" className={css({ textAlign: 'center' })}>
                    {item.status}
                  </Typography>
                </Grid>
              ))}
        </Stack>
      ) : items.length === 0 ? (
        emptyState
      ) : (
        <Carousel itemCount={items.length}>
          <CarouselViewport freeMode={false} mode={platform} showScrollbar={false}>
            {items.map((item, index) => (
              <MyPageOrderTile item={item} key={`${item.name}-${index}`} />
            ))}
          </CarouselViewport>
          <CarouselPagination
            label="주문 상품 선택"
            className={css({ display: 'flex', justifyContent: 'center', gap: '5px' })}
          />
        </Carousel>
      )}
      {items.length > 0 ? <Divider display="none" _mobile={{ display: 'block' }} /> : null}
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
      <HStack minH="56px" justifyContent="space-between">
        <Typography variant="body3">{label}</Typography>
        <Icon name="hoka-nav-chevron-right-regular" size={24} />
      </HStack>
    </Link>
  );
}

function MyPageMenuSection({ title, items }: { title: string; items: MyPageMenuItemProps[] }) {
  return (
    <ContentSection
      as="section"
      gap="16px"
      aria-label={title}
      title={title}
      headerProps={{
        titleAs: 'h2',
        className: css({
          pb: '24px',
          borderBottom: '2px solid var(--colors-black-100)',
          _mobile: { pb: '16px', borderBottomWidth: '1px' },
        }),
        titleProps: { web: 'heading7', mo: 'heading5' },
      }}
    >
      <Stack gap="0">
        {items.map((item) => (
          <MyPageMenuItem key={item.to} label={item.label} to={item.to} />
        ))}
      </Stack>
    </ContentSection>
  );
}

/** [ 개발팀 바인딩 ] PC·모바일 상단 로그아웃은 이 owner의 logoutOpen을 공유합니다. previewLogout은 확인창의 초기 표시만 지정하며, 확인·취소는 인증 변경·로그아웃 요청 없이 확인창만 닫습니다. 실제 인증 종료 요청과 pending·실패 처리 및 완료 후 화면 갱신은 인증 연동 소유자가 연결해야 하는 미연동 경계입니다. */
/** 마이페이지 요약과 메뉴를 구성하고 로그아웃을 연결합니다. (Composes the account overview and menus and connects logout.) */
export function RouteContent({
  previewNoOrders = false,
  previewLogout = false,
}: {
  previewNoOrders?: boolean;
  previewLogout?: boolean;
}) {
  const [logoutOpen, setLogoutOpen] = useState(previewLogout);
  return (
    <>
      <MyPageFrame activePath="/mypage" layout="centered">
        <Stack gap="56px" _mobile={{ pt: '24px', gap: '32px' }}>
          <MyPageOverviewProfile onLogout={() => setLogoutOpen(true)} />
          <MyPageRecentOrders empty={previewNoOrders} />

          <Grid
            columns={3}
            columnGap="56px"
            rowGap="48px"
            _mobile={{ gridTemplateColumns: '1fr', gap: '32px' }}
          >
            {menuSections.map((section) => (
              <MyPageMenuSection items={section.items} key={section.title} title={section.title} />
            ))}
          </Grid>
        </Stack>
      </MyPageFrame>
      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => {
          setLogoutOpen(false);
        }}
      />
    </>
  );
}
