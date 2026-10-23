import { Badge } from './Badge';

export type LaunchStatus = 'COMING' | 'IN_STOCK';

export type BadgeLaunchStatusProps = {
  className?: string;
  status: LaunchStatus;
};

/** 출시 상태와 어울리는 배지 라벨을 표시합니다. (Shows the label for a product launch status.) */
export function BadgeLaunchStatus({ className, status }: BadgeLaunchStatusProps) {
  return (
    <Badge className={className} variant={status === 'COMING' ? 'line' : 'filled'}>
      {status === 'COMING' ? 'COMING SOON' : 'IN STOCK'}
    </Badge>
  );
}
