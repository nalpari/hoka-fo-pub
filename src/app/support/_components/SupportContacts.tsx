'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { supportContactHours, supportContacts } from '@/data/supportContacts';

type Props = {
  headingId: string;
  title: string;
  description: string;
  phone: string;
  phoneHref: string;
  note?: string;
  operatingHoursTitle: string;
  operatingHours: string;
  lunchBreak: string;
  closedDays: string;
};

const phoneLink = css({
  display: 'inline-flex',
  _mobile: { textDecoration: 'underline', textUnderlineOffset: '2px' },
});

function SupportContactCard({
  headingId,
  title,
  description,
  phone,
  phoneHref,
  note,
  operatingHoursTitle,
  operatingHours,
  lunchBreak,
  closedDays,
}: Props) {
  const mobile = usePlatform() === 'mobile';

  const phoneText = (
    <Typography as="span" variant="b2" language="en">
      {phone}
    </Typography>
  );

  return (
    <Stack
      as="section"
      aria-labelledby={headingId}
      bg="black.10"
      direction={{ base: 'row', _mobile: 'column' }}
      alignItems="flex-start"
      gap={{ base: '40', _mobile: '12' }}
      px="8"
      py="10"
      _mobile={{ px: '4', py: '9' }}
    >
      <ContentHeader
        title={title}
        titleAs="h2"
        titleProps={{ id: headingId, web: 'h10', mo: 'h7B' }}
        description={description}
        descriptionProps={{ variant: 'b6', tone: 'subtle' }}
        gap="3"
        w={{ base: '280px', _mobile: 'full' }}
        flexShrink="0"
      />

      <Stack
        gap={{ base: note ? '52px' : '0', _mobile: '8' }}
        justifyContent={!mobile && !note ? 'space-between' : undefined}
        flex={{ base: '1', _mobile: 'none' }}
        minW="0"
        _mobile={{ w: 'full' }}
        h={{ base: note ? 'auto' : '196px', _mobile: 'auto' }}
      >
        <Stack gap={{ base: '6', _mobile: '3' }}>
          <Stack gap="3">
            {!mobile && <Typography variant="b4">전화번호</Typography>}
            <HStack gap="1" alignItems="baseline">
              <Typography as="span" variant="b2M" language="en">
                TEL.
              </Typography>
              {mobile ? (
                <a className={phoneLink} href={phoneHref}>
                  {phoneText}
                </a>
              ) : (
                phoneText
              )}
            </HStack>
          </Stack>
          {note && (
            <Typography as="p" variant="b6" tone="subtle">
              {note}
            </Typography>
          )}
        </Stack>

        <Stack gap={{ base: '3', _mobile: '2' }}>
          <Typography variant="b4M">{mobile ? '운영시간' : operatingHoursTitle}</Typography>
          <Stack gap={{ base: '2', _mobile: note ? '10px' : '2' }}>
            <HStack gap="1" alignItems="baseline" flexWrap="wrap">
              {mobile && <Typography variant="b4M">평일</Typography>}
              <Typography as="span" web="b2M" mo="b4M" language="en">
                {operatingHours}
              </Typography>
              <Typography as="span" web="b4" mo="b6" className={css({ whiteSpace: 'nowrap' })}>
                ({lunchBreak})
              </Typography>
            </HStack>
            <Typography as="p" variant="b6" tone="subtle">
              * {closedDays}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

/**
 * [ 개발팀 바인딩 ]
 * /support는 @/data/supportContacts의 고정 연락처·운영시간을 푸터와 공유합니다.
 * 연락처 카드는 모바일에서만 phoneHref를 통화 링크에 연결합니다.
 * 운영정보 갱신 책임과 전화 링크 계약은 해당 데이터 소유자의 주석을 따릅니다.
 */

/** 고객센터 연락처와 운영 안내를 표시합니다. (Displays customer support contacts and opening information.) */
export function SupportContacts() {
  return (
    <Stack as="section" aria-label="고객센터 연락처" gap="2">
      {supportContacts.map((contact) => (
        <SupportContactCard
          key={contact.headingId}
          {...contact}
          {...supportContactHours}
          operatingHoursTitle={contact.note ? '평일 일반 유선상담 운영시간' : '운영시간'}
        />
      ))}
    </Stack>
  );
}
