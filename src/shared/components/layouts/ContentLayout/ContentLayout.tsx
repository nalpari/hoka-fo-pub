import type { ReactNode } from 'react';
import { Box, Stack } from 'styled-system/jsx';
import { SectionHeader } from '@/shared/components/atoms/SectionHeader/SectionHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/shared/components/molecules/Breadcrumb/Breadcrumb';

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
}: ContentLayoutProps) {
  const hasIntro = breadcrumbItems?.length || title || description;

  return (
    <Stack as="main" className={className} gap="0">
      {hasIntro && (
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
      )}
      <Box
        maxW={contentWidth === 'narrow' ? '760px' : contentWidth === 'wide' ? 'none' : undefined}
        minW="0"
      >
        {children}
      </Box>
    </Stack>
  );
}
