import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

const stickyFilterPanel = css({
  position: 'sticky',
  top: 'calc(var(--layout-site-header-height) + var(--content-layout-header-height))',
  alignSelf: 'start',
  maxH: 'calc(100dvh - var(--layout-site-header-height) - var(--content-layout-header-height))',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
});

type DesktopProductFilterProps = {
  children: ReactNode;
};

/** Desktop-only sticky container for the product listing filter. */
export function DesktopProductFilter({ children }: DesktopProductFilterProps) {
  return <Box className={stickyFilterPanel}>{children}</Box>;
}
