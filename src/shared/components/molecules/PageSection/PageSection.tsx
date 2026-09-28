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

const section = css({ mt: '60px', _mobile: { mt: '42px' } });

const compactSection = css({ mt: '32px', _mobile: { mt: '24px' } });

export function PageSection({ title, description, action, children, spacing = 'default' }: Props) {
  return (
    <section className={spacing === 'compact' ? compactSection : section}>
      <SectionHeader action={action} description={description} divider="strong" title={title} />
      {children}
    </section>
  );
}
