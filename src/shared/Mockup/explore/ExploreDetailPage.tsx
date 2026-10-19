'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useParams } from 'next/navigation';
import { css } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { findExploreScreen } from '@/shared/Mockup/explore/exploreContent';
import { Stack, Grid, Box } from 'styled-system/jsx';

const styles = {
  layout: css({
    maxW: 'var(--content-width)',
    mx: 'auto',
    py: '16',
    '& > header': { maxW: '700px', mb: '42px' },
    _mobile: {
      px: 'var(--layout-mobile-inline-gutter)',
      py: 'var(--layout-mobile-page-block-padding)',
    },
  }),

  statusChip: css({
    display: 'inline-block',
    px: '7px',
    py: '5px',
    bg: 'var(--soft)',
  }),
};

export function ExploreDetailPage() {
  const { slug: segments = [] } = useParams<{ slug: string[] }>();
  const slug = segments.join('/');
  const screen = findExploreScreen(slug);

  if (!screen) {
    return (
      <ContentLayout
        className={styles.layout}
        title="준비 중인 EXPLORE 화면"
        description="콘텐츠 구조와 경로는 등록되었습니다."
      >
        <ButtonLink href="/explore" variant="primary">
          EXPLORE로 돌아가기
        </ButtonLink>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      className={styles.layout}
      breadcrumbItems={[
        { label: 'HOME', href: '/' },
        { label: 'EXPLORE', href: '/explore' },
        { label: screen.title },
      ]}
      title={screen.title}
      description={screen.description}
    >
      <Stack
        as="section"
        gap="normal"
        alignItems="flex-start"
        justifyContent="space-between"
        minH="180px"
        mb="11"
        p="34px"
        bg="linear-gradient(135deg, var(--color-blue-100), var(--color-black-100))"
        color="var(--color-text-inverse)"
        _mobile={{ minH: '230px', mb: '6', p: '22px' }}
      >
        <Typography
          variant="body5"
          weight="bold"
          className={css({
            mb: '18px',
          })}
        >
          {screen.eyebrow}
        </Typography>
        <strong
          className={css({
            maxW: '280px',
            fontSize: '28',
            lineHeight: 'var(--line-heights-hoka)',
          })}
        >
          {screen.status === 'planned' ? 'CONTENT READY FOR PLANNING' : 'NOW AVAILABLE'}
        </strong>
      </Stack>
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        gap="4"
        mb="38px"
        _mobile={{ gridTemplateColumns: '1fr', gap: '2.5' }}
      >
        {screen.sections.map((section) => (
          <Box
            as="section"
            minH="230px"
            p="6"
            border="1px solid var(--line)"
            _mobile={{ minH: 'auto' }}
            key={section.title}
          >
            <Typography as="h2" variant="body2" weight="bold" className={css({ mb: '2.5' })}>
              {section.title}
            </Typography>
            <Typography
              as="p"
              variant="body4"
              tone="tertiary"
              className={css({
                minH: '12',
                mb: '6',
              })}
            >
              {section.description}
            </Typography>
            <Typography variant="body5" tone="tertiary" className={styles.statusChip}>
              콘텐츠 준비 중
            </Typography>
          </Box>
        ))}
      </Grid>
      <ButtonLink href="/products" variant="primary">
        상품 탐색하기
      </ButtonLink>
    </ContentLayout>
  );
}
