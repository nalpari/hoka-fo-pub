// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ReactNode } from 'react';
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
/** Summary metric layout for account, cart, order, and membership dashboards. */
declare function MetricGrid({
  items,
  tone,
  columns,
  className,
}: MetricGridProps): import('react').JSX.Element;
type AccountMetric = {
  label: string;
  value: string;
  detail?: string;
};
type Props = {
  metrics: AccountMetric[];
  tone?: 'neutral' | 'dark';
};
declare function AccountMetricPanel({ metrics, tone }: Props): import('react').JSX.Element;
/** 친구 추천 코드와 추천 실적을 표시합니다. (Displays the referral code and referral metrics.) */
export default function Page(): import('react').JSX.Element;
export {
  MetricGrid,
  type MetricGridItem,
  type MetricGridProps,
  AccountMetricPanel,
  type AccountMetric,
};
