'use client';

import { useState, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Fieldset } from '@/shared/components/atoms/Fieldset/Fieldset';
import { CatalogFilterTrigger } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterTrigger';
import { Box } from 'styled-system/jsx';

const root = css({
  pb: '6',
});

const divider = css({
  _mobile: {
    '&:first-child': { display: 'none' },
  },
});

export function CatalogFilterSection({ title, children }: { title: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <Box bg="#B3B3B3" className={divider} h="1px" w="100%" />
      <details onToggle={(event) => setExpanded(event.currentTarget.open)} open>
        <CatalogFilterTrigger expanded={expanded} title={title} />
        <Fieldset className={root} legend={title} visuallyHiddenLegend>
          {children}
        </Fieldset>
      </details>
    </>
  );
}
