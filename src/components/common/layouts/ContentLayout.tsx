'use client';

import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { Breadcrumb, type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';

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
  const hasIntro = breadcrumbItems?.length || title || description;
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
        {hasIntro ? (
          <Stack as="header" gap={{ base: '24px', _mobile: '10px' }}>
            {breadcrumbItems?.length ? <Breadcrumb items={breadcrumbItems} /> : null}
            {title ? (
              <ContentHeader
                as="header"
                title={title}
                titleAs="h1"
                titleProps={{
                  variant: 'heading7',
                  className: [css({ m: '0' }), titleClassName].filter(Boolean).join(' '),
                }}
                orientation="horizontal"
                alignItems="end"
                gap="4"
                textGroupProps={{ css: css.raw({ display: 'block' }) }}
                eyebrow={eyebrow}
                eyebrowAs="small"
                eyebrowProps={{
                  className: css({
                    display: 'block',
                    color: 'var(--hoka-brand)',
                    letterSpacing: 'mono',
                  }),
                }}
                description={description}
                descriptionProps={{
                  variant: 'body5',
                  tone: 'subtle',
                  className: css({ m: '8px 0 0' }),
                }}
                action={headerAction ? <div>{headerAction}</div> : undefined}
              />
            ) : null}
            {!title && description ? (
              <Typography as="p" tone="subtle" web="bodyKr3" mo="bodyKr4">
                {description}
              </Typography>
            ) : null}
          </Stack>
        ) : null}
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
