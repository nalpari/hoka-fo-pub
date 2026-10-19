import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Box } from 'styled-system/jsx';

export type ProfileQuestion = { id: string; title: string; options: string[] };

type Props = {
  question: ProfileQuestion;
  number: number;
  value?: string;
  onChange: (value: string) => void;
};

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
        color: 'var(--color-text-inverse)',
      },
    },
  },
  variants: {
    selected: {
      true: {
        borderColor: 'var(--color-black-100)',
        bg: 'var(--color-black-100)',
        '&&': {
          color: 'var(--color-text-inverse)',
        },
      },
      false: {},
    },
  },
});

export function ProfileQuestionGroup({ question, number, value, onChange }: Props) {
  return (
    <Box as="section" pb="10" borderBottom="1px solid var(--color-border-subtle)">
      <Typography
        as="small"
        variant="body5"
        className={css({ '&&': { color: 'var(--color-blue-100)' } })}
      >
        QUESTION {number}
      </Typography>
      <Typography
        as="h2"
        variant="heading8"
        className={css({
          m: '10px 0 24px',
        })}
      >
        {question.title}
      </Typography>
      <div className={options}>
        {question.options.map((optionValue) => (
          <Button
            key={optionValue}
            className={option({ selected: value === optionValue })}
            onClick={() => onChange(optionValue)}
          >
            <Typography variant="body4">{optionValue}</Typography>
          </Button>
        ))}
      </div>
    </Box>
  );
}
