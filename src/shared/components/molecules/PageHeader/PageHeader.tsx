import type { ReactNode } from 'react';
import { SectionHeader } from '@/shared/components/atoms/SectionHeader/SectionHeader';

type Props = { title: ReactNode; description?: ReactNode; action?: ReactNode; className?: string };

export function PageHeader({ title, description, action, className }: Props) {
  return (
    <SectionHeader
      action={action}
      className={className}
      description={description}
      spacing="page"
      title={title}
      titleAs="h1"
      titleSize="lg"
    />
  );
}
