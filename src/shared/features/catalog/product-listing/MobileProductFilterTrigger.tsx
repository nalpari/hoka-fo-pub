import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';

type MobileProductFilterTriggerProps = {
  onClick: () => void;
  label?: string;
  iconOnly?: boolean;
};

/** Opens the mobile product filter sheet. */
export function MobileProductFilterTrigger({
  onClick,
  label = '필터',
  iconOnly = false,
}: MobileProductFilterTriggerProps) {
  if (iconOnly) {
    return (
      <IconButton aria-label="필터 및 정렬" aria-haspopup="dialog" onClick={onClick}>
        <Icon name="filter" size="24px" />
      </IconButton>
    );
  }

  return (
    <Button
      aria-haspopup="dialog"
      icon={<Icon name="filter" />}
      onClick={onClick}
      variant="filterTrigger"
    >
      <Typography variant="body4">{label}</Typography>
    </Button>
  );
}
