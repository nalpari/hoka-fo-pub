import type { ReactNode, RefObject } from 'react';
import { Drawer } from '@base-ui/react/drawer';
import { css } from 'styled-system/css';

const styles = {
  viewport: css({ position: 'fixed', inset: 0, zIndex: 100 }),
  backdrop: css({ position: 'fixed', inset: 0, zIndex: 100, bg: 'transparent' }),
  popup: css({
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    bg: 'var(--color-white-000)',
    color: 'var(--color-text-primary)',
  }),
};

type MenuDrawerFrameProps = {
  children: ReactNode;
  close: () => void;
  popupRef: RefObject<HTMLDivElement | null>;
  initialFocusRef: RefObject<HTMLButtonElement | null>;
};

export function MenuDrawerFrame({
  children,
  close,
  popupRef,
  initialFocusRef,
}: MenuDrawerFrameProps) {
  return (
    <Drawer.Root open onOpenChange={(open) => !open && close()} swipeDirection="left">
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.backdrop} />
        <Drawer.Viewport className={`${styles.viewport} platform-mobile`}>
          <Drawer.Popup
            ref={popupRef}
            initialFocus={initialFocusRef}
            aria-label="전체 메뉴"
            className={styles.popup}
          >
            {children}
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
