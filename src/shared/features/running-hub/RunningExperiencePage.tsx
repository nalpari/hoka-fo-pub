import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { css, cva } from 'styled-system/css';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { AccountDataList } from '@/shared/components/organisms/Account/AccountDataList';
import { AccountMetricPanel } from '@/shared/components/organisms/Account/AccountMetricPanel';
import { Button } from '@/shared/components/atoms/Button/Button';
import { products } from '@/mocks/products';

export type RunningExperienceKind =
  'shoe-finder' | 'rewards' | 'reviews' | 'alerts' | 'rotation' | 'plans' | 'store-experience';

const page = css({
  maxW: '1100px',
  mx: 'auto',
  py: '70px',
  _mobile: { px: 'var(--layout-mobile-inline-gutter)', py: '38px' },
});
const panel = css({ mt: '30px', p: '8', bg: 'var(--color-surface-muted)', _mobile: { p: '5' } });
const optionGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2.5',
  mt: '22px',
  _mobile: { gridTemplateColumns: '1fr' },
});
const option = cva({
  base: {
    minH: '16',
    border: '1px solid var(--color-black-40)',
    bg: 'var(--color-white-000)',
    fontSize: '14',
  },
  variants: {
    active: {
      true: {
        bg: 'var(--color-black-100)',
        color: 'var(--color-white-000)',
        borderColor: 'var(--color-black-100)',
      },
      false: {},
    },
  },
});
const productGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '18px',
  mt: '7',
  _mobile: { gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5' },
});
const tabs = css({ display: 'flex', gap: '2', flexWrap: 'wrap', mt: '6' });
const tab = cva({
  base: {
    px: '4',
    py: '9px',
    border: '1px solid var(--color-black-40)',
    bg: 'var(--color-white-000)',
    fontSize: '14' /* 기존 13px */,
  },
  variants: {
    active: {
      true: {
        bg: 'var(--color-black-100)',
        color: 'var(--color-white-000)',
        borderColor: 'var(--color-black-100)',
      },
      false: {},
    },
  },
});
const timeline = css({
  display: 'grid',
  gap: '0',
  mt: '26px',
  borderTop: '2px solid var(--color-black-100)',
});
const timelineItem = css({
  display: 'grid',
  gridTemplateColumns: '100px 1fr auto',
  gap: '5',
  alignItems: 'center',
  minH: '74px',
  borderBottom: '1px solid var(--color-border-subtle)',
  _mobile: {
    gridTemplateColumns: '1fr auto',
    '& time': { gridColumn: '1 / -1', color: 'var(--color-text-muted)' },
  },
});
const action = css({
  mt: '6',
  px: '18px',
  py: '3',
  bg: 'var(--color-black-100)',
  color: 'var(--color-white-000)',
});

const copy: Record<RunningExperienceKind, { title: string; description: string }> = {
  'shoe-finder': {
    title: 'Shoe Finder',
    description: '러닝 목적과 착화감에 맞는 HOKA를 찾아보세요.',
  },
  rewards: {
    title: 'HOKA 리워드',
    description: '적립, 사용, 소멸 예정 리워드를 한 번에 확인하세요.',
  },
  reviews: {
    title: '리뷰 리워드',
    description: '구매한 제품의 경험을 공유하고 리워드를 받으세요.',
  },
  alerts: {
    title: '런칭 · 재입고 알림',
    description: '관심 제품의 런칭 일정과 재입고 알림을 관리하세요.',
  },
  rotation: {
    title: '나의 러닝화 로테이션',
    description: '러닝 목적별 신발을 비교하고 다음 러닝을 준비하세요.',
  },
  plans: { title: '러닝 플랜', description: '목표 거리와 레벨에 맞는 훈련 계획을 시작하세요.' },
  'store-experience': {
    title: '매장 피팅 · 체험',
    description: '전문 피팅과 HOKA 커뮤니티 이벤트를 예약하세요.',
  },
};

