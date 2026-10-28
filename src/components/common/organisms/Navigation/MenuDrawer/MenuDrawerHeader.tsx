import type { RefObject } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';
import { HStack } from 'styled-system/jsx';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { HeaderAuthLink } from '@/components/common/organisms/Layout/SiteHeader/HeaderAuthLink';
import { faUser, faXmark } from '@/icons/fontAwesome';

const styles = {
  auth: hstack({ gap: '3', color: 'inherit', textDecoration: 'none' }),
  close: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
    cursor: 'pointer',
    '--icon-button-hover-bg': 'transparent',
    _focusVisible: { outline: '2px solid currentColor!', outlineOffset: '3px!' },
  }),
};

type MenuDrawerHeaderProps = {
  close: () => void;
  isLoggedIn: boolean;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export function MenuDrawerHeader({ close, isLoggedIn, closeButtonRef }: MenuDrawerHeaderProps) {
  return (
    <HStack
      gap="0"
      justifyContent="space-between"
      minH="58px"
      flexShrink={0}
      px="4"
      borderBottom="1px solid var(--color-black-10)"
    >
      {isLoggedIn ? (
        <Link className={styles.auth} href="/mypage" onClick={close}>
          <Icon fontAwesomeIcon={faUser} size="18px" aria-hidden="true" />
          <Typography variant="body3">마이페이지</Typography>
        </Link>
      ) : (
        <HStack gap="3">
          <Icon fontAwesomeIcon={faUser} size="18px" aria-hidden="true" />
          <HeaderAuthLink onNavigate={close} />
        </HStack>
      )}
      <IconButton
        ref={closeButtonRef}
        size={18}
        className={styles.close}
        aria-label="메뉴 닫기"
        onClick={close}
      >
        <Icon fontAwesomeIcon={faXmark} size="18px" aria-hidden="true" />
      </IconButton>
    </HStack>
  );
}
