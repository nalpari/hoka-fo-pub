'use client';

import { Divider } from '@/shared/components/atoms/Divider/Divider';

import { useState } from 'react';
import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Breadcrumb } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import { LogoutDialog } from '@/shared/components/organisms/Account/LogoutDialog';
import { MyPageOverviewProfile } from './MyPageOverviewProfile';
import { MyPageRecentOrders } from './MyPageRecentOrders';
import { MyPageMenuSection } from './MyPageMenuSection';
import { menuSections } from './mypage-home-data';

export function MyPage({ onLogout }: { onLogout: () => void }) {
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
