import { useEffect, type ReactNode } from 'react';
import { css } from 'styled-system/css';

const backdrop = css({
  position: 'fixed',
  inset: '0',
  zIndex: '110',
  display: 'flex',
  alignItems: 'flex-end',
  bg: 'rgba(0, 0, 0, 0.48)',
});

const sheet = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxH: 'calc(100dvh - 56px)',
  borderRadius: '16px 16px 0 0',
  bg: '#fff',
  boxShadow: '0 -12px 32px rgba(0, 0, 0, 0.18)',
});

const header = css({
  display: 'flex',
  flexShrink: '0',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: '20px',
  py: '18px',
  borderBottom: '1px solid var(--line)',
});

const headerActions = css({ display: 'flex', alignItems: 'center', gap: '8px' });

const closeButton = css({
  display: 'grid',
  placeItems: 'center',
  w: '36px',
  h: '36px',
  border: '0',
  bg: 'transparent',
  fontSize: '32px',
  lineHeight: '1',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid #000', outlineOffset: '2px' },
});

const content = css({ overflowY: 'auto' });

const footerStyle = css({
  flexShrink: '0',
  p: '16px 20px calc(16px + env(safe-area-inset-bottom))',
  borderTop: '1px solid var(--line)',
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
    <div className={backdrop} onMouseDown={onClose}>
      <section
        className={sheet}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={header}>
          <h2>{title}</h2>
          <div className={headerActions}>
            {headerAction}
            <button type="button" className={closeButton} aria-label="닫기" onClick={onClose}>
              ×
            </button>
          </div>
        </header>
        <div className={content}>{children}</div>
        {footer && <footer className={footerStyle}>{footer}</footer>}
      </section>
    </div>
  );
}
