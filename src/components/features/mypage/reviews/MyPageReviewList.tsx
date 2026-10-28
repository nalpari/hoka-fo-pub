import { Stack } from 'styled-system/jsx';
import { MyPageReviewItem } from './MyPageReviewItem';
import type { ReviewListEntry, ReviewTab } from './reviews.types';

type Props = {
  entries: readonly ReviewListEntry[];
  tab: ReviewTab;
  onEdit: (id: number) => void;
};

export function MyPageReviewList({ entries, tab, onEdit }: Props) {
  return (
    <Stack gap="0">
      {entries.map((entry) => (
        <MyPageReviewItem key={entry.id} entry={entry} tab={tab} onEdit={onEdit} />
      ))}
    </Stack>
  );
}
