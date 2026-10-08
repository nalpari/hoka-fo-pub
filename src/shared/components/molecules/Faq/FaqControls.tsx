import type { FaqCategory } from '@/shared/features/faq/faq.data';
import { cva, css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

const styles = {
  search: css({
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    p: { base: '27px 25px', _mobile: '17px 13px' },
    borderTop: '2px solid var(--color-black-60)',
    bg: 'var(--color-surface-muted)',
    '& label': {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      gap: { base: '25px', _mobile: '10px' },
      fontSize: '12',
    },
    '& input': {
      flex: '1',
      h: '34px',
      border: '1px solid var(--color-border-subtle)',
      bg: 'var(--color-white-000)',
    },
    '& button': {
      h: '34px',
      minW: '51px',
      p: '0',
      bg: 'var(--color-black-100)',
      color: 'var(--color-white-000)',
      fontSize: '12',
    },
  }),
  tabs: css({
    display: 'grid',
    overflow: { _mobile: 'auto' },
    gridTemplateColumns: { base: 'repeat(8, 1fr)', _mobile: 'repeat(8, 110px)' },
    mt: '49px',
    borderBottom: '1px solid var(--color-black-100)',
  }),
  tab: cva({
    base: {
      minH: '38px',
      py: '5px',
      px: '3px',
      border: '1px solid var(--color-border-subtle)',
      borderBottom: '0',
      bg: 'var(--color-white-000)',
      fontSize: '12' /* 기존: 11px */,
    },
    variants: {
      active: {
        true: {
          borderColor: 'var(--color-black-100)',
          borderBottom: '1px solid var(--color-white-000)',
          fontWeight: 'bold',
        },
        false: {},
      },
    },
  }),
};

type Props = {
  category: FaqCategory;
  query: string;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
  onQueryChange: (query: string) => void;
};
export function FaqControls({
  category,
  query,
  categories,
  onCategoryChange,
  onQueryChange,
}: Props) {
  return (
    <>
      <form className={styles.search} onSubmit={(event) => event.preventDefault()}>
        <label>
          질문/답변 검색
          <TextInput
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="질문 또는 답변 검색"
          />
        </label>
        <Button type="submit" variant="primary">
          검색
        </Button>
      </form>
      <nav className={styles.tabs}>
        {categories.map((item) => (
          <Button
            className={styles.tab({ active: category === item })}
            onClick={() => onCategoryChange(item)}
            key={item}
          >
            {item}
          </Button>
        ))}
      </nav>
    </>
  );
}
