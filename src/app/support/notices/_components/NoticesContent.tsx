'use client';
import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Center, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

import { notices } from '@/app/support/notices/notices.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { NoticesList } from './NoticesList';
/** 공지 목록과 화면별 상세 탐색을 구성합니다. (Composes notices and platform-specific detail navigation.) */
export function NoticesContent({ previewEmpty = false }: { previewEmpty?: boolean }) {
  const items = previewEmpty ? [] : notices;
  const total = previewEmpty ? 0 : notices.length;
  const platform = usePlatform();
  const [shown, setShown] = useState(10);
  return (
    <CustomerCenterLayout
      className={css({
        '--line-heights-body': '1.5',
        _mobile: { pb: '72px!', '& h1': { fontSize: '24px' } },
      })}
      title="공지사항"
      mobileTitleVariant="heading5"
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항' },
      ]}
      groups={supportNavigation}
      footer={
        shown < items.length ? (
          <Box pt="6" mx="auto">
            <Button
              variant="plain"
              className={css({ p: '0', minH: '0' })}
              disabled={false}
              loadMore={{
                appearance: 'text',
                label: '더 보기',
                count: Math.max(0, total - shown),
                countPlacement: 'inline',
                labelProps: { variant: 'body4' },
                indicator: (
                  <Center w="5" h="5">
                    <Icon name="chevron-down-regular" size="13px" />
                  </Center>
                ),
              }}
              onClick={() => {
                setShown((count) => count + 10);
              }}
            />
          </Box>
        ) : null
      }
    >
      <Stack gap="0" pt={{ base: '10', _mobile: '8' }}>
        <NoticesList
          notices={items}
          shown={shown}
          platform={platform}
          pending={false}
          error={Boolean(undefined)}
        />
      </Stack>
    </CustomerCenterLayout>
  );
}
