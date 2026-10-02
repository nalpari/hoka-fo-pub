import type { FaqEntry } from '@/shared/features/faq/faq.data';
import { cva, css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

const styles = {
  listItem: cva({
    base: { borderBottom: '1px solid var(--color-border-subtle)' },
    variants: { open: { true: { '& > button': { fontWeight: '700' } }, false: {} } },
  }),
  question: css({
    display: 'flex',
    alignItems: 'center',
    w: '100%',
    minH: '57px',
    px: '3.5',
    py: '0',
    border: '0',
    bg: '#fff',
    textAlign: 'left',
    '& b, & i': { fontFamily: 'var(--font-family-base)', fontSize: '15px' },
    '& b': { mr: '18px', color: '#777' },
    '& span': { flex: '1', fontSize: '11px' },
    '& i': { fontSize: '11px', fontStyle: 'normal' },
  }),
  answer: css({
    display: 'flex',
    p: { base: '23px 35px', _mobile: '18px' },
    bg: 'var(--color-surface-muted)',
    '& b': { mr: '18px', color: '#777', fontFamily: 'var(--font-family-base)', fontSize: '15px' },
    '& p': { maxW: '550px', m: '0', color: '#777', fontSize: '11px', lineHeight: '1.7' },
  }),
  empty: css({ p: '15', color: '#777', textAlign: 'center' }),
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
            <b>Q</b>
            <span>{item.question}</span>
            <i>{openQuestion === item.question ? '⌃' : '⌄'}</i>
          </Button>
          {openQuestion === item.question && (
            <Box className={styles.answer}>
              <b>A</b>
              <p>{item.answer}</p>
            </Box>
          )}
        </article>
      ))}
      {!entries.length && <p className={styles.empty}>검색 결과가 없습니다.</p>}
    </section>
  );
}
