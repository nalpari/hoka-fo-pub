import { MetricGrid } from '@/shared/components/molecules/MetricGrid/MetricGrid';

export type AccountMetric = { label: string; value: string; detail?: string };

type Props = { metrics: AccountMetric[]; tone?: 'neutral' | 'dark' };

export function AccountMetricPanel({ metrics, tone = 'neutral' }: Props) {
  return <MetricGrid items={metrics.map((item) => ({ ...item, id: item.label }))} tone={tone} />;
}
