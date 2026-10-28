import type { RefObject } from 'react';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { faChevronRight } from '@/icons/fontAwesome';

const styles = {
  button: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    w: '100%!',
    mb: '1px',
    py: '4',
    px: 0,
    textDecoration: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    '--icon-button-hover-bg': 'transparent',
    _focusVisible: { outline: '2px solid currentColor!', outlineOffset: '3px!' },
  }),
  backIcon: css({ transform: 'rotate(180deg)' }),
};

type MenuDrawerBackButtonProps = {
  label: string;
  onBack: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export function MenuDrawerBackButton({ label, onBack, buttonRef }: MenuDrawerBackButtonProps) {
  return (
    <IconButton
      ref={buttonRef}
      size="auto"
      className={styles.button}
      onClick={onBack}
      aria-label={label + ', 전체 메뉴로 돌아가기'}
    >
      <Flex alignItems="center" justifyContent="flex-start" gap="12px">
        <Icon
          className={styles.backIcon}
          fontAwesomeIcon={faChevronRight}
          size="14px"
          aria-hidden="true"
        />
        <Typography variant="heading5">{label}</Typography>
      </Flex>
    </IconButton>
  );
}
