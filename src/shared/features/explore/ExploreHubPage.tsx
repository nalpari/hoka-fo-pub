'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
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
};

const groups = [
  {
    title: 'GUIDES',
    description: '달리는 곳과 목적에 맞는 신발을 고르는 기준',
    links: [
      ['로드 러닝', '/explore/guides/road-running'],
      ['트레일 러닝', '/explore/guides/trail-running'],
      ['하이킹', '/explore/guides/hiking'],
      ['러닝 입문', '/explore/guides/running'],
      ['초보자 루틴', '/explore/guides/new-runners'],
    ],
  },
  {
    title: 'TECHNOLOGY',
    description: '제품 성능을 이해하기 위한 기술 안내',
    links: [
      ['쿠셔닝', '/explore/technology/cushioning'],
      ['안정성', '/explore/technology/stability'],
      ['트레일 기술', '/explore/technology/trail'],
      ['마일리지와 반응성', '/explore/technology/response'],
    ],
  },
  {
    title: 'STORIES',
    description: '브랜드와 러너, 이벤트의 이야기',
    links: [
      ['HOKA 스토리', '/explore/stories'],
      ['러너 인터뷰', '/explore/stories/runners'],
      ['이벤트', '/explore/stories/events'],
      ['뉴스레터', '/explore/stories/newsletter'],
    ],
  },
  {
    title: 'RECOVERY',
    description: '러닝 후 회복과 체력 관리의 기준',
    links: [
      ['리커버리 가이드', '/explore/recovery'],
      ['회복 루틴', '/explore/recovery/routine'],
      ['착용 관리', '/explore/recovery/care'],
      ['근육 회복 체크', '/explore/recovery/checklist'],
    ],
  },
  {
    title: 'COMMUNITY',
    description: '러너와 브랜드 커뮤니티 콘텐츠',
    links: [
      ['HOKA Run Club', '/running/run-club'],
      ['러닝 저널', '/explore/journal'],
      ['커뮤니티 챌린지', '/explore/community/challenges'],
      ['이벤트 캘린더', '/explore/community/events'],
      ['지역 러닝 모임', '/explore/community/local-runs'],
    ],
  },
  {
    title: 'MODELS',
    description: '대표 모델의 특성과 추천 활동',
    links: [
      ['Bondi', '/explore/models/bondi'],
      ['Clifton', '/explore/models/clifton'],
      ['Speedgoat', '/explore/models/speedgoat'],
      ['Mach', '/explore/models/mach'],
      ['Skyflow', '/explore/models/skyflow'],
    ],
  },
];

export function ExploreHubPage() {
  return (
    <ContentLayout
      className={styles.layout}
      breadcrumbItems={[{ label: 'HOME', href: '/' }, { label: 'EXPLORE' }]}
      title="더 오래, 더 즐겁게 움직이는 방법"
      description="제품 탐색을 돕는 가이드와 기술, 러닝 콘텐츠를 한곳에 모았습니다."
    >
      <Stack
        as="section"
        gap="normal"
        alignItems="flex-start"
        justifyContent="flex-end"
        minH="290px"
        mb="11"
        p="34px"
        bg="var(--color-black-100)"
        color="var(--color-text-inverse)"
        _mobile={{
          minH: '230px',
          mb: '6',
          p: '22px',
          '& h2': { fontSize: '32' /* 기존 33px */ },
        }}
        css={{
          '& span': {
            mb: '18px',
          },
          '& h2': {
            maxW: '540px',
            mb: '30px',
            fontSize: '48' /* 기존 46px */,
            lineHeight: 'var(--line-heights-hoka)',
          },
        }}
      >
        <Typography variant="body5" weight="bold">
          HOKA EXPLORE
        </Typography>
        <Typography as="h2">어디로, 어떻게 달릴지부터 시작하세요.</Typography>
        <ButtonLink href="/explore/shoe-finder">SHOE FINDER 시작하기</ButtonLink>
      </Stack>
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        gap="4"
        mb="38px"
        _mobile={{ gridTemplateColumns: '1fr', gap: '2.5' }}
      >
        {groups.map((group) => (
          <Box
            as="section"
            minH="230px"
            p="6"
            border="1px solid var(--line)"
            _mobile={{ minH: 'auto' }}
            css={{
              '& a': {
                _hover: { textDecoration: 'underline', textUnderlineOffset: '3px' },
              },
            }}
            key={group.title}
          >
            <Typography as="h2" variant="body2" weight="bold" className={css({ mb: '2.5' })}>
              {group.title}
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
              {group.description}
            </Typography>
            <Grid as="ul" gap="9px" m={0} p={0} listStyle="none">
              {group.links.map(([label, to]) => (
                <li key={to}>
                  <Link href={to}>
                    <Typography variant="body4" weight="bold">
                      {label} →
                    </Typography>
                  </Link>
                </li>
              ))}
            </Grid>
          </Box>
        ))}
      </Grid>
    </ContentLayout>
  );
}
