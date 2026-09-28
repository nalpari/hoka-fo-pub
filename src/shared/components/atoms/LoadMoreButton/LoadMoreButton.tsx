import type { ComponentPropsWithoutRef } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';

export type LoadMoreButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, 'children'> & {
  remaining: number;
  label?: string;
};

/** Paginated-list action that consistently announces the number of items still available. */
export function LoadMoreButton({ remaining, label = '더보기', ...props }: LoadMoreButtonProps) {
  return (
    <Button {...props}>
      {label} ({remaining}) ⌄
    </Button>
  );
}
