import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

type MobileProductFilterTriggerProps = {
  onClick: () => void;
};

/** Opens the mobile product filter sheet. */
export function MobileProductFilterTrigger({ onClick }: MobileProductFilterTriggerProps) {
  return (
    <Button
      aria-haspopup="dialog"
      icon={<Icon name="filter" />}
      onClick={onClick}
      variant="filterTrigger"
    >
      필터
    </Button>
  );
}
