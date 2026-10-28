'use client';

import { useShop } from '@/context/ShopShell';

import { Divider } from '@/components/common/atoms/Divider/Divider';

import { useState } from 'react';
import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Breadcrumb } from '@/components/common/molecules/Breadcrumb/Breadcrumb';
import { LogoutDialog } from '@/components/common/organisms/Account/LogoutDialog';
import { MyPageOverviewProfile } from '@/components/features/mypage/MyPageOverviewProfile';
import { MyPageRecentOrders } from '@/components/features/mypage/MyPageRecentOrders';
import { MyPageMenuSection } from '@/components/features/mypage/MyPageMenuSection';
import { menuSections } from '@/components/features/mypage/mypage-home-data';

/** 마이페이지 요약과 메뉴를 구성하고 로그아웃을 연결합니다. (Composes the account overview and menus and connects logout.) */
export default function Page() {
  const { logout: onLogout } = useShop();
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <Box as="main" boxSizing="border-box" w="100vw" maxW="640px" mx="auto" px="4" pb="16">
        <Box boxSizing="border-box" h="14" pt="6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '마이페이지' }]} />
        </Box>
        <Stack pt="6" gap="10">
          <MyPageOverviewProfile />
          <MyPageRecentOrders />

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
      </Box>
      <LogoutDialog
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
