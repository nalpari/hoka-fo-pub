import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
      <Typography variant="body4">필터</Typography>
    </Button>
  );
}
