import type { ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import { SectionHeader } from '@/shared/components/atoms/SectionHeader/SectionHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/shared/components/molecules/Breadcrumb/Breadcrumb';

export type ContentHeaderProps = {
  breadcrumbItems?: BreadcrumbItem[];
  title?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headerAction?: ReactNode;
  titleClassName?: string;
};

/** Reusable page introductory header with optional breadcrumb and supporting content. */
export function ContentHeader({
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
