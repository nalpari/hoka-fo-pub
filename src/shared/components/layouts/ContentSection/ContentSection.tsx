import type { ComponentProps, ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import {
  ContentHeader,
  type ContentHeaderProps,
} from '@/shared/components/molecules/ContentHeader/ContentHeader';

type Props = Omit<ComponentProps<typeof Stack>, 'children' | 'title'> & {
  children?: ReactNode;
  footer?: ReactNode;
} & (
    | { title: ReactNode; headerProps?: Omit<ContentHeaderProps, 'title'>; header?: never }
    | { header: Exclude<ReactNode, undefined>; title?: never; headerProps?: never }
  );

/** Owns uniform spacing between the heading and each related content group. */
export function ContentSection({
  title,
  headerProps,
  header,
  children,
  footer,
  gap = '6',
  ...props
}: Props) {
  return (
    <Stack gap={gap} {...props}>
      {header !== undefined ? header : <ContentHeader {...headerProps} title={title} />}
      {children}
      {footer}
    </Stack>
  );
}
