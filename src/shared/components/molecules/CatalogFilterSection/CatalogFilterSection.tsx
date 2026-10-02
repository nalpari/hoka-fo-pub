'use client';

import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { css } from 'styled-system/css';
import { Fieldset } from '@/shared/components/atoms/Fieldset/Fieldset';
import { CatalogFilterTrigger } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterTrigger';
import { Box } from 'styled-system/jsx';

const root = css({
  pb: '6',
});

const content = css({
  w: '100%',
  overflow: 'hidden',
});

export function CatalogFilterSection({ title, children }: { title: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const contentId = useId();

  return (
    <>
      <Box bg="#B3B3B3" w="100%" h="1px" />
      <div>
        <CatalogFilterTrigger
          controlsId={contentId}
          expanded={expanded}
          onToggle={() => setExpanded((current) => !current)}
          title={title}
        />
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              animate={{ height: 'auto', opacity: 1 }}
              className={content}
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              key="content"
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              id={contentId}
            >
              <Fieldset className={root} legend={title} visuallyHiddenLegend>
                {children}
              </Fieldset>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
