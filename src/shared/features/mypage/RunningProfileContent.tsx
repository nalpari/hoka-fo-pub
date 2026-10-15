import type { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ProgressBar } from '@/shared/components/atoms/ProgressBar/ProgressBar';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProfileQuestionGroup } from '@/shared/components/molecules/MyPage/ProfileQuestionGroup';

type RunningProfileContentProps = {
  questions: readonly ComponentProps<typeof ProfileQuestionGroup>['question'][];
  answers: Readonly<Record<string, string>>;
  answeredCount: number;
  completed: boolean;
  onAnswerChange: (id: string, value: string) => void;
};

const header = css({
  '& small': {
    color: 'var(--color-blue-100)',
  },
  '& h1': {
    m: '10px 0',
  },
  '& p': { color: 'var(--color-text-tertiary)' },
});

const progress = css({ my: '32px 50px' });

const footer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: '10',
  pt: '22px',
  borderTop: '2px solid var(--color-black-100)',
  _mobile: {
    position: 'sticky',
    bottom: '0',
    zIndex: '2',
    mx: '-16px',
    mt: '30px',
    p: '14px 16px',
    bg: 'var(--color-white-000)',
  },
});

export function RunningProfileContent({
  questions,
  answers,
  answeredCount,
  completed,
  onAnswerChange,
}: RunningProfileContentProps) {
  return (
    <>
      <header className={header}>
        <Typography as="small" variant="body5" weight="bold">
          HOKA PERSONALIZATION
        </Typography>
        <Typography as="h1" variant="profileTitle">
          나의 러닝 프로필
        </Typography>
        <Typography as="p" variant="body4">
          세 가지 질문으로 나에게 맞는 러닝 경험을 찾아보세요.
        </Typography>
      </header>
      <Box className={progress}>
        <ProgressBar label="러닝 프로필 진행률" max={questions.length} value={answeredCount} />
      </Box>
      <Grid gap="42px">
        {questions.map((question, index) => (
          <ProfileQuestionGroup
            key={question.id}
            number={index + 1}
            question={question}
            value={answers[question.id]}
            onChange={(value) => onAnswerChange(question.id, value)}
          />
        ))}
      </Grid>
      <footer className={footer}>
        <Typography variant="body4">
          {answeredCount} / {questions.length} 완료
        </Typography>
        <Button variant="primary" disabled={!completed}>
          추천 결과 보기
        </Button>
      </footer>
    </>
  );
}
