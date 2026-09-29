import { css } from 'styled-system/css';

const activity = css({ fontSize: '14px' });

export type ProductActivityProps = {
  activities: readonly string[];
};

/** Product activity labels, displayed as a comma-separated list. */
export function ProductActivity({ activities }: ProductActivityProps) {
  return <span className={activity}>{activities.join(', ')}</span>;
}
