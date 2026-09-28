import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Fieldset } from '@/shared/components/atoms/Fieldset/Fieldset';

const root = css({
  borderTop: '1px solid var(--line)',
  py: '18px',
  '&:not([open]) > summary::after': { content: '"+"' },
});
const summary = css({
  cursor: 'pointer',
  listStyle: 'none',
  fontWeight: '700',
  _after: { content: '"−"', float: 'right' },
});
const fieldset = css({ mt: '10px' });

export function CatalogFilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className={root} open>
      <summary className={summary}>{title}</summary>
      <Fieldset className={fieldset} legend={title} visuallyHiddenLegend>
        {children}
      </Fieldset>
    </details>
  );
}
