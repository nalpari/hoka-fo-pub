import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

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
  hero: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    minH: '290px',
    mb: '11',
    p: '34px',
    bg: 'var(--color-black-100)',
    color: 'var(--color-white-000)',
    '& span': {
      mb: '18px',
      fontSize: '12',
      fontWeight: 'var(--font-weights-bold)',
      letterSpacing: 'var(--letter-spacings-korean)',
    },
    '& h2': {
      maxW: '540px',
      mb: '30px',
      fontSize: '48' /* 기존 46px */,
      lineHeight: 'var(--line-heights-hoka)',
    },
    _mobile: {
      minH: '230px',
      mb: '6',
      p: '22px',
      '& h2': { fontSize: '32' /* 기존 33px */ },
    },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '4',
    mb: '38px',
    _mobile: { gridTemplateColumns: '1fr', gap: '2.5' },
  }),
  group: css({
    minH: '230px',
    p: '6',
    border: '1px solid var(--line)',
    '& h2': { mb: '2.5', fontSize: '20' },
    '& p': {
      minH: '12',
      mb: '6',
      color: 'var(--color-text-muted)',
      fontSize: '14',
      lineHeight: 'var(--line-heights-body)',
    },
    '& ul': { display: 'grid', gap: '9px', m: 0, p: 0, listStyle: 'none' },
    '& a': {
      fontSize: '14',
      fontWeight: 'var(--font-weights-bold)',
      _hover: { textDecoration: 'underline', textUnderlineOffset: '3px' },
    },
    _mobile: { minH: 'auto' },
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
      <section className={styles.hero}>
        <span>HOKA EXPLORE</span>
        <h2>어디로, 어떻게 달릴지부터 시작하세요.</h2>
        <ButtonLink to="/explore/shoe-finder">SHOE FINDER 시작하기</ButtonLink>
      </section>
      <div className={styles.grid}>
        {groups.map((group) => (
          <section className={styles.group} key={group.title}>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
            <ul>
              {group.links.map(([label, to]) => (
                <li key={to}>
                  <Link to={to}>{label} →</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ContentLayout>
  );
}
