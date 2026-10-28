import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import type { ReactNode } from 'react';

type SectionHeadingProps = {
  title: ReactNode;
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
};

/** Standard page-section heading with an optional trailing action. */
export function SectionHeading({ title, action, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <ContentHeader
      title={title}
      titleAs={Heading}
      titleProps={{ variant: 'heading7' }}
      orientation="horizontal"
      gap="normal"
      action={action}
    />
  );
}
