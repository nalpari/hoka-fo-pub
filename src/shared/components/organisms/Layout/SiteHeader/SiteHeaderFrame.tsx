import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const frame = css({ position: 'sticky', top: 0, zIndex: 20 });

/** Keep the header and its expanded menu in the same sticky hover region. */
export function SiteHeaderFrame({
  children,
  onLeave,
}: {
  children: ReactNode;
  onLeave: () => void;
}) {
  return (
    <div className={frame} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
