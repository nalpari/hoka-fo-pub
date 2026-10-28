'use client';

import { type ReactNode, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Stack, Box } from 'styled-system/jsx';
import { SectionHeader } from '@/components/common/atoms/SectionHeader/SectionHeader';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/common/molecules/Breadcrumb/Breadcrumb';
import { css } from 'styled-system/css';

type ContentHeaderProps = {
  breadcrumbItems?: BreadcrumbItem[];
  title?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headerAction?: ReactNode;
  titleClassName?: string;
};

/** 경로 안내와 제목·보조 콘텐츠를 배치합니다 (Reusable page introductory header with optional breadcrumb and supporting content). */
function ContentHeader({
  breadcrumbItems,
  title,
  description,
  eyebrow,
  headerAction,
  titleClassName,
}: ContentHeaderProps) {
  const hasIntro = breadcrumbItems?.length || title || description;

  if (!hasIntro) {
    return null;
  }

  return (
    <Stack as="header" gap={{ base: '24px', _mobile: '10px' }}>
      {breadcrumbItems?.length ? <Breadcrumb items={breadcrumbItems} /> : null}
      {title ? (
        <SectionHeader
          action={headerAction}
          description={description}
          eyebrow={eyebrow}
          title={title}
          titleAs="h1"
          titleClassName={titleClassName}
          titleSize="lg"
        />
      ) : null}
      {!title && description ? (
        <Typography as="p" tone="subtle" variant="body">
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}

const stickyHeaderStyle = css({
  position: 'sticky',
  top: 'var(--layout-site-header-height)',
  zIndex: 10,
  bg: 'var(--hoka-white)',
  pt: '6',
  pb: '5',
  _before: {
    content: '""',
    position: 'absolute',
    insetBlock: '0',
    insetInline: '-16px',
    zIndex: -1,
    bg: 'var(--hoka-white)',
  },
  _mobile: { position: 'static', pt: 0, _before: { display: 'none' } },
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

/** 위치 안내와 도입부를 포함한 본문 프레임을 구성합니다 (A page content frame with optional location and introductory content). */
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

export { ContentHeader };
