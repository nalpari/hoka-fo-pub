'use client';

import type { ReactNode } from 'react';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

export type FaqListEntry = { question: string; answer: ReactNode };

export type FaqListProps = {
  entries: readonly FaqListEntry[];
  openQuestion: string | null;
  onToggle: (question: string) => void;
};

const styles = {
  root: css({
    '& svg': { w: '24px', h: '24px', _mobile: { w: '16px', h: '16px' } },
  }),
  item: css({ borderBottom: '1px solid var(--color-black-20)' }),
  question: css({
    minH: '56px',
    py: '6',
    pl: '4',
    pr: '5',
    textAlign: 'left',
    '&[aria-expanded="true"]': { fontWeight: 'semibold' },
    _mobile: { minH: '42px', px: '0', py: '3' },
  }),
};

export function FaqList({ entries, openQuestion, onToggle }: FaqListProps) {
  return (
    <Box
      as="section"
      aria-label="자주 묻는 질문"
      borderTopColor="black.20"
      borderTopStyle="solid"
      borderTopWidth={entries.length ? '1px' : '0'}
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
            title: (
              <HStack gap="2" minW="0">
                <Typography as="b" web="heading8" mo="heading9" weight="black">
                  Q
                </Typography>
                <Typography as="span" web="heading9" mo="body5" weight="semibold">
                  {item.question}
                </Typography>
              </HStack>
            ),
            content: (
              <Box bg="black.10" px="6" py="8" whiteSpace="pre-line" _mobile={{ px: '3', py: '5' }}>
                <Box as="p" m="0">
                  <Typography as="span" web="body4" mo="body5">
                    {item.answer}
                  </Typography>
                </Box>
              </Box>
            ),
          }))}
        />
      ) : (
        <Box py="15" textAlign="center">
          <Typography as="p" web="body4" mo="body5" tone="tertiary">
            검색 결과가 없습니다.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
