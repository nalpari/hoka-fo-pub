'use client';

/**
 * [개발팀 바인딩]
 * SupportContactCard의 title/description/phone/phoneHref/operatingHours/lunchBreak가 운영 안내 데이터입니다.
 * 운영정보를 BO에서 받을 때 이 페이지에서 표시 props로 변환합니다. 전화 표시와 tel 링크를 함께 갱신하며 현재 고정 문구를 API 응답으로 오인하지 않습니다.
 */

import Link from 'next/link';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { SupportContacts } from './_components/SupportContacts';

/** 고객센터의 주요 문의와 안내 영역을 구성합니다. (Composes the main customer support and information sections.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          mb="10"
          title="고객센터"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading4' }}
          description="HOKA와 함께하는 모든 순간, 더 나은 경험을 위해 항상 도와드리겠습니다."
          descriptionProps={{ variant: 'body3', web: 'body2', mo: 'body3' }}
        />
      }
      activePath="/support"
      groups={supportNavigation}
      breadcrumbItems={[{ label: 'Home', href: '/' }, { label: '고객센터' }]}
    >
      <Stack gap="10">
        <SupportContacts />
        <HStack gap="4" alignItems="stretch" flexWrap="wrap">
          {[
            {
              href: '/support/inquiries/new',
              title: '1:1 문의',
              text: '궁금하신 내용을 문의해 주세요.',
            },
            { href: '/support/faq', title: 'FAQs', text: '자주 묻는 질문을 확인해 보세요.' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={css({
                flex: '1',
                minW: '200px',
                border: '1px solid var(--colors-black-20)',
                p: '6',
                display: 'block',
              })}
            >
              <Stack gap="3">
                <Typography variant="heading7">{item.title}</Typography>
                <Typography variant="body4">{item.text}</Typography>
              </Stack>
            </Link>
          ))}
        </HStack>
      </Stack>
    </CustomerCenterLayout>
  );
}
