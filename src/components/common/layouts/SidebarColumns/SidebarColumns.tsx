import type { ComponentProps, ReactNode } from 'react';
import { Grid } from 'styled-system/jsx';

type Props = Omit<ComponentProps<typeof Grid>, 'children' | 'gridTemplateColumns'> & {
  sidebar: ReactNode;
  sidebarWidth: '180px' | '190px';
  children: ReactNode;
};

/** Two desktop columns that return to normal document flow on mobile, without a body wrapper. */
export function SidebarColumns({ sidebar, sidebarWidth, children, gap = '50px', ...props }: Props) {
  return (
    <Grid
      {...props}
      gridTemplateColumns={
        sidebarWidth === '190px' ? '190px minmax(0, 1fr)' : '180px minmax(0, 1fr)'
      }
      gap={gap}
      _mobile={{ ...props._mobile, display: 'block' }}
    >
      {sidebar}
      {children}
    </Grid>
  );
}
