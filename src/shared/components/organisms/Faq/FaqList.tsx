import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { FaqEntry } from '@/shared/features/faq/faq.data';
import { cva, css } from 'styled-system/css';
import { Box, VStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

const styles = {
  listItem: cva({
    base: { borderBottom: '1px solid var(--color-border-subtle)' },
    variants: {
      open: {
        true: {
          '&&': {
            '& > button': {
              fontWeight: 'bold',
            },
          },
        },
        false: {},
      },
    },
  }),
  question: css({
    display: 'flex',
    alignItems: 'center',
    w: '100%',
    minH: '57px',
    px: '3.5',
    py: '0',
    border: '0',
    bg: 'var(--color-white-000)',
    textAlign: 'left',
    '& b': {
      mr: '18px',
    },
    '& span': {
      flex: '1',
    },
  }),
  answer: css({
    display: 'flex',
    p: { base: '23px 35px', _mobile: '18px' },
    bg: 'var(--color-surface-muted)',
    '& b': {
      mr: '18px',
    },
    '& p': {
      maxW: '550px',
      m: '0',
    },
  }),
};

type Props = {
  entries: FaqEntry[];
  openQuestion: string | null;
  onToggle: (question: string) => void;
};

export function FaqList({ entries, openQuestion, onToggle }: Props) {
  return (
    <section>
      {entries.map((item) => (
        <article
          className={styles.listItem({ open: openQuestion === item.question })}
          key={item.question}
        >
          <Button
            className={styles.question}
            onClick={() => onToggle(item.question)}
            variant="ghost"
          >
            <Typography as="b" variant="heading9" tone="tertiary">
              Q
            </Typography>
            <Typography variant="body5">{item.question}</Typography>
            <Typography as="i" variant="body5">
              {openQuestion === item.question ? '⌃' : '⌄'}
            </Typography>
          </Button>
          {openQuestion === item.question && (
            <Box className={styles.answer}>
              <Typography as="b" variant="heading9" tone="tertiary">
                A
              </Typography>
              <Typography as="p" variant="body5" tone="tertiary">
                {item.answer}
              </Typography>
            </Box>
          )}
        </article>
      ))}
      {!entries.length && (
        <VStack w="100%" p="15">
          <Typography as="p" variant="body5" tone="tertiary">
            검색 결과가 없습니다.
          </Typography>
        </VStack>
      )}
    </section>
  );
}
