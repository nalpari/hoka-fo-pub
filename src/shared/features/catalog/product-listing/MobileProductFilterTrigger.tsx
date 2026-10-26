import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type MobileProductFilterTriggerProps = {
  onClick: () => void;
  label?: string;
  appearance?: 'catalog' | 'search';
};

/** 목록과 검색 시안에 맞는 버튼으로 모바일 필터를 엽니다. (Opens mobile filters with the catalog or search presentation.) */
export function MobileProductFilterTrigger({
  onClick,
  label = '필터',
  appearance = 'catalog',
}: MobileProductFilterTriggerProps) {
  const isSearch = appearance === 'search';

  return (
    <Button
      aria-haspopup="dialog"
      icon={<Icon name="filter" size={isSearch ? 20 : undefined} />}
      onClick={onClick}
      variant="filterTrigger"
      size={isSearch ? 'regular' : 'compact'}
    >
      <Typography variant={isSearch ? 'cta1' : 'body4'}>{label}</Typography>
    </Button>
  );
}
