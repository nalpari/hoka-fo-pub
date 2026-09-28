import { useParams } from 'react-router-dom';
import { css } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { findExploreScreen } from '@/shared/features/explore/exploreContent';

const styles = {
  layout: css({
    maxW: 'var(--content-width)',
    mx: 'auto',
    py: '64px',
    '& > header': { maxW: '700px', mb: '42px' },
    _mobile: { px: '16px', py: '32px' },
  }),
  hero: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minH: '180px',
    mb: '44px',
    p: '34px',
    bg: 'linear-gradient(135deg, #0082ca, #111)',
    color: '#fff',
    '& span': { mb: '18px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' },
    '& strong': { maxW: '280px', fontSize: '28px', lineHeight: 0.95 },
    _mobile: { minH: '230px', mb: '24px', p: '22px' },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    mb: '38px',
    _mobile: { gridTemplateColumns: '1fr', gap: '10px' },
  }),
  group: css({
    minH: '230px',
    p: '24px',
    border: '1px solid var(--line)',
    '& h2': { mb: '10px', fontSize: '20px' },
    '& p': { minH: '48px', mb: '24px', color: '#666', fontSize: '14px', lineHeight: 1.45 },
    '& ul': { display: 'grid', gap: '9px', m: 0, p: 0, listStyle: 'none' },
    '& a': {
      fontSize: '14px',
      fontWeight: 700,
      _hover: { textDecoration: 'underline', textUnderlineOffset: '3px' },
    },
    _mobile: { minH: 'auto' },
  }),
  statusChip: css({
    display: 'inline-block',
    px: '7px',
    py: '5px',
    bg: 'var(--soft)',
    color: '#666',
    fontSize: '11px',
  }),
};

export function ExploreDetailPage() {
  const { '*': slug = '' } = useParams();
  const screen = findExploreScreen(slug);

  if (!screen) {
    return (
      <ContentLayout
        className={styles.layout}
        title="준비 중인 EXPLORE 화면"
        description="콘텐츠 구조와 경로는 등록되었습니다."
      >
        <ButtonLink to="/explore" variant="primary">
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
      <section className={styles.hero}>
        <span>{screen.eyebrow}</span>
        <strong>
          {screen.status === 'planned' ? 'CONTENT READY FOR PLANNING' : 'NOW AVAILABLE'}
        </strong>
      </section>
      <div className={styles.grid}>
        {screen.sections.map((section) => (
          <section className={styles.group} key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span className={styles.statusChip}>콘텐츠 준비 중</span>
          </section>
        ))}
      </div>
      <ButtonLink to="/products" variant="primary">
        상품 탐색하기
      </ButtonLink>
    </ContentLayout>
  );
}
