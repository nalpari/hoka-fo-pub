import type { ReactElement, ReactNode } from 'react';
import type { ButtonProps } from '@/shared/components/atoms/Button/Button';
import { usePlatform } from '@/shared/context/platform';
import { Drawer } from '@base-ui/react/drawer';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { BottomSheetContent } from '@/shared/components/layouts/BottomSheet/BottomSheetContent';
import { BottomSheetFooter } from '@/shared/components/layouts/BottomSheet/BottomSheetFooter';
import { BottomSheetHeader } from '@/shared/components/layouts/BottomSheet/BottomSheetHeader';

const backdrop = css({
  position: 'fixed',
  inset: '0',
  zIndex: '110',
  bg: 'color-mix(in srgb, var(--color-black-100) 48%, transparent)',
});

const viewport = css({
  position: 'fixed',
  inset: '0',
  zIndex: '110',
  display: 'flex',
  alignItems: 'flex-end',
});

const popup = css({
  w: '100%',
  minW: '0',
});

type BottomSheetProps = {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactElement<ButtonProps>;
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
  const platform = usePlatform();

  return (
    <Drawer.Root open onOpenChange={(open) => !open && onClose()} swipeDirection="down">
      <Drawer.Portal className={`platform-${platform}`}>
        <Drawer.Backdrop className={backdrop} />
        <Drawer.Viewport className={viewport}>
          <Drawer.Popup aria-label={ariaLabel} className={popup}>
            <Stack
              gap="0"
              maxH="calc(100dvh - 44px)"
              overflow="hidden"
              borderRadius="16px 16px 0 0"
              bg="var(--color-white-000)"
              boxShadow="0 -12px 32px color-mix(in srgb, var(--color-black-100) 18%, transparent)"
            >
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
