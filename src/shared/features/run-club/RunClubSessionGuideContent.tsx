import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { RunClubFacts } from './RunClubFacts';
import { RunClubSessionNotes } from './RunClubSessionNotes';
import type { RunClubGuideRow } from './RunClubSessionGuide';

type Props = { title: string; rows: RunClubGuideRow[] };

const content = css({
  maxW: '640px',
  '& h2': { m: '0 0 16px' },
  '& > p': { mb: '20px' },
  _mobile: { maxW: 'none' },
});

export function RunClubSessionGuideContent({ title, rows }: Props) {
  return (
    <div className={content}>
      <Typography as="h2" variant="body1" mo="body2" weight="black">
        세션 안내
      </Typography>
      <Typography as="p" variant="sessionGuideBody" className={css({ _mobile: { mb: '6' } })}>
        호카 런 클럽 {title}에서
        <br />
        러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
      </Typography>
      <RunClubFacts variant="guide" rows={rows} />
      <RunClubSessionNotes precautions />
    </div>
  );
}
