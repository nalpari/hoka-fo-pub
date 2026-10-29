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

type Props = {
  headingId: string;
  title: string;
  description: string;
  phone: string;
  phoneHref: string;
  operatingHoursTitle: string;
  operatingHours: string;
  lunchBreak: string;
};

const phoneLink = css({ _mobile: { textDecoration: 'underline', textUnderlineOffset: '2px' } });

function SupportContactCard({
  headingId,
  title,
  description,
  phone,
  phoneHref,
  operatingHoursTitle,
  operatingHours,
  lunchBreak,
}: Props) {
  return (
    <Stack
      as="section"
      aria-labelledby={headingId}
      bg="black.10"
      direction={{ base: 'row', _mobile: 'column' }}
      alignItems="flex-start"
      justifyContent="space-between"
      gap={{ base: '40', _mobile: '12' }}
      px="8"
      py="10"
      _mobile={{ px: '4', pt: '6', pb: '8' }}
    >
      <Stack gap="3" w={{ base: '280px', _mobile: 'full' }} flexShrink="0">
        <Typography as="h2" id={headingId} web="heading8" mo="heading5">
          {title}
        </Typography>
        <Typography as="p" web="body4" mo="body4" tone="subtle">
          {description}
        </Typography>
      </Stack>

      <Stack gap={{ base: '52px', _mobile: '32px' }} flex="1" minW="0">
        <Stack gap="3">
          <Typography web="body3" mo="body3" weight="medium">
            호카/호카 키즈
          </Typography>
          <HStack gap="1" alignItems="baseline">
            <Typography as="span" web="body3" mo="body3" weight="medium">
              TEL.
            </Typography>
            <Link className={phoneLink} href={phoneHref}>
              <Typography as="span" web="body2" mo="body3" weight="medium">
                {phone}
              </Typography>
            </Link>
          </HStack>
        </Stack>

        <Stack gap="3">
          <Typography web="body3" mo="body3" weight="medium">
            {operatingHoursTitle}
          </Typography>
          <Stack gap="2">
            <HStack gap="1" alignItems="baseline" flexWrap="wrap">
              <Typography as="span" web="body2" mo="body3" weight="medium">
                {operatingHours}
              </Typography>
              <Typography as="span" web="body3" mo="body4">
                ({lunchBreak})
              </Typography>
            </HStack>
            <Typography as="p" web="body4" mo="body5" tone="tertiary">
              * 토,일,공휴일 휴무
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function SupportContacts() {
  return (
    <Stack as="section" aria-label="고객센터 연락처" gap="2">
      <SupportContactCard
        headingId="support-contact-customer-title"
        title="고객상담실"
        description="AS 및 오프라인 매장 관련 문의"
        phone="080-665-5552"
        phoneHref="tel:0806655552"
        operatingHoursTitle="평일 운영시간"
        operatingHours="09:00~18:00"
        lunchBreak="점심시간 12:00~13:00"
      />
      <SupportContactCard
        headingId="support-contact-online-title"
        title="온라인 스토어"
        description="주문/배송/교환 및 반품 관련 문의"
        phone="080-2225-6660"
        phoneHref="tel:08022256660"
        operatingHoursTitle="평일 일반 유선상담 운영시간"
        operatingHours="10:00~17:00"
        lunchBreak="점심시간 12:00~13:00"
      />
    </Stack>
  );
}

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
      <SupportContacts />
    </CustomerCenterLayout>
  );
}
