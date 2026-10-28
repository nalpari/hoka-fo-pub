import { SegmentedControl } from '@/components/common/atoms/SegmentedControl/SegmentedControl';
import type { ReviewTab } from './reviews.types';

type Props = { value: ReviewTab; onChange: (value: ReviewTab) => void };

export function MyPageReviewTabs({ value, onChange }: Props) {
  return (
    <SegmentedControl
      ariaLabel="상품리뷰 구분"
      onValueChange={onChange}
      options={[
        { value: 'ready', label: '작성 가능한 리뷰' },
        { value: 'written', label: '내가 작성한 리뷰' },
      ]}
      variant="underline"
      value={value}
    />
  );
}
