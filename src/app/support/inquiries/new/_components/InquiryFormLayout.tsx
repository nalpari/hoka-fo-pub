'use client';
import type { ReactNode } from 'react';

import { css } from 'styled-system/css';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 문의 작성 기본·고정 상태의 제목과 탐색을 공유합니다. (Shares headings and navigation across inquiry form states.) */
export function InquiryFormLayout({ children }: { children: ReactNode }) {
  return (
    <CustomerCenterLayout
      header={
        /* 문의 등록 제목과 안내 문구 (Inquiry submission heading and guidance). */
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          title="1:1 문의등록"
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
        { label: '1:1 문의하기', href: '/support/inquiries' },
        { label: '1:1 문의등록' },
      ]}
      groups={supportNavigation}
    >
      {children}
    </CustomerCenterLayout>
  );
}