export function RunningExperiencePage({ kind }: { kind: RunningExperienceKind }) {
  const [selection, setSelection] = useState('데일리 러닝');
  const [tabName, setTabName] = useState('전체');
  const recommendation = useMemo(
    () => products.slice(selection === '트레일 러닝' ? 3 : 0, selection === '트레일 러닝' ? 6 : 3),
    [selection],
  );
  const header = copy[kind];
  return (
    <main className={page}>
      <PageHeader
        title={header.title}
        description={header.description}
        action={<Link to="/mypage">MY HOKA →</Link>}
      />
      {kind === 'shoe-finder' ? (
        <>
          <section className={panel}>
            <strong>어떤 러닝을 준비하고 있나요?</strong>
            <div className={optionGrid}>
              {['데일리 러닝', '스피드 훈련', '트레일 러닝'].map((value) => (
                <Button
                  key={value}
                  className={option({ active: selection === value })}
                  onClick={() => setSelection(value)}
                  type="button"
                >
                  {value}
                </Button>
              ))}
            </div>
          </section>
          <section className={productGrid}>
            {recommendation.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </>
      ) : null}
      {kind === 'rewards' ? (
        <>
          <AccountMetricPanel
            metrics={[
              { label: '사용 가능 리워드', value: '2,400P' },
              { label: '소멸 예정', value: '500P', detail: '2026.12.31' },
              { label: '이번 달 적립', value: '1,000P' },
            ]}
          />
          <div className={tabs}>
            {['전체', '적립', '사용', '소멸 예정'].map((value) => (
              <Button
                key={value}
                className={tab({ active: tabName === value })}
                onClick={() => setTabName(value)}
                type="button"
              >
                {value}
              </Button>
            ))}
          </div>
          <AccountDataList
            rows={[
              { label: '2026.09.12', value: 'Mach 6 포토 리뷰', status: '+1,000P' },
              { label: '2026.09.04', value: '주문 결제 사용', status: '-500P' },
            ]}
          />
        </>
      ) : null}
      {kind === 'reviews' ? (
        <>
          <AccountMetricPanel
            metrics={[
              { label: '작성 가능', value: '1건' },
              { label: '작성 완료', value: '4건' },
              { label: '예상 리워드', value: '1,000P' },
            ]}
          />
          <AccountDataList
            rows={[
              { label: 'Mach 6', value: '포토 리뷰를 작성해 주세요.', status: '작성하기' },
              { label: 'Clifton 10', value: '스타일 리뷰 작성 완료', status: '+2,000P' },
            ]}
          />
        </>
      ) : null}
      {kind === 'alerts' ? (
        <>
          <div className={tabs}>
            {['전체', '런칭', '재입고'].map((value) => (
              <Button
                key={value}
                className={tab({ active: tabName === value })}
                onClick={() => setTabName(value)}
                type="button"
              >
                {value}
              </Button>
            ))}
          </div>
          <section className={timeline}>
            {[
              ['2026.10.02', 'Cielo X1 2.0', '런칭 알림 신청'],
              ['2026.09.27', 'Mafate Speed 4 · 250', '재입고 알림 켜짐'],
            ].map(([date, name, status]) => (
              <article className={timelineItem} key={name}>
                <time>{date}</time>
                <strong>{name}</strong>
                <Button size="sm">{status}</Button>
              </article>
            ))}
          </section>
        </>
      ) : null}
      {kind === 'rotation' ? (
        <>
          <AccountMetricPanel
            metrics={[
              { label: '데일리', value: 'Clifton 10' },
              { label: '스피드', value: 'Mach 6' },
              { label: '트레일', value: 'Mafate Speed 4' },
            ]}
          />
          <section className={productGrid}>
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </>
      ) : null}
      {kind === 'plans' ? (
        <section className={timeline}>
          {[
            ['01주차', '기초 거리 만들기', '주 3회 · Easy run'],
            ['02주차', '지속주와 회복', '주 4회 · Tempo'],
            ['03주차', '레이스 페이스', '주 4회 · Long run'],
          ].map(([week, name, detail]) => (
            <article className={timelineItem} key={week}>
              <time>{week}</time>
              <strong>{name}</strong>
              <span>{detail}</span>
            </article>
          ))}
        </section>
      ) : null}
      {kind === 'store-experience' ? (
        <>
          <section className={panel}>
            <strong>HOKA FIT SESSION</strong>
            <p>발 측정, 러닝 목적 상담, 추천 모델 시착을 한 번에 경험하세요.</p>
            <Button className={action}>피팅 예약하기</Button>
          </section>
          <section className={timeline}>
            {[
              ['2026.09.27', '서울 강남', 'Trail Try-on Run'],
              ['2026.10.04', '서울 성수', 'Mach Speed Session'],
            ].map(([date, place, event]) => (
              <article className={timelineItem} key={event}>
                <time>{date}</time>
                <strong>{event}</strong>
                <span>{place}</span>
              </article>
            ))}
          </section>
        </>
      ) : null}
    </main>
  );
}
