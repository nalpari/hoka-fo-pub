import { useEffect, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Backdrop } from '@/shared/components/atoms/Backdrop/Backdrop';
import { BottomSheetContent } from '@/shared/components/layouts/BottomSheet/BottomSheetContent';
import { BottomSheetFooter } from '@/shared/components/layouts/BottomSheet/BottomSheetFooter';
import { BottomSheetHeader } from '@/shared/components/layouts/BottomSheet/BottomSheetHeader';

const sheet = css({
  maxH: 'calc(100dvh - 56px)',
  borderRadius: '16px 16px 0 0',
  bg: '#fff',
  boxShadow: '0 -12px 32px rgba(0, 0, 0, 0.18)',
});

type BottomSheetProps = {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  headerAction?: ReactNode;
  ariaLabel?: string;
};

/** A modal sheet anchored to the viewport bottom for mobile workflows. */
export function BottomSheet({
  title,
  children,
  onClose,
  footer,
  headerAction,
  ariaLabel,
}: BottomSheetProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <Backdrop layer="sheet" onClose={onClose} placement="bottom" tone="black48">
      <Stack
        as="section"
        className={sheet}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <BottomSheetHeader action={headerAction} onClose={onClose} title={title} />
        <BottomSheetContent>{children}</BottomSheetContent>
        {footer && <BottomSheetFooter>{footer}</BottomSheetFooter>}
      </Stack>
    </Backdrop>
  );
}
