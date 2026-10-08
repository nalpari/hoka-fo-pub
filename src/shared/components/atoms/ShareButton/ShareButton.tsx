import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton, type IconButtonProps } from '@/shared/components/atoms/IconButton/IconButton';
import { usePlatform } from '@/shared/context/platform';

export type ShareButtonProps = Omit<IconButtonProps, 'children'>;

/** Reusable share action with a platform-sized icon. */
export function ShareButton({
  'aria-label': ariaLabel = '공유하기',
  size = '38px',
  ...props
}: ShareButtonProps) {
  const platform = usePlatform();

  return (
    <IconButton {...props} aria-label={ariaLabel} size={size}>
      <Icon
        name="action/fa-arrow-up-from-bracket"
        color="currentColor"
        size={platform === 'mobile' ? '19px' : '24px'}
      />
    </IconButton>
  );
}
