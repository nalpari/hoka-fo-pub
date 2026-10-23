import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { faXmark } from '@/shared/icons/fontAwesome';

const header = css.raw({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minH: '14',
  px: '4',
  bg: 'var(--color-surface-subtle)',
  _mobile: {
    px: '4',
  },
});

const titleStyle = css({ height: '32px' });

/** 공통 모달의 제목과 닫기 영역을 표시합니다. (Displays the shared modal title and dismissal action.) */
export function ModalDialogHeader({
  title,
  closeLabel,
  css: styleOverrides,
}: {
  title: ReactNode;
  closeLabel: string;
  css?: SystemStyleObject;
}) {
  return (
    <header className={css(header, styleOverrides)}>
      <Dialog.Title className={titleStyle}>
        <Typography variant="body3">{title}</Typography>
      </Dialog.Title>
      <Dialog.Close
        render={
          <Button
            aria-label={closeLabel}
            icon={<Icon fontAwesomeIcon={faXmark} size="16px" />}
            variant="ghost"
          />
        }
      />
    </header>
  );
}
