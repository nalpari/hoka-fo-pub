'use client';
import Link from 'next/link';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';
import { useShopPreviewLogout } from '@/context/ShopPreviewContext';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Icon, type IconAssetName } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import { menuSections } from '@/app/mypage/mypage-home-data';

type LogoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function LogoutDialog({ open, onOpenChange, onConfirm }: LogoutDialogProps) {
  return (
    <ModalDialog
      variant="confirm"
      closeLabel="로그아웃 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}

      title="로그아웃"
      actions={{ kind: 'single', onConfirm, buttonProps: { size: 'tall' } }}

      message={<>로그아웃 하시겠습니까?</>}
    />
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
              <Typography web="heading8" mo="heading6" language="en">
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
          <Typography as="p" web="body3" mo="body5" className={styles.benefitText}>
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
  icon: IconAssetName;
};

const styles = {
  benefitLink: css({
    minW: '0',
    bg: 'black.10',
    p: '32px',
    color: 'inherit',
    textDecoration: 'none',
    _mobile: { px: '16px', py: '20px' },
  }),
  logoutButton: css({ _mobile: { '& > span': { '--button-label-weight': '400' } } }),
  profileTitle: css({ lineHeight: '1', _mobile: { lineHeight: '1.2' } }),
  benefitText: css({ '&&': { lineHeight: '1.5' } }),
  profileName: css({ '&&': { lineHeight: '1', _mobile: { lineHeight: '1.2' } } }),
  menuHeader: css({
    minH: '52px',
    justifyContent: 'flex-end',
    pb: '16px',
    borderBottom: '2px solid var(--colors-black-100)',
    _mobile: { minH: '0', borderBottomWidth: '1px' },
  }),
  menuTitle: css({ '&&': { lineHeight: '1.2' } }),
  profileLink: css({
    display: 'inline-flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
  }),
  menuLink: css({ display: 'block' }),
};

function MyPageBenefitItem({ href, label, count, unit, icon }: MyPageBenefitItemProps) {
  return (
    <Link className={styles.benefitLink} href={href}>
      <Stack h="full" minH="81px" justifyContent="space-between" _mobile={{ minH: '57px' }}>
        <HStack gap="8px">
          <Icon name={icon} size={18} />
          <Typography web="body2" mo="body3" weight="medium" className={styles.benefitText}>
            {label}
          </Typography>
        </HStack>
        <HStack gap="2px" justifyContent="flex-end" alignItems="flex-end">
          <Typography web="heading7" mo="heading5" language="en">
            {count}
          </Typography>
          <Typography web="body2" mo="body3" className={styles.benefitText}>
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
      <MyPageBenefitItem
        href="/mypage/coupons"
        label="내 쿠폰"
        count={3}
        unit="개"
        icon="ticket-simple-solid"
      />
      <MyPageBenefitItem
        href="/mypage/wishlist"
        label="관심상품"
        count={6}
        unit="건"
        icon="heart-solid"
      />
    </Grid>
  );
}

function MyPageOverviewProfile({ onLogout }: { onLogout: () => void }) {
  const platform = usePlatform();

  return (
    <ContentSection
      gap="32px"
      _mobile={{ gap: '16px' }}
      title={
        <Link className={styles.profileLink} href="/mypage/profile">
          <HStack as="span" gap="2px" alignItems="flex-end">
            <Typography as="span" web="heading6" mo="heading4" className={styles.profileName}>
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
            className={styles.logoutButton}
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
          className: styles.profileTitle,
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

type MyPageMenuItemProps = {
  label: string;
  to: string;
};

function MyPageMenuItem({ label, to }: MyPageMenuItemProps) {
  return (
    <Link className={styles.menuLink} href={to}>
      <HStack
        minH="56px"
        justifyContent="space-between"
        borderBottom="1px solid var(--color-border-subtle)"
      >
        <Typography variant="body3Medium">{label}</Typography>
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
        className: styles.menuHeader,
        titleProps: { web: 'heading7', mo: 'heading5', className: styles.menuTitle },
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

/** [ 개발팀 바인딩 ] PC·모바일 로그아웃 확인은 ShopShell의 퍼블리싱 전용 Context로 셸 로그인 표시를 해제하고 창을 닫습니다. 고객센터 개인 회원등급 요약도 같은 표시 상태를 읽습니다. 닫기는 표시 상태를 유지하며 previewLogout은 확인창 초기 표시만 지정합니다. 인증 요청·저장·완료 이동은 없고 새로고침하면 초기 fixture로 돌아갑니다. 실제 인증 종료와 pending·실패·성공 후 갱신은 인증 연동 소유자가 연결해야 합니다. */
/** 마이페이지 요약과 메뉴를 구성하고 로그아웃을 연결합니다. (Composes the account overview and menus and connects logout.) */
export function RouteContent({ previewLogout = false }: { previewLogout?: boolean }) {
  const [logoutOpen, setLogoutOpen] = useState(previewLogout);
  const logoutPreview = useShopPreviewLogout();

  return (
    <>
      <MyPageFrame activePath="/mypage" layout="centered">
        <Stack gap="56px" _mobile={{ pt: '24px', gap: '32px' }}>
          <MyPageOverviewProfile onLogout={() => setLogoutOpen(true)} />

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
          logoutPreview?.();
          setLogoutOpen(false);
        }}
      />
    </>
  );
}
