import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { usePlatform } from '@/shared/context/platform';

type SearchDialogProps = { children: ReactNode; onClose: () => void; compact?: boolean };

export function SearchDialog({ children, onClose, compact = false }: SearchDialogProps) {
  const platform = usePlatform();
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (platform !== 'web') return;
    const panel = panelRef.current;
    const frame = panel?.offsetParent;
    const anchor = frame?.querySelector<HTMLElement>('[data-search-panel-anchor]');
    if (!panel || !frame || !anchor) return;

    const alignToCart = () => {
      const right = frame.getBoundingClientRect().right - anchor.getBoundingClientRect().right;
      panel.style.setProperty('--search-panel-right', `${right}px`);
    };

    alignToCart();
    const observer = new ResizeObserver(alignToCart);
    observer.observe(frame);
    observer.observe(anchor);
    const tools = anchor.parentElement;
    if (tools) observer.observe(tools);
    window.addEventListener('resize', alignToCart);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', alignToCart);
    };
  }, [platform]);

  useEffect(() => {
    if (platform !== 'web') return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const closeOutside = (event: PointerEvent | FocusEvent) => {
      const target = event.target as HTMLElement;
      if (panelRef.current?.contains(target) || target.closest('#header-search-control')) return;
      onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
    };
  }, [platform, onClose]);

  if (platform === 'web') {
    return (
      <>
        <Box
          pos="fixed"
          inset="var(--layout-site-header-height) 0 0"
          zIndex="-1"
          bg="rgba(0, 0, 0, 0.2)"
          onClick={onClose}
        />
        <Box
          ref={panelRef}
          id="site-search-panel"
          role="dialog"
          aria-label="검색"
          pos="absolute"
          top="100%"
          right="var(--search-panel-right, max(var(--layout-web-content-gutter), calc((100% - var(--layout-web-content-max-width)) / 2)))"
          w={compact ? '540px' : '1020px'}
          maxW="min(calc(100vw - 48px), calc(100% - var(--search-panel-right, 24px) - 24px))"
          maxH="calc(100dvh - var(--layout-site-header-height))"
          overflowY="auto"
          bg="white.0"
          zIndex="1"
        >
          {children}
        </Box>
      </>
    );
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={css({ pos: 'fixed', inset: '0', zIndex: '100', bg: 'rgba(0, 0, 0, 0.2)' })}
        />
        <Dialog.Popup
          id="site-search-panel"
          aria-label="검색"
          className={css({
            pos: 'fixed',
            inset: '0',
            zIndex: '100',
            bg: 'white.0',
            overflowY: 'auto',
          })}
        >
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
