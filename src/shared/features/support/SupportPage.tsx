'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Box, Divider, Grid, HStack, Stack, VStack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { PageActionButton } from '@/shared/components/molecules/PageActionButton/PageActionButton';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { FaqList } from '@/shared/components/organisms/Faq/FaqList';
import { faqs } from '@/shared/features/faq/faq.data';
import { SupportContactCard } from '@/shared/features/support/SupportContactCard';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const notices = [
  { title: '[공통] 네이버페이 9월 프로모션 안내', date: '2026-08-13' },
  { title: '[공통] 2026 광복절 고객센터 및 빠른배송 운영 안내', date: '2026-08-13' },
  { title: '[공통] 2026 광복절 고객센터 및 빠른배송 운영 안내', date: '2026-08-13' },
  { title: '[공통] 네이버페이 9월 프로모션 안내', date: '2026-08-13' },
  { title: '[공통] 네이버페이 9월 프로모션 안내', date: '2026-08-13' },
];

const styles = {
  noticeLink: css({ display: 'block' }),
  noticeTitle: css({
    minW: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
};

export function SupportPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0].question);

  return (
    <CustomerCenterLayout
      title="고객센터"
      description={
        <>
          HOKA와 함께하는 모든 순간,
          <Box as="br" display={{ base: 'none', _mobile: 'block' }} /> 더 나은 경험을 위해 항상
          도와드리겠습니다.
        </>
      }
      mobileTitleVariant="heading4"
      headingProps={{ mb: '10', gap: { base: '6', _mobile: '4' } }}
      activePath="/support"
      groups={supportNavigation}
      breadcrumbItems={[{ label: 'Home', href: '/' }, { label: '고객센터' }]}
    >
      <Stack gap="4" _mobile={{ gap: '2' }}>
        <Grid
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          gap="4"
          _mobile={{ gridTemplateColumns: '1fr', gap: '2' }}
        >
          <SupportContactCard
            title="고객상담실"
            description="AS 및 오프라인 매장 관련 문의"
            phone="080-665-5552"
            phoneHref="tel:0806655552"
          />
          <SupportContactCard
            title="온라인 스토어"
            description="주문/배송/교환 및 반품 관련 문의"
            phone="080-2225-6660"
            phoneHref="tel:08022256660"
          />
        </Grid>
        <Stack bg="black.10" p="8" gap="5" _mobile={{ px: '4', pt: '5', pb: '6' }}>
          <Typography as="h2" web="heading8" mo="heading9">
            운영시간
          </Typography>
          <Grid gridTemplateColumns="1fr 1px 1fr" gap="4">
            <VStack alignItems="start" gap="4">
              <Typography web="body3" mo="body4">
                평일
              </Typography>
              <Typography web="body1" mo="body4">
                09:00 ~ 18:00
              </Typography>
            </VStack>
            <Divider aria-hidden="true" orientation="vertical" w="1px" h="63px" bg="black.20" />
            <VStack alignItems="start" gap="4">
              <Typography web="body3" mo="body4">
                일반 유선상담
              </Typography>
              <Typography web="body1" mo="body4">
                10:00 ~ 17:00
              </Typography>
            </VStack>
          </Grid>
          <Typography as="p" web="body4" mo="body5" tone="tertiary">
            *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
          </Typography>
        </Stack>
      </Stack>

      <Box as="section" mt="80px" _mobile={{ mt: '10' }} aria-labelledby="support-notices-title">
        <HStack justifyContent="space-between" pb="6">
          <Typography as="h2" web="heading8" mo="heading5" id="support-notices-title">
            공지사항
          </Typography>
          <ButtonLink href="/support/notices" size="md" variant="link">
            전체보기
          </ButtonLink>
        </HStack>
        <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.100" />
        <Box as="ul" m="0" p="0" listStyleType="none">
          {notices.map((notice, index) => (
            <Box as="li" key={`${notice.title}-${index}`}>
              <Link className={styles.noticeLink} href="/support/notices/1">
                <HStack
                  justifyContent="space-between"
                  gap="4"
                  minH={{ base: '69px', _mobile: '51px' }}
                  px="4"
                  py="6"
                  _mobile={{ gap: '2', px: '0', py: '4' }}
                >
                  <Typography className={styles.noticeTitle} web="heading9" mo="body4">
                    {notice.title}
                  </Typography>
                  <Box flexShrink="0">
                    <Typography
                      as="time"
                      dateTime={notice.date}
                      web="body4"
                      mo="body5"
                      tone="tertiary"
                    >
                      {notice.date}
                    </Typography>
                  </Box>
                </HStack>
              </Link>
              <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
            </Box>
          ))}
        </Box>
      </Box>

      <Box as="section" mt="80px" _mobile={{ mt: '10' }} aria-labelledby="support-faq-title">
        <Stack gap="2">
          <Typography as="h2" web="heading7" mo="heading5" id="support-faq-title">
            FAQs
          </Typography>
          <Typography as="p" variant="body3">
            가장 자주 찾는 질문의 답변을 찾아보세요!
          </Typography>
        </Stack>
        <Box mt="6" _mobile={{ display: 'none' }}>
          <FaqList
            entries={faqs.slice(0, 5)}
            openQuestion={openQuestion}
            onToggle={(question) => setOpenQuestion(openQuestion === question ? null : question)}
          />
        </Box>
        <PageActionButton
          href="/support/faq"
          size="tall"
          containerProps={{ pt: '0', mt: '9', _mobile: { maxW: 'none' } }}
        >
          FAQs 바로가기
        </PageActionButton>
      </Box>
    </CustomerCenterLayout>
  );
}
