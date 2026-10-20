import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { css } from 'styled-system/css';
import { Box, Divider, HStack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import Link from 'next/link';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  noticeLink: css({ display: 'block' }),
  noticeTitle: css({
    minW: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
};

const notices = [
  { title: '[공통] 네이버페이 9월 프로모션 안내', date: '2026-08-13' },
  { title: '[공통] 2026 광복절 고객센터 및 빠른배송 운영 안내', date: '2026-08-13' },
  { title: '[공통] 2026 광복절 고객센터 및 빠른배송 운영 안내', date: '2026-08-13' },
  { title: '[공통] 네이버페이 9월 프로모션 안내', date: '2026-08-13' },
  { title: '[공통] 네이버페이 9월 프로모션 안내', date: '2026-08-13' },
];

export function SupportNotices() {
  return (
    <ContentSection
      as="section"
      aria-labelledby="support-notices-title"
      gap="0"
      title="공지사항"
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ pb: '6' }),
        titleProps: { web: 'heading8', mo: 'heading5', id: 'support-notices-title' },
        action: (
          <ButtonLink href="/support/notices" size="md" variant="link">
            전체보기
          </ButtonLink>
        ),
      }}
    >
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
    </ContentSection>
  );
}
