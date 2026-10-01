import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { SectionHeader } from '@/shared/components/atoms/SectionHeader/SectionHeader';

type Props = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  spacing?: 'default' | 'compact';
};

const section = css({ mt: '15', _mobile: { mt: '42px' } });

const compactSection = css({ mt: '8', _mobile: { mt: '6' } });

export function PageSection({ title, description, action, children, spacing = 'default' }: Props) {
  return (
    <section className={spacing === 'compact' ? compactSection : section}>
      <SectionHeader action={action} description={description} divider="strong" title={title} />
      {children}
    </section>
  );
}
