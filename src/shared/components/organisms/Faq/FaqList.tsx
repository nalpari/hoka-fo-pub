'use client';

import type { ReactNode } from 'react';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { FaqQuestion } from './FaqQuestion';
import { FaqAnswer } from './FaqAnswer';
import { FaqEmptyState } from './FaqEmptyState';

export type FaqListEntry = { question: string; answer: ReactNode };

export type FaqListProps = {
  entries: readonly FaqListEntry[];
  openQuestion: string | null;
  onToggle: (question: string) => void;
};

const styles = {
  root: css({ '& svg': { w: '24px', h: '24px', _mobile: { w: '16px', h: '16px' } } }),
  item: css({ borderBottom: '1px solid var(--color-black-20)' }),
  question: css({
    minH: '74px',
    gap: '16px',
    py: '24px',
    textAlign: 'left',
    '&[aria-expanded="true"]': { fontWeight: 'semibold' },
    _mobile: { minH: '58px', py: '16px' },
  }),
};

export function FaqList({ entries, openQuestion, onToggle }: FaqListProps) {
  return (
    <Box
      as="section"
      aria-label="자주 묻는 질문"
      borderTopColor="black.100"
      borderTopStyle="solid"
      borderTopWidth={entries.length ? '2px' : '0'}
      pt={{ base: '32px', _mobile: '8px' }}
    >
      {entries.length ? (
        <Accordion
          className={styles.root}
          itemClassName={styles.item}
          triggerClassName={styles.question}
          multiple={false}
          value={openQuestion ? [openQuestion] : []}
          onValueChange={(values) => {
            const question = values[0] ?? openQuestion;
            if (question !== null) onToggle(question);
          }}
          items={entries.map((item) => ({
            value: item.question,
            title: <FaqQuestion question={item.question} />,
            content: <FaqAnswer answer={item.answer} />,
          }))}
        />
      ) : (
        <FaqEmptyState />
      )}
    </Box>
  );
}
