'use client';

import { useContext } from 'react';
import { type ReactNode } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';

import { cva } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout';

import { myPageNavigation } from '@/components/mypage/mypage.data';

type MetricGridItem = {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  id?: string;
};

type MetricGridProps = {
  items: MetricGridItem[];
  tone?: 'neutral' | 'dark';
  columns?: 2 | 3 | 4;
  className?: string;
};

const grid = cva({
  base: {
    display: 'grid',
    bg: 'var(--color-surface-muted)',
    _mobile: {
      gridTemplateColumns: '1fr',
    },
  },
  variants: {
    columns: {
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      4: { gridTemplateColumns: 'repeat(4, 1fr)' },
    },
    tone: {
      neutral: {},
      dark: {
        bg: 'var(--color-black-100)',
        '&&': {
          color: 'var(--color-text-inverse)',
        },
      },
    },
  },
  defaultVariants: { columns: 3, tone: 'neutral' },
});

/** Summary metric layout for account, cart, order, and membership dashboards. */
function MetricGrid({ items, tone, columns, className }: MetricGridProps) {
  return (
    <section className={[grid({ tone, columns }), className].filter(Boolean).join(' ')}>
      {items.map((item, index) => (
        <Grid
          as="article"
          gap="2"
          minH="138px"
          alignContent="center"
          px="7"
          borderRight="1px solid var(--color-border-subtle)"
          _mobile={{
            borderRight: '0',
            borderBottom: '1px solid var(--color-border-subtle)',
            '&:last-child': {
              borderBottom: '0',
            },
          }}
          css={{
            '&:last-child': {
              borderRight: '0',
            },
          }}
          key={item.id ?? index}
        >
          <Typography variant="body5" tone="tertiary">
            {item.label}
          </Typography>
          <Typography as="strong" variant="heading7">
            {item.value}
          </Typography>
          {item.detail ? (
            <Typography as="small" variant="body5">
              {item.detail}
            </Typography>
          ) : null}
        </Grid>
      ))}
    </section>
  );
}

type AccountMetric = { label: string; value: string; detail?: string };

type Props = { metrics: AccountMetric[]; tone?: 'neutral' | 'dark' };

function AccountMetricPanel({ metrics, tone = 'neutral' }: Props) {
  return <MetricGrid items={metrics.map((item) => ({ ...item, id: item.label }))} tone={tone} />;
}

/** 친구 추천 코드와 추천 실적을 표시합니다. (Displays the referral code and referral metrics.) */
export function RouteContent() {
  const binding = useContext(MyPageDataContext).overview;
  const summary = binding?.item;
  return (
    <SidebarNavigationLayout
      activePath="/mypage/referral"
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <ContentSection
        gap="6"
        title={<>친구 추천</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <BindingFeedback {...binding} />
        <AccountMetricPanel
          tone="dark"
          metrics={[
            {
              label: '나의 추천 코드',
              value: binding ? (summary?.referralCode ?? '') : 'HOKA-2026',
            },
            { label: '추천 완료', value: binding ? `${summary?.referralCount ?? 0}명` : '0명' },
            { label: '적립 리워드', value: binding ? (summary?.referralRewards ?? '') : '0P' },
          ]}
        />
      </ContentSection>
    </SidebarNavigationLayout>
  );
}

export const routePreviewComponents = { MetricGrid } satisfies Pick<
  typeof import('@/types/component-contracts/app-mypage-referral-page'),
  'MetricGrid'
>;
