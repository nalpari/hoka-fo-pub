import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type ProductActivityProps = {
  activities: readonly string[];
};

/** Product activity labels, displayed as a comma-separated list. */
export function ProductActivity({ activities }: ProductActivityProps) {
  return <Typography variant="meta">{activities.join(', ')}</Typography>;
}
