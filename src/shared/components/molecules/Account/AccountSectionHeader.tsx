import type { ReactNode } from 'react';
import { SectionHeader } from '@/shared/components/atoms/SectionHeader/SectionHeader';

type Props = { title: string; description?: string; action?: ReactNode };

export function AccountSectionHeader({ title, description, action }: Props) {
  return <SectionHeader action={action} description={description} divider="strong" title={title} />;
}
