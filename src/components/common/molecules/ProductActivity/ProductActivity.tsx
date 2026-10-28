import { Typography } from '@/components/common/atoms/Typography/Typography';

export type ProductActivityProps = {
  activities: readonly string[];
};

/** 상품의 활동 목적을 쉼표로 구분해 표시합니다. (Displays a product's activity labels as a comma-separated list.) */
export function ProductActivity({ activities }: ProductActivityProps) {
  return <Typography variant="body5">{activities.join(', ')}</Typography>;
}
