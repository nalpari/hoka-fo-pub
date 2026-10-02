import type { ReactNode } from 'react';
import { Drawer } from '@base-ui/react/drawer';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { BottomSheetContent } from '@/shared/components/layouts/BottomSheet/BottomSheetContent';
import { BottomSheetFooter } from '@/shared/components/layouts/BottomSheet/BottomSheetFooter';
import { BottomSheetHeader } from '@/shared/components/layouts/BottomSheet/BottomSheetHeader';

const sheet = css({
  maxH: 'calc(100dvh - 56px)',
  borderRadius: '16px 16px 0 0',
  bg: '#fff',
  boxShadow: '0 -12px 32px rgba(0, 0, 0, 0.18)',
});

const backdrop = css({ position: 'fixed', inset: '0', zIndex: '110', bg: 'rgba(0, 0, 0, 0.48)' });

const viewport = css({
  position: 'fixed',
  inset: '0',
  zIndex: '110',
  display: 'flex',
  alignItems: 'flex-end',
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
  return (
    <Drawer.Root open onOpenChange={(open) => !open && onClose()} swipeDirection="down">
      <Drawer.Portal>
        <Drawer.Backdrop className={backdrop} />
        <Drawer.Viewport className={viewport}>
          <Drawer.Popup aria-label={ariaLabel}>
            <Stack className={sheet}>
              <BottomSheetHeader action={headerAction} onClose={onClose} title={title} />
              <BottomSheetContent>{children}</BottomSheetContent>
              {footer && <BottomSheetFooter>{footer}</BottomSheetFooter>}
            </Stack>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
