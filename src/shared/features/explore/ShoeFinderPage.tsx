import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cva, css } from 'styled-system/css';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { Button } from '@/shared/components/atoms/Button/Button';

const exploreLayout = css({
  maxW: 'var(--content-width)',
  mx: 'auto',
  py: '64px',
  '& > header': { maxW: '700px', mb: '42px' },
  _mobile: { px: '16px', py: '32px' },
});

const finderStep = css({
  mb: '40px',
  pb: '32px',
  borderBottom: '1px solid #111',
  '& > span': { fontSize: '12px', fontWeight: '700' },
  '& h2': { my: '12px', mb: '24px', fontSize: '28px' },
});

const finderOptions = css({ display: 'flex', flexWrap: 'wrap', gap: '8px' });

const option = cva({
  base: { minW: '140px' },
  variants: { selected: { true: { bg: '#111', color: '#fff' }, false: {} } },
});

const activities = [
  ['road-running', '로드 러닝'],
  ['trail-running', '트레일 러닝'],
  ['walking', '워킹'],
  ['training', '트레이닝'],
] as const;

const cushioning = [
  ['max', '맥시 쿠셔닝'],
  ['balanced', '밸런스'],
  ['responsive', '반응성'],
] as const;

export function ShoeFinderPage() {
  const [activity, setActivity] = useState<(typeof activities)[number][0]>('road-running');
  const [feel, setFeel] = useState<(typeof cushioning)[number][0]>('balanced');

  return (
    <ContentLayout
      className={exploreLayout}
      breadcrumbItems={[
        { label: 'HOME', href: '/' },
        { label: 'EXPLORE', href: '/explore' },
        { label: 'SHOE FINDER' },
      ]}
      title="나에게 맞는 한 켤레 찾기"
      description="활동과 원하는 착화감을 고르면 다음 단계에서 추천 상품을 연결합니다."
    >
      <div className={finderStep}>
        <span>01 / ACTIVITY</span>
        <h2>어떤 움직임을 준비하고 있나요?</h2>
        <div className={finderOptions}>
          {activities.map(([value, label]) => (
            <Button
              className={option({ selected: activity === value })}
              key={value}
              onClick={() => setActivity(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div className={finderStep}>
        <span>02 / FEEL</span>
        <h2>어떤 착화감을 원하시나요?</h2>
        <div className={finderOptions}>
          {cushioning.map(([value, label]) => (
            <Button
              className={option({ selected: feel === value })}
              key={value}
              onClick={() => setFeel(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <Link
        className={css({
          display: 'inline-block',
          px: '22px',
          py: '13px',
          bg: '#111',
          color: '#fff',
        })}
        to={`/products?activity=${activity}&cushioning=${feel}`}
      >
        추천 상품 보기
      </Link>
    </ContentLayout>
  );
}
