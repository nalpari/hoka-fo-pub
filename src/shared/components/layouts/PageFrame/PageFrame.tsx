import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/shared/components/molecules/Breadcrumb/Breadcrumb';

type PageFrameProps = {
  breadcrumbItems?: BreadcrumbItem[];
  children: ReactNode;
};

/** Shared page width, breadcrumb region, and responsive content gutters. */
export function PageFrame({ breadcrumbItems, children }: PageFrameProps) {
  return (
    <Box
      as="main"
      w="min(calc(100% - var(--layout-web-content-inline-space)), 1532px)"
      mx="auto"
      pb="24"
      _mobile={{ w: '100%', px: '4', pb: '10' }}
    >
      {breadcrumbItems && breadcrumbItems.length > 0 ? (
        <Box h="14" pt="6" pb="2">
          <Breadcrumb items={breadcrumbItems} />
        </Box>
      ) : null}
      <Box w="1200px" maxW="100%" mx="auto" px="34px" _mobile={{ px: '0' }}>
        {children}
      </Box>
    </Box>
  );
}
