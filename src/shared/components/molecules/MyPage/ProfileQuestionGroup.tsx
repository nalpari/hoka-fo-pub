import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

export type ProfileQuestion = { id: string; title: string; options: string[] };

type Props = {
  question: ProfileQuestion;
  number: number;
  value?: string;
  onChange: (value: string) => void;
};

const block = css({
  pb: '40px',
  borderBottom: '1px solid #ddd',
  '& small': { color: '#0082ca', fontSize: '11px', fontWeight: '700', letterSpacing: '.08em' },
  '& h2': { m: '10px 0 24px', fontSize: '21px' },
});

const options = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  _mobile: { gridTemplateColumns: '1fr' },
});

const option = cva({
  base: {
    minH: '92px',
    border: '1px solid #ccc',
    bg: '#fff',
    fontSize: '14px',
    _mobile: { minH: '56px' },
    _hover: { borderColor: '#111', bg: '#111', color: '#fff' },
  },
  variants: { selected: { true: { borderColor: '#111', bg: '#111', color: '#fff' }, false: {} } },
});

export function ProfileQuestionGroup({ question, number, value, onChange }: Props) {
  return (
    <section className={block}>
      <small>QUESTION {number}</small>
      <h2>{question.title}</h2>
      <div className={options}>
        {question.options.map((optionValue) => (
          <Button
            key={optionValue}
            className={option({ selected: value === optionValue })}
            onClick={() => onChange(optionValue)}
          >
            {optionValue}
          </Button>
        ))}
      </div>
    </section>
  );
}
