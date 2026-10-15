import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

const dialog = css({
  w: '100%',
  minH: '520px',
  bg: 'var(--color-white-000)',
  _mobile: { minH: '100%' },
});

const backdrop = css({
  position: 'fixed',
  inset: '0',
  zIndex: '100',
  bg: 'color-mix(in srgb, var(--color-black-100) 72%, transparent)',
});

const viewport = css({ position: 'fixed', inset: '0', zIndex: '100', overflowY: 'auto' });

type SearchDialogProps = { children: ReactNode; onClose: () => void };

export function SearchDialog({ children, onClose }: SearchDialogProps) {
  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className={backdrop} />
        <Dialog.Viewport className={viewport}>
          <Dialog.Popup aria-labelledby="site-search-title" className={dialog}>
            <Box
              w="min(100% - 48px, 820px)"
              mx="auto"
              pt="26px"
              pb="20"
              _mobile={{ w: 'min(100% - 32px, 820px)', pt: '4' }}
            >
              {children}
            </Box>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
