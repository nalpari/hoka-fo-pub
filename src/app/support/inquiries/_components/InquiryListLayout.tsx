'use client';

import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 문의 기본·고정 상태에 동일한 제목과 탐색을 제공합니다. (Shares headings and navigation across inquiry list states.) */
export function InquiryListLayout({ children }: { children: ReactNode }) {
  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          title="1:1 문의"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          description="궁금하신 점이나 불편한 사항을 알려주시면 정성껏 답변해 드리겠습니다."
          descriptionProps={{
            variant: 'body3',
            className: css({ color: 'black.100', _mobile: { color: 'black.60' } }),
          }}
        />
      }
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의' },
      ]}
      groups={supportNavigation}
      footerAction={{
        kind: 'link',
        label: '1:1 문의하기',
        href: '/support/inquiries/new',
        variant: 'primary',
        size: 'tall',
        width: 'compact',
        containerProps: css.raw({ pt: '6', _mobile: { pb: '16' } }),
      }}
    >
      <Stack gap="0" mt={{ base: '10', _mobile: '4' }}>
        {children}
      </Stack>
    </CustomerCenterLayout>
  );
}
