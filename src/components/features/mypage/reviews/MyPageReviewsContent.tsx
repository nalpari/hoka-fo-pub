import { Divider } from '@/components/common/atoms/Divider/Divider';
import { Box, Stack } from 'styled-system/jsx';
import { EmptyState } from '@/components/common/atoms/EmptyState/EmptyState';
import { MyPageReviewTabs } from './MyPageReviewTabs';
import { MyPageReviewToolbar } from './MyPageReviewToolbar';
import { MyPageReviewList } from './MyPageReviewList';
import { MyPageReviewLoadMore } from './MyPageReviewLoadMore';
import type { ReviewListEntry, ReviewTab } from './reviews.types';

type Props = {
  tab: ReviewTab;
  sort: string;
  totalCount: number;
  visibleCount: number;
  entries: readonly ReviewListEntry[];
  hasMore: boolean;
  onTabChange: (value: ReviewTab) => void;
  onSortChange: (value: string) => void;
  onEdit: (id: number) => void;
  onLoadMore: () => void;
};

export function MyPageReviewsContent({
  tab,
  sort,
  totalCount,
  visibleCount,
  entries,
  hasMore,
  onTabChange,
  onSortChange,
  onEdit,
  onLoadMore,
}: Props) {
  return (
    <Stack gap="0" pb="16">
      <MyPageReviewTabs value={tab} onChange={onTabChange} />
      {totalCount ? (
        <Box px="4" pt="8">
          <MyPageReviewToolbar count={totalCount} sort={sort} onSortChange={onSortChange} />
          <Divider variant="strong" />
          <MyPageReviewList entries={entries} tab={tab} onEdit={onEdit} />
          {hasMore ? (
            <MyPageReviewLoadMore
              visibleCount={visibleCount}
              totalCount={totalCount}
              onLoadMore={onLoadMore}
            />
          ) : null}
        </Box>
      ) : (
        <EmptyState title="작성한 리뷰가 없습니다." variant="minimal" />
      )}
    </Stack>
  );
}
