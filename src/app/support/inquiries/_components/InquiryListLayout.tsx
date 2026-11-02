'use client';

import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 문의 기본·고정 상태에 동일한 제목과 탐색을 제공합니다. (Shares headings and navigation across inquiry list states.) */
export function InquiryListLayout({
  children,
  empty = false,
  mobileTitleSize = '24px',
}: {
  children: ReactNode;
  empty?: boolean;
  mobileTitleSize?: '22px' | '24px';
}) {
  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          orientation="horizontal"
          alignItems="flex-end"
          textGroupProps={{ gap: { base: '3', _mobile: '4' }, minW: '0', flex: '1' }}
          title="1:1 문의"
          titleAs="h1"
          titleProps={{
            web: 'heading6',
            mo: 'heading5',
            className:
              mobileTitleSize === '22px' ? undefined : css({ _mobile: { fontSize: '24px' } }),
          }}
          action={
            <ButtonLink
              href="/support/inquiries/new"
              variant="primary"
              size="short"
              className={css({
                flexShrink: '0',
                '& > span': {
                  '--button-height': '36px',
                  '--button-label-size': '12px',
                  '--button-padding-x': '24px',
                },
                _mobile: { display: 'none' },
              })}
            >
              1:1 문의하기
            </ButtonLink>
          }
          description="궁금하신 점이나 불편한 사항을 알려주시면 정성껏 답변해 드리겠습니다."
          descriptionProps={{
            variant: 'body3',
            mo: empty ? 'body4' : 'body3',
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
        containerProps: css.raw({ display: 'none', _mobile: { display: 'block', pt: '6' } }),
      }}
    >
      <Stack gap="0" mt={{ base: '8', _mobile: '4' }}>
        {children}
      </Stack>
    </CustomerCenterLayout>
  );
}
