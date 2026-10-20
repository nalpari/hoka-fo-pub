import { Divider } from '@/shared/components/atoms/Divider/Divider';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { SupportNoticeItem } from './SupportNoticeItem';

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
      <Divider variant="strong" />
      <Box as="ul" m="0" p="0" listStyleType="none">
        {notices.map((notice, index) => (
          <SupportNoticeItem
            key={`${notice.title}-${index}`}
            title={notice.title}
            date={notice.date}
          />
        ))}
      </Box>
    </ContentSection>
  );
}
