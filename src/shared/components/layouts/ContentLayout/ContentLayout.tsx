'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { ContentHeader } from '@/shared/components/layouts/ContentLayout/ContentHeader';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';

const stickyHeaderStyle = css({
  position: 'sticky',
  top: 'var(--layout-site-header-height)',
  zIndex: 10,
  bg: 'var(--hoka-white)',
  pt: '24px',
  pb: '20px',
  _mobile: { position: 'static', pt: 0 },
});

type ContentLayoutProps = {
  children: ReactNode;
  className?: string;
  breadcrumbItems?: BreadcrumbItem[];
  title?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headerAction?: ReactNode;
  titleClassName?: string;
  contentWidth?: 'default' | 'narrow' | 'wide';
  stickyHeader?: boolean;
};

/** A page content frame with optional location and introductory content. */
export function ContentLayout({
  children,
  className,
  breadcrumbItems,
  title,
  description,
  eyebrow,
  headerAction,
  titleClassName,
  contentWidth = 'default',
  stickyHeader = false,
}: ContentLayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    if (!stickyHeader || !headerRef.current) return;

    const updateHeaderHeight = () => {
      setHeaderHeight(headerRef.current?.getBoundingClientRect().height ?? 0);
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, [stickyHeader]);

  const layoutStyle = {
    '--content-layout-header-height': `${headerHeight}px`,
  } as CSSProperties;

  return (
    <Stack as="main" className={className} gap="0" style={layoutStyle}>
      <div className={stickyHeader ? stickyHeaderStyle : undefined} ref={headerRef}>
        <ContentHeader
          breadcrumbItems={breadcrumbItems}
          description={description}
          eyebrow={eyebrow}
          headerAction={headerAction}
          title={title}
          titleClassName={titleClassName}
        />
      </div>
      <Box
        maxW={contentWidth === 'narrow' ? '760px' : contentWidth === 'wide' ? 'none' : undefined}
        minW="0"
      >
        {children}
      </Box>
    </Stack>
  );
}
