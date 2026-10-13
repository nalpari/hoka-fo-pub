import {
  Button,
  type ButtonProps,
  type ButtonSizingProps,
} from '@/shared/components/atoms/Button/Button';

export type LoadMoreButtonProps = Omit<ButtonProps, 'children' | 'variant' | 'size'> &
  ButtonSizingProps & {
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
