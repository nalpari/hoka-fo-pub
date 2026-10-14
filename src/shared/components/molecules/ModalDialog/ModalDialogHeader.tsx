import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { faXmark } from '@/shared/icons/fontAwesome';

const header = css({
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

/** Internal title and dismissal region, rendered within the parent Dialog context. */
export function ModalDialogHeader({ title, closeLabel }: { title: ReactNode; closeLabel: string }) {
  return (
    <header className={header}>
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
