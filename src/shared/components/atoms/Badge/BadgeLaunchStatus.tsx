import { Badge } from './Badge';

export type LaunchStatus = 'COMING' | 'IN_STOCK';

export type BadgeLaunchStatusProps = {
  className?: string;
  status: LaunchStatus;
};

/** Product launch status badge with its matching label and tone. */
export function BadgeLaunchStatus({ className, status }: BadgeLaunchStatusProps) {
  return (
    <Badge className={className} tone={status === 'COMING' ? 'danger' : 'neutral'}>
      {status === 'COMING' ? 'COMING SOON' : 'IN STOCK'}
    </Badge>
  );
}
