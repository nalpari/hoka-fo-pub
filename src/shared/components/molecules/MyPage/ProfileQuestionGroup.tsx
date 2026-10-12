import { Typography } from '@/shared/components/atoms/Typography/Typography';
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
  pb: '10',
  borderBottom: '1px solid var(--color-border-subtle)',
  '& h2': {
    m: '10px 0 24px',
  },
  '&&': {
    '& small': {
      color: 'var(--color-blue-100)',
    },
  },
});

const options = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2.5',
  _mobile: {
    gridTemplateColumns: '1fr',
  },
});

const option = cva({
  base: {
    minH: '92px',
    border: '1px solid var(--color-border-tertiary)',
    bg: 'var(--color-white-000)',
    _mobile: {
      minH: '14',
    },
    _hover: {
      borderColor: 'var(--color-black-100)',
      bg: 'var(--color-black-100)',
    },
    '&&': {
      _hover: {
        color: 'var(--color-white-000)',
      },
    },
  },
  variants: {
    selected: {
      true: {
        borderColor: 'var(--color-black-100)',
        bg: 'var(--color-black-100)',
        '&&': {
          color: 'var(--color-white-000)',
        },
      },
      false: {},
    },
  },
});

export function ProfileQuestionGroup({ question, number, value, onChange }: Props) {
  return (
    <section className={block}>
      <Typography as="small" variant="body5">
        QUESTION {number}
      </Typography>
      <Typography as="h2" variant="heading8">
        {question.title}
      </Typography>
      <div className={options}>
        {question.options.map((optionValue) => (
          <Button
            key={optionValue}
            className={option({ selected: value === optionValue })}
            onClick={() => onChange(optionValue)}
          >
            <Typography as="span" variant="body4">
              {optionValue}
            </Typography>
          </Button>
        ))}
      </div>
    </section>
  );
}
