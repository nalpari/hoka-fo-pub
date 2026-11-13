'use client';

import { useSearchParams } from 'next/navigation';

import type { ReactNode } from 'react';

import { css } from 'styled-system/css';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 문의 작성 기본·고정 상태의 제목과 탐색을 공유합니다. (Shares headings and navigation across inquiry form states.) */
export function InquiryFormLayout({ children }: { children: ReactNode }) {
  const fromMyPage = useSearchParams().get('from') === 'mypage';
  return (
    <CustomerCenterLayout
      className={css({
        '--line-heights-body': '1.5',
        '& input[type="text"]:not([role="combobox"])': { h: '24px', minH: '24px' },
        _mobile: { pb: '16!' },
      })}
      header={
        /* 문의 등록 제목과 안내 문구 (Inquiry submission heading and guidance). */
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          title="1:1문의"
          titleAs="h1"
          titleProps={{
            web: 'heading6',
            mo: 'heading5',
          }}
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
        fromMyPage
          ? { label: '마이페이지', href: '/mypage' }
          : { label: '고객센터', href: '/support' },
        { label: '1:1문의' },
      ]}
      groups={supportNavigation}
    >
      {children}
    </CustomerCenterLayout>
  );
}
