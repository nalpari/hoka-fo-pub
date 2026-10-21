import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { usePlatform } from '@/shared/context/platform';

type SearchDialogProps = {
  children: ReactNode;
  onClose: () => void;
  compact?: boolean;
  hasRecentSearches: boolean;
};

export function SearchDialog({
  children,
  onClose,
  compact = false,
  hasRecentSearches,
}: SearchDialogProps) {
  const platform = usePlatform();
  const panelRef = useRef<HTMLDivElement>(null);
  const [desktopHost, setDesktopHost] = useState<HTMLDivElement | null>(null);

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
  }, [platform, desktopHost]);

  if (platform === 'web') {
    return (
      <Dialog.Root
        open
        modal={false}
        onOpenChange={(open, details) => {
          if (open) return;
          const target =
            details.reason === 'focus-out' && details.event instanceof FocusEvent
              ? details.event.relatedTarget
              : details.event.target;
          if (
            (details.reason === 'outside-press' || details.reason === 'focus-out') &&
            target instanceof Element &&
            target.closest('#header-search-control')
          ) {
            details.cancel();
            return;
          }
          onClose();
        }}
      >
        <Box
          pos="fixed"
          inset="var(--layout-site-header-height) 0 0"
          zIndex="-1"
          bg="rgba(0, 0, 0, 0.2)"
          onClick={onClose}
        />
        <div ref={setDesktopHost}>
          {desktopHost ? (
            <Dialog.Portal container={desktopHost}>
              <Dialog.Popup
                ref={panelRef}
                id="site-search-panel"
                aria-label="검색"
                initialFocus={false}
                finalFocus={false}
                render={
                  <Box
                    pos="absolute"
                    top="100%"
                    right="var(--search-panel-right, max(var(--layout-web-content-gutter), calc((100% - var(--layout-web-content-max-width)) / 2)))"
                    w={compact ? '540px' : hasRecentSearches ? '1024px' : '544px'}
                    maxW="min(calc(100vw - 48px), calc(100% - var(--search-panel-right, 24px) - 24px))"
                    maxH="calc(100dvh - var(--layout-site-header-height))"
                    overflowY="auto"
                    bg="white.0"
                    zIndex="1"
                  />
                }
              >
                {children}
              </Dialog.Popup>
            </Dialog.Portal>
          ) : null}
        </div>
      </Dialog.Root>
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
