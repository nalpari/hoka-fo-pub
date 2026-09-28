import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';

const button = css({
  order: 2,
  p: 0,
  border: 0,
  bg: 'transparent',
  color: 'var(--hoka-black)',
  lineHeight: 1,
});

type HeaderMobileMenuButtonProps = {
  onClick: () => void;
};

export function HeaderMobileMenuButton({ onClick }: HeaderMobileMenuButtonProps) {
  const platform = usePlatform();

  if (platform !== 'mobile') return null;

  return (
    <IconButton className={button} size="32px" onClick={onClick} aria-label="전체 메뉴">
      <Icon src="/images/header/m-menu.svg" size="20px" alt="" />
    </IconButton>
  );
}
