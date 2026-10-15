'use client';

import type { ReactNode } from 'react';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { css } from 'styled-system/css';
import { Box, VStack } from 'styled-system/jsx';

export type FaqListEntry = { question: string; answer: ReactNode };

export type FaqListProps = {
  entries: readonly FaqListEntry[];
  openQuestion: string | null;
  onToggle: (question: string) => void;
};

const styles = {
  root: css({ '& h3': { m: 0 } }),
  item: css({
    borderBottom: '1px solid var(--color-border-subtle)',
    '& button[aria-expanded="true"]': { fontWeight: 'bold' },
  }),
  question: css({
    minH: '57px',
    px: '3.5',
    py: 0,
    bg: 'var(--color-white-000)',
    textAlign: 'left',
    '& b': { mr: '18px' },
    '& span': { flex: '1' },
  }),
  answer: css({
    display: 'flex',
    p: { base: '23px 35px', _mobile: '18px' },
    bg: 'var(--color-surface-muted)',
    '& b': { mr: '18px' },
    '& p': { maxW: '550px', m: 0 },
  }),
};

export function FaqList({ entries, openQuestion, onToggle }: FaqListProps) {
  return (
    <section>
      {entries.length ? (
        <Accordion
          className={styles.root}
          itemClassName={styles.item}
          triggerClassName={styles.question}
          indicator={null}
          multiple={false}
          value={openQuestion ? [openQuestion] : []}
          onValueChange={(values) => {
            const question = values[0] ?? openQuestion;
            if (question !== null) onToggle(question);
          }}
          items={entries.map((item) => ({
            value: item.question,
            title: (
              <>
                <Typography as="b" variant="heading9" tone="tertiary">
                  Q
                </Typography>
                <Typography variant="body5">{item.question}</Typography>
                <Typography as="i" variant="body5" aria-hidden="true">
                  {openQuestion === item.question ? '⌃' : '⌄'}
                </Typography>
              </>
            ),
            content: (
              <Box className={styles.answer}>
                <Typography as="b" variant="heading9" tone="tertiary">
                  A
                </Typography>
                <Typography as="p" variant="body5" tone="tertiary">
                  {item.answer}
                </Typography>
              </Box>
            ),
          }))}
        />
      ) : (
        <VStack w="100%" p="15">
          <Typography as="p" variant="body5" tone="tertiary">
            검색 결과가 없습니다.
          </Typography>
        </VStack>
      )}
    </section>
  );
}
