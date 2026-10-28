import { HStack } from 'styled-system/jsx';
import { MyPageReviewSort } from './MyPageReviewSort';
import { MyPageReviewCount } from './MyPageReviewCount';

type Props = { count: number; sort: string; onSortChange: (value: string) => void };

export function MyPageReviewToolbar({ count, sort, onSortChange }: Props) {
  return (
    <HStack justifyContent="space-between" alignItems="center" pb="4">
      <MyPageReviewSort sort={sort} onSortChange={onSortChange} />
      <MyPageReviewCount count={count} />
    </HStack>
  );
}
